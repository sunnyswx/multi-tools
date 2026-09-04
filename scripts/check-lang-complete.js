#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查文件末尾
const last50Chars = content.substring(content.length - 50);
console.log('文件末尾50字符:', JSON.stringify(last50Chars));

// 检查括号匹配
let braceCount = 0;
for (let i = 0; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  else if (content[i] === '}') braceCount--;
}
console.log('大括号平衡:', braceCount);

// 检查 applyLanguage 函数
const funcMatch = content.match(/function applyLanguage\(lang\) \{[\s\S]*?(?=\n\n\/\/ Change language|\n\n\/\/ Get current language|$)/);
if (funcMatch) {
  console.log('\n找到 applyLanguage 函数:');
  console.log(funcMatch[0].substring(0, 200) + '...');
  console.log('\n函数长度:', funcMatch[0].length);
} else {
  console.log('\n未找到完整的 applyLanguage 函数');
}

// 检查是否有重复的函数定义
const funcCount = (content.match(/function applyLanguage/g) || []).length;
console.log('\napplyLanguage 函数出现次数:', funcCount);
