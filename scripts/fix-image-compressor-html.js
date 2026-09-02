#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 修改 JavaScript 代码，直接从 translations[lang] 获取翻译
content = content.replace(
  `            if (h1 && translations[lang]?.['image-compressor-name']) {
                h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
            }
            if (p && translations[lang]?.['image-compressor-desc']) {
                p.textContent = translations[lang]['image-compressor-desc'].desc;
            }`,
  `            if (h1 && translations[lang]?.['image-compressor-name']) {
                h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
            }
            if (p && translations[lang]?.['image-compressor-desc']) {
                p.textContent = translations[lang]['image-compressor-desc'].name;
            }`
);

fs.writeFileSync(path, content);
console.log('Fixed image-compressor.html to use correct translation key');
