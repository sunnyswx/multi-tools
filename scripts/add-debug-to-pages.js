#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 在所有子页面添加调试调用
const files = glob.sync('tools/*.html');

files.forEach(file => {
  if (file.includes('template')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // 在 initLanguage 调用后添加调试
  if (content.includes('initLanguage()') && !content.includes('debugTranslations()')) {
    content = content.replace(
      'initLanguage();',
      'initLanguage();\n            debugTranslations();'
    );
    fs.writeFileSync(file, content);
    console.log('✓ 添加调试调用:', file);
  }
});

console.log('\n已完成');
