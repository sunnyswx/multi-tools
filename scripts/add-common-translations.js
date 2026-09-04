#!/usr/bin/env node
const fs = require('fs');
const glob = require('glob');

// 修复所有子页面的硬编码英文文本
const files = glob.sync('tools/*.html');

let fixedCount = 0;

files.forEach(file => {
  if (file.includes('template')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // 添加缺失的 data-i18n 属性
  const fixes = [
    // Back to Home 按钮
    { pattern: /class="back-btn">← Back to Home</, replacement: 'class="back-btn" data-i18n="common.back_to_home">← Back to Home' },
    
    // Click to upload image
    { pattern: /<h3>Click to upload image<\/h3>/, replacement: '<h3 data-i18n="common.click_to_upload">Click to upload image</h3>' },
    
    // or drag and drop
    { pattern: /<p>or drag and drop<\/p>/, replacement: '<p data-i18n="common.or_drag_drop">or drag and drop</p>' },
    
    // Compress button
    { pattern: /id="compressBtn"[^>]*>Compress</, replacement: 'id="compressBtn" data-i18n="common.compress">Compress' },
    
    // Download button
    { pattern: /id="downloadBtn"[^>]*>Download</, replacement: 'id="downloadBtn" data-i18n="common.download">Download' },
    
    // Select File button
    { pattern: /id="selectBtn"[^>]*>Select File</, replacement: 'id="selectBtn" data-i18n="common.select_file">Select File' },
  ];
  
  fixes.forEach(fix => {
    if (content.match(fix.pattern)) {
      content = content.replace(fix.pattern, fix.replacement);
      console.log(`✓ ${file}: ${fix.replacement.match(/data-i18n="([^"]+)"/)[1]}`);
      modified = true;
    }
  });
  
  if (modified) {
    fs.writeFileSync(file, content);
    fixedCount++;
  }
});

console.log(`\n=== 总结 ===`);
console.log(`已修复: ${fixedCount} 个子页面`);
