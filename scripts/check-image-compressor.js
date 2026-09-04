#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 检查所有函数定义
const functions = ['handleFile', 'updateQuality', 'compress', 'download', 'formatBytes', 'getUnit'];
console.log('=== 检查函数定义 ===');
functions.forEach(fn => {
  const hasFunction = content.includes(`function ${fn}`);
  console.log(`${hasFunction ? '✅' : '❌'} ${fn}(): ${hasFunction ? '已定义' : '未定义'}`);
});

// 检查事件绑定
console.log('\n=== 检查事件绑定 ===');
const events = [
  ['onclick', 'fileInput'],
  ['oninput', 'quality'],
  ['onclick', 'compressBtn'],
  ['onclick', 'downloadBtn']
];

events.forEach(([event, id]) => {
  const hasEvent = content.includes(`${event}="${id}"`) || content.includes(`id="${id}"`) && content.includes(event);
  console.log(`${hasEvent ? '✅' : '❌'} ${event} on #${id}`);
});

// 检查按钮绑定
console.log('\n=== 检查按钮绑定 ===');
if (content.includes('id="compressBtn"')) {
  const hasClickHandler = content.includes('compressBtn') && (content.includes('click') || content.includes('onclick'));
  console.log(`${hasClickHandler ? '✅' : '❌'} compressBtn 有点击处理`);
}

if (content.includes('id="downloadBtn"')) {
  const hasClickHandler = content.includes('downloadBtn') && (content.includes('click') || content.includes('onclick'));
  console.log(`${hasClickHandler ? '✅' : '❌'} downloadBtn 有点击处理`);
}
