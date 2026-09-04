#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 检查是否已有 initLanguage 调用
if (!content.includes('initLanguage()')) {
  // 在自动检测脚本后添加 initLanguage 调用
  const autoDetectScript = `    <script>
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
  
  const initCall = `
    <script>
        // 初始化语言
        document.addEventListener('DOMContentLoaded', function() {
            initLanguage();
        });
    </script>`;
  
  // 替换自动检测脚本，添加初始化调用
  content = content.replace(autoDetectScript, autoDetectScript + initCall);
  
  fs.writeFileSync(path, content);
  console.log('添加 initLanguage() 调用');
} else {
  console.log('已包含 initLanguage() 调用');
}
