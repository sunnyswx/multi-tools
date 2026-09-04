#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 查找并修复第144行附近的语法错误
console.log('当前文件内容 (130-155行):');
const lines = content.split('\n');
for (let i = 129; i < 155 && i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

// 检查是否有语法错误
const syntaxErrors = content.match(/}\s*}\s*}/g) || [];
console.log('\n发现多余闭合括号:', syntaxErrors.length);
