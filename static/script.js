// DOM Elements
const generateForm = document.getElementById('generateForm');
const generateBtn = document.getElementById('generateBtn');
const resultSection = document.getElementById('resultSection');
const loadingState = document.getElementById('loadingState');
const imageContainer = document.getElementById('imageContainer');
const errorState = document.getElementById('errorState');
const generatedImage = document.getElementById('generatedImage');
const downloadBtn = document.getElementById('downloadBtn');
const modelStatus = document.getElementById('modelStatus');
const toggleSettingsBtn = document.getElementById('toggleSettings');
const advancedSettings = document.getElementById('advancedSettings');

// Slider value displays
const stepsSlider = document.getElementById('steps');
const stepsValue = document.getElementById('stepsValue');
const guidanceSlider = document.getElementById('guidanceScale');
const guidanceValue = document.getElementById('guidanceValue');

// ===== Initialize ===== 
document.addEventListener('DOMContentLoaded', () => {
    checkModelStatus();
    setupEventListeners();
});

// ===== Event Listeners =====
function setupEventListeners() {
    // Form submission
    generateForm.addEventListener('submit', handleGenerate);
    
    // Toggle advanced settings
    toggleSettingsBtn.addEventListener('click', toggleAdvancedSettings);
    
    // Slider updates
    stepsSlider.addEventListener('input', (e) => {
        stepsValue.textContent = e.target.value;
    });
    
    guidanceSlider.addEventListener('input', (e) => {
        guidanceValue.textContent = e.target.value;
    });
}

// ===== Toggle Advanced Settings =====
function toggleAdvancedSettings() {
    toggleSettingsBtn.classList.toggle('active');
    advancedSettings.classList.toggle('show');
}

// ===== Check Model Status =====
async function checkModelStatus() {
    try {
        const response = await fetch('/api/model-status');
        const data = await response.json();
        
        updateModelStatus(data);
    } catch (error) {
        console.error('Model durumu kontrol edilemedi:', error);
        modelStatus.classList.add('error');
        modelStatus.querySelector('.status-text').textContent = 'Bağlantı hatası';
    }
}

function updateModelStatus(data) {
    const statusText = modelStatus.querySelector('.status-text');
    
    if (data.loaded) {
        modelStatus.classList.add('loaded');
        const device = data.has_gpu ? 'GPU 🚀' : 'CPU ⚡';
        statusText.textContent = `Model hazır (${device})`;
    } else {
        statusText.textContent = 'Model bekleniyor...';
    }
}

// ===== Handle Generate =====
async function handleGenerate(e) {
    e.preventDefault();
    
    // Get form data
    const prompt = document.getElementById('prompt').value.trim();
    const negativePrompt = document.getElementById('negativePrompt').value.trim();
    const steps = stepsSlider.value;
    const guidanceScale = guidanceSlider.value;
    const resolution = document.getElementById('resolution').value;
    
    if (!prompt) {
        showError('Lütfen bir prompt girin!');
        return;
    }
    
    // Parse resolution
    const [width, height] = resolution.split('x').map(Number);
    
    // Prepare request data
    const requestData = {
        prompt: prompt,
        negative_prompt: negativePrompt,
        steps: parseInt(steps),
        guidance_scale: parseFloat(guidanceScale),
        width: width,
        height: height
    };
    
    // Show loading state
    showLoading();
    
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showGeneratedImage(data);
        } else {
            showError(data.error || 'Bir hata oluştu!');
        }
        
    } catch (error) {
        console.error('Generate error:', error);
        showError('Sunucu ile iletişim kurulamadı. Lütfen backend\'in çalıştığından emin olun.');
    }
}

// ===== Show Loading State =====
function showLoading() {
    resultSection.style.display = 'block';
    loadingState.style.display = 'flex';
    imageContainer.style.display = 'none';
    errorState.style.display = 'none';
    
    // Disable generate button
    generateBtn.disabled = true;
    generateBtn.querySelector('.btn-text').textContent = 'Oluşturuluyor...';
    
    // Scroll to result section
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ===== Show Generated Image =====
function showGeneratedImage(data) {
    loadingState.style.display = 'none';
    imageContainer.style.display = 'block';
    errorState.style.display = 'none';
    
    // Set image
    generatedImage.src = data.image;
    
    // Set info
    document.getElementById('generationTime').textContent = `${data.generation_time} saniye`;
    document.getElementById('usedPrompt').textContent = data.prompt;
    
    // Set download link
    downloadBtn.href = data.image;
    downloadBtn.download = data.filename;
    
    // Re-enable generate button
    generateBtn.disabled = false;
    generateBtn.querySelector('.btn-text').textContent = 'Görsel Oluştur';
    
    // Add celebration animation
    confetti();
}

// ===== Show Error =====
function showError(message) {
    loadingState.style.display = 'none';
    imageContainer.style.display = 'none';
    errorState.style.display = 'flex';
    resultSection.style.display = 'block';
    
    document.getElementById('errorText').textContent = message;
    
    // Re-enable generate button
    generateBtn.disabled = false;
    generateBtn.querySelector('.btn-text').textContent = 'Görsel Oluştur';
}

// ===== Confetti Effect (Simple) =====
function confetti() {
    // Simple confetti effect using emojis
    const emojis = ['🎨', '✨', '🌟', '💫', '⭐'];
    
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * window.innerWidth + 'px';
            emoji.style.top = '-50px';
            emoji.style.fontSize = '2rem';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '9999';
            emoji.style.transition = 'all 2s ease-out';
            
            document.body.appendChild(emoji);
            
            setTimeout(() => {
                emoji.style.top = window.innerHeight + 'px';
                emoji.style.opacity = '0';
                emoji.style.transform = `rotate(${Math.random() * 360}deg)`;
            }, 10);
            
            setTimeout(() => {
                emoji.remove();
            }, 2000);
        }, i * 100);
    }
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to generate
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!generateBtn.disabled) {
            generateForm.requestSubmit();
        }
    }
});

