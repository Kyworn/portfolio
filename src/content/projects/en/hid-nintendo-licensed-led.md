---
title: hid-nintendo-licensed-led
description: Automatic player LED assignment (P1-P4) for Nintendo-licensed Bluetooth controllers on Linux, triggered by a udev rule.
category: linux-hardware
featured: true
repo: https://github.com/Kyworn/hid-nintendo-licensed-led
tech: [C, Linux kernel]
order: 3
---
<!-- DRAFT: needs author review -->
## Why

Nintendo-licensed Bluetooth controllers (Turtle Beach Rematch, PDP Faceoff Deluxe, etc.) don't get automatic per-player LED assignment on Linux the way they do on a real Switch. This closes that gap with a udev rule that fires the Nintendo Switch HID LED command on connection.

## Results

Player LED is set automatically by connection order (P1-P4), concurrent connections are handled safely via `flock`, and a CLI (`procon-led`) allows manual override. Confirmed working on the Turtle Beach Rematch (Donkey Kong edition) and reported working on the PDP Faceoff Deluxe, both vendor ID `0E6F`; any controller with that vendor ID using the Switch HID protocol should work out of the box.

## Quickstart

```bash
yay -S hid-nintendo-licensed-led
# or manual:
git clone https://github.com/Kyworn/hid-nintendo-licensed-led.git
cd hid-nintendo-licensed-led
sudo install -Dm755 procon-led /usr/bin/procon-led
sudo install -Dm644 99-nintendo-licensed-led.rules /usr/lib/udev/rules.d/99-nintendo-licensed-led.rules
```
