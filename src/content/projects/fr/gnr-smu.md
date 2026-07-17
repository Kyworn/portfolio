---
title: gnr-smu
description: Cartographie rétro-ingénierée des registres SMU et outils de télémétrie pour l'AMD Granite Ridge (Zen 5), ciblant le Ryzen 7 9800X3D sous Linux.
category: linux-hardware
featured: true
repo: https://github.com/Kyworn/gnr-smu
tech: [C, Linux kernel]
order: 1
---
<!-- DRAFT: needs author review -->
## Pourquoi

La disposition des registres SMU et la table de télémétrie PM du Ryzen 7 9800X3D ne sont pas documentées publiquement, et le driver Linux `ryzen_smu` n'expose que la table brute — aucun outil constructeur ne la décode pour le tuning ou le monitoring. Ce projet fait de la rétro-ingénierie sur les offsets de registres et la disposition de la télémétrie pour les rendre exploitables depuis Linux.

## Résultats

Cartographie de la limite TDC à l'offset `0x3D` (corrigeant une hypothèse antérieure de `0x3C` reprise de Zen 4) et de la limite EDC à `0x3C` ; confirmation que le paramètre Curve Optimizer est en écriture seule. Table de télémétrie PM de `0x724` octets entièrement cartographiée (457 valeurs float32) — FCLK/UCLK/MCLK, télémétrie iGPU, résidence C-state par cœur, températures de cache, IDD par cœur, et accumulateurs d'énergie — chacune documentée avec un niveau de confiance. L'accès temps réel est exposé sur `/sys/kernel/ryzen_smu_drv/pm_table`.

## Démarrage rapide

```bash
# CLI : lecture/écriture des limites de registres matériels
sudo python3 tools/gnr_master.py

# GUI : tableau de bord télémétrie temps réel en PyQt6
sudo python3 tools/gui/gnr_master.py
```
