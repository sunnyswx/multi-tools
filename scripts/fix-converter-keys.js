#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 移除错误的 converter 翻译键（带点号的）
content = content.replace(/    'converter\.[^']+'\s*:\s*'[^']+',\n/g, '');

// 在每个语言的 common 对象后添加正确的 converter 对象
const additions = {
  en: `    converter: {
      'format_label': 'Convert to:',
      'convert': 'Convert',
      'download': 'Download'
    },`,
  zh: `    converter: {
      'format_label': '转换为：',
      'convert': '转换',
      'download': '下载'
    },`,
  ja: `    converter: {
      'format_label': '変換先：',
      'convert': '変換',
      'download': 'ダウンロード'
    },`,
  ko: `    converter: {
      'format_label': '변환:',
      'convert': '변환',
      'download': '다운로드'
    },`,
  es: `    converter: {
      'format_label': 'Convertir a:',
      'convert': 'Convertir',
      'download': 'Descargar'
    },`,
  fr: `    converter: {
      'format_label': 'Convertir en :',
      'convert': 'Convertir',
      'download': 'Télécharger'
    },`,
  de: `    converter: {
      'format_label': 'Konvertieren zu:',
      'convert': 'Konvertieren',
      'download': 'Herunterladen'
    },`,
  ru: `    converter: {
      'format_label': 'Конвертировать в:',
      'convert': 'Конвертировать',
      'download': 'Скачать'
    },`,
  ar: `    converter: {
      'format_label': 'تحويل إلى:',
      'convert': 'تحويل',
      'download': 'تحميل'
    },`
};

// 在每个语言的 common 对象结束后添加 converter 对象
Object.entries(additions).forEach(([lang, translation]) => {
  const pattern = new RegExp(`(${lang}: \\{[\\s\\S]*?common: \\{[\\s\\S]*?\\},)`);
  const match = content.match(pattern);
  if (match) {
    content = content.replace(match[0], `${match[1]}${translation}`);
    console.log(`✓ 添加 ${lang} 的 converter 对象`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已修复');
