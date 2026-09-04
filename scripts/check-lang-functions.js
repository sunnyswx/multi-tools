#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查 getLanguage 函数
const getLangMatch = content.match(/function getLanguage\(\) \{([^]+?)\n  \}/);
if (getLangMatch) {
  console.log('当前 getLanguage 函数:');
  console.log(getLangMatch[0]);
}

// 检查 initLanguage 函数
const initLangMatch = content.match(/function initLanguage\(\) \{([^]+?)\n  \}/);
if (initLangMatch) {
  console.log('\n当前 initLanguage 函数:');
  console.log(initLangMatch[0]);
}
