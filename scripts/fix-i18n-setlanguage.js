#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/js/i18n.js';

let content = fs.readFileSync(path, 'utf8');

// 修复：确保 setLanguage 后能正确应用翻译
const oldSetLanguage = `  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) return;

    this.currentLang = lang;
    
    // 1. 更新 localStorage
    localStorage.setItem('multi-tools-lang', lang);
    
    // 2. 更新 URL 参数 (不刷新页面，使用 history.replaceState)
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    // 3. 处理 RTL 布局
    document.documentElement.dir = this.rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // 4. 应用翻译到页面
    this.applyLanguage();
  }`;

const newSetLanguage = `  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) return;

    this.currentLang = lang;
    
    // 1. 更新 localStorage
    localStorage.setItem('multi-tools-lang', lang);
    
    // 2. 更新 URL 参数 (不刷新页面，使用 history.replaceState)
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    // 3. 处理 RTL 布局
    document.documentElement.dir = this.rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // 4. 应用翻译到页面
    this.applyLanguage();
    
    // 5. 触发事件通知其他组件
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  }`;

content = content.replace(oldSetLanguage, newSetLanguage);

fs.writeFileSync(path, content);
console.log('优化 i18n.js setLanguage 方法');
