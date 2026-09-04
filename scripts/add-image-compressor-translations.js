#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 为每种语言添加 image-compressor 的额外翻译
const additions = {
  en: {
    'image-compressor-quality_label': 'Compression Quality',
    'image-compressor-original_size': 'Original Size',
    'image-compressor-compressed_size': 'Compressed Size',
    'image-compressor-reduction': 'Reduction',
    'image-compressor-unit-bytes': 'Bytes',
    'image-compressor-unit-kb': 'KB',
    'image-compressor-unit-mb': 'MB',
    'image-compressor-unit-gb': 'GB'
  },
  zh: {
    'image-compressor-quality_label': '压缩质量',
    'image-compressor-original_size': '原始大小',
    'image-compressor-compressed_size': '压缩后大小',
    'image-compressor-reduction': '压缩率',
    'image-compressor-unit-bytes': '字节',
    'image-compressor-unit-kb': 'KB',
    'image-compressor-unit-mb': 'MB',
    'image-compressor-unit-gb': 'GB'
  },
  ja: {
    'image-compressor-quality_label': '圧縮品質',
    'image-compressor-original_size': '元のサイズ',
    'image-compressor-compressed_size': '圧縮後サイズ',
    'image-compressor-reduction': '圧縮率',
    'image-compressor-unit-bytes': 'バイト',
    'image-compressor-unit-kb': 'KB',
    'image-compressor-unit-mb': 'MB',
    'image-compressor-unit-gb': 'GB'
  },
  ko: {
    'image-compressor-quality_label': '압축 품질',
    'image-compressor-original_size': '원본 크기',
    'image-compressor-compressed_size': '압축 후 크기',
    'image-compressor-reduction': '압축률',
    'image-compressor-unit-bytes': '바이트',
    'image-compressor-unit-kb': 'KB',
    'image-compressor-unit-mb': 'MB',
    'image-compressor-unit-gb': 'GB'
  },
  es: {
    'image-compressor-quality_label': 'Calidad de compresión',
    'image-compressor-original_size': 'Tamaño original',
    'image-compressor-compressed_size': 'Tamaño comprimido',
    'image-compressor-reduction': 'Reducción',
    'image-compressor-unit-bytes': 'Bytes',
    'image-compressor-unit-kb': 'KB',
    'image-compressor-unit-mb': 'MB',
    'image-compressor-unit-gb': 'GB'
  },
  fr: {
    'image-compressor-quality_label': 'Qualité de compression',
    'image-compressor-original_size': 'Taille d\'origine',
    'image-compressor-compressed_size': 'Taille compressée',
    'image-compressor-reduction': 'Réduction',
    'image-compressor-unit-bytes': 'Octets',
    'image-compressor-unit-kb': 'Ko',
    'image-compressor-unit-mb': 'Mo',
    'image-compressor-unit-gb': 'Go'
  },
  de: {
    'image-compressor-quality_label': 'Kompressionsqualität',
    'image-compressor-original_size': 'Originalgröße',
    'image-compressor-compressed_size': 'Komprimierte Größe',
    'image-compressor-reduction': 'Reduzierung',
    'image-compressor-unit-bytes': 'Bytes',
    'image-compressor-unit-kb': 'KB',
    'image-compressor-unit-mb': 'MB',
    'image-compressor-unit-gb': 'GB'
  },
  ru: {
    'image-compressor-quality_label': 'Качество сжатия',
    'image-compressor-original_size': 'Исходный размер',
    'image-compressor-compressed_size': 'Сжатый размер',
    'image-compressor-reduction': 'Сжатие',
    'image-compressor-unit-bytes': 'Байт',
    'image-compressor-unit-kb': 'КБ',
    'image-compressor-unit-mb': 'МБ',
    'image-compressor-unit-gb': 'ГБ'
  },
  ar: {
    'image-compressor-quality_label': 'جودة الضغط',
    'image-compressor-original_size': 'الحجم الأصلي',
    'image-compressor-compressed_size': 'الحجم المضغوط',
    'image-compressor-reduction': 'التقليل',
    'image-compressor-unit-bytes': 'بايت',
    'image-compressor-unit-kb': 'كيلوبايت',
    'image-compressor-unit-mb': 'ميغابايت',
    'image-compressor-unit-gb': 'غيغابايت'
  }
};

// 在每种语言的 tools 对象后添加新的翻译键
Object.entries(additions).forEach(([lang, translations]) => {
  // 找到该语言的 tools 对象结束位置
  const langPattern = new RegExp(`(${lang}: \\{[\\s\\S]*?site_title: '[^']+',[\\s\\S]*?tools: \\{[\\s\\S]*?\\},)`);
  const match = content.match(langPattern);
  
  if (match) {
    // 在 tools 对象后添加新的翻译
    const transStr = Object.entries(translations).map(([k, v]) => `      '${k}': '${v}',`).join('\n');
    const newSection = `\n    ui: {\n${transStr}\n    }`;
    content = content.replace(match[0], `${match[1]}${newSection}`);
    console.log(`✓ 添加 ${lang} 的 UI 翻译`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已更新');
