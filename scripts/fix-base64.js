#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Add missing base64 and base64-image-converter translations for all languages

// English
content = content.replace(
  "      'base64': { name: 'Base64 Encoder/Decoder', desc: 'Encode and decode Base64 strings online.' },",
  "      'base64': { name: 'Base64 Encoder/Decoder', desc: 'Encode and decode Base64 strings online.' },\n      'base64-image-converter': { name: 'Base64 Image Converter', desc: 'Convert images to Base64 data URL format.' },"
);

// Chinese
content = content.replace(
  "      'base64': { name: 'Base64编解码器', desc: '在线编码和解码Base64字符串' },",
  "      'base64': { name: 'Base64编解码器', desc: '在线编码和解码Base64字符串' },\n      'base64-image-converter': { name: 'Base64图片转换器', desc: '将图片转换为Base64数据URL格式' },"
);

// Japanese
content = content.replace(
  "      'base64-image-converter': { name: 'Base64画像変換', desc: '画像をBase64データURL形式に変換' },",
  "      'base64': { name: 'Base64エンコーダー/デコーダー', desc: 'Base64文字列をオンラインでエンコードおよびデコード' },\n      'base64-image-converter': { name: 'Base64画像変換', desc: '画像をBase64データURL形式に変換' },"
);

// Korean
content = content.replace(
  "      'base64-image-converter': { name: 'Base64 이미지 변환기', desc: '이미지를 Base64 데이터 URL 형식으로 변환' },",
  "      'base64': { name: 'Base64 인코더/디코더', desc: 'Base64 문자열을 온라인으로 인코딩 및 디코딩' },\n      'base64-image-converter': { name: 'Base64 이미지 변환기', desc: '이미지를 Base64 데이터 URL 형식으로 변환' },"
);

// Spanish
content = content.replace(
  "      'base64-image-converter': { name: 'Conversor de Imágenes Base64', desc: 'Convierte imágenes a formato URL de datos Base64' },",
  "      'base64': { name: 'Codificador/Decodificador Base64', desc: 'Codifica y decodifica cadenas Base64 en línea' },\n      'base64-image-converter': { name: 'Conversor de Imágenes Base64', desc: 'Convierte imágenes a formato URL de datos Base64' },"
);

// French
content = content.replace(
  "      'base64-image-converter': { name: 'Convertisseur d''Images Base64', desc: 'Convertissez des images en format URL de données Base64' },",
  "      'base64': { name: 'Encodeur/Décodeur Base64', desc: 'Encodez et décodez des chaînes Base64 en ligne' },\n      'base64-image-converter': { name: 'Convertisseur d''Images Base64', desc: 'Convertissez des images en format URL de données Base64' },"
);

// German
content = content.replace(
  "      'base64-image-converter': { name: 'Base64-Bildkonverter', desc: 'Konvertieren Sie Bilder in Base64-Daten-URL-Format' },",
  "      'base64': { name: 'Base64-Codierer/Decodierer', desc: 'Codieren und decodieren Sie Base64-Zeichenfolgen online' },\n      'base64-image-converter': { name: 'Base64-Bildkonverter', desc: 'Konvertieren Sie Bilder in Base64-Daten-URL-Format' },"
);

// Russian
content = content.replace(
  "      'base64-image-converter': { name: 'Конвертер Изображений Base64', desc: 'Преобразуйте изображения в формат URL данных Base64' },",
  "      'base64': { name: 'Кодировщик/Декодировщик Base64', desc: 'Кодируйте и декодируйте Base64 строки онлайн' },\n      'base64-image-converter': { name: 'Конвертер Изображений Base64', desc: 'Преобразуйте изображения в формат URL данных Base64' },"
);

// Arabic
content = content.replace(
  "      'base64-image-converter': { name: 'محول الصور Base64', desc: 'حوّل الصور إلى تنسيق URL للبيانات Base64' },",
  "      'base64': { name: 'مشفّر/نافك تشفير Base64', desc: 'شفّر وفك تشفير سلاسل Base64 عبر الإنترنت' },\n      'base64-image-converter': { name: 'محول الصور Base64', desc: 'حوّل الصور إلى تنسيق URL للبيانات Base64' },"
);

fs.writeFileSync(path, content);
console.log('Added missing base64 and base64-image-converter translations');
