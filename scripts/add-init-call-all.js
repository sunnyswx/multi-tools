#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 查找所有子页面
const files = glob.sync('tools/*.html');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查是否已有 initLanguage 调用
  if (!content.includes('initLanguage()') && content.includes('lang.js')) {
    // 添加 initLanguage 调用
    const initCall = `
    <script>
        // 初始化语言
        document.addEventListener('DOMContentLoaded', function() {
            initLanguage();
        });
    </script>`;
    
    // 在自动检测脚本后添加
    let newContent = content.replace(
      /(<script>\s*\/\/ 自动检测浏览器语言[\s\S]*?<\/script>)/,
      '$1' + initCall
    );
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log('处理:', file);
    }
  }
});

console.log('完成');
