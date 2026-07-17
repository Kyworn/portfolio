# Portfolio v2 — Hybrid Portfolio + Open Source Directory

Date: 2026-07-17
Status: approved

## Goal

Replace the current single-page Next.js portfolio (zorko.xyz, self-hosted on
Proxmox LXC 121) with a hybrid site: 50/50 personal portfolio and a curated
directory of Kyworn's public open source projects, written by hand (no AI slop
published without the author's review pass), bilingual EN/FR.

## Architecture

- **Astro** static build, native i18n routing: `/…` = EN (default), `/fr/…` = FR mirror.
- **Tailwind CSS** for styling.
- Content = Astro **content collections**, Markdown files:
  `src/content/projects/{en,fr}/<slug>.md`.
- Frontmatter schema per project:
  `title, description, category, featured (bool), repo, install (inline command, optional), links (paper/HF/demo, optional), tech[]`.
- `featured: true` → detail page generated at `/projects/<slug>`.
  `featured: false` → card only on the home grid.
- Deployment: Docker multi-stage (Astro build → nginx:alpine), same
  docker-compose in LXC 121, same Cloudflare Zero Trust tunnel. No network
  changes.

## Pages

```
/                  compact personal hero + project grid grouped by category
/projects/<slug>   detail pages (featured projects only, ~7)
/about             bio, ZorkoLab homelab, stack, contact
/fr/...            French mirror of all of the above
```

## Categories & projects (launch set — all public repos, forks and profile repo excluded)

- **AI & Research**: PentaNet-v1.0, ShiftQuant, slopwise
- **Linux & Hardware**: gnr-smu, asus-debian-tools, asus-x13-scripts,
  ZorkoPower, hid-nintendo-licensed-led, RedMagic8SPro-LineageOS
- **Self-hosted & Infra**: ZorkoLab, seerr-webhook, azeroth-admin-panel,
  triumvirate-launcher-linux
- **Web Apps**: lyon-transit-viewer, hubeau

## Project pages (hybrid A+B model)

- **Featured (~7)**: PentaNet-v1.0, ShiftQuant, gnr-smu, asus-debian-tools,
  ZorkoLab, lyon-transit-viewer, hid-nintendo-licensed-led.
  Detail page = context/why + results (benchmarks, numbers) + quickstart
  (install/usage in ~30s) + links (GitHub, paper, HuggingFace, demo).
- **Non-featured (~8)**: home card = 1-2 line description + inline install
  command where relevant + GitHub link. No detail page.
- Editorial flow: drafts derived from existing repo READMEs, then reviewed and
  rewritten by the author before publishing. Both languages maintained by hand.

## Visual design

Sober "open source maintainer" aesthetic: strong typography, light/dark via
`prefers-color-scheme`, minimal cards, no heavy animation libraries (drop
framer-motion). Precise direction refined at implementation time with the
frontend-design skill.

## Deployment

- Repo: GitHub `Kyworn/portfolio`, branch `v2` (merged to main at release).
- `deploy.sh`: `ssh root@192.168.1.61` → `pct exec 121` → `git pull` +
  `docker compose up -d --build`. No CI.

## Verification

- `astro build` passes; internal links checked.
- Post-deploy smoke test: curl key routes (/, /fr/, one detail page, /about).

## Out of scope (add when needed)

Client-side search/filtering (15 projects — categories suffice), CMS,
analytics, CI pipeline, blog.
