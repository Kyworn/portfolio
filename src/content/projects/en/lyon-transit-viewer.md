---
title: Lyon Transit Viewer
description: Real-time viewer for Lyon's TCL transit network with multimodal trip planning, built on a Rust/SpacetimeDB backend and React/MapLibre frontend.
category: web-apps
featured: true
repo: https://github.com/Kyworn/lyon-transit-viewer
tech: [React, TypeScript, Mapbox]
order: 1
---
<!-- DRAFT: needs author review -->
## Why

TCL (Lyon's transit network) lacks a fast, real-time multimodal trip viewer. This ingests TCL/GrandLyon static and realtime GTFS feeds into SpacetimeDB and serves live vehicle positions plus journey planning through a React/MapLibre frontend.

## Results

A Rust SpacetimeDB module handles ingestion (static, realtime, GTFS) and journey calculation as stored procedures; the frontend subscribes over WebSocket for live updates on a MapLibre GL map using keyless CARTO tiles. Deployment docs (local setup, VPS deploy, operations runbook) and a legacy Node/Postgres implementation are included in the repo.

## Quickstart

```bash
git clone https://github.com/Kyworn/lyon-transit-viewer.git
cd lyon-transit-viewer
spacetime start --listen-addr 127.0.0.1:3000
spacetime publish --server local --module-path spacetimedb/spacetimedb --yes lyon-transit
cd frontend && npm install && npm run build
python3 -m http.server 3001 --bind 127.0.0.1 -d build
# In another terminal, start the ingest daemon for live data:
./scripts/ingest_daemon.sh
```
