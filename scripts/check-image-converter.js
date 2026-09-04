#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-converter.html';

let content = fs.readFileSync(path, 'utf8');

console.log('=== Image Converter 工具检查报告 ===\n');

// 1. 检查函数定义
const functions = ['handleFile', 'convert', 'download', 'formatBytes'];
console.log('1. 函数定义检查:');
functions.forEach(fn => {
  const hasFunction = content.includes(`function ${fn}`);
  console.log(`   ${hasFunction ? '✅' : '❌'} ${fn}()`);
});

// 2. 检查 data-i18n 属性
console.log('\n2. data-i18n 属性检查:');
const i18nMatches = content.match(/data-i18n="[^"]+"/g) || [];
i18nMatches.forEach(attr => {
  const key = attr.match(/data-i18n="([^"]+)"/)[1];
  console.log(`   ✅ ${key}`);
});

if (i18nMatches.length === 0) {
  console.log('   ❌ 未找到任何 data-i18n 属性');
}

// 3. 检查按钮事件绑定
console.log('\n3. 按钮事件绑定检查:');
const buttons = ['convertBtn', 'downloadBtn'];
buttons.forEach(btn => {
  const hasElement = content.includes(`id="${btn}"`);
  const hasHandler = content.includes(`${btn}`) && (content.includes('click') || content.includes('addEventListener'));
  console.log(`   ${hasElement ? '✅' : '❌'} #${btn} 元素存在`);
  console.log(`   ${hasHandler ? '✅' : '❌'} #${btn} 有事件处理`);
});

// 4. 检查语言相关代码
console.log('\n4. 语言相关检查:');
const hasInitLanguage = content.includes('initLanguage');
const hasApplyLanguage = content.includes('applyLanguage');
console.log(`   ${hasInitLanguage ? '✅' : '❌'} 调用 initLanguage()`);
console.log(`   ${hasApplyLanguage ? '✅' : '❌'} 调用 applyLanguage()`);

// 5. 检查是否有语法错误
console.log('\n5. 语法检查:');
try {
  // 提取 script 内容
  const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
  if (scriptMatch) {
    new Function(scriptMatch[1]);
    console.log('   ✅ JavaScript 语法正确');
  }
} catch (e) {
  console.log(`   ❌ JavaScript 语法错误: ${e.message}`);
}

console.log('\n=== 检查完成 ===');
