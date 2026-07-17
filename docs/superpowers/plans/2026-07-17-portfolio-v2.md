# Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-page Next.js portfolio with a bilingual (EN/FR) Astro static site: 50/50 personal portfolio + curated open source project directory, deployed to Proxmox LXC 121 behind the existing Cloudflare tunnel.

**Architecture:** Astro 5 static build with native i18n routing (`/` = EN, `/fr/` = FR). Projects live in a content collection of hand-written Markdown files. Featured projects (7) get detail pages; the other 8 get cards only. Served by nginx:alpine via Docker multi-stage build in LXC 121.

**Tech Stack:** Astro 5, Tailwind CSS 4 (via `@tailwindcss/vite`), nginx:alpine, Docker Compose.

## Global Constraints

- Branch: `v2` on `Kyworn/portfolio` (repo already cloned at `/home/zorko/dev/portfolio`, spec committed).
- Locales: EN default without URL prefix, FR under `/fr/`.
- Categories (exact slugs): `ai-research`, `linux-hardware`, `selfhosted-infra`, `web-apps`.
- Featured projects (detail pages): PentaNet-v1.0, ShiftQuant, gnr-smu, asus-debian-tools, ZorkoLab, lyon-transit-viewer, hid-nintendo-licensed-led.
- No animation libraries (no framer-motion). Light/dark via `prefers-color-scheme` only.
- Content drafted from repo READMEs; the author reviews before publish — mark drafts with `<!-- DRAFT: needs author review -->` at the top of each Markdown body.
- Deploy target: `ssh root@192.168.1.61` → `pct exec 121`, project dir `/portfolio` inside the LXC, container name `zorko-portfolio`, port 3000 (keep port so the Cloudflare tunnel config is untouched).
- Verification for a static site = `npm run build` passing + curl smoke tests. No unit test framework (YAGNI).

---

### Task 1: Clean repo and scaffold Astro

**Files:**
- Delete: all Next.js files at repo root (`pages/`, `components/`, `utils/`, `public/`, `globals.css`, `next.config.js`, `postcss.config.js`, `tailwind.config.js`, `package.json`, `package-lock.json`, `Dockerfile`, `docker-compose.yml`)
- Create: Astro scaffold (`package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`), `src/styles/global.css`, `.gitignore`

**Interfaces:**
- Produces: working `npm run dev` / `npm run build`; `astro.config.mjs` with i18n config consumed by all page tasks; `src/styles/global.css` imported by Task 3's layout.

- [ ] **Step 1: Remove old Next.js code (keep `docs/`, `README.md`, `.git`)**

```bash
cd /home/zorko/dev/portfolio
git rm -r -q pages components utils public globals.css next.config.js postcss.config.js tailwind.config.js package.json package-lock.json Dockerfile docker-compose.yml 2>/dev/null; true
ls   # expect: only docs/, README.md remain (plus .git)
```

- [ ] **Step 2: Scaffold Astro in place**

```bash
cd /home/zorko/dev/portfolio
npm create astro@latest . -- --template minimal --no-install --no-git --typescript strict --yes
npm install
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 3: Configure i18n and Tailwind**

Replace `astro.config.mjs`:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zorko.xyz',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: { prefixDefaultLocale: false },
  },
  vite: { plugins: [tailwindcss()] },
});
```

Create `src/styles/global.css`:

```css
@import 'tailwindcss';
```

- [ ] **Step 4: Verify build passes**

Run: `npm run build`
Expected: `Complete!` with 1 page built (the scaffold index).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: replace Next.js with Astro 5 scaffold (i18n en/fr, tailwind 4)"
```

---

### Task 2: Content collection schema + all EN project files

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/projects/en/<slug>.md` × 15

**Interfaces:**
- Produces: collection `projects`; entry ids are `en/<slug>` / `fr/<slug>`. Schema fields consumed by Tasks 4-5: `title, description, category, featured, repo, install?, links[], tech[], order`. Helper contract for pages: filter entries by `id.startsWith('en/')` or `'fr/'`; slug = id without locale prefix.

- [ ] **Step 1: Write the schema**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const CATEGORIES = {
  'ai-research': { en: 'AI & Research', fr: 'IA & Recherche' },
  'linux-hardware': { en: 'Linux & Hardware', fr: 'Linux & Hardware' },
  'selfhosted-infra': { en: 'Self-hosted & Infra', fr: 'Auto-hébergement & Infra' },
  'web-apps': { en: 'Web Apps', fr: 'Applications Web' },
} as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['ai-research', 'linux-hardware', 'selfhosted-infra', 'web-apps']),
    featured: z.boolean().default(false),
    repo: z.string().url(),
    install: z.string().optional(),
    links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
    tech: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
