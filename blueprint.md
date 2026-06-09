# Project: Aloha 4-Cut Photobooth

## Overview
A web-based 4-cut photobooth application with a vibrant Hawaii theme. Users can capture 4 photos and download a themed vertical strip. Now optimized for both desktop and mobile use.

## Features
- **Webcam Integration:** Real-time video preview with support for both desktop and mobile (front/back) cameras.
- **Manual Capture:** Users can now manually trigger each of the 4 photo captures, replacing the automatic countdown for better control.
- **Aspect Ratio Selection:** Toggle between Desktop (Landscape) and Mobile (Portrait) aspect ratios.
- **Flash Effect:** Visual feedback during photo capture.
- **Canvas Processing:** Dynamically assembles captured frames into a themed vertical strip.
- **Download:** Save the final result as a PNG image.
- **Hawaii Bikini Theme:** Tropical color palette with a vibrant Hawaii background featuring premium visual elements.
- **Inquiry & Recommendation Form:** Integrated Formspree contact form using the AJAX SDK.

## Design
- **Typography:** Expressive headers using 'Pretendard' and fallbacks.
- **Color Palette:**
  - Ocean Blue (`#0077be`)
  - Accent Orange (`#ff8c00`)
  - Sand (`#f4e4bc`)
  - Palm Green (`#3a5f0b`)
- **Layout:** Responsive design with centered content and glassmorphism-style containers.
- **Visuals:** The final output features a "Hawaii Bikini" themed background for a more energetic and stylish look.

## Plan Implementation
1. **HTML Structure:** Added camera toggle and updated capture button logic.
2. **CSS Styling:** Updated video wrapper for flexible aspect ratios and refined the Hawaii Bikini theme.
3. **JavaScript Logic:**
   - Implemented manual capture loop for 4 photos.
   - Added `facingMode` constraints for mobile camera switching.
   - Updated canvas rendering with the new background theme and layout adjustments.
4. **Integration:** Connected the inquiry form to Formspree SDK.
5. **Git Deployment:** Pushed the finalized code to the GitHub repository.

## Files
- `index.html`: Main application structure.
- `style.css`: Visual styling and theme.
- `main.js`: Core logic for camera, manual capture, and image processing.
- `blueprint.md`: Project documentation and plan tracking.
