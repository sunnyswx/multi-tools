#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 添加详细调试日志
content = content.replace(
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
                    p.textContent = translations[lang]['image-compressor-desc'].name;
                }
            } else {
                // Retry after a short delay
                setTimeout(initLanguage, 100);
            }
        }`,
  `        // Wait for lang.js to be loaded
        function initLanguage() {
            console.log('=== initLanguage called ===');
            console.log('getLanguage exists:', typeof getLanguage);
            console.log('applyLanguage exists:', typeof applyLanguage);
            console.log('translations exists:', typeof translations);
            
            if (typeof getLanguage === 'function' && typeof applyLanguage === 'function' && typeof translations !== 'undefined') {
                const lang = getLanguage();
                console.log('Current language:', lang);
                console.log('translations[lang]:', translations[lang]);
                console.log('translations[lang]["image-compressor-name"]:', translations[lang]?.['image-compressor-name']);
                
                applyLanguage(lang);
                
                // Directly update title and description
                const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
                const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
                console.log('h1 found:', !!h1, 'p found:', !!p);
                
                if (h1 && translations[lang]?.['image-compressor-name']) {
                    h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
                    console.log('Updated h1 to:', h1.textContent);
                }
                if (p && translations[lang]?.['image-compressor-desc']) {
                    p.textContent = translations[lang]['image-compressor-desc'].name;
                    console.log('Updated p to:', p.textContent);
                }
            } else {
                console.log('Functions not ready, retrying...');
                // Retry after a short delay
                setTimeout(initLanguage, 100);
            }
        }`
);

fs.writeFileSync(path, content);
console.log('Added detailed debug logs');
