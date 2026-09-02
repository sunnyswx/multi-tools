#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// Remove all debug logs and add proper language handling
content = content.replace(
  `        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM loaded, checking language functions...');
            console.log('getLanguage exists:', typeof getLanguage);
            console.log('applyLanguage exists:', typeof applyLanguage);
            console.log('translations exists:', typeof translations);
            
            const lang = getLanguage();
            console.log('Current language:', lang);
            console.log('Translations keys:', translations ? Object.keys(translations) : 'N/A');
            
            if (applyLanguage) {
                applyLanguage(lang);
                console.log('applyLanguage called');
            }
            
            // Directly update title and description based on language
            const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
            const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
            console.log('h1 found:', !!h1, 'p found:', !!p);
            
            if (h1 && translations && translations[lang] && translations[lang]['image-compressor-name']) {
                h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
                console.log('Updated h1 to:', h1.textContent);
            }
            if (p && translations && translations[lang] && translations[lang]['image-compressor-desc']) {
                p.textContent = translations[lang]['image-compressor-desc'].desc;
                console.log('Updated p to:', p.textContent);
            }
            
            // Listen for language changes
            const langSelect = document.getElementById('langSelect');
            if (langSelect) {
                langSelect.addEventListener('change', function() {
                    console.log('Language changed to:', this.value);
                    const newLang = this.value;
                    if (applyLanguage) {
                        applyLanguage(newLang);
                    }
                    // Directly update
                    const newH1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
                    const newP = document.querySelector('p[data-i18n="image-compressor-desc"]');
                    if (newH1 && translations && translations[newLang] && translations[newLang]['image-compressor-name']) {
                        newH1.textContent = '🗜️ ' + translations[newLang]['image-compressor-name'].name;
                    }
                    if (newP && translations && translations[newLang] && translations[newLang]['image-compressor-desc']) {
                        newP.textContent = translations[newLang]['image-compressor-desc'].desc;
                    }
                });
            }`,
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
            }`
);

fs.writeFileSync(path, content);
console.log('Cleaned up debug logs');
