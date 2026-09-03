#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 移除旧的 i18n.init() 调用
content = content.replace(/\s*<script>\s*i18n\.init\(\);\s*<\/script>/, '');

// 在 lang.js 和 i18n.js 加载后添加初始化
content = content.replace(
  '<script src="js/i18n.js"></script>',
  `<script src="js/i18n.js"></script>
    <script>
        // 确保 i18n 对象已加载后初始化
        if (typeof i18n !== 'undefined') {
            i18n.init();
        } else {
            window.addEventListener('load', function() {
                i18n.init();
            });
        }
    </script>`
);

fs.writeFileSync(path, content);
console.log('优化 index.html 初始化逻辑');
