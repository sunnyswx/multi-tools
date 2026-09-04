#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

let content = fs.readFileSync(path, 'utf8');

// 1. 添加 data-i18n 属性到 HTML 元素
content = content.replace(
  '<label>Compression Quality: <span id="qualityValue">80</span>%</label>',
  '<label><span data-i18n="image-compressor.quality_label">Compression Quality</span>: <span id="qualityValue">80</span>%</label>'
);

content = content.replace(
  '<p><strong>Original Size:</strong> <span id="originalSize">-</span></p>',
  '<p><strong data-i18n="image-compressor.original_size">Original Size</strong>: <span id="originalSize">-</span></p>'
);

content = content.replace(
  '<p><strong>Compressed Size:</strong> <span id="compressedSize">-</span></p>',
  '<p><strong data-i18n="image-compressor.compressed_size">Compressed Size</strong>: <span id="compressedSize">-</span></p>'
);

content = content.replace(
  '<p><strong>Reduction:</strong> <span id="reduction">-</span></p>',
  '<p><strong data-i18n="image-compressor.reduction">Reduction</strong>: <span id="reduction">-</span></p>'
);

// 2. 更新 formatBytes 函数支持多语言
content = content.replace(
  `function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }`,
  `function formatBytes(bytes) {
            if (bytes === 0) return '0 ' + getUnit('bytes');
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + getUnit(sizes[i].toLowerCase());
        }
        
        function getUnit(unit) {
            const units = {
                'bytes': translations[getLanguage()]?.['image-compressor']?.['units']?.['bytes'] || 'Bytes',
                'kb': translations[getLanguage()]?.['image-compressor']?.['units']?.['kb'] || 'KB',
                'mb': translations[getLanguage()]?.['image-compressor']?.['units']?.['mb'] || 'MB',
                'gb': translations[getLanguage()]?.['image-compressor']?.['units']?.['gb'] || 'GB'
            };
            return units[unit] || unit;
        }`
);

fs.writeFileSync(path, content);
console.log('✅ 已更新 image-compressor.html');
