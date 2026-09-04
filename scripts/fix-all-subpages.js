#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 查找所有子页面
const files = glob.sync('tools/*.html');

let fixedCount = 0;
let skipCount = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // 检查是否包含自动检测脚本
  if (content.includes('AutoLang')) {
    console.log('✓ 已包含自动检测:', file);
    skipCount++;
    return;
  }
  
  // 检查是否包含 lang.js 脚本
  if (!content.includes('lang.js')) {
    console.log('✗ 缺少 lang.js:', file);
    return;
  }
  
  // 添加自动检测脚本
  let newContent = content.replace(
    '<script src="../lang.js"></script>',
    `<script src="../lang.js"></script>
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
    </script>`
  );
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent);
    console.log('✓ 已添加自动检测:', file);
    fixedCount++;
  }
});

console.log('\n=== 总结 ===');
console.log('已修复:', fixedCount, '个文件');
console.log('已跳过:', skipCount, '个文件');
