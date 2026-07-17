export const ui = {
  en: {
    'nav.projects': 'Projects',
    'nav.about': 'About',
    'footer.selfhosted': 'Self-hosted on my own Proxmox cluster',
    'meta.served': 'served from a Proxmox cluster at home',
  },
  fr: {
    'nav.projects': 'Projets',
    'nav.about': 'À propos',
    'footer.selfhosted': 'Auto-hébergé sur mon propre cluster Proxmox',
    'meta.served': 'servi depuis un cluster Proxmox à la maison',
  },
} as const;

export type Lang = keyof typeof ui;
export const t = (lang: Lang) => (key: keyof (typeof ui)['en']) => ui[lang][key];
