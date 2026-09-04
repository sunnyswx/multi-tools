#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查 translations 对象的结构
console.log('检查 translations 对象结构...\n');

// 提取 translations 对象的开始和结束
const start = content.indexOf('const translations = {');
const end = content.indexOf('};', start) + 2;

if (start === -1 || end === -1) {
  console.log('未找到 translations 对象');
  process.exit(1);
}

const translationsStr = content.substring(start, end);

// 检查 en 语言的工具翻译
const enMatch = translationsStr.match(/en:\s*\{[\s\S]*?tools:\s*\{[\s\S]*?\}(?=\s*\}|,\s*\n\s*[a-z]:)/);
if (enMatch) {
  console.log('找到 en.tools 对象');
  
  // 检查 image-compressor
  if (translationsStr.includes("'image-compressor'")) {
    console.log('✅ 找到 image-compressor');
    
    // 提取 image-compressor 的翻译
    const imgMatch = translationsStr.match(/'image-compressor':\s*\{[^}]+\}/);
    if (imgMatch) {
      console.log('image-compressor 翻译:', imgMatch[0]);
    }
  } else {
    console.log('❌ 未找到 image-compressor');
  }
}

// 检查是否有嵌套结构
if (translationsStr.includes('tools: {')) {
  console.log('\n✅ 确认有嵌套结构: translations.en.tools');
} else {
  console.log('\n❌ 没有嵌套结构');
}

// 检查所有语言
const langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
langs.forEach(lang => {
  const hasLang = translationsStr.match(new RegExp(lang + ':\\s*\\{'));
  const hasTools = translationsStr.match(new RegExp(lang + ':\\s*\\{[\\s\\S]*?tools:\\s*\\{'));
  console.log(`${lang}: ${hasLang ? '✅' : '❌'} 语言存在, ${hasTools ? '✅' : '❌'} 有 tools 对象`);
});
