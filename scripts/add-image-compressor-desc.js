#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Add image-compressor-desc to each language section at the end of tools object
const fixes = [
  { lang: 'en', pattern: "'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' }", replacement: "'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' },\n      'image-compressor-desc': { name: 'Image Compressor', desc: 'Compress images online for free' }" },
  { lang: 'zh', pattern: "'text-to-speech': { name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' }", replacement: "'text-to-speech': { name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' },\n      'image-compressor-desc': { name: '图片压缩工具', desc: '免费在线压缩图片' }" },
  { lang: 'ja', pattern: "'text-to-speech': { name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' }", replacement: "'text-to-speech': { name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' },\n      'image-compressor-desc': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' }" },
  { lang: 'ko', pattern: "'text-to-speech': { name: '텍스트 음성 변환', desc: 'Web Speech API를 사용하여 텍스트를 음성으로 변환' }", replacement: "'text-to-speech': { name: '텍스트 음성 변환', desc: 'Web Speech API를 사용하여 텍스트를 음성으로 변환' },\n      'image-compressor-desc': { name: '이미지 압축기', desc: '온라인으로 이미지 압축' }" },
  { lang: 'es', pattern: "'text-to-speech': { name: 'Texto a Voz', desc: 'Convierte texto a voz usando Web Speech API' }", replacement: "'text-to-speech': { name: 'Texto a Voz', desc: 'Convierte texto a voz usando Web Speech API' },\n      'image-compressor-desc': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea' }" },
  { lang: 'fr', pattern: "text-to-speech': { name: 'Texte vers Parole', desc: \"Convertissez du texte en parole utilisant l'API Web Speech\" }", replacement: "text-to-speech': { name: 'Texte vers Parole', desc: \"Convertissez du texte en parole utilisant l'API Web Speech\" },\n      'image-compressor-desc': { name: 'Compresseur d\\'Images', desc: 'Compressez des images en ligne' }" },
  { lang: 'de', pattern: "'text-to-speech': { name: 'Text-zu-Sprache', desc: 'Konvertieren Sie Text mit Web Speech API in Sprache' }", replacement: "'text-to-speech': { name: 'Text-zu-Sprache', desc: 'Konvertieren Sie Text mit Web Speech API in Sprache' },\n      'image-compressor-desc': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online' }" },
  { lang: 'ru', pattern: "'text-to-speech': { name: 'Текст в Речь', desc: 'Преобразуйте текст в речь с помощью Web Speech API' }", replacement: "'text-to-speech': { name: 'Текст в Речь', desc: 'Преобразуйте текст в речь с помощью Web Speech API' },\n      'image-compressor-desc': { name: 'Компрессор Изображений', desc: 'Сжимайте изображения онлайн' }" },
  { lang: 'ar', pattern: "'text-to-speech': { name: 'النص إلى كلام', desc: 'حوّل النص إلى كلام باستخدام Web Speech API' }", replacement: "'text-to-speech': { name: 'النص إلى كلام', desc: 'حوّل النص إلى كلام باستخدام Web Speech API' },\n      'image-compressor-desc': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت' }" }
];

for (const fix of fixes) {
  content = content.replace(fix.pattern, fix.replacement);
}

fs.writeFileSync(path, content);
console.log('Added image-compressor-desc to all languages');
