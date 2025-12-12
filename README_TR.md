# 🎨 AI Art Generator with Python

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stable Diffusion](https://img.shields.io/badge/Stable%20Diffusion-v1.5-purple.svg)](https://huggingface.co/runwayml/stable-diffusion-v1-5)

**Türkçe** | **[English](README.md)**

🎨 Stable Diffusion v1.5 kullanarak metin promptlarından muhteşem görseller üreten modern bir AI web uygulaması.

<img width="320" height="320" alt="art_20251105_161658" src="https://github.com/user-attachments/assets/bb8fe59e-216c-426c-a269-1a95f5553687" />
<img width="320" height="320" alt="art_20251105_153137" src="https://github.com/user-attachments/assets/9eea7990-bc28-472b-90b6-907c331e0e95" />
<img width="320" height="320" alt="art_20251105_162357" src="https://github.com/user-attachments/assets/d26a687e-d661-4874-97f7-fd84b844b5ab" />
<div align="center">
<img width="720" height="720" alt="Ekran Görüntüsü (832)" src="https://github.com/user-attachments/assets/b1ffd472-7094-418d-9eac-bc3b7a6306ea" />
</div>

## ✨ Özellikler

- 🎯 **Kolay Kullanım**: Basit ve modern arayüz
- 🚀 **Hızlı Üretim**: Optimize edilmiş Stable Diffusion v1.5
- ⚙️ **Gelişmiş Ayarlar**: Adım sayısı, guidance scale, çözünürlük kontrolü
- 💾 **İndirme**: Oluşturulan görselleri PNG formatında kaydet
- 🖥️ **Lokalde Çalışır**: API key gerekmez, tamamen ücretsiz
- 🎨 **GPU Desteği**: CUDA destekli GPU'lar için optimize edilmiş

## 🖼️ Örnek Çıktılar

Şunlar gibi muhteşem görseller oluşturun:
- Fantastik manzaralar ve yaratıklar
- Dijital sanat ve portreler
- Cyberpunk sahneler
- Ve çok daha fazlası!

## 📋 Gereksinimler

### Minimum
- **Python**: 3.8+
- **RAM**: 8GB (CPU için) veya 6GB (GPU için)
- **Disk Alanı**: ~5GB (model dosyaları için)

### Önerilen
- **GPU**: NVIDIA GPU ile 4GB+ VRAM (çok daha hızlı!)
- **RAM**: 16GB
- **İşletim Sistemi**: Windows 10/11, Linux, macOS

## 🚀 Hızlı Başlangıç

### Windows

```bash
# 1. Depoyu klonlayın
git clone https://github.com/Semihkulekcioglu/AI_Art_Generator.git
cd AI_Art_Generator_with_Python

# 2. Kurulumu çalıştırın
setup.bat

# 3. Uygulamayı başlatın
run.bat
```

### Linux/Mac

```bash
# 1. Depoyu klonlayın
git clone https://github.com/Semihkulekcioglu/AI_Art_Generator_with_Python.git
cd AI_Art_Generator_with_Python

# 2. Sanal ortam oluşturun
python3 -m venv venv
source venv/bin/activate

# 3. Bağımlılıkları yükleyin
pip install -r requirements.txt

# 4. Uygulamayı çalıştırın
python app.py
```

### İlk Çalıştırma

İlk kullanımda Stable Diffusion modeli (~4GB) otomatik olarak indirilecektir. Bu işlem internet hızınıza bağlı olarak 5-15 dakika sürebilir.

## 🎯 Kullanım

1. Tarayıcınızda `http://localhost:5000` adresini açın
2. Prompt'unuzu girin (İngilizce daha iyi sonuç verir)
3. İsterseniz ayarları düzenleyin
4. "Görsel Oluştur" butonuna tıklayın ve 30-60 saniye bekleyin
5. Sanat eserinizi indirin!

### Örnek Promptlar

```
A beautiful sunset over mountains, digital art, vibrant colors, highly detailed

Cyberpunk city at night, neon lights, rain, futuristic, 4k

Majestic dragon flying over castle, fantasy art, epic scene
```

## ⚙️ Ayarlar

- **Adım Sayısı**: 20-50 (fazla = daha kaliteli, daha yavaş)
- **Guidance Scale**: 7-15 (fazla = prompt'a daha sadık)
- **Çözünürlük**: 512x512 (hızlı) veya 768x768 (yavaş)

## 📁 Proje Yapısı

```
AI_Art_Generator_with_Python/
├── app.py              # Flask backend
├── requirements.txt    # Python bağımlılıkları
├── README.md          # İngilizce dokümantasyon
├── README_TR.md       # Türkçe dokümantasyon
├── templates/
│   └── index.html     # Frontend
├── static/
│   ├── style.css      # CSS stilleri
│   └── script.js      # JavaScript
└── generated_images/  # Çıktı klasörü
```

## 🐛 Sorun Giderme

### "Model yüklenemedi" hatası
```bash
pip install --upgrade diffusers transformers torch
```

### "CUDA out of memory" hatası
- Daha küçük çözünürlük kullanın (512x512)
- Adım sayısını azaltın
- Diğer GPU kullanan programları kapatın

### Yavaş üretim
- GPU kullanın (CUDA yükleyin)
- Adım sayısını 20-30'a düşürün
- Daha küçük çözünürlük seçin

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Şunları yapabilirsiniz:
- Hata bildirin
- Özellik önerin
- Pull request gönderin

## 📝 Lisans

Bu proje MIT lisansı altındadır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## ⚠️ Uyarı

- Oluşturulan görseller Stable Diffusion v1.5 lisansına tabidir
- Uygunsuz içerik üretmeyin
- Telif hakkı kurallarına uyun

## 🌟 Teşekkürler

- [Stable Diffusion](https://github.com/CompVis/stable-diffusion) - Stability AI
- [Hugging Face Diffusers](https://github.com/huggingface/diffusers)
- Flask framework


