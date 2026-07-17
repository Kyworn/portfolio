---
title: ShiftQuant
description: Analyzing the limits of shift-based post-training quantization for LLMs — powers-of-two weight grids {−4,−2,−1,0,+1,+2,+4} for multiply-free inference.
category: ai-research
featured: true
repo: https://github.com/Kyworn/ShiftQuant
tech: [PyTorch]
order: 2
links:
  - { label: Paper, url: "https://github.com/Kyworn/ShiftQuant/blob/main/paper/shiftquant.pdf" }
---
<!-- DRAFT: needs author review -->
## Why

BitNet showed ternary weights train fine without multipliers. ShiftQuant asks the inverse question for post-training quantization: how far can a shift-based (powers-of-two) grid be pushed before it stops paying off? Shift weights restrict values to exact powers of two, so inference becomes bit-shifts instead of multiplies.

## Results

On Qwen2-1.5B / WikiText-103 (RTX 5080): FP16 baseline PPL 9.58. Naive shift PTQ (Grid A, block size 32) costs +2.95 PPL (+30.8%). A 9-value uniform grid recovers to +2.03; AWQ alone to +2.30; combined AWQ + 9-value grid reaches +1.48 PPL (50% recovery), and the two improvements are 93.6% orthogonal. No 7-value grid escapes a structural error gap at ±3 — outlier coverage and gap coverage are incompatible at 3-bit precision — and naive weight-MSE scale optimization backfires (+13.6 PPL) by clipping high-magnitude weights.

## Quickstart

```bash
uv sync   # or: pip install -r requirements.txt

# FP16 baseline + Grid A across block sizes
python -m bench.run_benchmark --model Qwen/Qwen2-1.5B

# Full experiment: all grids + AWQ
python -m bench.run_benchmark \
    --model Qwen/Qwen2-1.5B --block-sizes 32 \
    --grids A B C 9v --awq --awq-grids A 9v --calib-samples 30
```
