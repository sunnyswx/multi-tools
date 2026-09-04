#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 查找并删除 i18n 相关代码
const lines = content.split('\n');
const newLines = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 跳过包含 i18n 的行
  if (line.includes('i18n.') || line.includes('new i18n') || line.includes('i18n =')) {
    console.log(`删除行 ${i + 1}: ${line.trim()}`);
    continue;
  }
  
  newLines.push(line);
}

content = newLines.join('\n');
fs.writeFileSync(path, content);

console.log('\n✅ 已删除 i18n 相关代码');
