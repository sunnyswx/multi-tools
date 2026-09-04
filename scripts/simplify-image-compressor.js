#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 移除旧的 initLanguage 代码块
const oldInit1 = `    <script>
        let originalFile = null;
        let compressedBlob = null;
        
        // Simple language initialization
        const lang = getLanguage();
        applyLanguage(lang);
        console.log('Language initialized:', lang);
        
        document.addEventListener('DOMContentLoaded', function() {
            initLanguage();`;

const oldInit2 = `            // Also listen for language changes
            const langSelect = document.getElementById('langSelect');
            if (langSelect) {
                langSelect.addEventListener('change', function() {
                    const lang = this.value;
                    applyLanguage(lang);`;

// 简化：只保留必要的初始化
const newInit = `    <script>
        // 语言初始化会在 DOMContentLoaded 中统一处理
        console.log('[ImageCompressor] Script loaded');`;

// 替换旧的初始化代码
if (content.includes('Simple language initialization')) {
  // 找到并删除从 "let originalFile" 到 "initLanguage();" 的部分
  const startIdx = content.indexOf('let originalFile = null;');
  const endIdx = content.indexOf('initLanguage();');
  
  if (startIdx !== -1 && endIdx !== -1) {
    // 删除旧代码
    content = content.substring(0, startIdx) + newInit + content.substring(endIdx + 'initLanguage();'.length);
    console.log('已简化 image-compressor.html 的初始化代码');
  }
}

fs.writeFileSync(path, content);
console.log('✅ 修复完成');
