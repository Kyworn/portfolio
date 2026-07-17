---
title: asus-debian-tools
description: Automated install script for supergfxctl and asusctl on Debian 13, bringing GPU switching and full ASUS ROG/TUF laptop control to Debian.
category: linux-hardware
featured: true
repo: https://github.com/Kyworn/asus-debian-tools
tech: [Bash, Debian]
order: 2
---
<!-- DRAFT: needs author review -->
## Why

`supergfxctl` and `asusctl` — the standard GPU-switching and ASUS hardware control daemons — aren't packaged for Debian. This script automates building and installing both, so ASUS ROG/TUF/Zephyrus laptop owners on Debian 13 (Trixie) get GPU mode switching, fan curves, performance profiles, RGB keyboard control, and battery charge limits without hand-rolling the build.

## Results

Installs prerequisites and the Rust toolchain, builds `supergfxctl` from source and enables `supergfxd`, then installs `asusctl`/`rog-control-center` via an experimental PPA and restarts `asusd`. Tested on the ASUS Flow X13; should work on other ASUS gaming laptops with compatible hardware. Requires Debian 13+, kernel 6.1+, and root.

## Quickstart

```bash
wget https://raw.githubusercontent.com/Kyworn/asus-debian-tools/main/asus_debian/install.sh
chmod +x install.sh
sudo ./install.sh
sudo reboot
```
