#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Add sub-page translations for image-compressor
// English
content = content.replace(
  "'image-compressor': { name: 'Image Compressor', desc: 'Compress images online for free. Reduce file size while maintaining quality.' },",
  `'image-compressor': { name: 'Image Compressor', desc: 'Compress images online for free. Reduce file size while maintaining quality.' },
      'image-compressor-page': { name: 'Image Compressor', desc: 'Compress images online for free' },`
);

// Chinese
content = content.replace(
  "'image-compressor': { name: '图片压缩工具', desc: '免费在线压缩PNG、JPG、WebP图片，本地处理保护隐私' },",
  `'image-compressor': { name: '图片压缩工具', desc: '免费在线压缩PNG、JPG、WebP图片，本地处理保护隐私' },
      'image-compressor-page': { name: '图片压缩工具', desc: '免费在线压缩图片' },`
);

// Japanese
content = content.replace(
  "'image-compressor': { name: '画像圧縮ツール', desc: 'PNG、JPG、WebP画像を無料で圧縮' },",
  `'image-compressor': { name: '画像圧縮ツール', desc: 'PNG、JPG、WebP画像を無料で圧縮' },
      'image-compressor-page': { name: '画像圧縮ツール', desc: 'オンラインで画像を無料で圧縮' },`
);

// Korean
content = content.replace(
  "'image-compressor': { name: '이미지 압축기', desc: 'PNG, JPG, WebP 이미지를 무료로 압축' },",
  `'image-compressor': { name: '이미지 압축기', desc: 'PNG, JPG, WebP 이미지를 무료로 압축' },
      'image-compressor-page': { name: '이미지 압축기', desc: '온라인으로 이미지를 무료로 압축' },`
);

// Spanish
content = content.replace(
  "'image-compressor': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes PNG, JPG, WebP gratis' },",
  `'image-compressor': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes PNG, JPG, WebP gratis' },
      'image-compressor-page': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea gratis' },`
);

// French
content = content.replace(
  "'image-compressor': { name: 'Compresseur d\\'Images', desc: 'Compressez des images PNG, JPG, WebP gratuitement' },",
  `'image-compressor': { name: 'Compresseur d'Images', desc: 'Compressez des images PNG, JPG, WebP gratuitement' },
      'image-compressor-page': { name: 'Compresseur d'Images', desc: 'Compressez des images en ligne gratuitement' },`
);

// German
content = content.replace(
  "'image-compressor': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie PNG, JPG, WebP Bilder kostenlos' },",
  `'image-compressor': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie PNG, JPG, WebP Bilder kostenlos' },
      'image-compressor-page': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online kostenlos' },`
);

// Russian
content = content.replace(
  "'image-compressor': { name: 'Компрессор Изображений', desc: 'Бесплатно сжимайте PNG, JPG, WebP изображения' },",
  `'image-compressor': { name: 'Компрессор Изображений', desc: 'Бесплатно сжимайте PNG, JPG, WebP изображения' },
      'image-compressor-page': { name: 'Компрессор Изображений', desc: 'Бесплатно сжимайте изображения онлайн' },`
);

// Arabic
content = content.replace(
  "'image-compressor': { name: 'ضاغط الصور', desc: 'اضغط الصور PNG, JPG, WebP مجانا' },",
  `'image-compressor': { name: 'ضاغط الصور', desc: 'اضغط الصور PNG, JPG, WebP مجانا' },
      'image-compressor-page': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت مجانا' },`
);

fs.writeFileSync(path, content);
console.log('Added sub-page translations for image-compressor');
