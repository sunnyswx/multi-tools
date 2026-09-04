#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 查找所有子页面
const files = glob.sync('tools/*.html');

let fixedCount = 0;

files.forEach(file => {
  // 跳过模板文件
  if (file.includes('template')) {
    return;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  
  // 检查是否已有 DOMContentLoaded 监听器
  const hasDomListener = content.includes("document.addEventListener('DOMContentLoaded'");
  
  if (!hasDomListener) {
    // 在自动检测脚本后添加
    const autoDetectEnd = content.indexOf('})();\n    </script>');
    if (autoDetectEnd !== -1) {
      const insertPos = autoDetectEnd + '})();\n    </script>'.length;
      
      const initCode = `
    <script>
        // 立即初始化语言
        document.addEventListener('DOMContentLoaded', function() {
            console.log('[Init] DOM loaded, calling initLanguage');
            initLanguage();
        });
    </script>`;
      
      content = content.substring(0, insertPos) + initCode + content.substring(insertPos);
      
      fs.writeFileSync(file, content);
      console.log('✓ 添加 initLanguage 调用:', file);
      fixedCount++;
    }
  } else {
    console.log('✓ 已包含 DOMContentLoaded:', file);
  }
});

console.log('\n=== 总结 ===');
console.log('已修复:', fixedCount, '个文件');
