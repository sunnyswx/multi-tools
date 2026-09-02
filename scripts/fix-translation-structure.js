#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 正确的做法：将 image-compressor-name 和 image-compressor-desc 移到每个语言的 tools 对象内部
// 并且确保它们有正确的结构

// 英文部分
content = content.replace(
  /'text-to-speech': \{ name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API\.' \},\n      'image-compressor-name': \{ name: 'Image Compressor', desc: 'Compress images online for free' \},\n      'image-compressor-desc': \{ name: 'Image Compressor', desc: 'Compress images online for free' \}\n    \}\n  \},/,
  `'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' },
      'image-compressor-name': { name: 'Image Compressor', desc: 'Compress images online for free' },
      'image-compressor-desc': { name: 'Image Compressor', desc: 'Compress images online for free' }
    }
  },`
);

// 中文部分
content = content.replace(
  /'text-to-speech': \{ name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' \},\n      'image-compressor-name': \{ name: '图片压缩工具', desc: '免费在线压缩图片' \},\n      'image-compressor-desc': \{ name: '图片压缩工具', desc: '免费在线压缩图片' \}\n    \}\n  \},/,
  `'text-to-speech': { name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' },
      'image-compressor-name': { name: '图片压缩工具', desc: '免费在线压缩图片' },
      'image-compressor-desc': { name: '图片压缩工具', desc: '免费在线压缩图片' }
    }
  },`
);

// 日文部分
content = content.replace(
  /'text-to-speech': \{ name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' \},\n      'image-compressor-name': \{ name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' \},\n      'image-compressor-desc': \{ name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' \}\n    \}\n  \},/,
  `'text-to-speech': { name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' },
      'image-compressor-name': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' },
      'image-compressor-desc': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' }
    }
  },`
);

fs.writeFileSync(path, content);
console.log('Fixed translation structure');
