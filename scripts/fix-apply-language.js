#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复 applyLanguage 函数，支持嵌套键访问
const oldApplyLang = `// Apply language to page
function applyLanguage(lang) {
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
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}`;

const newApplyLang = `// Apply language to page
function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing key:', key);
    
    // 支持嵌套键访问
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.log('[ApplyLang] Key not found:', k);
        value = null;
        break;
      }
    }
    
    if (value) {
      // 如果是对象，返回 name 或 desc
      if (typeof value === 'object') {
        el.textContent = value.name || value.desc || '';
      } else {
        el.textContent = value;
      }
      console.log('[ApplyLang] Updated:', el.textContent);
    }
  });
  
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    if (value) {
      el.placeholder = typeof value === 'object' ? (value.name || value.desc || '') : value;
    }
  });
  
  // Update language selector
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.value = lang;
  }
  
  // Update direction for RTL languages
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}`;

content = content.replace(oldApplyLang, newApplyLang);

fs.writeFileSync(path, content);
console.log('修复 applyLanguage 函数支持嵌套键');