```

- [ ] **Step 2: Verify schema loads**

Run: `npm run build`
Expected: build passes (empty collection is fine, no schema errors).

- [ ] **Step 3: Create the 15 EN project files**

Frontmatter is final data (below). Body rules:
- **Featured** (`featured: true`): fetch the repo README (`curl -s https://raw.githubusercontent.com/Kyworn/<repo>/main/README.md`, fall back to `master`) and draft body with exactly these sections: `## Why` (context, 2-4 sentences), `## Results` (numbers/benchmarks if any, else what it does concretely), `## Quickstart` (fenced install+usage commands, ≤10 lines), `## Links` only in frontmatter. First line of body: `<!-- DRAFT: needs author review -->`.
- **Non-featured**: body is empty (card uses frontmatter only).

Full example, `src/content/projects/en/pentanet.md`:

````markdown
---
title: PentaNet
description: Native pentanary {-2,-1,0,+1,+2} quantization for LLMs — −6.4% perplexity vs BitNet at 124M params while preserving zero-multiplier arithmetic.
category: ai-research
featured: true
repo: https://github.com/Kyworn/PentaNet-v1.0
tech: [PyTorch, Triton, AVX2]
order: 1
links:
  - { label: Paper, url: "https://github.com/Kyworn/PentaNet-v1.0/blob/main/paper/PentaNet_Technical_Report.pdf" }
  - { label: Model (HF), url: "https://huggingface.co/Kyworn/pentanet-124m" }
---
<!-- DRAFT: needs author review -->
## Why

BitNet showed ternary weights {-1,0,+1} can train LLMs without multipliers. PentaNet asks: does a fifth and sixth level help? It extends the grid to {-2,-1,0,+1,+2} — ×2 is a bit-shift, so the zero-multiplier property survives.

## Results

−6.4% perplexity vs BitNet at 124M params, 3 seeds, WikiText-103. Full training curves and ablations in the technical report.

## Quickstart

```bash
git clone https://github.com/Kyworn/PentaNet-v1.0
cd PentaNet-v1.0 && pip install -r requirements.txt
python train.py --config configs/pentanet_124m.yaml
```
````

Frontmatter data for the remaining 14 files (slug → fields; descriptions from GitHub, tighten while drafting):

| slug | title | category | featured | repo | tech | order |
|---|---|---|---|---|---|---|
| shiftquant | ShiftQuant | ai-research | true | https://github.com/Kyworn/ShiftQuant | PyTorch | 2 |
| slopwise | slopwise | ai-research | false | https://github.com/Kyworn/slopwise | Python, LiteLLM | 3 |
| gnr-smu | gnr-smu | linux-hardware | true | https://github.com/Kyworn/gnr-smu | C, Linux kernel | 1 |
| asus-debian-tools | asus-debian-tools | linux-hardware | true | https://github.com/Kyworn/asus-debian-tools | Bash, Debian | 2 |
| hid-nintendo-licensed-led | hid-nintendo-licensed-led | linux-hardware | true | https://github.com/Kyworn/hid-nintendo-licensed-led | C, Linux kernel | 3 |
| zorkopower | ZorkoPower | linux-hardware | false | https://github.com/Kyworn/ZorkoPower | GJS, GNOME Shell | 4 |
| asus-x13-scripts | asus-x13-scripts | linux-hardware | false | https://github.com/Kyworn/asus-x13-scripts | Bash | 5 |
| redmagic8spro-lineageos | RedMagic 8S Pro LineageOS | linux-hardware | false | https://github.com/Kyworn/RedMagic8SPro-LineageOS | Android, reverse engineering | 6 |
| zorkolab | ZorkoLab | selfhosted-infra | true | https://github.com/Kyworn/ZorkoLab | Proxmox, TrueNAS, Cloudflare | 1 |
| seerr-webhook | seerr-webhook | selfhosted-infra | false | https://github.com/Kyworn/seerr-webhook | Python, Docker | 2 |
| azeroth-admin-panel | azeroth-admin-panel | selfhosted-infra | false | https://github.com/Kyworn/azeroth-admin-panel | PHP, AzerothCore | 3 |
| triumvirate-launcher-linux | triumvirate-launcher-linux | selfhosted-infra | false | https://github.com/Kyworn/triumvirate-launcher-linux | Bash, Wine/Proton | 4 |
| lyon-transit-viewer | Lyon Transit Viewer | web-apps | true | https://github.com/Kyworn/lyon-transit-viewer | React, TypeScript, Mapbox | 1 |
| hubeau | Hub'Eau Water Quality | web-apps | false | https://github.com/Kyworn/hubeau | JavaScript, Hub'Eau API | 2 |

