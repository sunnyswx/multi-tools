#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 查找所有需要翻译的元素
const patterns = [
  // value 属性
  { pattern: /value="([^"]+)"/g, type: 'value' },
  // placeholder 属性
  { pattern: /placeholder="([^"]+)"/g, type: 'placeholder' },
  // title 属性
  { pattern: /title="([^"]+)"/g, type: 'title' },
  // text content (在标签内)
  { pattern: />([^<]+)</g, type: 'text' }
];

console.log('=== 需要翻译的元素 ===\n');

patterns.forEach(({ pattern, type }) => {
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const value = match[1];
    // 跳过空值和已经翻译的
    if (value && value.length > 0 && !value.includes('data-i18n')) {
      console.log(`[${type}] "${value}"`);
    }
  }
});
