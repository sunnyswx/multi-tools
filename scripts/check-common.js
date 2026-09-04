#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查 zh 部分是否有 common 对象
const zhMatch = content.match(/zh:\s*\{[\s\S]*?tools:\s*\{/);
if (zhMatch) {
  console.log('找到 zh 对象');
  console.log('内容:', zhMatch[0].substring(0, 500));
}

// 检查是否有 common 翻译
if (content.includes("'back_to_home'")) {
  console.log('\n✅ 已找到 back_to_home 翻译');
} else {
  console.log('\n❌ 未找到 back_to_home 翻译');
}

// 查找 common 对象的位置
const commonIndex = content.indexOf("common: {");
if (commonIndex !== -1) {
  console.log('\n✅ 找到 common 对象，位置:', commonIndex);
  console.log('上下文:', content.substring(commonIndex, commonIndex + 300));
} else {
  console.log('\n❌ 未找到 common 对象');
}
