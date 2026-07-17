---
title: gnr-smu
description: Reverse-engineered SMU register map and telemetry tools for AMD Granite Ridge (Zen 5), targeting the Ryzen 7 9800X3D on Linux.
category: linux-hardware
featured: true
repo: https://github.com/Kyworn/gnr-smu
tech: [C, Linux kernel]
order: 1
---
<!-- DRAFT: needs author review -->
## Why

The Ryzen 7 9800X3D's SMU register layout and PM telemetry table aren't publicly documented, and the `ryzen_smu` Linux driver exposes only the raw table — no vendor tool decodes it for tuning or monitoring. This project reverse-engineers the register offsets and the telemetry layout so they're usable from Linux.

## Results

Mapped the TDC limit to offset `0x3D` (correcting an earlier assumption of `0x3C` carried over from Zen 4) and the EDC limit to `0x3C`; confirmed the Curve Optimizer parameter is write-only. Fully mapped the `0x724`-byte PM telemetry table (457 float32 values) — FCLK/UCLK/MCLK, iGPU telemetry, per-core C-state residency, cache temperatures, per-core IDD, and energy accumulators — each documented with a confidence level. Real-time access is exposed at `/sys/kernel/ryzen_smu_drv/pm_table`.

## Quickstart

```bash
# CLI: read/write hardware register boundaries
sudo python3 tools/gnr_master.py

# GUI: PyQt6 real-time telemetry dashboard
sudo python3 tools/gui/gnr_master.py
```
