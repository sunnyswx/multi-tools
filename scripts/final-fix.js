#!/usr/bin/env node
const fs = require('fs');

const langPath = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(langPath, 'utf8');

// 修复：将 image-compressor 相关翻译移到正确的层级
// 1. 移除重复的 image-compressor-desc 和 image-compressor-name
// 2. 确保 image-compressor 在 tools 对象中

// 移除重复的 image-compressor-desc 和 image-compressor-name（根级别）
content = content.replace(/'image-compressor-desc': \{[^}]+\},\n\s*'image-compressor-name': \{[^}]+\},\n\s*'image-compressor-desc': \{[^}]+\}\n\s*\}/, '}\n  }');

// 确保 tools 对象中有 image-compressor
const toolsPattern = /'text-to-speech': \{ name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API\.' \},\n\s*\}/;
const toolsReplacement = `'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' },
      'image-compressor': { name: 'Image Compressor', desc: 'Compress images online for free' }
    }`;

content = content.replace(toolsPattern, toolsReplacement);

fs.writeFileSync(langPath, content);
console.log('修复完成');
