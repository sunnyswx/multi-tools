#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// Fix the language switching logic
content = content.replace(
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);`,
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);
            
            // Force re-apply language to ensure header and description are updated
            setTimeout(() => {
                const h1 = document.querySelector('h1[data-i18n="tools.image-compressor.name"]');
                const p = document.querySelector('p[data-i18n="tools.image-compressor.desc"]');
                if (h1 && translations[lang]?.tools?.['image-compressor']) {
                    h1.textContent = '🗜️ ' + translations[lang].tools['image-compressor'].name;
                }
                if (p && translations[lang]?.tools?.['image-compressor']) {
                    p.textContent = translations[lang].tools['image-compressor'].desc;
                }
            }, 100);`
);

fs.writeFileSync(path, content);
console.log('Fixed image-compressor language follow logic');
