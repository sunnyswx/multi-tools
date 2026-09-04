#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 在每种语言的 tools 对象后添加 ui 对象
const langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];

langs.forEach(lang => {
  // 查找该语言的 tools 对象结束位置
  const pattern = new RegExp(`(${lang}: \\{[\\s\\S]*?tools: \\{[\\s\\S]*?)(\\s*\})(,\s*\n\s*${lang}:|\s*\})`, 'm');
  const match = content.match(pattern);
  
  if (match) {
    // 在 tools 对象后添加 ui 对象
    const uiBlock = `
    ui: {
      'image-compressor-quality_label': '${lang === 'zh' ? '压缩质量' : lang === 'ja' ? '圧縮品質' : lang === 'ko' ? '압축 품질' : lang === 'es' ? 'Calidad de compresión' : lang === 'fr' ? 'Qualité de compression' : lang === 'de' ? 'Kompressionsqualität' : lang === 'ru' ? 'Качество сжатия' : 'Compression Quality'}',
      'image-compressor-original_size': '${lang === 'zh' ? '原始大小' : lang === 'ja' ? '元のサイズ' : lang === 'ko' ? '원본 크기' : lang === 'es' ? 'Tamaño original' : lang === 'fr' ? 'Taille d\'origine' : lang === 'de' ? 'Originalgröße' : lang === 'ru' ? 'Исходный размер' : 'Original Size'}',
      'image-compressor-compressed_size': '${lang === 'zh' ? '压缩后大小' : lang === 'ja' ? '圧縮後サイズ' : lang === 'ko' ? '압축 후 크기' : lang === 'es' ? 'Tamaño comprimido' : lang === 'fr' ? 'Taille compressée' : lang === 'de' ? 'Komprimierte Größe' : lang === 'ru' ? 'Сжатый размер' : 'Compressed Size'}',
      'image-compressor-reduction': '${lang === 'zh' ? '压缩率' : lang === 'ja' ? '圧縮率' : lang === 'ko' ? '압축률' : lang === 'es' ? 'Reducción' : lang === 'fr' ? 'Réduction' : lang === 'de' ? 'Reduzierung' : lang === 'ru' ? 'Сжатие' : 'Reduction'}',
      'image-compressor-unit-bytes': '${lang === 'zh' ? '字节' : lang === 'ja' ? 'バイト' : lang === 'ko' ? '바이트' : lang === 'es' ? 'Bytes' : lang === 'fr' ? 'Octets' : lang === 'de' ? 'Bytes' : lang === 'ru' ? 'Байт' : 'Bytes'}',
      'image-compressor-unit-kb': 'KB',
      'image-compressor-unit-mb': 'MB',
      'image-compressor-unit-gb': 'GB'
    },`;
    
    content = content.replace(match[0], `${match[1]}${uiBlock}$2`);
    console.log(`✓ 添加 ${lang} 的 ui 翻译`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已更新');
