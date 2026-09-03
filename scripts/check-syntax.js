#!/usr/bin/env node
const fs = require('fs');

const langPath = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(langPath, 'utf8');

// 检查语法问题
console.log('检查 lang.js 语法...\n');

// 1. 检查重复的键
const lines = content.split('\n');
const keyCounts = {};
for (let i = 0; i < lines.length; i++) {
  const match = lines[i].match(/'([^']+)':\s*\{/);
  if (match) {
    const key = match[1];
    keyCounts[key] = (keyCounts[key] || 0) + 1;
    if (keyCounts[key] > 1) {
      console.log(`⚠️ 重复键: ${key} (第${i+1}行)`);
    }
  }
}

// 2. 检查语法错误
const syntaxChecks = [
  { pattern: /'image-compressor-desc': \{[^}]+\},\s*'image-compressor-name': \{[^}]+\},\s*'image-compressor-desc': \{[^}]+\}/, desc: '重复的 image-compressor-desc 键' }
];

for (const check of syntaxChecks) {
  if (check.pattern.test(content)) {
    console.log(`❌ 发现语法问题: ${check.desc}`);
  }
}

// 3. 检查对象闭合
const openBraces = (content.match(/\{/g) || []).length;
const closeBraces = (content.match(/\}/g) || []).length;
console.log(`\n大括号: ${openBraces} 个 {, ${closeBraces} 个 }`);
if (openBraces !== closeBraces) {
  console.log('❌ 大括号不匹配！');
} else {
  console.log('✅ 大括号匹配');
}

// 4. 检查逗号
const linesWithComma = content.split('\n').filter(line => line.trim().endsWith(','));
const linesWithoutComma = content.split('\n').filter(line => line.trim().endsWith('}'));
console.log(`\n有逗号的行: ${linesWithComma.length}`);
console.log(`以}结尾的行: ${linesWithoutComma.length}`);

console.log('\n检查完成');
