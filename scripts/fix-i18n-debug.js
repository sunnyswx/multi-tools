#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/js/i18n.js';

let content = fs.readFileSync(path, 'utf8');

// 优化 applyLanguage 方法，添加调试日志
const oldApplyLanguage = `  applyLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translatedText = this.translate(key);
      
      // 根据元素类型决定如何设置内容
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translatedText;
      } else {
        el.textContent = translatedText;
      }
    });
  }`;

const newApplyLanguage = `  applyLanguage() {
    console.log('[I18n] applyLanguage called, currentLang:', this.currentLang);
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('[I18n] Found', elements.length, 'elements with data-i18n');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translatedText = this.translate(key);
      console.log('[I18n]', key, '=>', translatedText);
      
      // 根据元素类型决定如何设置内容
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translatedText;
      } else {
        el.textContent = translatedText;
      }
    });
  }`;

content = content.replace(oldApplyLanguage, newApplyLanguage);

fs.writeFileSync(path, content);
console.log('添加调试日志到 i18n.js');
