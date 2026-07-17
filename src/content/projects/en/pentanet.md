---
title: PentaNet
description: Native pentanary {-2,-1,0,+1,+2} quantization for LLMs — −6.4% perplexity vs BitNet at 124M params while preserving zero-multiplier arithmetic.
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
## Why

BitNet showed ternary weights {-1,0,+1} can train LLMs without multipliers. PentaNet asks: does a fifth and sixth level help? It extends the grid to {-2,-1,0,+1,+2} — ×2 is a bit-shift, so the zero-multiplier property survives.

## Results

−6.4% perplexity vs BitNet at 124M params, 3 seeds, WikiText-103. Full training curves and ablations in the technical report.

## Quickstart

```bash
git clone https://github.com/Kyworn/PentaNet-v1.0
cd PentaNet-v1.0 && pip install -r requirements.txt
python train.py --config configs/pentanet_124m.yaml
```
