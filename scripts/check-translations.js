#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查所有工具是否都有翻译
const tools = [
  'image-compressor',
  'image-converter',
  'image-resizer',
  'base64',
  'base64-image-converter',
  'word-counter',
  'json-formatter',
  'markdown-to-html',
  'html-encoder',
  'case-converter',
  'text-repeater',
  'lorem-ipsum-generator',
  'timestamp-converter',
  'color-picker',
  'unit-converter',
  'password-generator',
  'qr-code-generator',
  'url-encoder',
  'regex-tester',
  'diff-checker',
  'cron-expression',
  'hash-generator',
  'uuid-generator',
  'html-formatter',
  'css-minifier',
  'js-minifier',
  'image-to-base64',
  'base64-to-image',
  'text-to-speech',
  'speech-to-text',
  'audio-converter',
  'video-converter',
  'pdf-converter',
  'excel-to-csv',
  'csv-to-excel',
  'xml-formatter',
  'yaml-to-json',
  'jwt-decoder',
  'cron-generator',
  'unix-timestamp',
  'date-difference',
  'age-calculator',
  'bmi-calculator',
  'loan-calculator'
];

const langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];

console.log('检查工具翻译完整性...\n');

let missingCount = 0;
let completeCount = 0;

for (const tool of tools) {
  let isComplete = true;
  for (const lang of langs) {
    const regex = new RegExp(`'${tool}':\\s*\\{[^}]*name:[^}]*desc:[^}]*\\}`, 'g');
    const matches = content.match(regex);
    if (!matches || matches.length === 0) {
      console.log(`❌ ${tool} 在 ${lang} 中缺失`);
      isComplete = false;
      missingCount++;
    }
  }
  if (isComplete) {
    completeCount++;
  }
}

console.log(`\n总结:`);
console.log(`✅ 完整工具: ${completeCount}/${tools.length}`);
console.log(`❌ 缺失翻译: ${missingCount} 处`);
