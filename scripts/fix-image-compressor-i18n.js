#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// Fix: Add data-i18n attributes to h1 and p, and fix the language loading
content = content.replace(
  `<h1 data-i18n="tools.image-compressor.name">🗜️ Image Compressor</h1>
                <p data-i18n="tools.image-compressor.desc">Compress images online for free</p>`,
  `<h1 data-i18n="image-compressor-name">🗜️ Image Compressor</h1>
                <p data-i18n="image-compressor-desc">Compress images online for free</p>`
);

content = content.replace(
  `        document.addEventListener('DOMContentLoaded', function() {
            // Ensure lang.js is loaded before applying language
            if (typeof getLanguage === 'function' && typeof applyLanguage === 'function') {
                const lang = getLanguage();
                applyLanguage(lang);
            }`,
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);`
);

fs.writeFileSync(path, content);
console.log('Fixed image-compressor data-i18n attributes');
