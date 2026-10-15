#!/bin/bash
# =============================================================================
# deploy.sh
# Script สำหรับ deploy ด้วยตนเอง (manual deploy) บน VM
# Usage: bash deploy.sh
# =============================================================================

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${GREEN}[✔]${NC} $1"; }
info() { echo -e "${BLUE}[➜]${NC} $1"; }

APP_DIR="$HOME/argeem-web"

echo ""
echo "🚀 Manual Deploy — argeem-web"
echo "─────────────────────────────"

info "Pulling latest code from GitHub..."
cd "$APP_DIR"
git pull origin main

info "Installing dependencies..."
cd app
npm ci --omit=dev

info "Building Next.js app..."
npm run build

info "Restarting PM2..."
pm2 restart argeem-web --update-env

log "Deploy complete!"
echo ""
pm2 status argeem-web