`description`: use the GitHub repo description verbatim as starting point, trim marketing/emoji. `install`: set for non-featured repos where a one-liner exists in the README (e.g. seerr-webhook `docker run`, asus-x13-scripts `git clone … && ./install.sh`); omit when none.

- [ ] **Step 4: Verify collection builds**

Run: `npm run build`
Expected: build passes, no zod validation errors.

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content/projects/en
git commit -m "feat: projects collection schema + 15 EN project entries (drafts)"
```

---

### Task 3: Base layout, header, footer

**Files:**
- Create: `src/layouts/Base.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/i18n/ui.ts`

**Interfaces:**
- Consumes: `src/styles/global.css` (Task 1).
- Produces: `<Base title description lang>` slot layout used by every page; `t(lang)` dict from `src/i18n/ui.ts` with keys `nav.projects, nav.about, footer.selfhosted`.

- [ ] **Step 1: Write the i18n dict**

Create `src/i18n/ui.ts`:

```ts
export const ui = {
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'footer.selfhosted': 'Self-hosted on my own Proxmox cluster',
  },
  fr: {
    'nav.projects': 'Projets',
    'nav.about': 'À propos',
    'footer.selfhosted': 'Auto-hébergé sur mon propre cluster Proxmox',
  },
} as const;

export type Lang = keyof typeof ui;
export const t = (lang: Lang) => (key: keyof (typeof ui)['en']) => ui[lang][key];
```

- [ ] **Step 2: Write Base layout + Header + Footer**

Create `src/layouts/Base.astro`:

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import type { Lang } from '../i18n/ui';

interface Props { title: string; description: string; lang: Lang }
const { title, description, lang } = Astro.props;
---
<html lang={lang} class="scheme-light-dark">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 antialiased">
    <Header lang={lang} />
    <main class="mx-auto max-w-4xl px-4 py-10"><slot /></main>
    <Footer lang={lang} />
  </body>
</html>
```

Create `src/components/Header.astro`:

```astro
---
import { t, type Lang } from '../i18n/ui';
const { lang } = Astro.props as { lang: Lang };
const base = lang === 'fr' ? '/fr' : '';
const path = Astro.url.pathname;
const otherLocaleHref = lang === 'fr' ? path.replace(/^\/fr/, '') || '/' : `/fr${path}`;
const tr = t(lang);
---
<header class="mx-auto max-w-4xl px-4 py-6 flex items-center justify-between">
  <a href={base || '/'} class="font-bold text-lg">zorko.xyz</a>
  <nav class="flex gap-6 text-sm">
    <a href={`${base}/#projects`} class="hover:underline">{tr('nav.projects')}</a>
    <a href={`${base}/about`} class="hover:underline">{tr('nav.about')}</a>
    <a href={otherLocaleHref} class="text-zinc-500 hover:underline">{lang === 'fr' ? 'EN' : 'FR'}</a>
  </nav>
</header>
```

Create `src/components/Footer.astro`:

```astro
---
import { t, type Lang } from '../i18n/ui';
const { lang } = Astro.props as { lang: Lang };
---
<footer class="mx-auto max-w-4xl px-4 py-10 text-sm text-zinc-500 flex justify-between">
  <span>{t(lang)('footer.selfhosted')}</span>
  <a href="https://github.com/Kyworn" class="hover:underline">GitHub</a>
</footer>
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: passes (layout not yet used — no errors from unused files).

- [ ] **Step 4: Commit**

```bash
git add src/layouts src/components src/i18n
git commit -m "feat: base layout, header/footer, i18n dict"
```

---

### Task 4: Home page (hero + category grid), EN

**Files:**
- Create: `src/components/ProjectCard.astro`, `src/components/ProjectGrid.astro`, `src/pages/index.astro`
- Delete: scaffold `src/pages/index.astro` content (overwritten)

**Interfaces:**
- Consumes: `Base` layout (Task 3), `projects` collection + `CATEGORIES` (Task 2).
- Produces: `<ProjectGrid lang>` — renders all projects of a locale grouped by category; reused by FR home (Task 7).

