#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 1. 添加 i18n.js 脚本
content = content.replace(
  '<script src="../lang.js"></script>',
  '<script src="../lang.js"></script>\n    <script src="../js/i18n.js"></script>'
);

// 2. 更新 data-i18n 属性格式（支持嵌套）
content = content.replace(
  'data-i18n="image-compressor-name"',
  'data-i18n="tools.image-compressor.name"'
);
content = content.replace(
  'data-i18n="image-compressor-desc"',
  'data-i18n="tools.image-compressor.desc"'
);

// 3. 移除旧的 JavaScript 代码，使用 i18n 实例
const oldScript = `        // Wait for lang.js to be loaded
        function initLanguage() {
            if (typeof getLanguage === 'function' && typeof applyLanguage === 'function' && typeof translations !== 'undefined') {
                const lang = getLanguage();
                applyLanguage(lang);
                
                // Directly update title and description
                const h1 = document.querySelector('h1[data-i18n="image-compressor-name"]');
                const p = document.querySelector('p[data-i18n="image-compressor-desc"]');
                if (h1 && translations[lang]?.['image-compressor-name']) {
                    h1.textContent = '🗜️ ' + translations[lang]['image-compressor-name'].name;
                }
                if (p && translations[lang]?.['image-compressor-desc']) {
                    p.textContent = translations[lang]['image-compressor-desc'].desc;
                }
            } else {
                // Retry after a short delay
                setTimeout(initLanguage, 100);
            }
        }`;

const newScript = `        // 使用 i18n 管理器初始化语言
        i18n.init();`;

content = content.replace(oldScript, newScript);

// 4. 更新语言选择器事件
content = content.replace(
  'onchange="changeLanguage(this.value)"',
  'onchange="i18n.setLanguage(this.value)"'
);

fs.writeFileSync(path, content);
console.log('更新 image-compressor.html');
