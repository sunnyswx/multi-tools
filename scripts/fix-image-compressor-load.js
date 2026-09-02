#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// Fix the language switching logic - ensure applyLanguage is called after DOM is ready
content = content.replace(
  `        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);`,
  `        document.addEventListener('DOMContentLoaded', function() {
            // Ensure lang.js is loaded before applying language
            if (typeof getLanguage === 'function' && typeof applyLanguage === 'function') {
                const lang = getLanguage();
                applyLanguage(lang);
            }`
);

fs.writeFileSync(path, content);
console.log('Fixed image-compressor language loading');
