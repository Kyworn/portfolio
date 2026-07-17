---
title: ZorkoLab
description: Homelab Zero-Trust — infrastructure Proxmox + TrueNAS + Cloudflare Tunnel avec isolation VLAN, 30+ services auto-hébergés, et passthrough GPU pour l'inférence LLM locale.
category: selfhosted-infra
featured: true
repo: https://github.com/Kyworn/ZorkoLab
tech: [Proxmox, TrueNAS, Cloudflare]
order: 1
---
<!-- DRAFT: needs author review -->
## Pourquoi

Faire tourner 30+ services auto-hébergés à la maison sans exposer le moindre port entrant impliquait de penser Zero-Trust dès le départ : une séparation hyperconvergée entre le calcul (Proxmox) et le stockage (TrueNAS), avec des services isolés par fonction à travers des VLAN et tout l'accès externe routé via un Cloudflare Tunnel.

## Résultats

10 Gbps FTTH en descendant / 900 Mbps en montant, 11 conteneurs LXC non privilégiés actifs 24/7, un miroir ZFS de 661/932 Go, et deux NVIDIA Quadro P5000 en passthrough vers un VLAN dédié pour l'inférence llama.cpp locale. Le durcissement inclut CrowdSec + Fail2Ban, un `rp_filter` strict, aucun conteneur privilégié, et zéro port entrant ouvert — tout le trafic entre via le Cloudflare Tunnel et est routé en interne par Nginx Proxy Manager.

## Démarrage rapide

Il s'agit de documentation d'infrastructure, pas d'un package déployable — il n'y a pas de commande d'installation unique. Voir les dossiers `architecture/`, `hardware/` et `security/` du dépôt pour le détail du setup Proxmox/TrueNAS/VLAN/Cloudflare.
