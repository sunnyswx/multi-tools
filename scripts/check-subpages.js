#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 检查所有子页面
const files = glob.sync('tools/*.html');
console.log(`检查 ${files.length} 个子页面...\n`);

let fixedCount = 0;
let skippedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查必要元素
  const hasLangJs = content.includes('lang.js');
  const hasAutoDetect = content.includes('AutoLang');
  const hasInitCall = content.includes('initLanguage()');
  const hasDataI18n = content.includes('data-i18n');
  
  console.log(`${file}:`);
  console.log(`  - lang.js: ${hasLangJs ? '✅' : '❌'}`);
  console.log(`  - 自动检测: ${hasAutoDetect ? '✅' : '❌'}`);
  console.log(`  - initLanguage: ${hasInitCall ? '✅' : '❌'}`);
  console.log(`  - data-i18n: ${hasDataI18n ? '✅' : '❌'}`);
  
  if (hasLangJs && hasAutoDetect && hasInitCall && hasDataI18n) {
    console.log(`  ✅ 完整\n`);
    skippedCount++;
  } else {
    console.log(`  ❌ 需要修复\n`);
    fixedCount++;
  }
});

console.log(`=== 总结 ===`);
console.log(`完整: ${fixedCount} 个`);
console.log(`需修复: ${skippedCount} 个`);
