#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 修复所有子页面的 HTML 标签错误
const files = glob.sync('tools/*.html');

let fixedCount = 0;

files.forEach(file => {
  if (file.includes('template')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // 修复错误的闭合标签
  const fixes = [
    { pattern: />Back to Home\/a>/, replacement: '>Back to Home</a>' },
    { pattern: />Compress\/button>/, replacement: '>Compress</button>' },
    { pattern: />Download\/button>/, replacement: '>Download</button>' },
    { pattern: />Select File\/button>/, replacement: '>Select File</button>' },
  ];
  
  fixes.forEach(fix => {
    if (content.includes(fix.pattern)) {
      content = content.split(fix.pattern).join(fix.replacement);
      console.log(`✓ ${file}: ${fix.pattern} -> ${fix.replacement}`);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(file, content);
    fixedCount++;
  }
});

console.log(`\n=== 总结 ===`);
console.log(`已修复: ${fixedCount} 个子页面`);
