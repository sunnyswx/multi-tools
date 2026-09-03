#!/usr/bin/env node
const fs = require('fs');

const langPath = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(langPath, 'utf8');

// 修复：移除重复的 image-compressor-desc 和 image-compressor-name
console.log('修复 lang.js 语法问题...\n');

// 移除根级别的重复键
const fixPattern = /'image-compressor-desc': \{[^}]+\},\n\s*'image-compressor-name': \{[^}]+\},\n\s*'image-compressor-desc': \{[^}]+\}\n\s*\}/;
const fixReplacement = '}';

if (fixPattern.test(content)) {
  content = content.replace(fixPattern, fixReplacement);
  console.log('✅ 移除重复的 image-compressor 键');
}

// 确保 tools 对象中有 image-compressor
const toolsPattern = /'text-to-speech': \{ name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API\.' \},\n\s*\}/;
const toolsReplacement = `'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' },
      'image-compressor': { name: 'Image Compressor', desc: 'Compress images online for free' }
    }`;

if (toolsPattern.test(content)) {
  content = content.replace(toolsPattern, toolsReplacement);
  console.log('✅ 添加 image-compressor 到 tools 对象');
}

fs.writeFileSync(langPath, content);
console.log('\n修复完成');
