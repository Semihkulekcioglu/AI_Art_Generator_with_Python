# 🎨 AI Art Generator with Python

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-3.0-green.svg)](https://flask.palletsprojects.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Stable Diffusion](https://img.shields.io/badge/Stable%20Diffusion-v1.5-purple.svg)](https://huggingface.co/runwayml/stable-diffusion-v1-5)

**[Türkçe](README_TR.md)** | **English**

🎨 AI-powered image generator using Stable Diffusion v1.5. A modern web application that generates stunning images from text prompts.

<img width="320" height="320" alt="art_20251105_161658" src="https://github.com/user-attachments/assets/bb8fe59e-216c-426c-a269-1a95f5553687" />
<img width="320" height="320" alt="art_20251105_153137" src="https://github.com/user-attachments/assets/9eea7990-bc28-472b-90b6-907c331e0e95" />
<img width="320" height="320" alt="art_20251105_162357" src="https://github.com/user-attachments/assets/d26a687e-d661-4874-97f7-fd84b844b5ab" />
<img width="320" height="320" alt="Ekran Görüntüsü (832)" src="https://github.com/user-attachments/assets/b1ffd472-7094-418d-9eac-bc3b7a6306ea" />


## ✨ Features

- 🎯 **Simple Interface**: Clean and modern UI
- 🚀 **Fast Generation**: Optimized Stable Diffusion v1.5
- ⚙️ **Advanced Settings**: Control steps, guidance scale, and resolution
- 💾 **Download**: Save generated images as PNG
- 🖥️ **Run Locally**: No API key needed, completely free
- 🎨 **GPU Support**: Optimized for CUDA-enabled GPUs

## 🖼️ Example Outputs

Create stunning images like:
- Fantasy landscapes and creatures
- Digital art and portraits  
- Cyberpunk scenes
- And much more!

## 📋 Requirements

### Minimum
- **Python**: 3.8+
- **RAM**: 8GB (CPU) or 6GB (GPU)
- **Storage**: ~5GB for model files

### Recommended
- **GPU**: NVIDIA GPU with 4GB+ VRAM (much faster!)
- **RAM**: 16GB
- **OS**: Windows 10/11, Linux, macOS

## 🚀 Quick Start

### Windows

```bash
# 1. Clone the repository
git clone https://github.com/Semihkulekcioglu/AI_Art_Generator.git
cd AI_Art_Generator_with_Python

# 2. Run setup
setup.bat

# 3. Start the app
run.bat
```

### Linux/Mac

```bash
# 1. Clone the repository
git clone https://github.com/Semihkulekcioglu/AI_Art_Generator_with_Python.git
cd AI_Art_Generator_with_Python

# 2. Create virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the app
python app.py
```

### First Run

On first use, Stable Diffusion model (~4GB) will be downloaded automatically. This may take 5-15 minutes depending on your internet speed.

## 🎯 Usage

1. Open `http://localhost:5000` in your browser
2. Enter your prompt (English works best)
3. Adjust settings if needed
4. Click "Generate" and wait 30-60 seconds
5. Download your artwork!

### Example Prompts

```
A beautiful sunset over mountains, digital art, vibrant colors, highly detailed

Cyberpunk city at night, neon lights, rain, futuristic, 4k

Majestic dragon flying over castle, fantasy art, epic scene
```

## ⚙️ Configuration

- **Steps**: 20-50 (higher = better quality, slower)
- **Guidance Scale**: 7-15 (higher = closer to prompt)
- **Resolution**: 512x512 (fast) or 768x768 (slow)

## 📁 Project Structure

```
AI_Art_Generator_with_Python/
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
├── README.md          # English documentation
├── README_TR.md       # Turkish documentation
├── templates/
│   └── index.html     # Frontend
├── static/
│   ├── style.css      # Styles
│   └── script.js      # JavaScript
└── generated_images/  # Output folder
```

## 🐛 Troubleshooting

### "Model could not be loaded"
```bash
pip install --upgrade diffusers transformers torch
```

### "CUDA out of memory"
- Use smaller resolution (512x512)
- Reduce step count
- Close other GPU applications

### Slow generation
- Use GPU (install CUDA)
- Reduce steps to 20-30
- Use smaller resolution

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

- Generated images are subject to Stable Diffusion v1.5 license
- Do not generate inappropriate content
- Respect copyright laws

## 🌟 Acknowledgments

- [Stable Diffusion](https://github.com/CompVis/stable-diffusion) by Stability AI
- [Hugging Face Diffusers](https://github.com/huggingface/diffusers)
- Flask framework
