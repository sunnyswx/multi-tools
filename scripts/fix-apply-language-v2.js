#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复 applyLanguage 函数，添加详细日志
const newApplyLanguage = `function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  const t = translations[lang];
  console.log('[ApplyLang] translations[`, 'lang']: ', t ? 'found' : 'not found');
  if (!t) {
    console.log('[ApplyLang] No translations found for:', lang);
    return;
  }
  
  // 更新所有带 data-i18n 属性的元素
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('[ApplyLang] Found ', elements.length, 'elements with data-i18n');
  
  elements.forEach((el, index) => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing element ', index + 1, ':', key);
    
    // 支持嵌套键访问
    const keys = key.split('.');
    let value = t;
    let found = true;
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        found = false;
        console.log('[ApplyLang] Key not found:', k, 'in', value);
        break;
      }
    }
    
    if (found && value) {
      if (typeof value === 'object') {
        el.textContent = value.name || value.desc || '';
      } else {
        el.textContent = value;
      }
      console.log('[ApplyLang] Updated:', el.tagName, '->', el.textContent.substring(0, 30));
    }
  });
  
  console.log('[ApplyLang] Completed for lang:', lang);
}`;

// 替换 applyLanguage 函数
const oldPattern = /function applyLanguage\(lang\) \{[\s\S]*?^\}/m;
content = content.replace(oldPattern, newApplyLanguage);

fs.writeFileSync(path, content);
console.log('已更新 applyLanguage 函数');
