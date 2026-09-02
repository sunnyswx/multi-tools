#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 在 applyLanguage 之后，手动更新标题和描述
content = content.replace(
  `        // Simple approach: just call applyLanguage directly
        const lang = getLanguage();
        applyLanguage(lang);
        console.log('Language initialized:', lang);`,
  `        // Simple approach: just call applyLanguage directly
        const lang = getLanguage();
        applyLanguage(lang);
        console.log('Language initialized:', lang);
        
        // Manually update title and description
        const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
        const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
        if (h1) {
            h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
        }
        if (p) {
            p.textContent = translations[lang]['image-compressor-desc'].name;
        }
        console.log('Title updated:', h1?.textContent);
        console.log('Description updated:', p?.textContent);`
);

fs.writeFileSync(path, content);
console.log('Added manual update after applyLanguage');
