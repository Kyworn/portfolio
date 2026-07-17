---
title: hid-nintendo-licensed-led
description: Attribution automatique des LED joueur (P1-P4) pour les manettes Bluetooth sous licence Nintendo sur Linux, déclenchée par une règle udev.
category: linux-hardware
featured: true
repo: https://github.com/Kyworn/hid-nintendo-licensed-led
tech: [C, Linux kernel]
order: 3
---
<!-- DRAFT: needs author review -->
## Pourquoi

Les manettes Bluetooth sous licence Nintendo (Turtle Beach Rematch, PDP Faceoff Deluxe, etc.) n'obtiennent pas d'attribution automatique de LED par joueur sur Linux, contrairement à une vraie Switch. Ce projet comble cet écart avec une règle udev qui envoie la commande LED HID Nintendo Switch à la connexion.

## Résultats

La LED joueur est définie automatiquement selon l'ordre de connexion (P1-P4), les connexions concurrentes sont gérées en sécurité via `flock`, et une CLI (`procon-led`) permet une surcharge manuelle. Fonctionnement confirmé sur la Turtle Beach Rematch (édition Donkey Kong) et signalé fonctionnel sur la PDP Faceoff Deluxe, toutes deux avec l'ID vendeur `0E6F` ; toute manette avec cet ID vendeur utilisant le protocole HID Switch devrait fonctionner sans configuration.

## Démarrage rapide

```bash
yay -S hid-nintendo-licensed-led
# ou manuellement :
git clone https://github.com/Kyworn/hid-nintendo-licensed-led.git
cd hid-nintendo-licensed-led
sudo install -Dm755 procon-led /usr/bin/procon-led
sudo install -Dm644 99-nintendo-licensed-led.rules /usr/lib/udev/rules.d/99-nintendo-licensed-led.rules
```
