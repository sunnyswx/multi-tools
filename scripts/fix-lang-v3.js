#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 问题：ui 对象仍然在 tools 对象内部
// 需要找到 tools 对象的结束位置，将 ui 移动到外面

const lines = content.split('\n');
const newLines = [];
let inTools = false;
let toolsLine = -1;
let uiBlock = [];
let collectingUI = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 检测 tools: {
  if (line.trim() === 'tools: {') {
    inTools = true;
    toolsLine = i;
    newLines.push(line);
    continue;
  }
  
  // 在 tools 对象内部
  if (inTools) {
    // 检测 ui: {
    if (line.trim() === 'ui: {') {
      collectingUI = true;
      uiBlock = [line];
      continue;
    }
    
    // 收集 ui 块
    if (collectingUI) {
      uiBlock.push(line);
      // 检测 ui 块结束（单独的 } 或 },）
      if (line.trim() === '},' || line.trim() === '}') {
        collectingUI = false;
        // 不添加到 newLines，等待 tools 结束后再添加
        continue;
      }
      continue;
    }
    
    // 检测 tools 对象结束
    if (line.trim() === '},' || line.trim() === '}') {
      // 添加 tools 结束
      newLines.push(line);
      // 添加 ui 块
      newLines.push(...uiBlock);
      uiBlock = [];
      inTools = false;
      continue;
    }
  }
  
  newLines.push(line);
}

content = newLines.join('\n');
fs.writeFileSync(path, content);
console.log('✅ lang.js 已修复');
