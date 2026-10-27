#!/usr/bin/env bash
# Обновить копии файлов установки (compose, Caddyfile, шаблон nginx), которые документация показывает целиком.
# Использование: scripts/sync-files.sh [ветка]   — по умолчанию dev
set -euo pipefail
REF="${1:-dev}"
RAW="https://raw.githubusercontent.com/Mrvibecodic/remnawave-subscription-middleware/${REF}/docker"
cd "$(dirname "$0")/../files"
for f in docker-compose.panel.yml docker-compose.standalone.yml docker-compose.standalone-mysql.yml \
         docker-compose.standalone-caddy.yml docker-compose.standalone-caddy-mysql.yml \
         docker-compose.standalone-nginx.yml docker-compose.standalone-nginx-mysql.yml; do
  curl -fsSL "$RAW/$f" -o "$f"
done
curl -fsSL "$RAW/caddy/Caddyfile" -o Caddyfile
curl -fsSL "$RAW/nginx/nginx.conf.template" -o nginx.conf.template
echo "обновлено из ${REF}"
