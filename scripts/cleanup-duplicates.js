#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 移除重复的 image-compressor-desc 和 image-compressor-name
content = content.replace(/      'image-compressor-desc': \{ desc: 'Compress images online for free' \}\n/g, '');
content = content.replace(/      'image-compressor-name': \{ name: 'Image Compressor', desc: 'Compress images online for free' \},\n/g, '');

// 同样处理中文
content = content.replace(/      'image-compressor-desc': \{ desc: '免费在线压缩图片' \}\n/g, '');
content = content.replace(/      'image-compressor-name': \{ name: '图片压缩工具', desc: '免费在线压缩图片' \},\n/g, '');

fs.writeFileSync(path, content);
console.log('✅ 已清理重复的翻译键');