- [ ] **Step 1: Write ProjectCard**

Create `src/components/ProjectCard.astro`:

```astro
---
import type { CollectionEntry } from 'astro:content';
const { project, lang } = Astro.props as { project: CollectionEntry<'projects'>; lang: string };
const { title, description, featured, repo, install, tech } = project.data;
const slug = project.id.split('/')[1];
const base = lang === 'fr' ? '/fr' : '';
---
<article class="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 flex flex-col gap-2">
  <h3 class="font-semibold">
    {featured
      ? <a href={`${base}/projects/${slug}`} class="hover:underline">{title}</a>
      : <a href={repo} class="hover:underline">{title}</a>}
  </h3>
  <p class="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
  {install && <code class="text-xs bg-zinc-100 dark:bg-zinc-900 rounded px-2 py-1 overflow-x-auto">{install}</code>}
  <div class="mt-auto flex items-center gap-3 text-xs text-zinc-500">
    {tech.map((t: string) => <span>{t}</span>)}
    <a href={repo} class="ml-auto hover:underline">GitHub →</a>
  </div>
</article>
```

- [ ] **Step 2: Write ProjectGrid**

Create `src/components/ProjectGrid.astro`:

```astro
---
import { getCollection } from 'astro:content';
import { CATEGORIES } from '../content.config';
import ProjectCard from './ProjectCard.astro';
const { lang } = Astro.props as { lang: 'en' | 'fr' };
const all = (await getCollection('projects', (e) => e.id.startsWith(`${lang}/`)))
  .sort((a, b) => a.data.order - b.data.order);
const cats = Object.entries(CATEGORIES) as [keyof typeof CATEGORIES, (typeof CATEGORIES)[keyof typeof CATEGORIES]][];
---
<section id="projects" class="flex flex-col gap-10">
  {cats.map(([key, label]) => {
    const items = all.filter((p) => p.data.category === key);
    return items.length > 0 && (
      <div>
        <h2 class="text-xl font-bold mb-4">{label[lang]}</h2>
        <div class="grid sm:grid-cols-2 gap-4">
          {items.map((p) => <ProjectCard project={p} lang={lang} />)}
        </div>
      </div>
    );
  })}
</section>
```

- [ ] **Step 3: Write the home page**

Replace `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import ProjectGrid from '../components/ProjectGrid.astro';
---
<Base title="Zorko — Open source projects" description="LLM quantization research, Linux kernel drivers, self-hosted infrastructure. Open source projects by Zorko (Kyworn)." lang="en">
  <section class="mb-12">
    <h1 class="text-3xl font-bold mb-3">Zorko</h1>
    <p class="text-zinc-600 dark:text-zinc-400 max-w-2xl">
      Sysadmin and hardware tinkerer. I do LLM quantization research (PentaNet, ShiftQuant),
      write Linux drivers and tooling, and run everything on my own Proxmox cluster —
      including this site.
    </p>
  </section>
  <ProjectGrid lang="en" />
</Base>
```

- [ ] **Step 4: Verify visually and build**

Run: `npm run build && npx astro preview & sleep 2 && curl -s http://localhost:4321/ | grep -c 'article'`
Expected: build passes; grep count = 15 (one `<article>` per project).

- [ ] **Step 5: Commit**

```bash
git add src/components src/pages/index.astro
git commit -m "feat: EN home — hero + project grid by category"
```

---

### Task 5: Project detail pages, EN

**Files:**
- Create: `src/pages/projects/[slug].astro`

**Interfaces:**
- Consumes: `Base` layout, `projects` collection.
- Produces: `/projects/<slug>` for every `featured: true` EN entry. Same file pattern reused for FR in Task 7.

- [ ] **Step 1: Write the dynamic page**

Create `src/pages/projects/[slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import Base from '../../layouts/Base.astro';

export async function getStaticPaths() {
  const featured = await getCollection('projects', (e) => e.id.startsWith('en/') && e.data.featured);
  return featured.map((p) => ({ params: { slug: p.id.split('/')[1] }, props: { project: p } }));
}
const { project } = Astro.props;
const { Content } = await render(project);
const { title, description, repo, links, tech } = project.data;
---
<Base title={`${title} — Zorko`} description={description} lang="en">
  <article class="prose prose-zinc dark:prose-invert max-w-none">
    <h1>{title}</h1>
    <p class="lead">{description}</p>
    <p class="flex gap-4 not-prose text-sm">
      <a href={repo} class="underline">GitHub</a>
      {links.map((l) => <a href={l.url} class="underline">{l.label}</a>)}
      <span class="text-zinc-500 ml-auto">{tech.join(' · ')}</span>
    </p>
    <Content />
  </article>
</Base>
```

