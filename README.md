# Portfolio - Infrastructure & SysAdmin

> "L'IA ne remplace pas la rigueur technique, elle accélère la sécurisation et l'automatisation de l'infrastructure."

Ce portfolio est plus qu'une simple vitrine web : c'est une démonstration opérationnelle. **Auto-hébergé** sur mon propre cluster Proxmox, il illustre mon approche du métier d'Administrateur Système : pragmatisme, "bonne méfiance" et automatisation intelligente.

## 🚀 En ligne

**[https://zorko.xyz](https://zorko.xyz)**
*(Accessibilité garantie via Cloudflare Zero Trust Tunnel)*

## 🏗 Architecture & Hébergement

Ce projet n'est pas hébergé sur Vercel ou Netlify, mais sur mon infrastructure personnelle pour garder la maîtrise des données et du flux.

- **Hyperviseur :** Proxmox VE (Cluster local)
- **Conteneurisation :** Docker (Image optimisée multi-stage)
- **OS Hôte :** Debian 12 (Bookworm)
- **Réseau :** Cloudflare Zero Trust (Sécurisation sans ouverture de port critique)

## 🛠 Stack Technique

- **Frontend :** Next.js, Tailwind CSS (Pour la performance et le SEO)
- **Design :** Interface type "Ops Dashboard" / Bento Grid
- **Orchestration :** Scripts de déploiement assistés par IA (Claude Code / Gemini CLI) pour valider la robustesse du code avant la mise en prod.

## 📦 Déploiement Local

Le projet est entièrement conteneurisé pour être agnostique de l'infrastructure.

```bash
# 1. Cloner le repo
git clone [https://github.com/Kyworn/portfolio.git](https://github.com/Kyworn/portfolio.git)
# 2. Crée ke network 
docker network create zorko-net

# 3. Lancer le conteneur (Build optimisé)
docker compose up -d --build

# 4. Vérifier les logs
docker compose logs -f
