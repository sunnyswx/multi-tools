#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 修复 data-i18n 属性：添加 tools. 前缀
content = content.replace(
  'data-i18n="image-compressor.quality_label"',
  'data-i18n="tools.image-compressor.quality_label"'
);

content = content.replace(
  'data-i18n="image-compressor.original_size"',
  'data-i18n="tools.image-compressor.original_size"'
);

content = content.replace(
  'data-i18n="image-compressor.compressed_size"',
  'data-i18n="tools.image-compressor.compressed_size"'
);

content = content.replace(
  'data-i18n="image-compressor.reduction"',
  'data-i18n="tools.image-compressor.reduction"'
);

fs.writeFileSync(path, content);
console.log('✅ 已修复 image-compressor.html 的 data-i18n 属性');
