#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 删除重复的 language initialization 代码块
// 保留 head 中的自动检测和 initLanguage 调用
const oldInitCode = `    <script>
        let originalFile = null;
        let compressedBlob = null;
        
        // Simple language initialization
        const lang = getLanguage();
        applyLanguage(lang);
        console.log('Language initialized:', lang);
        
        document.addEventListener('DOMContentLoaded', function() {
            initLanguage();`;

const newInitCode = `    <script>
        let originalFile = null;
        let compressedBlob = null;
        
        document.addEventListener('DOMContentLoaded', function() {`;

if (content.includes(oldInitCode)) {
  content = content.replace(oldInitCode, newInitCode);
  console.log('✅ 已删除重复的语言初始化代码');
} else {
  console.log('未找到目标代码，尝试其他模式');
  
  // 尝试更宽松的匹配
  const lines = content.split('\n');
  let result = [];
  let skipMode = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 检测要删除的代码块开始
    if (line.includes('// Simple language initialization')) {
      skipMode = true;
      console.log('跳过第', i + 1, '行开始');
      continue;
    }
    
    // 检测要删除的代码块结束
    if (skipMode && line.trim() === 'initLanguage();') {
      skipMode = false;
      console.log('在第', i + 1, '行结束跳过');
      continue;
    }
    
    if (!skipMode) {
      result.push(line);
    }
  }
  
  content = result.join('\n');
  console.log('✅ 已通过行过滤删除重复代码');
}

fs.writeFileSync(path, content);
console.log('文件已保存');
