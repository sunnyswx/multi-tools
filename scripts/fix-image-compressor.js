#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复：确保 image-compressor 在正确的层级
// 检查英文部分
const enMatch = content.match(/en: \{([^}]+)\},\n  zh:/);
if (enMatch) {
  const enContent = enMatch[1];
  if (!enContent.includes("'image-compressor'")) {
    console.log('修复英文翻译...\n');
    // 在 tools 对象后添加 image-compressor
    content = content.replace(
      /(tools: \{[^}]+\},\n)/,
      `$1      'image-compressor': { name: 'Image Compressor', desc: 'Compress images online for free' },\n`
    );
  }
}

// 检查中文部分
const zhMatch = content.match(/zh: \{([^}]+)\},\n  ja:/);
if (zhMatch) {
  const zhContent = zhMatch[1];
  if (!zhContent.includes("'image-compressor'")) {
    console.log('修复中文翻译...\n');
    content = content.replace(
      /(tools: \{[^}]+\},\n)/,
      `$1      'image-compressor': { name: '图片压缩工具', desc: '免费在线压缩PNG、JPG、WebP图片' },\n`
    );
  }
}

// 检查日文部分
const jaMatch = content.match(/ja: \{([^}]+)\},\n  ko:/);
if (jaMatch) {
  const jaContent = jaMatch[1];
  if (!jaContent.includes("'image-compressor'")) {
    console.log('修复日文翻译...\n');
    content = content.replace(
      /(tools: \{[^}]+\},\n)/,
      `$1      'image-compressor': { name: '画像圧縮ツール', desc: 'PNG、JPG、WebP画像を無料で圧縮' },\n`
    );
  }
}

fs.writeFileSync(path, content);
console.log('修复完成');
