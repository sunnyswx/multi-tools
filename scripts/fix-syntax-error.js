#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复语法错误: }unction -> function
if (content.includes('}unction applyLanguage')) {
  content = content.replace(/}unction applyLanguage/g, 'function applyLanguage');
  fs.writeFileSync(path, content);
  console.log('已修复语法错误: }unction -> function');
} else {
  console.log('未找到错误');
}
