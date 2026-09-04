#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 找到 applyLanguage 函数并替换为简化版本
const oldFunction = `function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  const t = translations[lang];
  console.log('[ApplyLang] translations[', lang, ']:', t ? 'found' : 'not found');
  if (!t) {
    console.log('[ApplyLang] No translations found for:', lang);
    return;
  }
  
  // 更新所有带 data-i18n 属性的元素
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('[ApplyLang] Found', elements.length, 'elements with data-i18n');
  
  elements.forEach((el, index) => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing element', index + 1, ':', key);
    
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

const newFunction = `function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  // 检查 translations 对象
  console.log('[ApplyLang] translations object:', typeof translations);
  console.log('[ApplyLang] translations keys:', Object.keys(translations).join(', '));
  
  const t = translations[lang];
  console.log('[ApplyLang] translations[', lang, ']:', t ? 'found' : 'not found');
  
  if (!t) {
    console.log('[ApplyLang] No translations found for:', lang);
    console.log('[ApplyLang] Available languages:', Object.keys(translations));
    return;
  }
  
  // 更新所有带 data-i18n 属性的元素
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('[ApplyLang] Found', elements.length, 'elements with data-i18n');
  
  elements.forEach((el, index) => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing element', index + 1, ':', key);
    
    // 支持嵌套键访问
    const keys = key.split('.');
    let value = t;
    let found = true;
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        found = false;
        console.log('[ApplyLang] Key not found:', k, 'in', typeof value);
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
  
  console.log('[ApplyLang] Completed for lang:', lang);
}`;

if (content.includes(oldFunction)) {
  content = content.replace(oldFunction, newFunction);
  fs.writeFileSync(path, content);
  console.log('已更新 applyLanguage 函数（详细调试版本）');
} else {
  console.log('未找到目标函数，尝试直接替换');
  
  // 找到函数开始位置
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
    content = content.replace(oldFunc, newFunction);
    fs.writeFileSync(path, content);
    console.log('已替换 applyLanguage 函数');
  }
}
