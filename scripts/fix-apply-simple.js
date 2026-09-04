#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复 applyLanguage 函数 - 简化版本
const newApplyLanguage = `function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  // 直接访问 translations[lang].tools['image-compressor'].name
  const t = translations[lang];
  console.log('[ApplyLang] translations[' + lang + ']:', t ? 'found' : 'not found');
  
  if (!t || !t.tools) {
    console.log('[ApplyLang] No tools translations found');
    return;
  }
  
  // Update all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('[ApplyLang] Found', elements.length, 'elements');
  
  elements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing:', key);
    
    // 分割键并逐级访问
    const parts = key.split('.');
    let value = t;
    
    for (const part of parts) {
      if (value && value[part] !== undefined) {
        value = value[part];
      } else {
        console.log('[ApplyLang] Key not found:', part);
        value = null;
        break;
      }
    }
    
    if (value) {
      if (typeof value === 'object' && value.name) {
        el.textContent = value.name;
      } else if (typeof value === 'object' && value.desc) {
        el.textContent = value.desc;
      } else {
        el.textContent = value;
      }
      console.log('[ApplyLang] Updated to:', el.textContent.substring(0, 30));
    }
  });
  
  console.log('[ApplyLang] Completed');
}`;

// 找到旧的 applyLanguage 函数并替换
const startMarker = 'function applyLanguage(lang) {';
const endMarker = '// Change language';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex === -1 || endIndex === -1) {
  console.log('未找到函数边界');
  process.exit(1);
}

console.log('找到函数，开始替换...');

// 替换函数
content = content.substring(0, startIndex) + newApplyLanguage + '\n\n' + content.substring(endIndex);

fs.writeFileSync(path, content);
console.log('✅ 已修复 applyLanguage 函数');
