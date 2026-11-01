@echo off
chcp 65001 >nul
title GHI CAY THU MUC HIEN TAI VAO CLIPBOARD
echo ========================================================
echo   DANG DOC CAY THU MUC: C:\TinHoc4\Hoc tap
echo ========================================================

set "R=C:\TinHoc4\Hoc tap"
powershell -NoProfile -ExecutionPolicy Bypass -Command "$r='%R%'; if (-not (Test-Path -LiteralPath $r)) { Write-Host 'Khong tim thay thu muc %R%! Hay chay TaoCay.bat truoc.' -ForegroundColor Red; pause; exit }; $o = Get-ChildItem -LiteralPath $r -Recurse -Force | ForEach-Object { $p=$_.FullName.Substring($r.Length+1).Replace('\','/'); if($_.PSIsContainer){$p+'/'}else{$p} }; if ($o) { $o | Set-Clipboard; $o | Set-Content -Encoding UTF8 'C:\TinHoc4\cay_hien_tai.txt'; Write-Host 'Da chep cay thu muc vao Clipboard thanh cong!' -ForegroundColor Green } else { '' | Set-Clipboard; Write-Host 'Thu muc trong!' -ForegroundColor Yellow }"

echo.
echo [DA XONG] Cay thu muc da duoc luu vao bo nho tam (Clipboard).
echo Hay quay lai trinh duyet va nhan Ctrl+V vao o dan cay tren web.
echo ========================================================
pause

