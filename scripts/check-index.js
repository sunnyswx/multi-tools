#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 查找语言选择器
const langSelectMatch = content.match(/<select[^>]*id="langSelect"[^>]*>[\s\S]*?<\/select>/);
if (langSelectMatch) {
  console.log('找到语言选择器:');
  console.log(langSelectMatch[0].substring(0, 200));
}

// 检查 i18n 初始化位置
const i18nInitMatch = content.match(/i18n\.init\(\)/g);
console.log('\ni18n.init() 调用次数:', i18nInitMatch ? i18nInitMatch.length : 0);

// 检查脚本加载顺序
const scripts = content.match(/<script[^>]*src="[^"]*"[^>]*>/g);
console.log('\n脚本加载顺序:');
if (scripts) {
  scripts.forEach(s => console.log(s));
}
