---
title: asus-debian-tools
description: Script d'installation automatisé pour supergfxctl et asusctl sur Debian 13, apportant le switch GPU et le contrôle complet des portables ASUS ROG/TUF à Debian.
category: linux-hardware
featured: true
repo: https://github.com/Kyworn/asus-debian-tools
tech: [Bash, Debian]
order: 2
---
<!-- DRAFT: needs author review -->
## Pourquoi

`supergfxctl` et `asusctl` — les daemons standards de switch GPU et de contrôle du matériel ASUS — ne sont pas packagés pour Debian. Ce script automatise leur compilation et leur installation, pour que les propriétaires de portables ASUS ROG/TUF/Zephyrus sous Debian 13 (Trixie) récupèrent le switch de mode GPU, les courbes de ventilateurs, les profils de performance, le contrôle du clavier RGB et les limites de charge batterie sans avoir à tout compiler à la main.

## Résultats

Installe les prérequis et la toolchain Rust, compile `supergfxctl` depuis les sources et active `supergfxd`, puis installe `asusctl`/`rog-control-center` via un PPA expérimental et redémarre `asusd`. Testé sur l'ASUS Flow X13 ; devrait fonctionner sur d'autres portables gaming ASUS avec du matériel compatible. Nécessite Debian 13+, un noyau 6.1+, et les droits root.

## Démarrage rapide

```bash
wget https://raw.githubusercontent.com/Kyworn/asus-debian-tools/main/asus_debian/install.sh
chmod +x install.sh
sudo ./install.sh
sudo reboot
```
