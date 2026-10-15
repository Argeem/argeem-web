#!/bin/bash
# =============================================================================
# server-setup.sh
# รัน script นี้ครั้งแรกบน GCE VM เพื่อ setup ทุกอย่างให้พร้อม
# Usage: bash server-setup.sh
# =============================================================================

set -e  # หยุดทันทีถ้า command ใดๆ fail

# ── สี สำหรับ output ──────────────────────────────────────────────────────────
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log()  { echo -e "${GREEN}[✔]${NC} $1"; }
info() { echo -e "${BLUE}[➜]${NC} $1"; }
warn() { echo -e "${YELLOW}[!]${NC} $1"; }
err()  { echo -e "${RED}[✘]${NC} $1"; exit 1; }

# ── ตัวแปร ────────────────────────────────────────────────────────────────────
REPO_URL="https://github.com/YOUR_USERNAME/argeem-web.git"  # << แก้ด้วย
APP_DIR="$HOME/argeem-web"
LOG_DIR="$HOME/logs"
NODE_VERSION="20"

# ═════════════════════════════════════════════════════════════════════════════
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║       argeem-web — GCE Server Setup Script          ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# ── 1. System Update ──────────────────────────────────────────────────────────
info "Updating system packages..."
sudo apt-get update -qq
sudo apt-get upgrade -y -qq
log "System packages updated"

# ── 2. Install Node.js 20 ─────────────────────────────────────────────────────
info "Installing Node.js ${NODE_VERSION}..."
if command -v node &>/dev/null; then
    CURRENT_NODE=$(node --version)
    warn "Node.js already installed: ${CURRENT_NODE} (skipping)"
else
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_VERSION}.x" | sudo -E bash -
    sudo apt-get install -y nodejs
    log "Node.js $(node --version) installed"
fi

# ── 3. Install Nginx ──────────────────────────────────────────────────────────
info "Installing Nginx..."
sudo apt-get install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
log "Nginx installed and started"

# ── 4. Install Certbot ────────────────────────────────────────────────────────
info "Installing Certbot (Let's Encrypt)..."
sudo apt-get install -y certbot python3-certbot-nginx
log "Certbot installed"

# ── 5. Install Git ────────────────────────────────────────────────────────────
info "Ensuring Git is installed..."
sudo apt-get install -y git
log "Git $(git --version)"

# ── 6. Install PM2 ───────────────────────────────────────────────────────────
info "Installing PM2 globally..."
sudo npm install -g pm2
log "PM2 $(pm2 --version) installed"

# ── 7. สร้าง log directory ───────────────────────────────────────────────────
info "Creating log directory..."
mkdir -p "$LOG_DIR"
log "Log directory: $LOG_DIR"

# ── 8. Clone Repository ───────────────────────────────────────────────────────
info "Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
    warn "Repository already exists at $APP_DIR, pulling latest..."
    cd "$APP_DIR"
    git pull origin main
else
    git clone "$REPO_URL" "$APP_DIR"
    log "Repository cloned to $APP_DIR"
fi

# ── 9. Install Dependencies & Build ───────────────────────────────────────────
info "Installing Node.js dependencies..."
cd "$APP_DIR/app"
npm ci --omit=dev

info "Building Next.js application..."
npm run build
log "Build complete"

# ── 10. Start PM2 ────────────────────────────────────────────────────────────
info "Starting app with PM2..."
pm2 start ecosystem.config.js

info "Setting up PM2 startup script..."
PM2_STARTUP=$(pm2 startup | grep "sudo" | tail -1)
if [ -n "$PM2_STARTUP" ]; then
    eval "$PM2_STARTUP"
fi
pm2 save
log "PM2 configured with startup"

# ── 11. Nginx Config ─────────────────────────────────────────────────────────
info "Configuring Nginx..."
NGINX_CONF="/etc/nginx/sites-available/argeem-web"

sudo tee "$NGINX_CONF" > /dev/null <<'NGINX'
server {
    listen 80;
    server_name _;  # แก้เป็น domain ของคุณ เมื่อมี domain

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml image/svg+xml;
    gzip_min_length 1024;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Proxy to Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Static files จาก Next.js (cache นาน)
    location /_next/static/ {
        proxy_pass http://localhost:3000;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
NGINX

# Enable site
sudo ln -sf "$NGINX_CONF" /etc/nginx/sites-enabled/argeem-web
sudo rm -f /etc/nginx/sites-enabled/default  # ลบ default site

# Test และ reload
sudo nginx -t && sudo systemctl reload nginx
log "Nginx configured and reloaded"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║              ✅ Setup Complete!                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""
echo " Next steps:"
echo "   1. ตรวจสอบ app:  pm2 status"
echo "   2. ดู logs:      pm2 logs argeem-web"
echo "   3. Setup SSL:    sudo certbot --nginx -d yourdomain.com"
echo ""
