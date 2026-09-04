#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 在自动检测脚本后直接添加初始化代码
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
  
  fs.writeFileSync(path, content);
  console.log('添加 initLanguage 调用');
} else {
  console.log('未找到插入位置');
}
