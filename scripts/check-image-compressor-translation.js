#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查 image-compressor 相关翻译
console.log('检查 image-compressor 翻译...\n');

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("'image-compressor'")) {
    console.log(`第${i+1}行: ${lines[i].trim()}`);
  }
}

// 检查 translations 对象结构
console.log('\n检查 translations.en 结构...\n');
const enStart = content.indexOf('en: {');
const enEnd = content.indexOf('},\n  zh:', enStart);
const enContent = content.substring(enStart, enEnd);

if (enContent.includes("'image-compressor'")) {
  console.log('✅ image-compressor 在英文翻译中');
} else {
  console.log('❌ image-compressor 不在英文翻译中');
}

// 检查 tools 对象内部
if (enContent.includes("tools: {")) {
  const toolsStart = enContent.indexOf("tools: {");
  const toolsEnd = enContent.indexOf('}', toolsStart);
  const toolsContent = enContent.substring(toolsStart, toolsEnd + 1);
  
  if (toolsContent.includes("'image-compressor'")) {
    console.log('✅ image-compressor 在 tools 对象内部');
  } else {
    console.log('❌ image-compressor 不在 tools 对象内部');
  }
}
