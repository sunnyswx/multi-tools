#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 添加 i18n.js 脚本
if (!content.includes('src="../js/i18n.js"')) {
  content = content.replace(
    '<script src="../lang.js"></script>',
    '<script src="../lang.js"></script>\n    <script src="../js/i18n.js"></script>'
  );
  console.log('添加 i18n.js 脚本');
}

// 更新语言选择器
content = content.replace(
  'onchange="changeLanguage(this.value)"',
  'onchange="i18n.setLanguage(this.value)"'
);

// 在 body 结束前添加初始化
if (!content.includes('i18n.init()')) {
  content = content.replace(
    '</body>',
    '    <script>i18n.init();</script>\n</body>'
  );
  console.log('添加 i18n.init() 调用');
}

fs.writeFileSync(path, content);
console.log('更新完成');
