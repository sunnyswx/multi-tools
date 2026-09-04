#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 找到并删除重复的 initLanguage 调用
// 检查是否有两段 initLanguage 代码
const initPattern1 = /<script>\s*\/\/\s*Simple language initialization[\s\S]*?console\.log\('Language initialized:', lang\);\s*<\/script>/;
const initPattern2 = /<script>\s*\/\/\s*立即初始化语言[\s\S]*?initLanguage\(\);\s*<\/script>/;

if (initPattern1.test(content)) {
  content = content.replace(initPattern1, '');
  console.log('删除第一段 initLanguage 代码');
}

if (initPattern2.test(content)) {
  content = content.replace(initPattern2, '');
  console.log('删除第二段 initLanguage 代码');
}

// 在 DOMContentLoaded 中添加延迟，确保翻译在最后应用
const domContentLoaded = `document.addEventListener('DOMContentLoaded', function() {
            console.log('[Init] DOM loaded, calling initLanguage');
            initLanguage();
        });`;

const newDomContentLoaded = `document.addEventListener('DOMContentLoaded', function() {
            console.log('[Init] DOM loaded, calling initLanguage');
            // 延迟一小段时间，确保所有元素都已加载
            setTimeout(function() {
                initLanguage();
            }, 100);
        });`;

content = content.replace(domContentLoaded, newDomContentLoaded);
console.log('添加延迟确保翻译应用');

fs.writeFileSync(path, content);
console.log('✅ 已修复 image-compressor.html');
