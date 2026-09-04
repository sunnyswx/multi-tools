#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 找到 applyLanguage 函数的开始和结束
const funcStart = content.indexOf('function applyLanguage(lang) {');
if (funcStart === -1) {
  console.log('未找到 applyLanguage 函数');
  process.exit(1);
}

// 找到函数结束的大括号
let braceCount = 0;
let funcEnd = funcStart;
for (let i = funcStart; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') braceCount--;
  if (braceCount === 0) {
    funcEnd = i + 1;
    break;
  }
}

const oldFunction = content.substring(funcStart, funcEnd);
console.log('找到函数，长度:', oldFunction.length);
console.log('函数开头:', oldFunction.substring(0, 100));

// 新的 applyLanguage 函数
const newFunction = `function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  const t = translations[lang] || translations.en;
  console.log('[ApplyLang] translations[', lang, ']:', t ? 'found' : 'not found');
  
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
        console.log('[ApplyLang] Available keys:', value ? Object.keys(value).slice(0, 5).join(', ') : 'none');
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
  
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    // 支持嵌套键
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
content = content.substring(0, funcStart) + newFunction + content.substring(funcEnd);

fs.writeFileSync(path, content);
console.log('已替换 applyLanguage 函数');
