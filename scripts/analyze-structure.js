#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查 translations 对象的结构
console.log('检查 lang.js 结构...\n');

// 找到所有语言的开始位置
const enStart = content.indexOf('en: {');
const zhStart = content.indexOf('zh: {');
const jaStart = content.indexOf('ja: {');
const koStart = content.indexOf('ko: {');

console.log('英文翻译开始位置:', enStart);
console.log('中文翻译开始位置:', zhStart);
console.log('日文翻译开始位置:', jaStart);
console.log('韩文翻译开始位置:', koStart);

// 检查 image-compressor-name 和 image-compressor-desc 的位置
const namePos = content.indexOf("'image-compressor-name'");
const descPos = content.indexOf("'image-compressor-desc'");

console.log('\nimage-compressor-name 位置:', namePos);
console.log('image-compressor-desc 位置:', descPos);

// 检查这些位置在哪种语言中
if (namePos > jaStart && namePos < koStart) {
    console.log('image-compressor-name 在日文翻译中');
}

// 检查 translations 对象的完整结构
const matches = content.matchAll(/(\w+): \{\s*site_title/g);
let langs = [];
for (const match of matches) {
    langs.push(match[1]);
}
console.log('\n检测到的语言:', langs);

// 检查 image-compressor-name 是否在 tools 对象内部
const lines = content.split('\n');
let inTools = false;
let currentLang = '';
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.match(/^(en|zh|ja|ko|es|fr|de|ru|ar): \{/)) {
        currentLang = line.match(/^(en|zh|ja|ko|es|fr|de|ru|ar)/)[1];
        inTools = false;
    }
    if (line.includes('tools: {')) {
        inTools = true;
    }
    if (line.includes("'image-compressor-name'") || line.includes("'image-compressor-desc'")) {
        console.log(`\n第${i+1}行 [${currentLang}]: ${line.trim()}`);
        console.log(`  inTools: ${inTools}`);
    }
}
