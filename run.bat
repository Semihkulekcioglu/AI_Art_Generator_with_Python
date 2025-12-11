@echo off
echo ========================================
echo AI Art Generator Baslatiliyor...
echo ========================================
echo.

REM Virtual environment varsa aktive et
if exist venv\Scripts\activate.bat (
    echo Virtual environment aktive ediliyor...
    call venv\Scripts\activate.bat
) else (
    echo UYARI: Virtual environment bulunamadi!
    echo Lutfen once 'python -m venv venv' komutunu calistirin.
    echo.
)

REM Flask uygulamasini baslat
echo Flask sunucusu baslatiliyor...
echo.
python app.py

pause

