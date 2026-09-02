#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix: Remove image-compressor-name and image-compressor-desc from tools object
// They should be at the top level, not inside tools

// Remove from English section
content = content.replace(
  `      'image-compressor-name': { name: 'Image Compressor', desc: 'Compress images online for free' },\n      'image-compressor-desc': { desc: 'Compress images online for free' }\n    }\n  },`,
  `      'image-compressor-desc': { name: 'Image Compressor', desc: 'Compress images online for free' }\n    }\n  },`
);

// Remove from Chinese section
content = content.replace(
  `      'image-compressor-name': { name: '图片压缩工具', desc: '免费在线压缩图片' },\n      'image-compressor-desc': { desc: '免费在线压缩图片' }\n    }\n  },`,
  `      'image-compressor-desc': { name: '图片压缩工具', desc: '免费在线压缩图片' }\n    }\n  },`
);

// Remove from Japanese section
content = content.replace(
  `      'image-compressor-name': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' },\n      'image-compressor-desc': { desc: 'オンラインで画像を圧縮' }\n    }\n  },`,
  `      'image-compressor-desc': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' }\n    }\n  },`
);

// Remove from Korean section
content = content.replace(
  `      'image-compressor-name': { name: '이미지 압축기', desc: '온라인으로 이미지 압축' },\n      'image-compressor-desc': { desc: '온라인으로 이미지 압축' }\n    }\n  },`,
  `      'image-compressor-desc': { name: '이미지 압축기', desc: '온라인으로 이미지 압축' }\n    }\n  },`
);

// Remove from Spanish section
content = content.replace(
  `      'image-compressor-name': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea' },\n      'image-compressor-desc': { desc: 'Comprime imágenes en línea' }\n    }\n  },`,
  `      'image-compressor-desc': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea' }\n    }\n  },`
);

// Remove from French section
content = content.replace(
  `      'image-compressor-name': { name: 'Compresseur d'Images', desc: 'Compressez des images en ligne' },\n      'image-compressor-desc': { desc: 'Compressez des images en ligne' }\n    }\n  },`,
  `      'image-compressor-desc': { name: 'Compresseur d'Images', desc: 'Compressez des images en ligne' }\n    }\n  },`
);

// Remove from German section
content = content.replace(
  `      'image-compressor-name': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online' },\n      'image-compressor-desc': { desc: 'Komprimieren Sie Bilder online' }\n    }\n  },`,
  `      'image-compressor-desc': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online' }\n    }\n  },`
);

// Remove from Russian section
content = content.replace(
  `      'image-compressor-name': { name: 'Компрессор Изображений', desc: 'Сжимайте изображения онлайн' },\n      'image-compressor-desc': { desc: 'Сжимайте изображения онлайн' }\n    }\n  },`,
  `      'image-compressor-desc': { name: 'Компрессор Изображений', desc: 'Сжимайте изображения онлайн' }\n    }\n  },`
);

// Remove from Arabic section
content = content.replace(
  `      'image-compressor-name': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت' },\n      'image-compressor-desc': { desc: 'اضغط الصور عبر الإنترنت' }\n    }\n  }`,
  `      'image-compressor-desc': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت' }\n    }`
);

fs.writeFileSync(path, content);
console.log('Fixed translations structure');
