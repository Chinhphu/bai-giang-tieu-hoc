@echo off
chcp 65001 >nul
title KHOI TAO CAY THU MUC MAU - BAI 5 TIN HOC 4
echo ========================================================
echo   DANG KHOI TAO CAY THU MUC MAU CHO TIET HOC
echo ========================================================

set "R=%~dp0Hoc tap"
if exist "%R%" rmdir /s /q "%R%"
mkdir "%R%"
mkdir "%R%\Nhom 1\Thu An"
type nul > "%R%\Nhom 1\Thu An\Gioi thieu.pptx"
mkdir "%R%\Nhom 1\Minh"
type nul > "%R%\Nhom 1\Minh\Bai tap.docx"
mkdir "%R%\Nhom 1\Lan"
type nul > "%R%\Nhom 1\Lan\Video.mp4"
type nul > "%R%\Nhom 1\Lan\Bai doc.docx"
mkdir "%R%\Nhom 1\Khoa"
mkdir "%R%\Nhom 2\Huy"
type nul > "%R%\Nhom 2\Huy\Nhap.txt"
type nul > "%R%\Nhom 2\Huy\Anh lop.png"
mkdir "%R%\Nhom 2\Binh"
type nul > "%R%\Nhom 2\Binh\Gioi thieu.pptx"
mkdir "%R%\Nhom 3"

echo.
echo [THANH CONG] Da tao xong cay thu muc tai:
echo "%R%"
echo.
echo Cua so thu muc dang duoc mo len de cac em thuc hanh...
echo ========================================================
start "" "%R%"
pause
