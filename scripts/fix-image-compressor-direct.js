#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// Fix: Add direct JavaScript update for h1 and p elements
content = content.replace(
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);`,
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);
            
            // Directly update title and description based on language
            const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
            const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
            if (h1 && translations[lang]?.['image-compressor-name']) {
                h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
            }
            if (p && translations[lang]?.['image-compressor-desc']) {
                p.textContent = translations[lang]['image-compressor-desc'].desc;
            }`
);

fs.writeFileSync(path, content);
console.log('Fixed image-compressor direct language update');
