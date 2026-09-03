#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 检查当前数据-i18n属性
console.log('检查 image-compressor.html 中的 data-i18n 属性...\n');

const matches = content.matchAll(/data-i18n="([^"]+)"/g);
for (const match of matches) {
  console.log(`找到: ${match[1]}`);
}

// 检查 JavaScript 代码
console.log('\n检查 JavaScript 代码...\n');
const jsMatches = content.match(/translations\[lang\]\['([^']+)'\]/g);
if (jsMatches) {
  console.log('JavaScript 中使用的翻译键:');
  jsMatches.forEach(m => console.log(`  ${m}`));
}
