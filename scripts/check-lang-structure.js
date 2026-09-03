#!/usr/bin/env node
const fs = require('fs');

const langPath = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(langPath, 'utf8');

// 检查当前结构
console.log('检查 lang.js 结构...\n');

// 找到第一个语言的开始
const firstLangMatch = content.match(/^(en|zh|ja|ko|es|fr|de|ru|ar): \{/m);
if (firstLangMatch) {
  console.log('✅ 找到语言定义:', firstLangMatch[1]);
}

// 检查是否有 tools 对象
if (content.includes('tools: {')) {
  console.log('✅ 找到 tools 对象');
} else {
  console.log('❌ 未找到 tools 对象');
}

// 检查语法
try {
  eval(content);
  console.log('✅ 语法检查通过');
} catch (e) {
  console.log('❌ 语法错误:', e.message);
}

console.log('\n结构检查完成');
