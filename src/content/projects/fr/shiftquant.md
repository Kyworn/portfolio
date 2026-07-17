---
title: ShiftQuant
description: Analyse des limites de la quantization post-training à base de décalages pour LLM — grilles de poids en puissances de deux {−4,−2,−1,0,+1,+2,+4} pour une inférence sans multiplication.
category: ai-research
featured: true
repo: https://github.com/Kyworn/ShiftQuant
tech: [PyTorch]
order: 2
links:
  - { label: Paper, url: "https://github.com/Kyworn/ShiftQuant/blob/main/paper/shiftquant.pdf" }
---
<!-- DRAFT: needs author review -->
## Pourquoi

BitNet a montré que des poids ternaires s'entraînent bien sans multiplicateurs. ShiftQuant pose la question inverse pour la quantization post-training : jusqu'où peut-on pousser une grille à base de décalages (puissances de deux) avant qu'elle cesse d'être rentable ? Les poids « shift » restreignent les valeurs à des puissances de deux exactes, donc l'inférence devient des décalages de bits plutôt que des multiplications.

## Résultats

Sur Qwen2-1.5B / WikiText-103 (RTX 5080) : baseline FP16 avec une perplexité de 9,58. Le PTQ shift naïf (Grille A, block size 32) coûte +2,95 de perplexité (+30,8%). Une grille uniforme à 9 valeurs récupère jusqu'à +2,03 ; AWQ seul jusqu'à +2,30 ; AWQ + grille à 9 valeurs combinés atteint +1,48 de perplexité (50% de récupération), les deux améliorations étant orthogonales à 93,6%. Aucune grille à 7 valeurs n'échappe à un écart d'erreur structurel à ±3 — la couverture des outliers et la couverture de l'écart sont incompatibles à une précision de 3 bits — et l'optimisation naïve de l'échelle par MSE des poids se retourne contre elle-même (+13,6 de perplexité) en écrêtant les poids de forte amplitude.

## Démarrage rapide

```bash
uv sync   # ou : pip install -r requirements.txt

# Baseline FP16 + Grille A sur différentes tailles de bloc
python -m bench.run_benchmark --model Qwen/Qwen2-1.5B

# Expérience complète : toutes les grilles + AWQ
python -m bench.run_benchmark \
    --model Qwen/Qwen2-1.5B --block-sizes 32 \
    --grids A B C 9v --awq --awq-grids A 9v --calib-samples 30
```
