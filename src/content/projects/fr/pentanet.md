---
title: PentaNet
description: Quantization pentanaire native {-2,-1,0,+1,+2} pour LLM — −6,4% de perplexité vs BitNet à 124M de paramètres, tout en préservant l'arithmétique sans multiplicateur.
category: ai-research
featured: true
repo: https://github.com/Kyworn/PentaNet-v1.0
tech: [PyTorch, Triton, AVX2]
order: 1
links:
  - { label: Paper, url: "https://github.com/Kyworn/PentaNet-v1.0/blob/main/paper/PentaNet_Technical_Report.pdf" }
  - { label: Model (HF), url: "https://huggingface.co/Kyworn/pentanet-124m" }
---
<!-- DRAFT: needs author review -->
## Pourquoi

BitNet a montré que des poids ternaires {-1,0,+1} peuvent entraîner des LLM sans multiplicateurs. PentaNet pose la question suivante : un cinquième et un sixième niveau aident-ils ? Le projet étend la grille à {-2,-1,0,+1,+2} — ×2 est un simple décalage de bits (bit-shift), donc la propriété zéro-multiplicateur est préservée.

## Résultats

−6,4% de perplexité vs BitNet à 124M de paramètres, 3 seeds, WikiText-103. Courbes d'entraînement complètes et ablations dans le rapport technique.

## Démarrage rapide

```bash
git clone https://github.com/Kyworn/PentaNet-v1.0
cd PentaNet-v1.0 && pip install -r requirements.txt
python train.py --config configs/pentanet_124m.yaml
```
