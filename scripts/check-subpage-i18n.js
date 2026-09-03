#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 检查所有 data-i18n 属性
console.log('检查 image-compressor.html 中的 data-i18n 属性...\n');

const matches = content.matchAll(/data-i18n="([^"]+)"/g);
let count = 0;
for (const match of matches) {
  console.log(`第${count + 1}个: ${match[1]}`);
  count++;
}

console.log(`\n总共找到 ${count} 个 data-i18n 属性`);
