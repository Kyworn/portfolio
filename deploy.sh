#!/usr/bin/env bash
# Deploy portfolio v2 to LXC 121 on pve (192.168.1.61)
set -euo pipefail
BRANCH="${1:-v2}"
ssh root@192.168.1.61 "pct exec 121 -- bash -c '
  set -euo pipefail
  cd /portfolio
  git fetch origin && git checkout $BRANCH && git pull origin $BRANCH
  docker compose up -d --build
'"
echo "Deployed. Smoke test:"
for path in / /fr/ /about/ /projects/pentanet/ /fr/projects/pentanet/; do
  code=$(curl -s -o /dev/null -w '%{http_code}' "https://zorko.xyz$path")
  echo "$code $path"
done
