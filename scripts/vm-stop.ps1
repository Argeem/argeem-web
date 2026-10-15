# vm-stop.ps1
# หยุด VM และปล่อย Static IP เพื่อไม่ให้คิดเงิน
# Usage: .\scripts\vm-stop.ps1

$VM_NAME   = "argeem-web"
$ZONE      = "us-central1-a"
$IP_NAME   = "argeem-web-ip"
$REGION    = "us-central1"

Write-Host ""
Write-Host "🔌 VM Stop — argeem-web" -ForegroundColor Cyan
Write-Host "────────────────────────" -ForegroundColor Cyan

# 1. ถอด Static IP ออกจาก VM
Write-Host "`n[1/4] ถอด Static IP ออกจาก VM..." -ForegroundColor Yellow
gcloud compute instances delete-access-config $VM_NAME `
  --access-config-name="external-nat" `
  --zone=$ZONE `
  --quiet

# 2. ปล่อย Static IP
Write-Host "`n[2/4] ปล่อย Static IP ($IP_NAME)..." -ForegroundColor Yellow
gcloud compute addresses delete $IP_NAME --region=$REGION --quiet

# 3. Stop VM
Write-Host "`n[3/4] หยุด VM..." -ForegroundColor Yellow
gcloud compute instances stop $VM_NAME --zone=$ZONE

# 4. ตรวจสอบ
Write-Host "`n[4/4] ตรวจสอบสถานะ..." -ForegroundColor Yellow
$status = gcloud compute instances describe $VM_NAME --zone=$ZONE --format="get(status)"
Write-Host ""

if ($status -eq "TERMINATED") {
  Write-Host "✅ VM หยุดแล้ว — ไม่มีค่าใช้จ่าย (ยกเว้น Disk ~$0.40/เดือน)" -ForegroundColor Green
} else {
  Write-Host "⚠️  สถานะ: $status (อาจยังไม่เสร็จ ลองรอสักครู่)" -ForegroundColor Red
}
Write-Host ""
