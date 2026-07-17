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
