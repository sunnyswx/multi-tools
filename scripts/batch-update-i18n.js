#!/usr/bin/env node
/**
 * 批量更新子页面语言系统
 * 从旧系统迁移到新系统（I18nManager）
 */

const fs = require('fs');
const path = require('path');

const toolsDir = 'C:/Users/s/Documents/functional-website/multi-tools/tools';
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.html'));

console.log(`找到 ${files.length} 个子页面\n`);

let updated = 0;
let skipped = 0;

files.forEach(file => {
  const filePath = path.join(toolsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已使用新系统
  if (content.includes('I18nManager') || content.includes('window.i18n')) {
    console.log(`✓ ${file} - 已使用新系统`);
    skipped++;
    return;
  }
  
  // 检查是否使用旧系统
  if (!content.includes('data-i18n')) {
    console.log(`- ${file} - 无语言属性，跳过`);
    skipped++;
    return;
  }
  
  // 添加 I18nManager 引入
  const i18nScript = '\n    <script src="../js/I18nManager.js"></script>\n    <script src="../js/i18n.js"></script>';
  
  // 添加初始化代码
  const initCode = `\n    <script>\n      document.addEventListener('DOMContentLoaded', function() {\n        window.i18n.init();\n      });\n    </script>`;
  
  // 在 </head> 前插入 I18nManager
  content = content.replace('</head>', i18nScript + '</head>');
  
  // 在 </body> 前插入初始化代码
  content = content.replace('</body>', initCode + '</body>');
  
  // 更新语言选择器
  content = content.replace(
    /onchange="changeLanguage\(this\.value\)"/,
    'onchange="window.i18n.setLanguage(this.value)"'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✓ ${file} - 已更新`);
  updated++;
});

console.log(`\n总结:`);
console.log(`更新: ${updated}`);
console.log(`跳过: ${skipped}`);
console.log(`总计: ${files.length}`);
