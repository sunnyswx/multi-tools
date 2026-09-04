#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 添加按钮点击事件绑定
const btnFix = `
        // 绑定按钮点击事件
        document.getElementById('compressBtn').addEventListener('click', compress);
        document.getElementById('downloadBtn').addEventListener('click', download);
`;

// 在 document ready 后添加绑定
const readyFix = `        if (typeof gtag !== 'undefined') {
            gtag('event', 'tool_open', { tool: 'image-compressor' });
        }
${btnFix}`;

content = content.replace(
  `        if (typeof gtag !== 'undefined') {
            gtag('event', 'tool_open', { tool: 'image-compressor' });
        }`,
  readyFix
);

fs.writeFileSync(path, content);
console.log('✅ 已添加按钮点击事件绑定');
