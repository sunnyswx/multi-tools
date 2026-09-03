#!/usr/bin/env node
const fs = require('fs');

// 检查 lang.js 中的 translations 对象
const langPath = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(langPath, 'utf8');

console.log('=== 检查 translations 对象结构 ===\n');

// 找到 en 部分
const enMatch = content.match(/en: \{([^]+?)\n  \},\n  zh:/);
if (enMatch) {
  console.log('✅ 找到英文翻译部分\n');
  const enContent = enMatch[1];
  
  // 检查 tools 对象
  const toolsMatch = enContent.match(/tools: \{([^]+?)\n    \}/);
  if (toolsMatch) {
    console.log('✅ 找到 tools 对象\n');
    const toolsContent = toolsMatch[1];
    
    // 检查 image-compressor
    if (toolsContent.includes("'image-compressor'")) {
      console.log('✅ image-compressor 在 tools 对象中');
      const imgMatch = toolsContent.match(/'image-compressor': \{[^}]+\}/);
      if (imgMatch) {
        console.log('   内容:', imgMatch[0]);
      }
    } else {
      console.log('❌ image-compressor 不在 tools 对象中');
    }
    
    // 检查 image-compressor-name
    if (toolsContent.includes("'image-compressor-name'")) {
      console.log('✅ image-compressor-name 在 tools 对象中');
    } else {
      console.log('❌ image-compressor-name 不在 tools 对象中');
    }
    
    // 检查 image-compressor-desc
    if (toolsContent.includes("'image-compressor-desc'")) {
      console.log('✅ image-compressor-desc 在 tools 对象中');
    } else {
      console.log('❌ image-compressor-desc 不在 tools 对象中');
    }
  }
  
  // 检查根级别的 image-compressor
  if (enContent.includes("'image-compressor'")) {
    console.log('✅ image-compressor 在根级别');
  } else {
    console.log('❌ image-compressor 不在根级别');
  }
}

// 检查 HTML 中的 data-i18n 属性
const htmlPath = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

console.log('\n=== 检查 HTML 中的 data-i18n 属性 ===\n');

const dataI18nMatches = htmlContent.matchAll(/data-i18n="([^"]+)"/g);
for (const match of dataI18nMatches) {
  console.log(`找到: ${match[1]}`);
}

// 检查 JavaScript 代码
console.log('\n=== 检查 JavaScript 代码 ===\n');

const jsMatches = htmlContent.match(/translations\[lang\]\['([^']+)'\]/g);
if (jsMatches) {
  console.log('JavaScript 使用的翻译键:');
  jsMatches.forEach(m => console.log(`  ${m}`));
}
