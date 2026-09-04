#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复问题: 删除重复的函数定义
const lines = content.split('\n');
let result = [];
let skipMode = false;
let braceCount = 0;
let inApplyLang = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 检测 applyLanguage 函数开始
  if (line.includes('function applyLanguage(lang) {')) {
    if (!inApplyLang) {
      // 第一个函数，正常添加
      inApplyLang = true;
      result.push(line);
    } else {
      // 第二个函数，跳过直到结束
      skipMode = true;
      console.log(`跳过第 ${i + 1} 行的重复函数定义`);
    }
    continue;
  }
  
  // 如果在跳过模式，统计大括号
  if (skipMode) {
    if (line.includes('{')) braceCount++;
    if (line.includes('}')) braceCount--;
    if (braceCount <= 0 && i > 0) {
      skipMode = false;
      braceCount = 0;
    }
    continue;
  }
  
  result.push(line);
}

content = result.join('\n');

// 确保文件以正确的格式结束
if (!content.trimEnd().endsWith('}')) {
  content = content.trimEnd() + '\n}\n';
  console.log('添加缺失的闭合大括号');
}

fs.writeFileSync(path, content);
console.log('文件已修复');
