# 🚀 Deployment Guide — argeem-web

> **Target**: Google Compute Engine (e2-micro) + Nginx + PM2 + Let's Encrypt
> **CI/CD**: GitHub Actions → SSH → pull & rebuild
> **Budget**: ~$9.17/เดือน

---

## 📋 สารบัญ

1. [Prerequisites](#1-prerequisites)
2. [ขั้นตอนที่ 1 — สร้าง GCP VM](#2-ขั้นตอนที่-1--สร้าง-gcp-vm)
3. [ขั้นตอนที่ 2 — Setup SSH Keys](#3-ขั้นตอนที่-2--setup-ssh-keys)
4. [ขั้นตอนที่ 3 — Setup Server (ครั้งแรก)](#4-ขั้นตอนที่-3--setup-server-ครั้งแรก)
5. [ขั้นตอนที่ 4 — Setup GitHub Repo & Secrets](#5-ขั้นตอนที่-4--setup-github-repo--secrets)
6. [ขั้นตอนที่ 5 — Setup SSL Certificate](#6-ขั้นตอนที่-5--setup-ssl-certificate)
7. [ขั้นตอนที่ 6 — ทดสอบ CI/CD Pipeline](#7-ขั้นตอนที่-6--ทดสอบ-cicd-pipeline)
8. [ขั้นตอนที่ 7 — Custom Domain (Optional)](#8-ขั้นตอนที่-7--custom-domain-optional)
9. [การ Deploy ด้วยตนเอง (Manual)](#9-การ-deploy-ด้วยตนเอง-manual)
10. [PM2 — คำสั่งที่ใช้บ่อย](#10-pm2--คำสั่งที่ใช้บ่อย)
11. [Nginx — คำสั่งที่ใช้บ่อย](#11-nginx--คำสั่งที่ใช้บ่อย)
12. [Troubleshooting](#12-troubleshooting)
13. [Checklist สุดท้าย](#13-checklist-สุดท้าย)

---

## 1. Prerequisites

ก่อนเริ่ม ต้องมีสิ่งต่อไปนี้พร้อม:

| รายการ | สถานะ |
|---|---|
| บัญชี Google Cloud Platform | ต้องมี |
| Billing ที่เปิดใช้งาน (Gemini Pro credit $10) | ต้องมี |
| `gcloud` CLI ติดตั้งบนเครื่อง local | ต้องมี |
| GitHub repository สำหรับ project นี้ | ต้องมี |
| SSH key pair (local machine) | ต้องมี |

### ติดตั้ง gcloud CLI (ถ้ายังไม่มี)

```bash
# Windows — ดาวน์โหลดจาก:
# https://cloud.google.com/sdk/docs/install

# ตรวจสอบ
gcloud --version
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

---

## 2. ขั้นตอนที่ 1 — สร้าง GCP VM

### 2.1 สร้าง VM Instance

```bash
gcloud compute instances create argeem-web --machine-type=e2-micro --zone=us-central1-a --image-family=ubuntu-2204-lts --image-project=ubuntu-os-cloud --boot-disk-size=10GB --boot-disk-type=pd-standard --tags=http-server,https-server --metadata=enable-osconfig=TRUE
```

### 2.2 Reserve Static IP

> **สำคัญ**: Static IP ทำให้ DNS ไม่เปลี่ยนเมื่อ restart VM

```bash
gcloud compute addresses create argeem-web-ip --region=us-central1

gcloud compute addresses describe argeem-web-ip --region=us-central1

gcloud compute instances delete-access-config argeem-web --access-config-name="external-nat" --zone=us-central1-a

gcloud compute instances add-access-config argeem-web --access-config-name="external-nat" --address=STATIC_IP_ADDRESS --zone=us-central1-a
```

### 2.3 Firewall Rules

```bash
gcloud compute firewall-rules create allow-http --allow=tcp:80 --target-tags=http-server --description="Allow HTTP traffic"

gcloud compute firewall-rules create allow-https --allow=tcp:443 --target-tags=https-server --description="Allow HTTPS traffic"
```

---

## 3. ขั้นตอนที่ 2 — Setup SSH Keys

### 3.1 สร้าง SSH Key pair (บนเครื่อง local)

```bash
# สร้าง key pair สำหรับ GitHub Actions
ssh-keygen -t ed25519 -C "github-actions-argeem-web" -f ~/.ssh/argeem_deploy

# จะได้ไฟล์ 2 ไฟล์:
# ~/.ssh/argeem_deploy      <- Private key (เก็บเป็น GitHub Secret)
# ~/.ssh/argeem_deploy.pub  <- Public key (ใส่ใน VM)
```

### 3.2 เพิ่ม Public Key ลง VM

```bash
# ใช้ gcloud SSH เข้า VM ครั้งแรก
gcloud compute ssh argeem-web --zone=us-central1-a

# บน VM — เพิ่ม public key
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# ออกจาก VM
exit
```

### 3.3 ทดสอบ SSH Connection

```bash
gcloud compute instances describe argeem-web --zone=us-central1-a --format="get(networkInterfaces[0].accessConfigs[0].natIP)"

ssh -i ~/.ssh/argeem_deploy YOUR_USERNAME@YOUR_VM_IP
```

---

## 4. ขั้นตอนที่ 3 — Setup Server (ครั้งแรก)

### 4.1 Copy Setup Script ไปยัง VM

```bash
# Upload script ไปยัง VM
gcloud compute scp scripts/server-setup.sh argeem-web:~/server-setup.sh --zone=us-central1-a
```

### 4.2 แก้ไข REPO_URL ใน Script

```bash
# SSH เข้า VM
gcloud compute ssh argeem-web --zone=us-central1-a

# แก้ไข REPO_URL ให้ตรงกับ repo ของคุณ
nano ~/server-setup.sh
# หา: REPO_URL="https://github.com/YOUR_USERNAME/argeem-web.git"
# แก้เป็น repo URL จริงของคุณ
```

### 4.3 รัน Setup Script

```bash
# บน VM
chmod +x ~/server-setup.sh
bash ~/server-setup.sh
```

> Script จะทำการ:
> - Update system packages
> - ติดตั้ง Node.js 20, Nginx, Certbot, Git, PM2
> - Clone repository
> - Build Next.js app
> - Start app ด้วย PM2 (port 3000)
> - Configure Nginx เป็น reverse proxy

### 4.4 เพิ่ม Swap Space (สำคัญมาก สำหรับ e2-micro)

```bash
# บน VM — e2-micro มีแค่ 1 GB RAM ซึ่งไม่พอสำหรับ Next.js build
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# ทำให้ permanent หลัง reboot
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
free -h  # ตรวจสอบ
```

### 4.5 แก้ไข ecosystem.config.js บน VM

```bash
cd ~/argeem-web/app
nano ecosystem.config.js

# แก้ <YOUR_USER> เป็น username จริง ดูได้จาก:
whoami
```

---

## 5. ขั้นตอนที่ 4 — Setup GitHub Repo & Secrets

### 5.1 Push Code ขึ้น GitHub

```bash
# บนเครื่อง local
cd c:\Users\sitth\Documents\argeem-web
git init
git remote add origin https://github.com/YOUR_USERNAME/argeem-web.git
git add .
git commit -m "feat: initial commit"
git push -u origin main
```

### 5.2 ตั้งค่า GitHub Secrets

ไปที่ GitHub repository > **Settings** > **Secrets and variables** > **Actions** > **New repository secret**

| Secret Name | ค่า | วิธีหา |
|---|---|---|
| `GCE_HOST` | External IP ของ VM | รันคำสั่งใน 3.3 |
| `GCE_USER` | Username บน VM | ผลจาก `whoami` บน VM |
| `GCE_SSH_KEY` | Private key ทั้งหมด | `cat ~/.ssh/argeem_deploy` |

> ⚠️ **GCE_SSH_KEY** ต้องรวม header `-----BEGIN OPENSSH PRIVATE KEY-----` และ footer ด้วย

---

## 6. ขั้นตอนที่ 5 — Setup SSL Certificate

> ✅ ต้องมี domain ก่อน ถ้ายังไม่มีให้ข้ามไปก่อน แล้วกลับมาทำทีหลัง

### 6.1 แก้ Nginx config

```bash
# บน VM
sudo nano /etc/nginx/sites-available/argeem-web

# แก้บรรทัด:
#   server_name _;
# เป็น:
#   server_name yourdomain.com www.yourdomain.com;

sudo nginx -t && sudo systemctl reload nginx
```

### 6.2 ชี้ DNS ไปที่ VM IP

ที่ DNS Provider (Cloudflare, Namecheap, ฯลฯ):
- `A` record → `yourdomain.com` → `YOUR_VM_IP`
- `A` record → `www.yourdomain.com` → `YOUR_VM_IP`

รอ DNS propagate (5–60 นาที) แล้วตรวจสอบ:
```bash
nslookup yourdomain.com
```

### 6.3 ออก SSL Certificate

```bash
# บน VM
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# ตรวจสอบ auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

---

## 7. ขั้นตอนที่ 6 — ทดสอบ CI/CD Pipeline

### 7.1 Trigger Deploy แรก

```bash
# บนเครื่อง local
git commit --allow-empty -m "ci: trigger first deployment"
git push origin main
```

### 7.2 ตรวจสอบ GitHub Actions

ไปที่ GitHub repository > **Actions** tab > ดู workflow `Deploy to GCE`

### 7.3 ตรวจสอบ App บน VM

```bash
# SSH เข้า VM
pm2 status
pm2 logs argeem-web --lines 50
curl http://localhost:3000
```

---

## 8. ขั้นตอนที่ 7 — Custom Domain (Optional)

```
ตัวเลือก domain:
1. ซื้อ domain จาก Namecheap (~$8-12/ปี) — แนะนำที่สุด
2. ใช้ free domain จาก Freenom (.tk, .ml) — ฟรีแต่ไม่เสถียร
3. ใช้ IP โดยตรง หรือ IP.nip.io — ใช้ได้แต่ไม่สวย, SSL ทำยาก
```

---

## 9. การ Deploy ด้วยตนเอง (Manual)

```bash
# SSH เข้า VM
gcloud compute ssh argeem-web --zone=us-central1-a

# รัน manual deploy script
bash ~/argeem-web/scripts/deploy.sh
```

หรือรันเองทีละขั้น:

```bash
cd ~/argeem-web
git pull origin main
cd app
npm ci --omit=dev
npm run build
pm2 restart argeem-web --update-env
pm2 status
```

---

## 10. PM2 — คำสั่งที่ใช้บ่อย

```bash
pm2 status                         # ดูสถานะ process ทั้งหมด
pm2 logs argeem-web                # ดู live logs
pm2 logs argeem-web --lines 100    # ดู 100 บรรทัดล่าสุด
pm2 restart argeem-web             # restart app
pm2 reload argeem-web              # zero-downtime reload
pm2 stop argeem-web                # หยุด app
pm2 delete argeem-web              # ลบ process
pm2 monit                          # Real-time monitoring dashboard
pm2 flush                          # ล้าง logs ทั้งหมด
pm2 save                           # บันทึก process list
```

---

## 11. Nginx — คำสั่งที่ใช้บ่อย

```bash
sudo nginx -t                        # ทดสอบ config syntax
sudo systemctl reload nginx          # reload (ไม่ downtime)
sudo systemctl restart nginx         # restart nginx
sudo systemctl status nginx          # ดูสถานะ
sudo tail -f /var/log/nginx/access.log  # live access log
sudo tail -f /var/log/nginx/error.log   # live error log
sudo certbot renew                   # ต่ออายุ SSL
```

---

## 12. Troubleshooting

### ❌ GitHub Actions Fail — "Permission denied (publickey)"

```bash
# ตรวจสอบว่า GCE_SSH_KEY มี private key ครบ
# ต้องมีทั้ง -----BEGIN OPENSSH PRIVATE KEY-----
# และ -----END OPENSSH PRIVATE KEY-----

# ทดสอบ SSH จาก local
ssh -i ~/.ssh/argeem_deploy -v YOUR_USER@YOUR_VM_IP
```

### ❌ Website แสดง 502 Bad Gateway

```bash
# PM2 อาจ crash — ตรวจสอบ
pm2 status
pm2 logs argeem-web

# ทดสอบ port 3000
curl http://localhost:3000

# Restart
pm2 restart argeem-web
```

### ❌ Build Fail — JavaScript heap out of memory

```bash
# เพิ่ม swap ก่อน build
sudo swapon /swapfile

# Build พร้อม Node.js memory limit
NODE_OPTIONS="--max-old-space-size=512" npm run build
```

### ❌ SSL Certificate Error — "DNS problem"

```bash
# DNS ยังไม่ propagate — รอและตรวจสอบ
nslookup yourdomain.com 8.8.8.8  # ใช้ Google DNS
# ต้องตรงกับ VM IP ก่อนค่อยรัน certbot
```

### ❌ PM2 ไม่ start หลัง VM reboot

```bash
# รัน startup command อีกครั้ง
pm2 startup
# copy และรัน sudo command ที่แสดงขึ้นมา
pm2 save
```

---

## 13. Checklist สุดท้าย

### Infrastructure
- [ ] GCE VM (e2-micro, us-central1-a) สร้างแล้ว
- [ ] Static IP reserved และ assign แล้ว
- [ ] Firewall rules เปิด port 80, 443 แล้ว
- [ ] SSH key pair สร้างและเพิ่มลง VM แล้ว

### Server Setup
- [ ] Node.js 20, Nginx, PM2, Certbot ติดตั้งแล้ว
- [ ] **Swap space 1 GB เพิ่มแล้ว** (สำคัญมาก!)
- [ ] Repository cloned ลง VM แล้ว
- [ ] `npm run build` ผ่าน ไม่มี error
- [ ] PM2 start app สำเร็จ (`pm2 status` = online)
- [ ] PM2 startup configured (`pm2 save`)
- [ ] Nginx reverse proxy ทำงานถูกต้อง

### GitHub & CI/CD
- [ ] Code push ขึ้น GitHub main branch แล้ว
- [ ] GitHub Secrets ตั้งค่า 3 ตัว (GCE_HOST, GCE_USER, GCE_SSH_KEY)
- [ ] GitHub Actions workflow ผ่าน (สีเขียว ✅)

### SSL & Domain (ถ้ามี domain)
- [ ] DNS A record ชี้ไปที่ VM IP แล้ว
- [ ] SSL certificate ออกแล้ว (HTTPS ✅)
- [ ] Auto-renewal timer active

### Validation
- [ ] เปิด website จาก browser ได้
- [ ] HTTPS ทำงาน (ไม่มี warning)
- [ ] ตรวจ GCP Billing ไม่เกิน $10/เดือน
- [ ] `pm2 logs` ไม่มี error
- [ ] Nginx error log สะอาด

---

## 📊 ประมาณค่าใช้จ่าย

| Service | Spec | ราคา/เดือน |
|---|---|---|
| Compute Engine | e2-micro (us-central1) | ~$6.11 |
| Persistent Disk | 10 GB Standard | ~$0.40 |
| Egress Traffic | ~10 GB | ~$1.20 |
| Static IP | 1 External IP | ~$1.46 |
| **รวม** | | **~$9.17** |

> 💡 e2-micro ใน `us-central1`, `us-east1`, `us-west1` อยู่ใน **Free Tier** แต่ Static IP มีค่าใช้จ่ายเมื่อ VM running

---

*Last updated: 2026-10-15 | Author: sitth*
