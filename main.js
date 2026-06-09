const video = document.getElementById('webcam');
const startBtn = document.getElementById('start-btn');
const captureBtn = document.getElementById('capture-btn');
const downloadBtn = document.getElementById('download-btn');
const captureCounterEl = document.getElementById('capture-counter');
const flashEl = document.getElementById('flash');
const resultCanvas = document.getElementById('result-canvas');
const hiddenCanvas = document.getElementById('hidden-canvas');
const resultContainer = document.getElementById('result-container');
const videoWrapper = document.querySelector('.video-wrapper');

const modeDesktopBtn = document.getElementById('mode-desktop');
const modeMobileBtn = document.getElementById('mode-mobile');

const BACKGROUND_IMAGE_URL = 'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=1000';

let capturedImages = [];
const TOTAL_PHOTOS = 4;
let currentCameraMode = 'desktop'; // 'desktop' or 'mobile'
let stream = null;

// 1. Camera Initialization
async function initCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    const constraints = {
        video: {
            width: currentCameraMode === 'desktop' ? 1280 : 720,
            height: currentCameraMode === 'desktop' ? 720 : 1280,
            facingMode: currentCameraMode === 'desktop' ? 'user' : { ideal: 'user' }
        },
        audio: false
    };

    try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        
        // Update UI
        videoWrapper.className = `video-wrapper ${currentCameraMode}`;
        startBtn.textContent = '카메라 재연결';
        captureBtn.disabled = false;
        
        // Reset capture state
        resetCapture();
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("카메라를 켤 수 없습니다. 권한을 확인해주세요.");
    }
}

function resetCapture() {
    capturedImages = [];
    captureCounterEl.textContent = `0 / ${TOTAL_PHOTOS}`;
    captureCounterEl.classList.add('hidden');
    captureBtn.textContent = `촬영하기 (0/${TOTAL_PHOTOS})`;
    resultContainer.classList.add('hidden');
    downloadBtn.classList.add('hidden');
}

startBtn.addEventListener('click', initCamera);

// Mode Selection
modeDesktopBtn.addEventListener('click', () => {
    currentCameraMode = 'desktop';
    modeDesktopBtn.classList.add('active');
    modeMobileBtn.classList.remove('active');
    if (stream) initCamera();
});

modeMobileBtn.addEventListener('click', () => {
    currentCameraMode = 'mobile';
    modeMobileBtn.classList.add('active');
    modeDesktopBtn.classList.remove('active');
    if (stream) initCamera();
});

// 2. Capture Logic
captureBtn.addEventListener('click', () => {
    if (capturedImages.length >= TOTAL_PHOTOS) return;

    capturePhoto();

    const count = capturedImages.length;
    captureCounterEl.textContent = `${count} / ${TOTAL_PHOTOS}`;
    captureCounterEl.classList.remove('hidden');
    captureBtn.textContent = `촬영하기 (${count}/${TOTAL_PHOTOS})`;

    if (count === TOTAL_PHOTOS) {
        captureBtn.disabled = true;
        renderPhotoStrip();
    }
});

function capturePhoto() {
    // Flash effect
    flashEl.classList.remove('hidden');
    flashEl.classList.add('flash-animation');
    setTimeout(() => {
        flashEl.classList.remove('flash-animation');
        flashEl.classList.add('hidden');
    }, 300);

    const context = hiddenCanvas.getContext('2d');
    hiddenCanvas.width = video.videoWidth;
    hiddenCanvas.height = video.videoHeight;
    
    // Draw mirrored video frame
    context.save();
    context.translate(hiddenCanvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
    context.restore();
    
    capturedImages.push(hiddenCanvas.toDataURL('image/png'));
}

// 3. Render Final 4-Cut Strip
function renderPhotoStrip() {
    const ctx = resultCanvas.getContext('2d');
    
    // Strip settings
    const isMobile = currentCameraMode === 'mobile';
    const photoWidth = 400;
    const photoHeight = isMobile ? 533 : 300; // 3:4 or 4:3
    const margin = 20;
    const headerHeight = 80;
    const footerHeight = 100;
    
    resultCanvas.width = photoWidth + (margin * 2);
    resultCanvas.height = (photoHeight * 4) + (margin * 5) + headerHeight + footerHeight;

    // Load and Draw Background Image
    const bgImg = new Image();
    bgImg.crossOrigin = "anonymous";
    bgImg.onload = () => {
        // Draw background image (cover effect)
        const scale = Math.max(resultCanvas.width / bgImg.width, resultCanvas.height / bgImg.height);
        const x = (resultCanvas.width / 2) - (bgImg.width / 2) * scale;
        const y = (resultCanvas.height / 2) - (bgImg.height / 2) * scale;
        ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);

        // Add semi-transparent overlay for better contrast
        ctx.fillStyle = 'rgba(255, 105, 180, 0.2)';
        ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

        // Header Decoration
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, resultCanvas.width, headerHeight - 10);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 10;
        ctx.fillText('👙 ALOHA BIKINI 🏝️', resultCanvas.width / 2, 55);
        ctx.shadowBlur = 0;

        // Draw Photos
        let loadedCount = 0;
        capturedImages.forEach((src, index) => {
            const img = new Image();
            img.onload = () => {
                const yPos = headerHeight + margin + (index * (photoHeight + margin));
                
                // Photo Border
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(margin - 5, yPos - 5, photoWidth + 10, photoHeight + 10);
                
                ctx.drawImage(img, margin, yPos, photoWidth, photoHeight);
                
                loadedCount++;
                if (loadedCount === TOTAL_PHOTOS) {
                    finalizeCanvas(ctx, resultCanvas);
                }
            };
            img.src = src;
        });
    };
    bgImg.src = BACKGROUND_IMAGE_URL;
}

function finalizeCanvas(ctx, canvas) {
    // Footer Text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('HOT SUMMER IN HAWAII', canvas.width / 2, canvas.height - 55);
    
    ctx.font = '16px Arial';
    ctx.fillText(`2024.06.09 @ Aloha Booth`, canvas.width / 2, canvas.height - 30);

    resultContainer.classList.remove('hidden');
    downloadBtn.classList.remove('hidden');
    captureBtn.disabled = false;
    captureBtn.textContent = '다시 촬영하기';
    captureBtn.onclick = () => location.reload(); // Simple reset
}

// 4. Download Function
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'aloha-bikini-4-cut.png';
    link.href = resultCanvas.toDataURL();
    link.click();
});
