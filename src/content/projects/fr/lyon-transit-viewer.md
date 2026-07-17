---
title: Lyon Transit Viewer
description: Visualiseur temps réel du réseau TCL de Lyon avec calcul d'itinéraire multimodal, sur un backend Rust/SpacetimeDB et un frontend React/MapLibre.
category: web-apps
featured: true
repo: https://github.com/Kyworn/lyon-transit-viewer
tech: [React, TypeScript, Mapbox]
order: 1
---
<!-- DRAFT: needs author review -->
## Pourquoi

Le TCL (réseau de transport de Lyon) manque d'un visualiseur d'itinéraire multimodal rapide et temps réel. Ce projet ingère les flux GTFS statiques et temps réel du TCL/GrandLyon dans SpacetimeDB et diffuse les positions des véhicules en direct ainsi que le calcul d'itinéraire via un frontend React/MapLibre.

## Résultats

Un module Rust SpacetimeDB gère l'ingestion (statique, temps réel, GTFS) et le calcul d'itinéraire sous forme de procédures stockées ; le frontend s'abonne en WebSocket pour les mises à jour en direct sur une carte MapLibre GL utilisant des tuiles CARTO sans clé. La documentation de déploiement (setup local, déploiement VPS, runbook d'exploitation) et une implémentation legacy Node/Postgres sont incluses dans le dépôt.

## Démarrage rapide

```bash
git clone https://github.com/Kyworn/lyon-transit-viewer.git
cd lyon-transit-viewer
spacetime start --listen-addr 127.0.0.1:3000
spacetime publish --server local --module-path spacetimedb/spacetimedb --yes lyon-transit
cd frontend && npm install && npm run build
python3 -m http.server 3001 --bind 127.0.0.1 -d build
# Dans un autre terminal, démarrer le daemon d'ingestion pour les données live :
./scripts/ingest_daemon.sh
```
