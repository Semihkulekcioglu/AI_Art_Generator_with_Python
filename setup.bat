@echo off
echo ========================================
echo AI Art Generator Kurulum
echo ========================================
echo.

REM Python versiyonunu kontrol et
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo HATA: Python bulunamadi!
    echo Lutfen Python 3.8 veya uzeri yukleyin: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo [1/4] Virtual environment olusturuluyor...
python -m venv venv
if %errorlevel% neq 0 (
    echo HATA: Virtual environment olusturulamadi!
    pause
    exit /b 1
)

echo [2/4] Virtual environment aktive ediliyor...
call venv\Scripts\activate.bat

echo [3/4] Bagimliliklari yukleniyor (bu biraz zaman alabilir)...
echo.
pip install --upgrade pip
pip install -r requirements.txt

if %errorlevel% neq 0 (
    echo.
    echo HATA: Bagimliliklari yuklenirken bir hata olustu!
    echo.
    echo GPU desteginiz varsa, su komutlari deneyin:
    echo pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
    echo pip install flask flask-cors diffusers transformers accelerate Pillow numpy
    echo.
    pause
    exit /b 1
)

echo.
echo [4/4] Gerekli klasorleri olusturuluyor...
if not exist "generated_images" mkdir generated_images
if not exist "templates" mkdir templates
if not exist "static" mkdir static

echo.
echo ========================================
echo Kurulum tamamlandi! ^_^
echo ========================================
echo.
echo Uygulamayi baslatmak icin: run.bat
echo Veya: python app.py
echo.
echo Tarayicinizda: http://localhost:5000
echo.
pause

