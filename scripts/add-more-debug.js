#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/js/i18n.js';

let content = fs.readFileSync(path, 'utf8');

// 在 applyLanguage 方法中添加更多调试
const oldApply = `  applyLanguage() {
    console.log('[I18n] applyLanguage called, currentLang:', this.currentLang);
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('[I18n] Found', elements.length, 'elements with data-i18n');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      console.log('[I18n] Processing element:', key);
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

const newApply = `  applyLanguage() {
    console.log('[I18n] applyLanguage called, currentLang:', this.currentLang);
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('[I18n] Found', elements.length, 'elements with data-i18n');
    
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      console.log('[I18n] Processing element:', key, 'tag:', el.tagName);
      const translatedText = this.translate(key);
      console.log('[I18n]', key, '=>', translatedText);
      
      // 根据元素类型决定如何设置内容
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translatedText;
        console.log('[I18n] Set placeholder:', el.placeholder);
      } else {
        el.textContent = translatedText;
        console.log('[I18n] Set textContent:', el.textContent);
      }
    });
    
    console.log('[I18n] applyLanguage completed');
  }`;

content = content.replace(oldApply, newApply);

// 在 setLanguage 方法中添加事件触发
const oldSetLang = `    // 4. 应用翻译到页面
    this.applyLanguage();
  }`;

const newSetLang = `    // 4. 应用翻译到页面
    this.applyLanguage();
    
    // 5. 触发事件通知其他组件
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
    console.log('[I18n] Language set to:', lang, 'and event dispatched');
  }`;

content = content.replace(oldSetLang, newSetLang);

fs.writeFileSync(path, content);
console.log('添加更多调试日志到 i18n.js');
