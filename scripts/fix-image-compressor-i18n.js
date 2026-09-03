#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 修复 data-i18n 属性格式
content = content.replace(
  'data-i18n="image-compressor-name"',
  'data-i18n="tools.image-compressor.name"'
);
content = content.replace(
  'data-i18n="image-compressor-desc"',
  'data-i18n="tools.image-compressor.desc"'
);

fs.writeFileSync(path, content);
console.log('修复 image-compressor.html data-i18n 属性');
