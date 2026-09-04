#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 问题：ui 对象被错误地插入到 tools 对象内部
// 正确结构：tools 对象应该先关闭，然后才是 ui 对象

// 修复方案：将 ui 对象移动到 tools 对象之后

// 查找第一个语言（en）的完整结构
const enMatch = content.match(/en: \{[\s\S]*?seo: 'SEO Tools'\s*\},\s*tools: \{/);
if (enMatch) {
  console.log('找到 en 语言的 tools 开始位置');
}

// 查找并修复所有语言的 ui 对象位置问题
const lines = content.split('\n');
const newLines = [];
let skipUntilToolsEnd = false;
let toolsDepth = 0;
let uiBlock = [];
let uiStarted = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 检测 tools: {
  if (line.includes('tools: {')) {
    toolsDepth = 1;
    skipUntilToolsEnd = true;
    newLines.push(line);
    continue;
  }
  
  // 在 tools 对象内部
  if (skipUntilToolsEnd) {
    // 检测 ui: {
    if (line.includes('ui: {')) {
      uiStarted = true;
      uiBlock = [line];
      continue;
    }
    
    // 收集 ui 块的行
    if (uiStarted) {
      uiBlock.push(line);
      // 检测 ui 块结束
      if (line.trim() === '},') {
        uiStarted = false;
        // 不添加到 newLines，稍后在 tools 对象后添加
        continue;
      }
      continue;
    }
    
    // 检测 tools 对象结束
    if (line.trim() === '}' && toolsDepth === 1) {
      // 添加 tools 结束
      newLines.push(line);
      // 添加 ui 块
      newLines.push(...uiBlock);
      uiBlock = [];
      skipUntilToolsEnd = false;
      toolsDepth = 0;
      continue;
    }
    
    toolsDepth += line.includes('{') ? 1 : 0;
    toolsDepth -= line.includes('}') ? 1 : 0;
  }
  
  newLines.push(line);
}

content = newLines.join('\n');
fs.writeFileSync(path, content);
console.log('✅ lang.js 已重新组织结构');
