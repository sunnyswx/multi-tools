#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 移除所有旧的 JavaScript 代码，只保留 i18n 初始化
const oldScriptPattern = /<script>\s*[\s\S]*?let originalFile = null;[\s\S]*?<\/script>/;

const newScript = `<script>
        // 使用 I18nManager 初始化语言
        i18n.init();
        
        // 调试日志
        console.log('[DEBUG] Language initialized:', i18n.getLanguage());
        console.log('[DEBUG] translations available:', typeof translations !== 'undefined');
        console.log('[DEBUG] image-compressor translation:', translations[i18n.getLanguage()]?.tools?.['image-compressor']);
        
        // 500ms 后检查 DOM 元素
        setTimeout(() => {
            const h1 = document.querySelector('h1[data-i18n="tools.image-compressor.name"]');
            const p = document.querySelector('p[data-i18n="tools.image-compressor.desc"]');
            console.log('[DEBUG] h1 found:', !!h1, 'text:', h1?.textContent);
            console.log('[DEBUG] p found:', !!p, 'text:', p?.textContent);
        }, 500);
    </script>`;

content = content.replace(oldScriptPattern, newScript);

fs.writeFileSync(path, content);
console.log('清理 image-compressor.html 旧代码');
