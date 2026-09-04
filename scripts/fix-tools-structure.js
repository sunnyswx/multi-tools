#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 查找 tools 对象的开始和结束
const lines = content.split('\n');
let inTools = false;
let toolsDepth = 0;
let uiStart = -1;
let uiEnd = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 检测 tools: {
  if (line.includes('tools: {')) {
    inTools = true;
    toolsDepth = 1;
    console.log(`找到 tools 对象开始于行 ${i + 1}`);
  }
  
  if (inTools) {
    // 检测 ui: {
    if (line.includes('ui: {')) {
      uiStart = i;
      console.log(`找到 ui 对象开始于行 ${i + 1}`);
    }
    
    // 检测 ui 对象结束
    if (uiStart !== -1 && line.trim() === '}' && lines[i+1] && lines[i+1].includes("'image-compressor-page'")) {
      uiEnd = i;
      console.log(`找到 ui 对象结束于行 ${i + 1}`);
      
      // 修复：在 } 后添加逗号
      lines[i] = line.replace('}', '},');
      console.log(`已修复：在第 ${i + 1} 行添加逗号`);
      
      inTools = false;
    }
  }
}

content = lines.join('\n');
fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已修复');
