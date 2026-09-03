#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 移除语言选择器
content = content.replace(/\s*<div class="language-selector">[\s\S]*?<\/div>/, '');

// 移除 i18n.js 引用
content = content.replace(/<script src="js\/i18n.js"><\/script>/, '');

// 移除 i18n.init() 调用
content = content.replace(/\s*<script>\s*i18n\.init\(\);\s*<\/script>/, '');

// 移除语言切换相关的事件处理
content = content.replace(/onchange="i18n\.setLanguage\(this\.value\)"[^>]*>/, '');

fs.writeFileSync(path, content);
console.log('移除首页语言切换功能');
