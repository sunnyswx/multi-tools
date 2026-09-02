#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// Fix: Ensure language is applied after DOM is ready and lang.js is loaded
content = content.replace(
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);
            
            // Directly update title and description
            const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
            const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
            if (h1 && translations[lang]?.['image-compressor-name']) {
                h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
            }
            if (p && translations[lang]?.['image-compressor-desc']) {
                p.textContent = translations[lang]['image-compressor-desc'].desc;
            }`,
  `        // Wait for lang.js to be loaded
        function initLanguage() {
            if (typeof getLanguage === 'function' && typeof applyLanguage === 'function' && typeof translations !== 'undefined') {
                const lang = getLanguage();
                applyLanguage(lang);
                
                // Directly update title and description
                const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
                const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
                if (h1 && translations[lang]?.['image-compressor-name']) {
                    h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
                }
                if (p && translations[lang]?.['image-compressor-desc']) {
                    p.textContent = translations[lang]['image-compressor-desc'].desc;
                }
            } else {
                // Retry after a short delay
                setTimeout(initLanguage, 100);
            }
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            initLanguage();
            
            // Also listen for language changes
            const langSelect = document.getElementById('langSelect');
            if (langSelect) {
                langSelect.addEventListener('change', function() {
                    const lang = this.value;
                    applyLanguage(lang);
                    
                    // Directly update title and description
                    const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
                    const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
                    if (h1 && translations[lang]?.['image-compressor-name']) {
                        h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
                    }
                    if (p && translations[lang]?.['image-compressor-desc']) {
                        p.textContent = translations[lang]['image-compressor-desc'].desc;
                    }
                });
            }`
);

fs.writeFileSync(path, content);
console.log('Fixed language initialization with retry logic');
