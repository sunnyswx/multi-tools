#!/usr/bin/env node
const fs = require('fs');

const htmlPath = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';
let content = fs.readFileSync(htmlPath, 'utf8');

// 简化 JavaScript 代码，使用正确的翻译键
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
                    p.textContent = translations[lang]['image-compressor-desc'].desc;
                }
            } else {
                // Retry after a short delay
                setTimeout(initLanguage, 100);
            }
        }`,
  `        // Simple language initialization
        const lang = getLanguage();
        applyLanguage(lang);
        console.log('Language initialized:', lang);`
);

fs.writeFileSync(htmlPath, content);
console.log('HTML 修复完成');
