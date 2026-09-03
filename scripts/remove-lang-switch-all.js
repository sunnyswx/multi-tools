#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 查找所有子页面
const files = glob.sync('tools/*.html');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查是否包含语言选择器
  if (content.includes('langSelect') || content.includes('language-selector')) {
    let newContent = content;
    
    // 移除语言选择器
    newContent = newContent.replace(/\s*<div class="language-selector">[\s\S]*?<\/div>/, '');
    
    // 移除 i18n.js 引用（如果存在）
    newContent = newContent.replace(/<script src="\.\.\/js\/i18n.js"><\/script>/, '');
    
    // 移除 i18n.init() 调用（如果存在）
    newContent = newContent.replace(/\s*<script>i18n\.init\(\);<\/script>/, '');
    
    // 移除语言切换事件
    newContent = newContent.replace(/onchange="i18n\.setLanguage\(this\.value\)"[^>]*>/, '');
    
    // 只有当内容有变化时才写入
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log('处理:', file);
    }
  }
});

console.log('完成');
