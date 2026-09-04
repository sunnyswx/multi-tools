#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 在每种语言中添加 image-converter 的翻译
const additions = {
  en: {
    'converter.format_label': 'Convert to:',
    'converter.convert': 'Convert',
    'converter.download': 'Download'
  },
  zh: {
    'converter.format_label': '转换为：',
    'converter.convert': '转换',
    'converter.download': '下载'
  },
  ja: {
    'converter.format_label': '変換先：',
    'converter.convert': '変換',
    'converter.download': 'ダウンロード'
  },
  ko: {
    'converter.format_label': '변환:',
    'converter.convert': '변환',
    'converter.download': '다운로드'
  },
  es: {
    'converter.format_label': 'Convertir a:',
    'converter.convert': 'Convertir',
    'converter.download': 'Descargar'
  },
  fr: {
    'converter.format_label': 'Convertir en :',
    'converter.convert': 'Convertir',
    'converter.download': 'Télécharger'
  },
  de: {
    'converter.format_label': 'Konvertieren zu:',
    'converter.convert': 'Konvertieren',
    'converter.download': 'Herunterladen'
  },
  ru: {
    'converter.format_label': 'Конвертировать в:',
    'converter.convert': 'Конвертировать',
    'converter.download': 'Скачать'
  },
  ar: {
    'converter.format_label': 'تحويل إلى:',
    'converter.convert': 'تحويل',
    'converter.download': 'تحميل'
  }
};

// 在每个语言的 common 对象后添加 converter 对象
Object.entries(additions).forEach(([lang, trans]) => {
  const pattern = new RegExp(`(${lang}: \\{[\\s\\S]*?common: \\{[\\s\\S]*?\\},)`);
  const match = content.match(pattern);
  if (match) {
    const transStr = Object.entries(trans).map(([k, v]) => `    '${k}': '${v}',`).join('\n');
    const replacement = `${match[1]}\n    // Image converter UI\n${transStr}`;
    content = content.replace(match[0], replacement);
    console.log(`✓ 添加 ${lang} 的 converter 翻译`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已更新');
