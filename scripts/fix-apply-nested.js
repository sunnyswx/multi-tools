#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 找到 applyLanguage 函数并替换为支持嵌套键的版本
const funcStart = content.indexOf('function applyLanguage(lang) {');
const funcEnd = content.indexOf('\n}\n\n// Change language', funcStart);

if (funcStart === -1 || funcEnd === -1) {
  console.log('未找到函数');
  process.exit(1);
}

console.log('找到函数，位置:', funcStart, '-', funcEnd);

const newFunction = `function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  const t = translations[lang] || translations.en;
  console.log('[ApplyLang] translations[', lang, ']:', t ? 'found' : 'not found');
  
  if (!t) {
    console.log('[ApplyLang] No translations found for:', lang);
    console.log('[ApplyLang] Available languages:', Object.keys(translations));
    return;
  }
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('[ApplyLang] Found', elements.length, 'elements with data-i18n');
  
  elements.forEach((el, index) => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing element', index + 1, ':', key);
    
    // 支持嵌套键访问 (tools.image-compressor.name)
    const keys = key.split('.');
    let value = t;
    let found = true;
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        found = false;
        console.log('[ApplyLang] Key not found:', k);
        console.log('[ApplyLang] Available keys:', value ? Object.keys(value).slice(0, 10).join(', ') : 'none');
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
    } else {
      console.log('[ApplyLang] Value not found for key:', key);
    }
  });
  
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      if (value && value[k]) value = value[k];
      else return;
    }
    if (value) el.placeholder = value;
  });
  
  // Update direction for RTL languages
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  
  console.log('[ApplyLang] Completed for lang:', lang);
}`;

console.log('新函数长度:', newFunction.length);

// 替换函数
content = content.substring(0, funcStart) + newFunction + content.substring(funcEnd + 2);

fs.writeFileSync(path, content);
console.log('已替换 applyLanguage 函数');