- [ ] **Step 2: Install typography plugin (used above)**

```bash
npm install @tailwindcss/typography
```

Append to `src/styles/global.css`:

```css
@plugin '@tailwindcss/typography';
```

- [ ] **Step 3: Verify**

Run: `npm run build && ls dist/projects`
Expected: 7 directories (pentanet, shiftquant, gnr-smu, asus-debian-tools, zorkolab, lyon-transit-viewer, hid-nintendo-licensed-led).

- [ ] **Step 4: Commit**

```bash
git add src/pages/projects src/styles/global.css package.json package-lock.json
git commit -m "feat: featured project detail pages"
```

---

### Task 6: About page, EN

**Files:**
- Create: `src/pages/about.astro`

**Interfaces:**
- Consumes: `Base` layout.
- Produces: `/about`. Content structure reused for FR (Task 7).

- [ ] **Step 1: Write the page**

Create `src/pages/about.astro` (draft content from `/home/zorko/dev/ZorkoLab/README.md` + `/home/zorko/dev/Kyworn/README.md`; author reviews):

```astro
---
import Base from '../layouts/Base.astro';
---
<Base title="About — Zorko" description="Sysadmin, hardware tinkerer, LLM quantization researcher. About Zorko and the ZorkoLab homelab." lang="en">
  <article class="prose prose-zinc dark:prose-invert max-w-none">
    <!-- DRAFT: needs author review -->
    <h1>About</h1>
    <p>Fan of hardware, Proxmox, sysadmin and AI. I believe in running my own
    infrastructure: this site is served from a Proxmox cluster in my home, behind
    Cloudflare Zero Trust — no Vercel, no Netlify.</p>
    <h2>Homelab</h2>
    <p>ZorkoLab: Proxmox VE cluster, TrueNAS Scale on ZFS RAID1, ~12 LXC containers
    (Gitea, Grafana, AdGuard, Vaultwarden, media stack…), Cloudflare Zero Trust tunnel.
    Full write-up in the <a href="https://github.com/Kyworn/ZorkoLab">ZorkoLab repo</a>.</p>
    <h2>Research</h2>
    <p>LLM quantization: PentaNet (pentanary quantization, −6.4% PPL vs BitNet) and
    ShiftQuant (shift-based PTQ analysis). PyTorch, Triton, AVX2, one RTX 5080.</p>
    <h2>Contact</h2>
    <p><a href="https://github.com/Kyworn">GitHub</a> · <a href="mailto:kyworn@gmail.com">Email</a></p>
  </article>
</Base>
```

- [ ] **Step 2: Verify build**

Run: `npm run build && ls dist/about`
Expected: `index.html` present.

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: about page (draft)"
```

---

### Task 7: French mirror (content + pages)

**Files:**
- Create: `src/content/projects/fr/<slug>.md` × 15
- Create: `src/pages/fr/index.astro`, `src/pages/fr/about.astro`, `src/pages/fr/projects/[slug].astro`

**Interfaces:**
- Consumes: everything above. FR pages are thin copies of EN pages with `lang="fr"` and `id.startsWith('fr/')` filters.

- [ ] **Step 1: Create the 15 FR content files**

Same slugs, same frontmatter as `en/` (identical field values), but `title`/`description` and body translated to French by hand (not machine-dumped: rewrite naturally, keep technical terms in English). Same `<!-- DRAFT: needs author review -->` marker.

- [ ] **Step 2: FR home**

Create `src/pages/fr/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import ProjectGrid from '../../components/ProjectGrid.astro';
---
<Base title="Zorko — Projets open source" description="Recherche en quantization LLM, drivers kernel Linux, infrastructure auto-hébergée. Projets open source de Zorko (Kyworn)." lang="fr">
  <section class="mb-12">
    <h1 class="text-3xl font-bold mb-3">Zorko</h1>
    <p class="text-zinc-600 dark:text-zinc-400 max-w-2xl">
      Sysadmin et passionné de hardware. Je fais de la recherche en quantization LLM
      (PentaNet, ShiftQuant), j'écris des drivers et outils Linux, et tout tourne sur
      mon propre cluster Proxmox — ce site inclus.
    </p>
  </section>
  <ProjectGrid lang="fr" />
