#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 在每种语言中添加简单的翻译键
const translations = {
  en: {
    quality_label: 'Compression Quality',
    original_size: 'Original Size',
    compressed_size: 'Compressed Size',
    reduction: 'Reduction',
    bytes: 'Bytes',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB'
  },
  zh: {
    quality_label: '压缩质量',
    original_size: '原始大小',
    compressed_size: '压缩后大小',
    reduction: '压缩率',
    bytes: '字节',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB'
  },
  ja: {
    quality_label: '圧縮品質',
    original_size: '元のサイズ',
    compressed_size: '圧縮後サイズ',
    reduction: '圧縮率',
    bytes: 'バイト',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB'
  },
  ko: {
    quality_label: '압축 품질',
    original_size: '원본 크기',
    compressed_size: '압축 후 크기',
    reduction: '압축률',
    bytes: '바이트',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB'
  },
  es: {
    quality_label: 'Calidad de compresión',
    original_size: 'Tamaño original',
    compressed_size: 'Tamaño comprimido',
    reduction: 'Reducción',
    bytes: 'Bytes',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB'
  },
  fr: {
    quality_label: 'Qualité de compression',
    original_size: 'Taille d\'origine',
    compressed_size: 'Taille compressée',
    reduction: 'Réduction',
    bytes: 'Octets',
    kb: 'Ko',
    mb: 'Mo',
    gb: 'Go'
  },
  de: {
    quality_label: 'Kompressionsqualität',
    original_size: 'Originalgröße',
    compressed_size: 'Komprimierte Größe',
    reduction: 'Reduzierung',
    bytes: 'Bytes',
    kb: 'KB',
    mb: 'MB',
    gb: 'GB'
  },
  ru: {
    quality_label: 'Качество сжатия',
    original_size: 'Исходный размер',
    compressed_size: 'Сжатый размер',
    reduction: 'Сжатие',
    bytes: 'Байт',
    kb: 'КБ',
    mb: 'МБ',
    gb: 'ГБ'
  },
  ar: {
    quality_label: 'جودة الضغط',
    original_size: 'الحجم الأصلي',
    compressed_size: 'الحجم المضغوط',
    reduction: 'التقليل',
    bytes: 'بايت',
    kb: 'كيلوبايت',
    mb: 'ميغابايت',
    gb: 'غيغابايت'
  }
};

// 在每个语言的顶部添加这些简单翻译
Object.entries(translations).forEach(([lang, trans]) => {
  const pattern = new RegExp(`(${lang}: \\{\\s*\\n\\s*site_title: '[^']+',)`);
  const match = content.match(pattern);
  if (match) {
    const transStr = Object.entries(trans).map(([k, v]) => `    '${k}': '${v}',`).join('\n');
    const replacement = `${match[1]}
    // Image compressor UI
${transStr}`;
    content = content.replace(match[0], replacement);
    console.log(`✓ 添加 ${lang} 的简单翻译`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已更新');
