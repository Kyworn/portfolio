---
title: ZorkoLab
description: Zero-Trust home lab — Proxmox + TrueNAS + Cloudflare Tunnel infrastructure with VLAN isolation, 30+ self-hosted services, and GPU passthrough for local LLM inference.
category: selfhosted-infra
featured: true
repo: https://github.com/Kyworn/ZorkoLab
tech: [Proxmox, TrueNAS, Cloudflare]
order: 1
---
<!-- DRAFT: needs author review -->
## Why

Running 30+ self-hosted services at home without exposing any inbound port meant designing for Zero-Trust from the start: a hyperconverged split between compute (Proxmox) and storage (TrueNAS), with services isolated by function across VLANs and all external access routed through a Cloudflare Tunnel.

## Results

10 Gbps FTTH down / 900 Mbps up, 11 active unprivileged LXC containers running 24/7, a 661/932 GB ZFS mirror, and two NVIDIA Quadro P5000s passed through to a dedicated VLAN for local llama.cpp inference. Hardening includes CrowdSec + Fail2Ban, strict `rp_filter`, no privileged containers, and zero open inbound ports — all traffic enters via the Cloudflare Tunnel and is routed internally by Nginx Proxy Manager.

## Quickstart

This is infrastructure documentation, not a deployable package — there's no single install command. See the repo's `architecture/`, `hardware/`, and `security/` docs for the Proxmox/TrueNAS/VLAN/Cloudflare setup in detail.
