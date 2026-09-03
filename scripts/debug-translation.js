#!/usr/bin/env node
const fs = require('fs');

// 检查 lang.js 中的翻译结构
const langPath = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(langPath, 'utf8');

console.log('=== 检查 lang.js 翻译结构 ===\n');

// 检查英文部分
const enMatch = content.match(/en: \{([^]+?)\n  \},\n  zh:/);
if (enMatch) {
  const enContent = enMatch[1];
  
  // 检查 tools 对象
  const toolsMatch = enContent.match(/tools: \{([^]+?)\n    \}/);
  if (toolsMatch) {
    console.log('✅ 找到 tools 对象');
    
    // 检查 image-compressor
    if (toolsMatch[1].includes("'image-compressor'")) {
      console.log('✅ image-compressor 在 tools 对象中');
      const imgMatch = toolsMatch[1].match(/'image-compressor': \{[^}]+\}/);
      if (imgMatch) {
        console.log('   内容:', imgMatch[0]);
      }
    } else {
      console.log('❌ image-compressor 不在 tools 对象中');
    }
  } else {
    console.log('❌ 未找到 tools 对象');
  }
}

// 检查是否有根级别的 image-compressor
if (content.includes("'image-compressor':")) {
  console.log('\n✅ 找到根级别的 image-compressor');
} else {
  console.log('\n❌ 未找到根级别的 image-compressor');
}

// 检查 i18n.js 的 translate 方法
const i18nPath = 'C:/Users/s/Documents/functional-website/multi-tools/js/i18n.js';
let i18nContent = fs.readFileSync(i18nPath, 'utf8');

console.log('\n=== 检查 i18n.js translate 方法 ===\n');

const translateMatch = i18nContent.match(/translate\(key\) \{([^]+?)\n  \}/);
if (translateMatch) {
  console.log('translate 方法:');
  console.log(translateMatch[1].substring(0, 500));
}
