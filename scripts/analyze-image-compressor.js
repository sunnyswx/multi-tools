#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 找到所有 JavaScript 代码块
const scriptBlocks = content.match(/<script[\s\S]*?<\/script>/g) || [];

console.log('找到', scriptBlocks.length, '个 script 块:');
scriptBlocks.forEach((block, i) => {
  const lines = block.split('\n');
  const firstLine = lines[0].trim();
  console.log(`\n块 ${i + 1}: ${firstLine.substring(0, 60)}...`);
  
  // 检查是否包含 initLanguage
  if (block.includes('initLanguage')) {
    console.log('  ✅ 包含 initLanguage');
  }
  
  // 检查是否包含 Language initialized
  if (block.includes('Language initialized')) {
    console.log('  ⚠️  包含 Language initialized');
  }
});

// 查找所有的 title 和 h1 设置
const titlePatterns = [
  /document\.title\s*=/,
  /<h1[^>]*>.*?<\/h1>/,
  /textContent\s*=\s*['"`]/
];

console.log('\n检查文本设置模式:');
titlePatterns.forEach(pattern => {
  const matches = content.match(pattern);
  if (matches) {
    console.log('  找到:', pattern.source);
  }
});
