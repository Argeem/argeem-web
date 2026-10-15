# 📓 Decision Log — Personal Website

> บันทึกการตัดสินใจทุกอย่างในโปรเจกต์ ตั้งแต่เริ่มต้นจนถึง deploy
> Format: `[วันที่] | [หมวด] | [การตัดสินใจ] | [เหตุผล] | [สถานะ]`

---

## สถานะ Legend

| Symbol | ความหมาย |
|---|---|
| ✅ | ตัดสินใจแล้ว ปิด |
| 🔄 | กำลัง implement |
| ⏳ | TBD — ยังค้างอยู่ |
| ❌ | ยกเลิก / เปลี่ยนใจ |
| 💡 | Idea — ยังไม่ได้ตัดสินใจ |

---

## 2026-10-14

### [DEC-001] Tech Stack — Framework
- **หมวด**: Architecture
- **การตัดสินใจ**: ใช้ **Next.js 14** (App Router) + TypeScript
- **เหตุผล**: SSG/SSR ดี, SEO-friendly, full-stack ในที่เดียว, deploy บน Node.js ง่าย
- **ทางเลือกที่ไม่เลือก**: Astro (ecosystem เล็กกว่า), Vite (ไม่มี SSR built-in)
- **สถานะ**: ✅

---

### [DEC-002] Infrastructure — Cloud Provider & VM
- **หมวด**: Infrastructure
- **การตัดสินใจ**: **Google Compute Engine e2-micro** (us-central1) + Nginx + PM2
- **เหตุผล**: Budget $10/เดือน จาก Gemini Pro credit, GCP free tier 1 e2-micro instance
- **ค่าใช้จ่ายประมาณ**: ~$9.27/เดือน
- **ทางเลือกที่ไม่เลือก**: Vercel (serverless limit), Railway ($5+ ข้อจำกัด), DigitalOcean (ไม่ใช่ GCP credit)
- **สถานะ**: ✅

---

### [DEC-003] CI/CD Pipeline
- **หมวด**: DevOps
- **การตัดสินใจ**: **GitHub Actions** → SSH → pull & rebuild บน VM
- **เหตุผล**: ฟรี, integrate กับ GitHub repo โดยตรง, setup ง่าย
- **สถานะ**: ✅

---

### [DEC-004] SSL Certificate
- **หมวด**: Security
- **การตัดสินใจ**: **Let's Encrypt** via Certbot (auto-renew ผ่าน systemd timer)
- **เหตุผล**: ฟรี, industry standard, zero maintenance
- **สถานะ**: ✅

---

### [DEC-005] Design Style
- **หมวด**: Design
- **การตัดสินใจ**: **Dark Minimal Developer** style
  - Purple/blue gradient accent บน key text
  - Code snippet decoration ใน hero section
  - Clean sans-serif typography
- **เหตุผล**: ตรงกับ identity Developer/Engineer, professional, timeless
- **สถานะ**: ✅

---

### [DEC-006] Color Mode & Palette
- **หมวด**: Design
- **การตัดสินใจ**: **Light mode เป็น default** + toggle ไป dark mode ได้
- **Color Palette**:

  | Token | Light | Dark |
  |---|---|---|
  | Background | `#ffffff` | `#0a0a0f` |
  | Surface | `#f8f8fb` | `#111118` |
  | Accent | `#7c3aed` | `#818cf8` |
  | Accent 2 | `#6366f1` | `#6366f1` |
  | Text | `#111827` | `#f9fafb` |
  | Text Muted | `#6b7280` | `#9ca3af` |

- **เหตุผล**: Light mode อ่านง่ายในตอนกลางวัน, toggle สำหรับคนชอบ dark
- **สถานะ**: ✅

---

### [DEC-007] Typography
- **หมวด**: Design
- **การตัดสินใจ**: **Inter** (body/heading) + **Geist Mono** (code snippets)
- **Source**: Google Fonts (Inter), Vercel Geist
- **Scale**: `xs: 12px | sm: 14px | base: 16px | lg: 18px | xl: 20px | 2xl: 24px | 3xl: 30px | 4xl: 36px`
- **เหตุผล**: Inter อ่านง่ายที่สุดใน developer tools, Geist Mono ดูสะอาด
- **สถานะ**: ✅

