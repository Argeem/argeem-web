# 🔌 วิธีปิด/เปิด VM — argeem-web

> ใช้เมื่อต้องการหยุดใช้งานชั่วคราวเพื่อประหยัดค่าใช้จ่าย

---

## ⚡ วิธีเร็ว — ใช้ Script (แนะนำ)

```powershell
# ปิด VM + ปล่อย IP
.\scripts\vm-stop.ps1

# เปิด VM + reserve IP ใหม่
.\scripts\vm-start.ps1
```

> ดูขั้นตอน manual ด้านล่างถ้าต้องการทำเองทีละขั้น

---

## 💤 ปิด VM (ประหยัดสุด — ไม่คิดค่า Compute + ไม่คิดค่า IP)

> ขั้นตอนนี้จะ **ถอด Static IP ออก** ด้วย ทำให้ไม่มีค่าใช้จ่ายเลย
> แต่ตอนเปิดใหม่ IP จะเปลี่ยน ต้องอัปเดต GitHub Secret ด้วย

### ขั้นตอน

**1. ถอด Static IP ออกจาก VM**
```bash
gcloud compute instances delete-access-config argeem-web \
  --access-config-name="external-nat" \
  --zone=us-central1-a
```

**2. ปล่อย Static IP (หยุดคิดเงิน)**
```bash
gcloud compute addresses delete argeem-web-ip --region=us-central1
```
พิมพ์ `Y` เพื่อยืนยัน

**3. Stop VM**
```bash
gcloud compute instances stop argeem-web --zone=us-central1-a
```

**4. ตรวจสอบสถานะ**
```bash
gcloud compute instances describe argeem-web --zone=us-central1-a --format="get(status)"
# ต้องได้: TERMINATED
```

✅ ตอนนี้ไม่มีค่าใช้จ่ายใดๆ เลย (ยกเว้น Persistent Disk ~$0.40/เดือน)

---

## 🚀 เปิด VM กลับมา (พร้อม Static IP ใหม่)

### ขั้นตอน

**1. Start VM**
```bash
gcloud compute instances start argeem-web --zone=us-central1-a
```

**2. Reserve Static IP ใหม่**
```bash
gcloud compute addresses create argeem-web-ip --region=us-central1
```

**3. ดู IP ที่ได้**
```bash
gcloud compute addresses describe argeem-web-ip --region=us-central1 --format="get(address)"
```
จดค่า IP ไว้ — จะใช้ในขั้นตอนถัดไป

**4. Assign Static IP เข้า VM**
```bash
gcloud compute instances add-access-config argeem-web \
  --access-config-name="external-nat" \
  --address=NEW_IP_ADDRESS \
  --zone=us-central1-a
```
แทน `NEW_IP_ADDRESS` ด้วย IP ที่ได้จากขั้นตอนที่ 3

**5. อัปเดต GitHub Secret `GCE_HOST`**

ไปที่: **GitHub repo → Settings → Secrets and variables → Actions**
- แก้ `GCE_HOST` เป็น IP ใหม่

**6. ตรวจสอบว่า PM2 รันอยู่**
```bash
gcloud compute ssh argeem-web --zone=us-central1-a

# บน VM
pm2 status
# ถ้าไม่มี app → start ใหม่
pm2 start ~/argeem-web/app/ecosystem.config.js
pm2 save
```

**7. ทดสอบเว็บ**
```
http://NEW_IP_ADDRESS
```

✅ เว็บกลับมาออนไลน์แล้ว

---

## 💰 สรุปค่าใช้จ่าย

| สถานะ | Compute | Static IP | Disk | รวม/เดือน |
|---|---|---|---|---|
| VM รันปกติ | ~$6.11 | ~$1.46 | ~$0.40 | **~$7.97** |
| VM หยุด (ถือ IP) | $0 | ~$1.46 | ~$0.40 | **~$1.86** |
| VM หยุด (ปล่อย IP) | $0 | $0 | ~$0.40 | **~$0.40** |

---

*Last updated: 2026-10-16 | argeem-web*
