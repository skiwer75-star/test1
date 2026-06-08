const video = document.getElementById('webcam');
const startBtn = document.getElementById('start-btn');
const captureBtn = document.getElementById('capture-btn');
const downloadBtn = document.getElementById('download-btn');
const countdownEl = document.getElementById('countdown');
const flashEl = document.getElementById('flash');
const resultCanvas = document.getElementById('result-canvas');
const hiddenCanvas = document.getElementById('hidden-canvas');
const resultContainer = document.getElementById('result-container');

let capturedImages = [];
const TOTAL_PHOTOS = 4;
const COUNTDOWN_SECONDS = 3;

// 1. Start Camera
startBtn.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 }, 
            audio: false 
        });
        video.srcObject = stream;
        startBtn.disabled = true;
        captureBtn.disabled = false;
        startBtn.textContent = '카메라 연결됨';
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("카메라 접근 권한이 필요합니다.");
    }
});

// 2. Capture Logic
captureBtn.addEventListener('click', async () => {
    capturedImages = [];
    captureBtn.disabled = true;
    resultContainer.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    for (let i = 0; i < TOTAL_PHOTOS; i++) {
        await runCountdown(COUNTDOWN_SECONDS);
        capturePhoto();
    }

    renderPhotoStrip();
    captureBtn.disabled = false;
});

// Countdown Function
function runCountdown(seconds) {
    return new Promise((resolve) => {
        let count = seconds;
        countdownEl.textContent = count;
        countdownEl.classList.remove('hidden');

        const timer = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else {
                clearInterval(timer);
                countdownEl.classList.add('hidden');
                resolve();
            }
        }, 1000);
    });
}

// Capture Single Photo
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
    
    // Draw mirrored video frame to hidden canvas
    context.translate(hiddenCanvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
    
    capturedImages.push(hiddenCanvas.toDataURL('image/png'));
}

// 3. Render Final 4-Cut Strip
function renderPhotoStrip() {
    const ctx = resultCanvas.getContext('2d');
    
    // Strip settings
    const photoWidth = 400;
    const photoHeight = 300;
    const margin = 20;
    const headerHeight = 60;
    const footerHeight = 80;
    
    resultCanvas.width = photoWidth + (margin * 2);
    resultCanvas.height = (photoHeight * 4) + (margin * 5) + headerHeight + footerHeight;

    // Draw Background (Hawaii Blue/Sand)
    ctx.fillStyle = '#f4e4bc'; // Sand color
    ctx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);

    // Draw Header Text
    ctx.fillStyle = '#0077be';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🌺 ALOHA HAWAII 🏝️', resultCanvas.width / 2, 45);

    // Draw Photos
    capturedImages.forEach((src, index) => {
        const img = new Image();
        img.onload = () => {
            const yPos = headerHeight + margin + (index * (photoHeight + margin));
            ctx.drawImage(img, margin, yPos, photoWidth, photoHeight);
            
            // If it's the last image, show the container and download button
            if (index === TOTAL_PHOTOS - 1) {
                resultContainer.classList.remove('hidden');
                downloadBtn.classList.remove('hidden');
                
                // Add Footer Text/Decorations
                ctx.fillStyle = '#3a5f0b';
                ctx.font = '20px Arial';
                ctx.fillText('2024.06.08 @ Aloha Booth', resultCanvas.width / 2, resultCanvas.height - 30);
            }
        };
        img.src = src;
    });
}

// 4. Download Function
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'aloha-4-cut.png';
    link.href = resultCanvas.toDataURL();
    link.click();
});