---

### [DEC-008] Animation Level
- **หมวด**: UX
- **การตัดสินใจ**: **Subtle & Smooth** — ไม่เยอะ
  - Hover effects บน cards และ links
  - Fade-in on scroll (Intersection Observer)
  - Smooth page transitions
  - ไม่มี particle, 3D, หรือ heavy canvas
- **เหตุผล**: ไม่รบกวน performance บน e2-micro, UX ดีโดยไม่ distract
- **สถานะ**: ✅

---

### [DEC-009] Hero Photo
- **หมวด**: Content
- **การตัดสินใจ**: **มีรูปตัวเองใส่ใน hero section**
- **Format**: รูปวงกลม พร้อม subtle gradient border
- **สถานะ**: ✅

---

### [DEC-010] Language / i18n
- **หมวด**: Content
- **การตัดสินใจ**: **Bilingual (TH / EN)** มี language toggle switch
- **Default**: EN (สำหรับ recruiter ต่างประเทศ)
- **Implementation**: ตัดสินใจ library ทีหลัง (DEC-018)
- **ทางเลือกที่ไม่เลือก**: EN only (miss TH audience), TH only (limit reach)
- **สถานะ**: ✅

---

### [DEC-011] Page Sections & Order
- **หมวด**: Content
- **การตัดสินใจ**: Sections เรียงตามลำดับ:

  | # | Section | รายละเอียด |
  |---|---|---|
  | 1 | **Hero** | ชื่อ, บทบาท, รูปตัวเอง, CTA buttons |
  | 2 | **About** | Bio สั้น, background, personality |
  | 3 | **Skills & Tech Stack** | Icons grid + proficiency level |
  | 4 | **Projects** | Cards พร้อม screenshot, tech, links |
  | 5 | **GitHub Activity** | Contribution graph / recent repos |
  | 6 | **Blog** | Latest 3 posts preview |
  | 7 | **Resume/CV** | Download button (PDF) |
  | 8 | **Contact** | Social links + contact form |

- **สถานะ**: ✅

---

### [DEC-012] Developer Focus
- **หมวด**: Content Strategy
- **การตัดสินใจ**: เน้น **Developer / Engineer** identity
  - โชว์ code, technical skills, projects เป็นหลัก
  - ไม่เน้น design portfolio
- **สถานะ**: ✅

---

## ⏳ Pending Decisions

| ID | เรื่อง | รายละเอียด | ต้องตัดสินใจก่อน |
|---|---|---|---|
| DEC-013 | Domain Name | Custom domain vs ใช้ IP/nip.io ก่อน? | ก่อน deploy |
| DEC-014 | Analytics | Google Analytics 4 vs self-hosted Umami | Phase 3 |
| DEC-015 | Blog Comments | Giscus (GitHub Discussions) vs ไม่มี | Phase 3 |
| DEC-016 | Resume/CV | เตรียม PDF ไว้ก่อน deploy | Phase 2 |
| DEC-017 | GitHub Activity | GitHub API โดยตรง vs embed widget | Phase 2 |
| DEC-018 | i18n Library | `next-intl` vs `next-i18next` vs custom | Phase 1 |

---

## 💡 Ideas / Future Scope

- **Dark mode system preference** — ตรวจ `prefers-color-scheme` auto ก่อน toggle
- **Open Graph images** — auto-generate OG image สำหรับ blog posts แต่ละอัน
- **RSS Feed** — สำหรับ blog subscribers
- **Newsletter** — Buttondown หรือ self-hosted ในอนาคต
- **Search** — Full-text search บน blog (Pagefind library)

---

## 📋 Log History

| วันที่ | Action |
|---|---|
| 2026-10-14 | สร้าง DECISION_LOG.md, บันทึก DEC-001 ถึง DEC-012 |
| 2026-10-15 | Implement GitHub Activity, Blog, Resume, Contact sections ครบทั้ง 8 ส่วน, แก้ไข Lucide brand icons (Icons.tsx), Build ผ่าน 100% |

---

*Last updated: 2026-10-15 09:54 | Author: sitth*
