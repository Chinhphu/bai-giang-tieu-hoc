@echo off
chcp 65001 >nul
title KHOI TAO CAY THU MUC TIET 2 - BAI 5 TIN HOC 4
echo ========================================================
echo   DANG KHOI TAO CAY THU MUC TIET 2 (THUC HANH TONG HOP)
echo ========================================================

set "R=%~dp0Hoc tap"
if exist "%R%" rmdir /s /q "%R%"
mkdir "%R%"

:: Kho tu lieu chung cua ca lop (dung de sao chep, khong xoa)
mkdir "%R%\Kho"
type nul > "%R%\Kho\Bai1.pptx"
type nul > "%R%\Kho\Anh.png"
type nul > "%R%\Kho\Phim.mp4"

:: Thu muc rieng cua tung to (doc lap, khong chong lan)
mkdir "%R%\To 1\An"
mkdir "%R%\To 1\Binh"

mkdir "%R%\To 2\Hoa"
mkdir "%R%\To 2\Kha"

mkdir "%R%\To 3\Khoa"
mkdir "%R%\To 3\Mai"

mkdir "%R%\To 4\Nam"
mkdir "%R%\To 4\Lan"

mkdir "%R%\To 5\Nga"
mkdir "%R%\To 5\Phat"

mkdir "%R%\To 6\Quan"
mkdir "%R%\To 6\Son"

echo.
echo [THANH CONG] Da tao xong cay thu muc Tiet 2 tai:
echo "%R%"
echo ========================================================
start "" "%R%"
pause
