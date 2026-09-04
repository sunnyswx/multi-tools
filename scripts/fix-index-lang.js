#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 检查是否包含自动检测脚本
if (!content.includes('AutoLang')) {
  // 在 lang.js 加载后添加自动检测脚本
  const langScript = '<script src="lang.js"></script>';
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
  
  content = content.replace(langScript, langScript + autoDetectScript);
  fs.writeFileSync(path, content);
  console.log('✅ 已添加自动检测脚本到首页');
} else {
  console.log('✅ 首页已包含自动检测脚本');
}