</Base>
```

- [ ] **Step 3: FR detail pages**

Create `src/pages/fr/projects/[slug].astro`: identical to `src/pages/projects/[slug].astro` except the filter is `e.id.startsWith('fr/')`, `lang="fr"`, and import paths gain one `../`.

- [ ] **Step 4: FR about**

Create `src/pages/fr/about.astro`: same structure as EN about, content translated by hand, `lang="fr"`.

- [ ] **Step 5: Verify**

Run: `npm run build && ls dist/fr dist/fr/projects`
Expected: `index.html`, `about/`, and 7 project dirs under `dist/fr/projects`.

- [ ] **Step 6: Commit**

```bash
git add src/content/projects/fr src/pages/fr
git commit -m "feat: french mirror (content + pages)"
```

---

### Task 8: Docker, nginx, deploy script

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `nginx.conf`, `deploy.sh`
- Modify: `README.md` (update stack section)

**Interfaces:**
- Consumes: `npm run build` output in `dist/`.
- Produces: container `zorko-portfolio` serving on port 3000 (tunnel unchanged).

- [ ] **Step 1: Write Dockerfile**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
```

- [ ] **Step 2: Write nginx.conf**

```nginx
server {
    listen 3000;
    root /usr/share/nginx/html;
    index index.html;
    gzip on;
    gzip_types text/html text/css application/javascript image/svg+xml;
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
    error_page 404 /404.html;
}
```

- [ ] **Step 3: Write docker-compose.yml**

```yaml
services:
  portfolio:
    build: .
    container_name: zorko-portfolio
    ports:
      - "3000:3000"
    restart: unless-stopped
```

- [ ] **Step 4: Write deploy.sh**

```bash
#!/usr/bin/env bash
# Deploy portfolio v2 to LXC 121 on pve (192.168.1.61)
set -euo pipefail
BRANCH="${1:-v2}"
ssh root@192.168.1.61 "pct exec 121 -- bash -c '
  set -euo pipefail
  cd /portfolio
  git fetch origin && git checkout $BRANCH && git pull origin $BRANCH
  docker compose up -d --build
'"
echo "Deployed. Smoke test:"
for path in / /fr/ /about/ /projects/pentanet/ /fr/projects/pentanet/; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "https://zorko.xyz$path")
  echo "$code $path"
done
```

```bash
chmod +x deploy.sh
```

- [ ] **Step 5: Verify local Docker build**

Run: `docker build -t portfolio-test . && docker run -d --rm -p 3999:3000 --name pf-test portfolio-test && sleep 1 && curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3999/ && curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3999/fr/ && docker stop pf-test`
Expected: `200` twice.

- [ ] **Step 6: Update README.md**

Rewrite stack section: Astro 5 + Tailwind 4, static, nginx:alpine, same self-hosted architecture paragraph kept. Keep it short.

- [ ] **Step 7: Commit**

```bash
git add Dockerfile docker-compose.yml nginx.conf deploy.sh README.md
git commit -m "feat: docker (nginx static) + deploy script for LXC 121"
```

---

### Task 9: Author review gate, then deploy

**Files:**
- Modify: content files per author feedback (remove `<!-- DRAFT -->` markers once approved)

- [ ] **Step 1: Author content review**

STOP — present all draft content (project pages EN/FR, about EN/FR, hero copy) to the author for review. This is the "no AI slop published" gate from the spec. Apply edits, remove DRAFT markers.

- [ ] **Step 2: Push and check LXC prerequisites**

```bash
git push -u origin v2
ssh root@192.168.1.61 "pct exec 121 -- bash -c 'cd /portfolio && git remote -v && git status | head -3'"
```

If `/portfolio` in the LXC is not a git clone (it was rsync'd), replace it:

```bash
ssh root@192.168.1.61 "pct exec 121 -- bash -c '
  cd / && mv portfolio portfolio.bak-next
  git clone https://github.com/Kyworn/portfolio.git portfolio
'"
```

- [ ] **Step 3: Deploy**

Run: `./deploy.sh v2`
Expected: `200` for all 5 smoke-test paths.

- [ ] **Step 4: Merge to main after author validates live site**

```bash
git checkout main && git merge v2 && git push origin main
```

Keep `portfolio.bak-next` in the LXC for one week as rollback, then delete.
