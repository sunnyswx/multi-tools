#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 修复所有子页面
const files = glob.sync('tools/*.html');
console.log(`开始修复 ${files.length} 个子页面...\n`);

let fixedCount = 0;

files.forEach(file => {
  // 跳过模板文件
  if (file.includes('template')) {
    return;
  }
  
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // 1. 确保有 lang.js 引用
  if (!content.includes('lang.js')) {
    // 在 head 中添加 lang.js
    const headEnd = content.indexOf('</head>');
    if (headEnd !== -1) {
      content = content.replace('</head>', '    <script src="lang.js"></script>\n</head>');
      modified = true;
      console.log(`✓ 添加 lang.js: ${file}`);
    }
  }
  
  // 2. 确保有自动检测脚本
  if (!content.includes('AutoLang')) {
    const langScriptEnd = content.indexOf('</script>', content.indexOf('lang.js'));
    if (langScriptEnd !== -1) {
      const autoDetectScript = `
    <script>
        // 自动检测浏览器语言
        (function() {
            const browserLang = navigator.language.split('-')[0];
            const supportedLangs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
            
            let lang = 'en';
            if (supportedLangs.includes(browserLang)) {
                lang = browserLang;
            }
            
            localStorage.setItem('multi-tools-lang', lang);
            console.log('[AutoLang] Browser language:', browserLang, '=> Using:', lang);
        })();
    </script>`;
      
      content = content.substring(0, langScriptEnd + 9) + autoDetectScript + content.substring(langScriptEnd + 9);
      modified = true;
      console.log(`✓ 添加自动检测: ${file}`);
    }
  }
  
  // 3. 确保有 initLanguage 调用
  if (!content.includes('initLanguage()')) {
    // 在 body 结束前添加
    const bodyEnd = content.lastIndexOf('</body>');
    if (bodyEnd !== -1) {
      const initScript = `
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('[Init] DOM loaded, calling initLanguage');
            initLanguage();
        });
    </script>`;
      
      content = content.substring(0, bodyEnd) + initScript + content.substring(bodyEnd);
      modified = true;
      console.log(`✓ 添加 initLanguage 调用: ${file}`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(file, content);
    fixedCount++;
  }
});

console.log(`\n=== 总结 ===`);
console.log(`已修复: ${fixedCount} 个子页面`);
