#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 修复所有子页面的 HTML 标签错误
const files = glob.sync('tools/*.html');

let fixedCount = 0;

files.forEach(file => {
  if (file.includes('template')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  // 修复错误的闭合标签（使用字符串替换）
  content = content.replace(/>Back to Home\/a>/g, '>Back to Home</a>');
  content = content.replace(/>Compress\/button>/g, '>Compress</button>');
  content = content.replace(/>Download\/button>/g, '>Download</button>');
  content = content.replace(/>Select File\/button>/g, '>Select File</button>');
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`✓ ${file}`);
    fixedCount++;
  }
});

console.log(`\n=== 总结 ===`);
console.log(`已修复: ${fixedCount} 个子页面`);
