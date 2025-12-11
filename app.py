from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
import torch
from diffusers import StableDiffusionPipeline, DPMSolverMultistepScheduler
import os
import io
import base64
from PIL import Image
import time
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Oluşturulan görselleri kaydetmek için klasör
OUTPUT_DIR = "generated_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Global değişkenler
pipe = None
device = None

def load_model():
    """Stable Diffusion modelini yükle"""
    global pipe, device
    
    if pipe is not None:
        return True
    
    try:
        print("🎨 Model yükleniyor... (İlk seferde biraz zaman alabilir)")
        
        # Cihazı kontrol et (GPU varsa kullan)
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"📱 Kullanılan cihaz: {device}")
        
        if device == "cpu":
            print("⚠️  GPU bulunamadı, CPU kullanılacak (yavaş olabilir)")
        
        # Model ID - daha hafif bir model kullanıyoruz
        model_id = "runwayml/stable-diffusion-v1-5"
        
        # Modeli yükle
        pipe = StableDiffusionPipeline.from_pretrained(
            model_id,
            torch_dtype=torch.float16 if device == "cuda" else torch.float32,
            safety_checker=None,  # Hız için güvenlik kontrolünü devre dışı bırak
            requires_safety_checker=False
        )
        
        # Daha hızlı sampling için scheduler değiştir
        pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
        
        # Cihaza taşı
        pipe = pipe.to(device)
        
        # Memory optimization
        if device == "cuda":
            pipe.enable_attention_slicing()
        
        print("✅ Model başarıyla yüklendi!")
        return True
        
    except Exception as e:
        print(f"❌ Model yükleme hatası: {str(e)}")
        return False

@app.route('/')
def index():
    """Ana sayfa"""
    return render_template('index.html')

@app.route('/api/generate', methods=['POST'])
def generate_image():
    """Metin prompt'undan görsel üret"""
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        negative_prompt = data.get('negative_prompt', 'ugly, blurry, low quality, distorted')
        num_inference_steps = int(data.get('steps', 30))
        guidance_scale = float(data.get('guidance_scale', 7.5))
        width = int(data.get('width', 512))
        height = int(data.get('height', 512))
        
        if not prompt:
            return jsonify({'error': 'Prompt gerekli!'}), 400
        
        # Modeli yükle (henüz yüklenmediyse)
        if not load_model():
            return jsonify({'error': 'Model yüklenemedi!'}), 500
        
        print(f"🎨 Görsel üretiliyor: '{prompt}'")
        start_time = time.time()
        
        # Görsel üret
        with torch.no_grad():
            result = pipe(
                prompt=prompt,
                negative_prompt=negative_prompt,
                num_inference_steps=num_inference_steps,
                guidance_scale=guidance_scale,
                width=width,
                height=height
            )
        
        image = result.images[0]
        generation_time = time.time() - start_time
        
        # Görseli kaydet
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"art_{timestamp}.png"
        filepath = os.path.join(OUTPUT_DIR, filename)
        image.save(filepath)
        
        # Base64'e çevir (frontend'de göstermek için)
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        print(f"✅ Görsel oluşturuldu! ({generation_time:.2f} saniye)")
        
        return jsonify({
            'success': True,
            'image': f"data:image/png;base64,{img_str}",
            'filename': filename,
            'generation_time': round(generation_time, 2),
            'prompt': prompt
        })
        
    except Exception as e:
        print(f"❌ Hata: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/model-status', methods=['GET'])
def model_status():
    """Model durumunu kontrol et"""
    return jsonify({
        'loaded': pipe is not None,
        'device': device if device else 'unknown',
        'has_gpu': torch.cuda.is_available()
    })

@app.route('/generated_images/<filename>')
def serve_image(filename):
    """Oluşturulan görseli sun"""
    return send_from_directory(OUTPUT_DIR, filename)

if __name__ == '__main__':
    print("=" * 60)
    print("🎨 AI Art Generator Başlatılıyor...")
    print("=" * 60)
    print("\n💡 İpucu: Model ilk çalıştırmada otomatik indirilecektir (~4GB)")
    print("📱 Tarayıcınızda açın: http://localhost:5000")
    print("\n" + "=" * 60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

