#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 在文件末尾添加调试函数
const debugCode = `

// Debug function - check translations
function debugTranslations() {
  console.log('=== Debug Translations ===');
  console.log('translations type:', typeof translations);
  console.log('translations keys:', Object.keys(translations));
  
  const lang = getLanguage();
  console.log('Current lang:', lang);
  
  if (translations[lang]) {
    console.log('translations[' + lang + '] exists');
    console.log('translations[' + lang + '] keys:', Object.keys(translations[lang]));
    
    if (translations[lang].tools) {
      console.log('translations[' + lang + '].tools exists');
      console.log('tools keys:', Object.keys(translations[lang].tools).slice(0, 10).join(', '));
      
      if (translations[lang].tools['image-compressor']) {
        console.log('image-compressor found:', JSON.stringify(translations[lang].tools['image-compressor']));
      } else {
        console.log('❌ image-compressor not found in tools');
      }
    } else {
      console.log('❌ tools object not found');
    }
  } else {
    console.log('❌ translations[' + lang + '] not found');
  }
  
  // Check what the page is looking for
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('Elements with data-i18n:', elements.length);
  elements.forEach((el, i) => {
    const key = el.getAttribute('data-i18n');
    console.log('Element', i + 1, ':', key);
    
    // Try to find it
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.log('  ❌ Not found at key:', k);
        break;
      }
    }
    if (value) {
      console.log('  ✅ Found:', typeof value === 'object' ? JSON.stringify(value) : value);
    }
  });
}
`;

content += debugCode;
fs.writeFileSync(path, content);
console.log('已添加 debugTranslations 函数');
