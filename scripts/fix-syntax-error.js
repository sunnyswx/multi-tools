#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 修复第144行的多余 });
// 问题是 DOMContentLoaded 事件监听器的闭合括号多余

// 查找并修复
const lines = content.split('\n');
let fixed = false;

for (let i = 0; i < lines.length; i++) {
  // 查找可能是多余闭合括号的地方
  if (lines[i].trim() === '});' && i > 130 && i < 150) {
    console.log(`发现可能的错误行 ${i + 1}: ${lines[i]}`);
    // 检查上一行是否是另一个事件的结束
    if (lines[i-1].trim() === '});') {
      console.log(`上一行也是 });，这可能是多余的`);
      // 删除这一行
      lines.splice(i, 1);
      fixed = true;
      break;
    }
  }
}

if (fixed) {
  content = lines.join('\n');
  fs.writeFileSync(path, content);
  console.log('\n✅ 已修复多余的闭合括号');
} else {
  console.log('\n未找到需要修复的问题');
}
