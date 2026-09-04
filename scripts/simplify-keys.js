#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 简化：直接用简单的 key，不用嵌套
content = content.replace(
  'data-i18n="tools.image-compressor.quality_label"',
  'data-i18n="quality_label"'
);

content = content.replace(
  'data-i18n="tools.image-compressor.original_size"',
  'data-i18n="original_size"'
);

content = content.replace(
  'data-i18n="tools.image-compressor.compressed_size"',
  'data-i18n="compressed_size"'
);

content = content.replace(
  'data-i18n="tools.image-compressor.reduction"',
  'data-i18n="reduction"'
);

fs.writeFileSync(path, content);
console.log('✅ 已简化 data-i18n 属性');
