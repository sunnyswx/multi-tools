#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 替换 applyLanguage 函数
const oldFunction = `function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });
  
  // Update language selector
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.value = lang;
  }
  
  // Update direction for RTL languages
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
}`;

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
  
  // Update language selector
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.value = lang;
  }
  
  // Update direction for RTL languages
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  
  console.log('[ApplyLang] Completed for lang:', lang);
}`;

if (content.includes(oldFunction)) {
  content = content.replace(oldFunction, newFunction);
  fs.writeFileSync(path, content);
  console.log('已替换 applyLanguage 函数（支持嵌套键）');
} else {
  console.log('未找到目标函数，尝试其他匹配方式');
  
  // 尝试更宽松的匹配
  const startIndex = content.indexOf('function applyLanguage(lang) {');
  if (startIndex !== -1) {
    // 找到函数结束位置
    let braceCount = 0;
    let endIndex = startIndex;
    for (let i = startIndex; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        endIndex = i + 1;
        break;
      }
    }
    
    const oldFunc = content.substring(startIndex, endIndex);
    if (oldFunc.includes('// Update HTML lang attribute')) {
      content = content.replace(oldFunc, newFunction);
      fs.writeFileSync(path, content);
      console.log('已替换 applyLanguage 函数（宽松匹配）');
    }
  }
}
