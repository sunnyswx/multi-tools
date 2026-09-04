#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查语法错误
try {
  new Function(content);
  console.log('✅ 语法检查通过');
} catch (e) {
  console.log('❌ 语法错误:', e.message);
  
  // 查找问题所在
  const lines = content.split('\n');
  lines.forEach((line, i) => {
    if (line.includes("'image-compressor-page'")) {
      console.log(`行 ${i + 1}: ${line}`);
    }
  });
}
