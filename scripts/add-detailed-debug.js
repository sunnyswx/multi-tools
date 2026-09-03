#!/usr/bin/env node
const fs = require('fs');

const i18nPath = 'C:/Users/s/Documents/functional-website/multi-tools/js/i18n.js';
let content = fs.readFileSync(i18nPath, 'utf8');

// 修复 translate 方法，添加更多调试日志
const oldTranslate = `  translate(key) {
    // 检查全局翻译字典是否存在
    if (typeof translations === 'undefined') {
      console.warn('translations dictionary not found.');
      return key;
    }

    // 支持嵌套键访问
    const keys = key.split('.');
    let value = translations[this.currentLang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // 回退到英文
        value = translations['en'];
        for (const kk of keys) {
          if (value && value[kk]) {
            value = value[kk];
          } else {
            return key;
          }
        }
        break;
      }
    }

    // 如果是对象，返回 name 或 desc
    if (typeof value === 'object' && value !== null) {
      return value.name || value.desc || key;
    }

    return value || key;
  }`;

const newTranslate = `  translate(key) {
    // 检查全局翻译字典是否存在
    if (typeof translations === 'undefined') {
      console.warn('[I18n] translations dictionary not found.');
      return key;
    }

    console.log('[I18n] translate key:', key, 'lang:', this.currentLang);

    // 支持嵌套键访问
    const keys = key.split('.');
    let value = translations[this.currentLang];
    console.log('[I18n] translations[currentLang]:', value ? 'found' : 'not found');

    for (const k of keys) {
      console.log('[I18n] navigating to key:', k, 'current value type:', typeof value);
      if (value && value[k]) {
        value = value[k];
        console.log('[I18n] found value:', typeof value === 'object' ? JSON.stringify(value) : value);
      } else {
        console.log('[I18n] key not found, trying fallback to English');
        // 回退到英文
        value = translations['en'];
        for (const kk of keys) {
          if (value && value[kk]) {
            value = value[kk];
          } else {
            console.log('[I18n] fallback also failed, returning key');
            return key;
          }
        }
        break;
      }
    }

    // 如果是对象，返回 name 或 desc
    if (typeof value === 'object' && value !== null) {
      console.log('[I18n] value is object, returning name:', value.name, 'desc:', value.desc);
      return value.name || value.desc || key;
    }

    console.log('[I18n] returning value:', value);
    return value || key;
  }`;

content = content.replace(oldTranslate, newTranslate);

// 修复 applyLanguage 方法，添加更多调试日志
const oldApply = `  applyLanguage() {
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

const newApply = `  applyLanguage() {
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

content = content.replace(oldApply, newApply);

fs.writeFileSync(i18nPath, content);
console.log('添加详细调试日志到 i18n.js');
