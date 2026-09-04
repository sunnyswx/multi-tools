#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查是否已有 common 翻译
const hasCommon = content.includes("'back_to_home': '返回首页'");
console.log('已包含 common 翻译:', hasCommon);

if (hasCommon) {
  console.log('\n当前 lang.js 已包含 common 翻译，问题可能是:');
  console.log('1. 浏览器缓存未清除');
  console.log('2. 部署未完成');
  console.log('3. applyLanguage 函数逻辑问题');
  
  // 检查 applyLanguage 函数
  const applyLangMatch = content.match(/function applyLanguage\(lang\) \{[\s\S]*?\n\}/);
  if (applyLangMatch) {
    console.log('\napplyLanguage 函数:', applyLangMatch[0].substring(0, 500));
  }
} else {
  console.log('\n未找到 common 翻译，需要重新添加');
}
