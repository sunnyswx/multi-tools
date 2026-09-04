#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 找到问题所在 - 第39行附近
const lines = content.split('\n');

// 查找并修复结构问题
for (let i = 0; i < lines.length; i++) {
  // 查找关闭 ui 对象的行
  if (lines[i].trim() === '}' && i > 30 && i < 50) {
    console.log(`行 ${i + 1}: ${lines[i]}`);
    // 检查下一行是否是 tools 对象的开始
    if (lines[i + 1] && lines[i + 1].includes("'image-compressor-page'")) {
      console.log(`发现问题：第 ${i + 1} 行后应该关闭 tools 对象，但直接开始了新的条目`);
      // 在这行前面添加逗号
      lines[i] = lines[i].replace('}', '},');
      console.log(`已修复：在第 ${i + 1} 行添加逗号`);
      break;
    }
  }
}

content = lines.join('\n');
fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已修复');
