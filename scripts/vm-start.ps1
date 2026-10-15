# vm-start.ps1
# เปิด VM และ reserve Static IP ใหม่
# Usage: .\scripts\vm-start.ps1

$VM_NAME   = "argeem-web"
$ZONE      = "us-central1-a"
$IP_NAME   = "argeem-web-ip"
$REGION    = "us-central1"

Write-Host ""
Write-Host "🚀 VM Start — argeem-web" -ForegroundColor Cyan
Write-Host "─────────────────────────" -ForegroundColor Cyan

# 1. Start VM
Write-Host "`n[1/4] เปิด VM..." -ForegroundColor Yellow
gcloud compute instances start $VM_NAME --zone=$ZONE

# 2. Reserve Static IP ใหม่
Write-Host "`n[2/4] Reserve Static IP ใหม่..." -ForegroundColor Yellow
gcloud compute addresses create $IP_NAME --region=$REGION

# 3. ดู IP ที่ได้
$NEW_IP = gcloud compute addresses describe $IP_NAME --region=$REGION --format="get(address)"
Write-Host "`n[3/4] Assign IP $NEW_IP เข้า VM..." -ForegroundColor Yellow

# 4. Assign IP เข้า VM
gcloud compute instances add-access-config $VM_NAME `
  --access-config-name="external-nat" `
  --address=$NEW_IP `
  --zone=$ZONE

# สรุป
Write-Host ""
Write-Host "────────────────────────────────────" -ForegroundColor Cyan
Write-Host "✅ VM เปิดแล้ว!" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 IP ใหม่: $NEW_IP" -ForegroundColor White
Write-Host "🔗 เข้าเว็บ: http://$NEW_IP" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  อย่าลืมอัปเดต GitHub Secret:" -ForegroundColor Yellow
Write-Host "   GCE_HOST = $NEW_IP" -ForegroundColor Yellow
Write-Host "   GitHub repo → Settings → Secrets → Actions → GCE_HOST" -ForegroundColor DarkGray
Write-Host ""
Write-Host "📋 ตรวจสอบ PM2 บน VM:" -ForegroundColor Yellow
Write-Host "   gcloud compute ssh $VM_NAME --zone=$ZONE" -ForegroundColor DarkGray
Write-Host "   pm2 status" -ForegroundColor DarkGray
Write-Host "────────────────────────────────────" -ForegroundColor Cyan
Write-Host ""
