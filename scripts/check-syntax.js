#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查第 509 行附近的内容
const lines = content.split('\n');
console.log('第 505-515 行:');
for (let i = 504; i <= 515 && i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}

// 查找可能的语法错误
const line509 = lines[508]; // 数组从0开始
console.log('\n第 509 行内容:', JSON.stringify(line509));

// 检查是否有未闭合的括号
let braceCount = 0;
let parenCount = 0;
let bracketCount = 0;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '{') braceCount++;
  else if (char === '}') braceCount--;
  else if (char === '(') parenCount++;
  else if (char === ')') parenCount--;
  else if (char === '[') bracketCount++;
  else if (char === ']') bracketCount--;
  
  if (braceCount < 0 || parenCount < 0 || bracketCount < 0) {
    console.log(`\n发现不匹配的括号在位置 ${i}:`);
    console.log(`大括号: ${braceCount}, 小括号: ${parenCount}, 中括号: ${bracketCount}`);
    console.log(`上下文: ${content.substring(Math.max(0, i-50), i+50)}`);
    break;
  }
}

console.log(`\n总括号检查: 大括号=${braceCount}, 小括号=${parenCount}, 中括号=${bracketCount}`);
