# Project: Aloha 4-Cut Photobooth

## Overview
A web-based 4-cut photobooth application with a vibrant Hawaii theme. Users can access their webcam, take 4 consecutive photos with a countdown, and download a vertically assembled 4-cut photo strip.

## Features
- **Webcam Integration:** Real-time video preview with mirror effect.
- **Automated Capture:** 3-second countdown for each of the 4 photos.
- **Flash Effect:** Visual feedback during photo capture.
- **Canvas Processing:** Dynamically assembles captured frames into a themed vertical strip.
- **Download:** Save the final result as a PNG image.
- **Hawaii Theme:** Tropical color palette (ocean blue, sand, palm green) and decorative elements.

## Design
- **Typography:** Expressive headers using 'Pretendard' and fallbacks.
- **Color Palette:**
  - Ocean Blue (`#0077be`)
  - Accent Orange (`#ff8c00`)
  - Sand (`#f4e4bc`)
  - Palm Green (`#3a5f0b`)
- **Layout:** Responsive design with centered content and glassmorphism-style containers.

## Plan Implementation
1. **HTML Structure:** Defined the video viewport, countdown overlay, and result canvas.
2. **CSS Styling:** Implemented the Hawaii theme, button animations, and photo strip layout.
3. **JavaScript Logic:**
   - Managed `getUserMedia` for webcam access.
   - Implemented an async loop for the 4-capture sequence.
   - Used `<canvas>` to composite the final image with headers and footers.
4. **Git Deployment:** Pushed the finalized code to the GitHub repository.

## Files
- `index.html`: Main application structure.
- `style.css`: Visual styling and theme.
- `main.js`: Core logic for camera and image processing.
- `blueprint.md`: Project documentation and plan tracking.
