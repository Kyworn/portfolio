// @ts-check
import { v4 as uuidv4 } from 'uuid';

export const RESUME_DATA = {
    name: "Idriss Messaoud",
    initials: "IM",
    location: "Villeurbanne, France",
    locationLink: "https://www.google.com/maps/place/Villeurbanne",
    about: "AI-Native Architect",
    tagline: "Architecture. Orchestration. Prototypage Rapide.",
    summary: `AI-Native Architect & Tech Visionary.
Je ne suis pas un développeur qui code, je suis un architecte qui pilote des IA pour matérialiser des visions. Mon but ? Utiliser cette puissance d'exécution ultra-rapide pour explorer la Deep Tech (ADN, UWB) et, à terme, disrupter des marchés stagnants comme les prothèses auditives ou la mobilité réduite. Je construis aujourd'hui les outils qui me permettront de changer ces industries demain.`,
    avatarUrl: "https://avatars.githubusercontent.com/u/22259689?v=4",
    personalWebsiteUrl: "https://github.com/Kyworn",
    contact: {
      email: "kyworn@gmail.com",
      tel: "",
      social: [
        {
          name: "GitHub",
          url: "https://github.com/Kyworn",
          icon: "GitHubIcon",
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/zidm/",
          icon: "LinkedInIcon",
        },
      ],
    },
    // Outils que j'utilise vraiment
    aiTools: [
      {
        name: "Claude Code",
        type: "CLI",
        usage: "Orchestration principale, architecture & refactoring"
      },
      {
        name: "Gemini CLI",
        type: "CLI",
        usage: "Recherche rapide, analyse de données, scripting"
      },
      {
        name: "Local Models (Ollama)",
        type: "Local",
        models: ["Mistral", "CodeLlama", "DeepSeek"],
        usage: "Analyses sensibles, offline, tâches spécialisées"
      },
      {
        name: "Ghidra + AI Scripting",
        type: "Hybrid",
        usage: "Reverse engineering automatisé via scripts générés"
      }
    ],
    education: [
      {
        school: "Simplon.co",
        degree: "Formation en Développement Web",
        start: "2016",
        end: "2017",
      },
      {
        school: "Lycée Polyvalent Frédéric Faÿs",
        degree: "Baccalauréat en Chaudronnerie",
        start: "2014",
        end: "2015",
      },
    ],
    work: [
      {
        company: "Apple",
        link: "https://www.apple.com/",
        badges: ["On-site"],
        title: "Technical Specialist",
        start: "2019",
        end: "Present",
        description: "Résolution de problèmes complexes et support technique avancé.",
      },
      {
        company: "Freelance",
        link: "",
        badges: ["Remote"],
        title: "Développeur Web",
        start: "2017",
        end: "2018",
        description: "Développement sur mesure.",
      },
    ],
    skills: [
      "AI Orchestration",
      "Prompt Engineering avancé",
      "Rapid Prototyping",
      "Audit & Security (AI-Driven)",
      "Infrastructure as Code",
      "Reverse Engineering",
    ],
    // Tech que les IA utilisent sous ma direction
    techStack: [
      "Python", "TypeScript", "React", "Next.js",
      "Docker", "Proxmox", "Linux", "Ghidra"
    ],
    projects: [
      {
          id: 'hubeau-data-viz',
          title: 'HUBEAU-OPEN-DATA',
          category: 'Data Visualisation',
          link: "https://github.com/Kyworn/HUBEAU",
          img: '/images/hubeau.svg',
          aiTools: ['Gemini CLI', 'Claude Code'],
          ProjectHeader: {
              title: 'Visualisation Qualité de l\'Eau',
              publishDate: 'Septembre 2025',
              tags: 'Data / API / Public',
          },
          technologies: ["JavaScript", "Python", "API REST", "Chart.js"],
          description: "Transformation de données brutes gouvernementales en dashboard interactif. Gemini CLI a généré les scripts de parsing massif. Claude Code a structuré l\'architecture frontend. Prototypé et déployé en < 24h.",
      },
      {
        id: 'transit-tcl-live',
        title: 'TRANSIT-TCL-LIVE',
        category: 'Real-Time App',
        link: "https://github.com/Kyworn/LYON-TRANSIT-VIEWER",
                  img: '/images/tcl.png',        aiTools: ['Claude Code'],
        ProjectHeader: {
            title: 'Suivi Transports Lyon',
            publishDate: 'Novembre 2025',
            tags: 'Full-Stack / Real-Time',
        },
        technologies: ["React", "TypeScript", "Node.js", "Mapbox", "API TCL"],
        description: "Architecture réactive pour le suivi temps réel des bus/métros lyonnais. J\'ai défini la logique métier et l\'UX ; Claude Code a généré 100% de l\'implémentation technique (Backend Node.js + Frontend React). Audit de performance réalisé par IA.",
      },
      {
        id: 'wow-research-335a',
        title: 'WOW-RESEARCH-335A',
        category: 'Security Research',
        link: "https://github.com/Kyworn/WOW-335A-SECURITY-RESEARCH",
        img: '/images/wow-security.svg',
        aiTools: ['Local LLM (Mistral)', 'Ghidra'],
        ProjectHeader: {
            title: 'Analyse Client de Jeu',
            publishDate: 'Novembre 2025',
            tags: 'Reverse Engineering / C++',
        },
        technologies: ["Ghidra", "C++", "Python", "Cryptography"],
        description: "Workflow de reverse engineering hybride. J\'utilise des modèles locaux pour analyser des fonctions décompilées par Ghidra et identifier des failles logiques. Automatisation via scripts Python générés à la volée.",
      },
      {
        id: 'homelab-infra-ai',
        title: 'HOMELAB-INFRA-AI',
        category: 'Infrastructure',
        link: "https://github.com/Kyworn/HOMELAB-SHOWCASE",
        img: '/images/homelab.svg',
        aiTools: ['Claude Code', 'Bash'],
        ProjectHeader: {
            title: 'Infrastructure Auto-Hébergée',
            publishDate: '2025',
            tags: 'DevOps / Proxmox',
        },
        technologies: ["Proxmox", "TrueNAS", "Docker", "Cloudflare Zero Trust"],
        description: "Orchestration complète d\'un homelab (Proxmox/TrueNAS). Utilisation de l\'IA pour générer les configurations réseau complexes, les règles de pare-feu et les scripts de maintenance automatisée.",
      },
      {
        id: 'azeroth-admin',
        title: 'AZEROTH-ADMIN',
        category: 'Full-Stack',
        link: "https://github.com/Kyworn/AZEROTH-ADMIN-PANEL",
                  img: '/images/wowadminpanel.png',        aiTools: ['Claude Code', 'Gemini CLI'],
        ProjectHeader: {
            title: 'Panel Admin Serveur',
            publishDate: 'Octobre 2025',
            tags: 'Flask / Security',
        },
        technologies: ["Python", "Flask", "MySQL", "SRP6 Auth"],
        description: "Développement d'un panel d'administration sécurisé. Implémentation du protocole SRP6 via IA sous supervision stricte pour éviter les failles d'auth standard.",
      },
      {
        id: 'asus-x13-scripts',
        title: 'ASUS-X13-OPTIMIZER',
        category: 'Hardware Automation',
        link: 'https://github.com/Kyworn/ASUS-X13-SCRIPTS',
        img: '/images/asus-scripts.svg',
        aiTools: ['Bash', 'Gemini'],
        ProjectHeader: {
            title: 'Optimisation Power/GPU',
            publishDate: '2025',
            tags: 'Shell / Hardware',
        },
        technologies: ['Bash', 'Linux Kernel', 'ACPI'],
        description: "Scripts d'automatisation pour la gestion fine de l'alimentation et du GPU switching sur laptop ASUS ROG. Générés via IA pour optimiser l'autonomie sous Linux.",
      },
      {
        id: 'asus-debian-tools',
        title: 'DEBIAN-ASUS-TOOLS',
        category: 'System Administration',
        link: 'https://github.com/Kyworn/ASUS-DEBIAN-TOOLS',
        img: '/images/asus-tools.svg',
        aiTools: ['Claude Code'],
        ProjectHeader: {
            title: 'Setup Automatisé Debian',
            publishDate: '2025',
            tags: 'DevOps / Debian',
        },
        technologies: ['Bash', 'APT', 'DKMS'],
        description: "Suite d'outils pour automatiser l'installation et la configuration des drivers ASUS (rog-core) sur Debian 13. Scripting robuste généré et testé par IA.",
      },
      {
        id: 'thermal-dash',
        title: 'THERMAL-DASH',
        category: 'Hardware Monitoring',
        link: 'https://github.com/Kyworn/THERMAL-DASH',
        img: '/images/thermal-dash.svg',
        aiTools: ['Python', 'Gemini'],
        ProjectHeader: {
            title: 'Dashboard Thermique',
            publishDate: '2024',
            tags: 'Python / Data',
        },
        technologies: ['Python', 'Matplotlib', 'Sensors'],
        description: "Dashboard de surveillance thermique temps réel. L'IA a généré le parsing des sensors Linux et la visualisation graphique des données.",
      },
      {
        id: 'taptracker',
        title: 'TAPTRACKER',
        category: 'Web Application',
        link: 'https://github.com/Kyworn/TAPTRACKER',
        img: '/images/taptracker.svg',
        aiTools: ['Gemini CLI'],
        ProjectHeader: {
            title: 'Compteur Interactif',
            publishDate: '2024',
            tags: 'JS / Frontend',
        },
        technologies: ['JavaScript', 'Local Storage'],
        description: "Application web minimaliste de tracking d'événements. Prototypage ultra-rapide d'une idée simple grâce à l'IA.",
      },
    ],
};
