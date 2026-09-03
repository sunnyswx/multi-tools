#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 添加调试日志，检查翻译键是否存在
const initCode = `        // 使用 i18n 管理器初始化语言
        i18n.init();
        
        // 调试：检查翻译键
        console.log('[DEBUG] Current language:', i18n.getLanguage());
        console.log('[DEBUG] translations keys:', Object.keys(translations[i18n.getLanguage()] || {}));
        console.log('[DEBUG] tools keys:', Object.keys(translations[i18n.getLanguage()]?.tools || {}));
        console.log('[DEBUG] image-compressor:', translations[i18n.getLanguage()]?.tools?.['image-compressor']);
        
        // 手动检查 data-i18n 元素
        setTimeout(() => {
            const h1 = document.querySelector('h1[data-i18n]');
            const p = document.querySelector('p[data-i18n]');
            console.log('[DEBUG] h1 found:', !!h1, 'text:', h1?.textContent);
            console.log('[DEBUG] p found:', !!p, 'text:', p?.textContent);
        }, 500);`;

content = content.replace(
  `        // 使用 i18n 管理器初始化语言
        i18n.init();`,
  initCode
);

fs.writeFileSync(path, content);
console.log('添加调试日志到 image-compressor.html');
