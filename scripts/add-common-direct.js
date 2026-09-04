#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 为 zh 语言添加 common 对象
const zhCommon = `  zh: {
    site_title: '🛠️ Multi Tools',
    common: {
      'back_to_home': '返回首页',
      'click_to_upload': '点击上传',
      'or_drag_drop': '或拖放文件',
      'compress': '压缩',
      'download': '下载',
      'select_file': '选择文件'
    },
    site_subtitle: '46+ 免费在线工具',`;

const enCommon = `  en: {
    site_title: '🛠️ Multi Tools',
    common: {
      'back_to_home': 'Back to Home',
      'click_to_upload': 'Click to upload',
      'or_drag_drop': 'or drag and drop',
      'compress': 'Compress',
      'download': 'Download',
      'select_file': 'Select File'
    },
    site_subtitle: '46+ Free Online Tools for Everyone',`;

// 替换 zh 部分
if (content.includes("zh: {\n    site_title:")) {
  content = content.replace(
    /zh: \{\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:/,
    zhCommon.replace('site_subtitle:', '    site_subtitle:')
  );
  console.log('✓ 已添加 zh 的 common 翻译');
}

// 替换 en 部分
if (content.includes("en: {\n    site_title:")) {
  content = content.replace(
    /en: \{\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:/,
    enCommon.replace('site_subtitle:', '    site_subtitle:')
  );
  console.log('✓ 已添加 en 的 common 翻译');
}

fs.writeFileSync(path, content);
console.log('✅ lang.js 已更新');
