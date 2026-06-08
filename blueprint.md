# Project Blueprint: Lotto Number Generator

## Overview

This is a simple web application that generates and displays a set of lottery numbers. It's designed to be clean, modern, and easy to use, showcasing modern web development practices without relying on external frameworks.

## Core Features & Design

### Functionality
- **Number Generation:** Generates 6 unique random numbers from 1 to 45.
- **Display:** The generated numbers are displayed in a visually appealing way.
- **Interactivity:** A button allows the user to generate a new set of numbers at any time.

### Design & Style
- **Layout:** A centered, card-based layout that is responsive and works well on all screen sizes.
- **Color Palette:** A vibrant and modern color scheme. The background has a subtle texture. Numbers are color-coded for visual distinction.
- **Typography:** Clear and readable fonts with a strong hierarchy.
- **Effects:** Soft drop shadows on the main card and interactive "glow" effects on the button to create depth and provide user feedback.
- **Iconography:** A refresh icon is used on the button to visually communicate its purpose.

## Current Task: Initial Implementation

**Goal:** Transform the initial "Hello, World!" project into a fully functional Lotto Number Generator.

**Steps:**

1.  **Update HTML (`index.html`):**
    *   Set the document title to "로또 번호 추첨기".
    *   Create the main structure: a container for the app, a title, a display area for the numbers, and a "Generate" button with an SVG icon.
2.  **Update CSS (`style.css`):**
    *   Implement the modern design described above using CSS variables, flexbox, and animations.
    *   Style the main container as a "lifted" card.
    *   Create distinct, color-coded styles for each number ball.
    *   Style the "Generate" button with interactive hover and active effects.
3.  **Update JavaScript (`main.js`):**
    *   Add an event listener to the "Generate" button.
    *   Implement the logic to generate 6 unique random numbers between 1 and 45.
    *   Write a function to dynamically create and insert the number "balls" into the HTML display area with a staggered animation effect.
