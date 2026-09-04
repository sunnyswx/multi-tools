#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 修复所有子页面的 HTML 标签错误
const files = glob.sync('tools/*.html');

let fixedCount = 0;
let totalFixes = 0;

files.forEach(file => {
  if (file.includes('template')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  let fixes = 0;
  
  // 修复错误的闭合标签
  const patterns = [
    [/Home\/a>/g, 'Home</a>'],
    [/Compress\/button>/g, 'Compress</button>'],
    [/Download\/button>/g, 'Download</button>'],
    [/Select File\/button>/g, 'Select File</button>'],
    [/Upload\/button>/g, 'Upload</button>'],
  ];
  
  patterns.forEach(([pattern, replacement]) => {
    const matches = content.match(pattern);
    if (matches) {
      fixes += matches.length;
      content = content.replace(pattern, replacement);
    }
  });
  
  if (fixes > 0) {
    fs.writeFileSync(file, content);
    console.log(`✓ ${file}: ${fixes} 个修复`);
    fixedCount++;
    totalFixes += fixes;
  }
});

console.log(`\n=== 总结 ===`);
console.log(`已修复文件: ${fixedCount} 个`);
console.log(`总修复数: ${totalFixes} 个`);
