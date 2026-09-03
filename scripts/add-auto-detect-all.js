#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 查找所有子页面
const files = glob.sync('tools/*.html');

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查是否已有自动检测脚本
  if (!content.includes('AutoLang')) {
    // 在 lang.js 脚本后插入自动检测脚本
    const autoDetectScript = `
    <script>
        // 自动检测浏览器语言
        (function() {
            const browserLang = navigator.language.split('-')[0];
            const supportedLangs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
            
            // 检查浏览器语言是否在支持列表中
            let lang = 'en'; // 默认英文
            if (supportedLangs.includes(browserLang)) {
                lang = browserLang;
            }
            
            // 保存到 localStorage
            localStorage.setItem('multi-tools-lang', lang);
            
            console.log('[AutoLang] Browser language:', browserLang, '=> Using:', lang);
        })();
    </script>`;
    
    let newContent = content.replace(
      '<script src="../lang.js"></script>',
      '<script src="../lang.js"></script>' + autoDetectScript
    );
    
    if (newContent !== content) {
      fs.writeFileSync(file, newContent);
      console.log('处理:', file);
    }
  }
});

console.log('完成');
