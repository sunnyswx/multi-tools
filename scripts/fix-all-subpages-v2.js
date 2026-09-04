#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 查找所有子页面
const files = glob.sync('tools/*.html');

let fixedCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查是否包含自动检测脚本和 initLanguage 调用
  const hasAutoDetect = content.includes('AutoLang');
  const hasInitCall = content.includes('initLanguage()');
  
  if (hasAutoDetect && !hasInitCall) {
    // 需要添加 initLanguage 调用
    const autoDetectEnd = content.indexOf('</script>', content.indexOf('AutoLang'));
    if (autoDetectEnd !== -1) {
      const initCall = `
    <script>
        // 初始化语言
        document.addEventListener('DOMContentLoaded', function() {
            initLanguage();
        });
    </script>`;
      
      const newContent = content.substring(0, autoDetectEnd + 9) + initCall + content.substring(autoDetectEnd + 9);
      fs.writeFileSync(file, newContent);
      console.log('✓ 添加 initLanguage() 调用:', file);
      fixedCount++;
    }
  } else if (!hasAutoDetect) {
    console.log('✗ 缺少自动检测脚本:', file);
  } else {
    console.log('✓ 已包含所有代码:', file);
  }
});

console.log('\n=== 总结 ===');
console.log('已修复:', fixedCount, '个文件');
