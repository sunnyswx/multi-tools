#!/usr/bin/env node
const fs = require('fs');

const indexPath = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';
let content = fs.readFileSync(indexPath, 'utf8');

// 在 lang.js 之后添加 i18n.js
content = content.replace(
  '<script src="lang.js"></script>',
  '<script src="lang.js"></script>\n    <script src="js/i18n.js"></script>'
);

// 修改语言选择器，使用 i18n 实例
content = content.replace(
  'onchange="changeLanguage(this.value)"',
  'onchange="i18n.setLanguage(this.value)"'
);

// 在 body 结束前添加初始化代码
content = content.replace(
  '</body>',
  '    <script>\n        // 初始化多语言管理器\n        i18n.init();\n    </script>\n</body>'
);

fs.writeFileSync(indexPath, content);
console.log('更新 index.html');
