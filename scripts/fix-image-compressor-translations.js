#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Add sub-page translations for image-compressor
// English
content = content.replace(
  "'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' }",
  "'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' },\n      'image-compressor-name': { name: 'Image Compressor', desc: 'Compress images online for free' },\n      'image-compressor-desc': { desc: 'Compress images online for free' }"
);

// Chinese
content = content.replace(
  "'text-to-speech': { name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' }",
  "'text-to-speech': { name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' },\n      'image-compressor-name': { name: '图片压缩工具', desc: '免费在线压缩图片' },\n      'image-compressor-desc': { desc: '免费在线压缩图片' }"
);

// Japanese
content = content.replace(
  "'text-to-speech': { name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' }",
  "'text-to-speech': { name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' },\n      'image-compressor-name': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' },\n      'image-compressor-desc': { desc: 'オンラインで画像を圧縮' }"
);

// Korean
content = content.replace(
  "'text-to-speech': { name: '텍스트 음성 변환', desc: 'Web Speech API를 사용하여 텍스트를 음성으로 변환' }",
  "'text-to-speech': { name: '텍스트 음성 변환', desc: 'Web Speech API를 사용하여 텍스트를 음성으로 변환' },\n      'image-compressor-name': { name: '이미지 압축기', desc: '온라인으로 이미지 압축' },\n      'image-compressor-desc': { desc: '온라인으로 이미지 압축' }"
);

// Spanish
content = content.replace(
  "'text-to-speech': { name: 'Texto a Voz', desc: 'Convierte texto a voz usando Web Speech API' }",
  "'text-to-speech': { name: 'Texto a Voz', desc: 'Convierte texto a voz usando Web Speech API' },\n      'image-compressor-name': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea' },\n      'image-compressor-desc': { desc: 'Comprime imágenes en línea' }"
);

// French
content = content.replace(
  "'text-to-speech': { name: 'Texte vers Parole', desc: \"Convertissez du texte en parole utilisant l'API Web Speech\" }",
  "'text-to-speech': { name: 'Texte vers Parole', desc: \"Convertissez du texte en parole utilisant l'API Web Speech\" },\n      'image-compressor-name': { name: 'Compresseur d\\'Images', desc: 'Compressez des images en ligne' },\n      'image-compressor-desc': { desc: 'Compressez des images en ligne' }"
);

// German
content = content.replace(
  "'text-to-speech': { name: 'Text-zu-Sprache', desc: 'Konvertieren Sie Text mit Web Speech API in Sprache' }",
  "'text-to-speech': { name: 'Text-zu-Sprache', desc: 'Konvertieren Sie Text mit Web Speech API in Sprache' },\n      'image-compressor-name': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online' },\n      'image-compressor-desc': { desc: 'Komprimieren Sie Bilder online' }"
);

// Russian
content = content.replace(
  "'text-to-speech': { name: 'Текст в Речь', desc: 'Преобразуйте текст в речь с помощью Web Speech API' }",
  "'text-to-speech': { name: 'Текст в Речь', desc: 'Преобразуйте текст в речь с помощью Web Speech API' },\n      'image-compressor-name': { name: 'Компрессор Изображений', desc: 'Сжимайте изображения онлайн' },\n      'image-compressor-desc': { desc: 'Сжимайте изображения онлайн' }"
);

// Arabic
content = content.replace(
  "'text-to-speech': { name: 'النص إلى كلام', desc: 'حوّل النص إلى كلام باستخدام Web Speech API' }",
  "'text-to-speech': { name: 'النص إلى كلام', desc: 'حوّل النص إلى كلام باستخدام Web Speech API' },\n      'image-compressor-name': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت' },\n      'image-compressor-desc': { desc: 'اضغط الصور عبر الإنترنت' }"
);

fs.writeFileSync(path, content);
console.log('Added sub-page translations for image-compressor');
