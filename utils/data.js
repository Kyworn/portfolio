update // @ts-check
import { v4 as uuidv4 } from 'uuid';

export const RESUME_DATA = {
    name: "Idriss Messaoud",
    initials: "IM",
    location: "Villeurbanne, France",
    locationLink: "https://www.google.com/maps/place/Villeurbanne",
    about: "Administrateur Système N2/N3",
    tagline: "Infrastructure. Résilience. Virtualisation.",
    summary: `Je ne suis pas un visionnaire déconnecté, je suis un garant de la stabilité.

Mon but ? Utiliser la rigueur technique et les outils modernes (IA, Automatisation) pour construire des infrastructures Proxmox & Debian résilientes.

Là où d'autres voient des serveurs, je vois un système vivant qu'il faut protéger et optimiser avec une "bonne méfiance". Je pilote des IA non pas pour rêver, mais pour scripter plus vite, analyser les logs plus efficacement et anticiper les pannes avant qu'elles n'impactent les utilisateurs.

Aujourd'hui, je cherche à mettre cette polyvalence (Hardware, Système, Humain) au service d'une équipe technique exigeante.`,
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
        usage: "Orchestration principale, refactoring de scripts & infra"
      },
      {
        name: "Gemini CLI",
        type: "CLI",
        usage: "Analyse de logs, documentation & scripting rapide"
      },
      {
        name: "Local Models (Ollama)",
        type: "Local",
        models: ["Mistral", "CodeLlama", "DeepSeek"],
        usage: "Analyses offline & tâches sensibles"
      },
      {
        name: "Ghidra + AI Scripting",
        type: "Hybrid",
        usage: "Reverse engineering & Audit de sécurité"
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
        degree: "Baccalauréat en Chaudronnerie (Rigueur Industrielle)",
        start: "2014",
        end: "2015",
      },
    ],
    work: [
      {
        company: "Apple",
        link: "https://www.apple.com/",
        badges: ["On-site"],
        title: "Technical Specialist (N2/N3)",
        start: "2019",
        end: "Present",
        description: "Support technique avancé et gestion de crise. Diagnostic matériel/logiciel critique, accompagnement VIP et maintien d'un NPS élevé (~90) grâce à une méthodologie de résolution rigoureuse.",
      },
      {
        company: "Freelance",
        link: "",
        badges: ["Remote"],
        title: "Développeur & Intégrateur Web",
        start: "2017",
        end: "2018",
        description: "Développement sur mesure et maintenance de serveurs web.",
      },
    ],
    skills: [
      "Linux Administration (Debian)",
      "Virtualisation (Proxmox/LXC)",
      "Bash Scripting & Automation",
      "Docker & Containerization",
      "Network Security & Monitoring",
      "Reverse Engineering (Security)",
    ],
    // Tech que les IA utilisent sous ma direction
    techStack: [
      "Debian", "Proxmox", "Docker", "Bash",
      "Python", "Ghidra", "TypeScript", "Next.js"
    ],
    projects: [
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
            tags: 'DevOps / Proxmox / LXC',
        },
        technologies: ["Proxmox", "TrueNAS", "Docker", "Cloudflare Zero Trust"],
        description: "Orchestration complète d'un homelab (Proxmox/TrueNAS). Utilisation de l'IA pour générer les configurations réseau complexes (VLANs), les règles de pare-feu et les scripts de maintenance automatisée.",
      },
      {
        id: 'asus-debian-tools',
        title: 'DEBIAN-ASUS-TOOLS',
        category: 'System Administration',
        link: 'https://github.com/Kyworn/ASUS-DEBIAN-TOOLS',
        img: '/images/asus-tools.svg',
        aiTools: ['Claude Code', 'Bash'],
        ProjectHeader: {
            title: 'Setup Automatisé Debian',
            publishDate: '2025',
            tags: 'Scripting / Kernel / DKMS',
        },
        technologies: ['Bash', 'APT', 'DKMS', 'Systemd'],
        description: "Suite d'outils pour automatiser l'installation et la configuration des drivers ASUS (rog-core) sur Debian 13. Scripting robuste généré et testé pour assurer la stabilité du Kernel.",
      },
      {
        id: 'wow-research-335a',
        title: 'WOW-RESEARCH-335A',
        category: 'Security Research',
        link: "
