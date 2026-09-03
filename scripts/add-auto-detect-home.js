#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/index.html';

let content = fs.readFileSync(path, 'utf8');

// 在 lang.js 之后添加自动语言检测脚本
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

// 在 lang.js 脚本后插入
content = content.replace(
  '<script src="lang.js"></script>',
  '<script src="lang.js"></script>' + autoDetectScript
);

fs.writeFileSync(path, content);
console.log('添加浏览器语言自动检测到首页');
