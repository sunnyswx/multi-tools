#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 移除旧的初始化代码
content = content.replace(/\s*<script>\s*\/\/ 确保 i18n 对象已加载后初始化[\s\S]*?i18n\.init\(\);[\s\S]*?\s*<\/script>/, '');

// 在 i18n.js 加载后添加正确的初始化
content = content.replace(
  '<script src="js/i18n.js"></script>',
  `<script src="js/i18n.js"></script>
    <script>
        // 等待 translations 和 i18n 都加载后初始化
        function initI18n() {
            if (typeof translations !== 'undefined' && typeof i18n !== 'undefined') {
                i18n.init();
            } else {
                setTimeout(initI18n, 50);
            }
        }
        initI18n();
    </script>`
);

fs.writeFileSync(path, content);
console.log('修复 index.html 初始化逻辑');
