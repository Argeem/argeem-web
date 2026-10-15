# 🌐 Personal Website — Planning Document

> **เป้าหมาย**: สร้าง Personal Website และ deploy บน Google Cloud Compute ด้วย budget $10/เดือน (Gemini Pro credit)
> **วันที่เริ่มต้น**: 2026-10-14

---

## 📋 สารบัญ

1. [Overview](#1-overview)
2. [Tech Stack](#2-tech-stack)
3. [Architecture](#3-architecture)
4. [Cost Estimation (GCP)](#4-cost-estimation-gcp)
5. [Development Phases](#5-development-phases)
6. [Content Structure](#6-content-structure)
7. [GCP Deployment Plan](#7-gcp-deployment-plan)
8. [Checklist](#8-checklist)

---

## 1. Overview

| รายการ | รายละเอียด |
|---|---|
| **ประเภทเว็บ** | Personal Portfolio / Blog |
| **เป้าหมาย** | แสดงตัวตน, ผลงาน, และบทความ |
| **Cloud Provider** | Google Cloud Platform (GCP) |
| **Budget** | ~$10/เดือน (จาก Gemini Pro credit) |
| **Domain** | TBD (ใช้ IP สาธารณะก่อน หรือ Free domain) |
| **Target Audience** | Recruiter, Developer, ทั่วไป |

---

## 2. Tech Stack

### Frontend
| Layer | Technology | เหตุผล |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSG/SSR, SEO ดี, deploy ง่าย |
| Language | **TypeScript** | Type-safe, maintainable |
| Styling | **Vanilla CSS + CSS Modules** | ควบคุมได้เต็มที่, ไม่มี dependency หนัก |
| Font | **Google Fonts** (Inter / Geist) | สวยงาม, โหลดเร็ว |
| Animation | **CSS Keyframes + Framer Motion** | Micro-animation, smooth UX |
| Icons | **Lucide React** | Lightweight, consistent |
| Markdown | **MDX** | Blog posts with components |

### Backend / Infrastructure
| Layer | Technology | เหตุผล |
|---|---|---|
| Runtime | **Node.js** (via Next.js) | Full-stack ในที่เดียว |
| Server | **Google Compute Engine (e2-micro)** | Free tier + $10 budget พอ |
| Reverse Proxy | **Nginx** | Handle HTTPS, static files |
| SSL | **Let's Encrypt (Certbot)** | ฟรี, auto-renew |
| Process Manager | **PM2** | Keep Node.js alive |
| CI/CD | **GitHub Actions** | Auto deploy เมื่อ push to main |

### Optional / Future
- **Google Cloud Storage** — สำหรับเก็บ images/assets (ราคาถูกมาก)
- **Cloud DNS** — จัดการ domain (ถ้ามี)
- **Cloud Armor** — Basic DDoS protection

---

## 3. Architecture

```
┌─────────────────────────────────────────────────┐
│                   USER BROWSER                  │
└────────────────────┬────────────────────────────┘
                     │ HTTPS (443)
                     ▼
┌─────────────────────────────────────────────────┐
│         Google Compute Engine (e2-micro)        │
│  ┌───────────────────────────────────────────┐  │
│  │              NGINX (Port 80/443)          │  │
│  │         - SSL Termination (Let's Encrypt) │  │
│  │         - Static file serving             │  │
│  │         - Reverse proxy → :3000           │  │
│  └─────────────────────┬─────────────────────┘  │
│                        │                        │
│  ┌─────────────────────▼─────────────────────┐  │
│  │           PM2 + Next.js App (:3000)       │  │
│  │         - SSR / SSG Pages                 │  │
│  │         - API Routes (if needed)          │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                     │
          ┌──────────▼──────────┐
          │    GitHub Repo      │
          │  (Source of Truth)  │
          └──────────┬──────────┘
                     │ GitHub Actions (CI/CD)
                     │ SSH → GCE → pull & rebuild
                     ▼
              Auto Deploy ✅
```

---

## 4. Cost Estimation (GCP)

> Budget: **$10 USD / เดือน**

| Service | Spec | ราคาประมาณ/เดือน |
|---|---|---|
| **Compute Engine** | e2-micro (2 vCPU, 1 GB RAM) | ~$6.11 |
| **Persistent Disk** | 10 GB Standard | ~$0.40 |
| **Egress Traffic** | ~10 GB outbound | ~$1.20 |
| **Static IP** | 1 External IP | ~$1.46 |
| **Cloud Storage** (optional) | 5 GB | ~$0.10 |
| **รวมประมาณ** | | **~$9.27** |

> ✅ อยู่ในงบ $10/เดือน
>
> 💡 **หมายเหตุ**: e2-micro อยู่ใน GCP Free Tier (us-central1, us-east1, us-west1) ได้ **1 instance ฟรี** แต่ Static IP จะเสียค่าใช้จ่ายเมื่อ VM รัน

---

## 5. Development Phases

### Phase 1 — Setup & Foundation (Week 1)
- [x] สร้าง Next.js project (`npx create-next-app@latest`)
- [x] กำหนด Design System (colors, typography, spacing)
- [x] สร้าง layout หลัก (Navbar, Footer)
- [x] Setup TypeScript + ESLint + Prettier
- [ ] Push โค้ดขึ้น GitHub repository

### Phase 2 — Core Pages / Sections (Week 2)
- [x] **Hero Section** — ชื่อ, บทบาท, รูป/snippet, CTA buttons, social links
- [x] **About Section** — ประวัติ, highlight stats, personality
- [x] **Skills & Tech Stack** — Categorized skill badges, icons, proficiency
- [x] **Projects Section** — Featured cards พร้อม live demo & github links
- [x] **GitHub Activity** — Contribution heatmap grid & pinned repositories
- [x] **Blog Section** — Latest 3 posts preview พร้อม reading time & tags
- [x] **Resume / CV Section** — Experience timeline & interactive PDF download
- [x] **Contact Section** — Direct contact cards, email copy button, message form
- [x] Responsive design (mobile / tablet / desktop)

### Phase 3 — Content & Polish (Week 3)
- [x] เพิ่ม animations และ micro-interactions (typing effect, hover cards, pulses)
- [x] Bilingual toggle (TH / EN switch)
- [x] Dark mode toggle (Light default + Dark mode support)
- [x] Production build pass with zero errors (Next.js 16 + Turbopack)
- [ ] SEO optimization (sitemap.xml, robots.txt, dynamic OG image)
- [ ] เขียน blog post ฉบับเต็ม (MDX)
- [ ] Lighthouse audit (Target ≥ 90)

### Phase 4 — GCP Setup & Deploy (Week 4)
- [ ] สร้าง GCP project และเปิดใช้ Billing
- [ ] สร้าง Compute Engine VM (e2-micro)
- [ ] ติดตั้ง Node.js, Nginx, PM2, Certbot บน VM
- [ ] Configure Nginx reverse proxy
- [ ] Setup SSL certificate (Let's Encrypt)
- [ ] Setup GitHub Actions CI/CD
- [ ] ทดสอบ deployment end-to-end
- [ ] (Optional) เชื่อม Custom Domain

### Phase 5 — Monitoring & Maintenance (Ongoing)
- [ ] Setup GCP Cloud Monitoring alerts
- [ ] Log rotation สำหรับ Nginx และ PM2
- [ ] Schedule SSL auto-renewal
- [ ] Regular content updates

---

## 6. Content Structure

```
Personal Website
├── Home
│   ├── Hero (ชื่อ, บทบาท, CTA)
│   ├── Featured Projects (3 โปรเจกต์)
│   └── Latest Blog Posts (3 บทความ)
│
├── About
│   ├── Bio & Photo
│   ├── Skills (Frontend, Backend, Tools)
│   └── Experience Timeline
│
├── Projects
│   ├── Project Card (ชื่อ, รูป, tech stack, links)
│   └── Filter by category
│
├── Blog
│   ├── Post List (title, date, tags, excerpt)
│   └── Individual Post (MDX)
│
└── Contact
    ├── Social Links (GitHub, LinkedIn, Email)
    └── Contact Form (optional)
```

---

## 7. GCP Deployment Plan

### 7.1 สร้าง VM Instance

```bash
# สร้าง VM ผ่าน gcloud CLI
gcloud compute instances create personal-website \
  --machine-type=e2-micro \
  --zone=us-central1-a \
  --image-family=ubuntu-2204-lts \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=10GB \
  --tags=http-server,https-server
```

### 7.2 Firewall Rules

```bash
# เปิด port 80 และ 443
gcloud compute firewall-rules create allow-http \
  --allow=tcp:80 --target-tags=http-server

gcloud compute firewall-rules create allow-https \
  --allow=tcp:443 --target-tags=https-server
```

### 7.3 ติดตั้ง Dependencies บน VM

```bash
# Update & install Node.js 20
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx git

# Install PM2 globally
sudo npm install -g pm2
```

### 7.4 Nginx Config

```nginx
# /etc/nginx/sites-available/personal-website
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/personal-website /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7.5 SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal (จะ setup อัตโนมัติ แต่ verify ได้ด้วย)
sudo systemctl enable certbot.timer
sudo systemctl status certbot.timer
```

### 7.6 Clone & Run App

```bash
git clone https://github.com/YOUR_USERNAME/personal-website.git ~/personal-website
cd ~/personal-website
npm install
npm run build

# Start with PM2
pm2 start npm --name "website" -- start
pm2 startup       # สร้าง startup script
pm2 save          # บันทึก process list
```

### 7.7 GitHub Actions CI/CD

```yaml
# .github/workflows/deploy.yml
name: Deploy to GCE

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.GCE_HOST }}       # External IP ของ VM
          username: ${{ secrets.GCE_USER }}   # ชื่อ user บน VM
          key: ${{ secrets.GCE_SSH_KEY }}     # Private key (RSA)
          script: |
            cd ~/personal-website
            git pull origin main
            npm install --production
            npm run build
            pm2 restart website
```

> **GitHub Secrets ที่ต้องตั้งค่า:**
> - `GCE_HOST` — External IP address ของ VM
> - `GCE_USER` — Username (เช่น `ubuntu` หรือ username ของ GCP account)
> - `GCE_SSH_KEY` — Private SSH key (สร้างด้วย `ssh-keygen`, ใส่ public key ใน VM)

---

## 8. Checklist

### Pre-Development
- [ ] กำหนด domain name (ซื้อหรือใช้ free subdomain เช่น `*.nip.io`)
- [ ] สร้าง GitHub repository (public หรือ private)
- [ ] เข้าสู่ระบบ GCP และตรวจสอบ credit $10
- [ ] กำหนด design direction (color palette, font, mood)
- [ ] เตรียม content (bio, photo, project descriptions)

### Development
- [ ] Next.js project setup สำเร็จ
- [ ] ทุก page ทำงานได้บน `localhost:3000`
- [ ] Responsive บน mobile / tablet / desktop
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO = 100
- [ ] Lighthouse Accessibility ≥ 90
- [ ] ไม่มี console errors

### Deployment
- [ ] GCE VM รันอยู่
- [ ] Nginx configured และทำงานถูกต้อง
- [ ] SSL certificate ใช้งานได้ (HTTPS ✅)
- [ ] GitHub Actions deploy สำเร็จ (`main` → VM)
- [ ] Website accessible จาก public internet
- [ ] ตรวจสอบ cost ไม่เกิน $10/เดือน ใน GCP Console

---

## 📌 Decisions

> การตัดสินใจทั้งหมดถูกย้ายไปที่ไฟล์แยก → ดูที่ **[DECISION_LOG.md](./DECISION_LOG.md)**

---

*Last updated: 2026-10-14 | Author: sitth*
