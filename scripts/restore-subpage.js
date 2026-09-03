#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-compressor.html';

// 完整的子页面代码
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Compressor - Multi Tools</title>
    <meta name="description" content="Compress images online for free. 免费在线压缩PNG、JPG、WebP图片">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    </script>
    <link rel="stylesheet" href="../css/style.css">
    <script src="../lang.js"></script>
    <script src="../js/i18n.js"></script>
    <style>
        .tool-container { max-width: 900px; margin: 0 auto; padding: 20px; }
        .tool-header { text-align: center; margin-bottom: 30px; }
        .tool-header h1 { color: #333; font-size: 2rem; margin-bottom: 10px; }
        .tool-header p { color: #666; font-size: 1.1rem; }
        .upload-area { border: 2px dashed #ccc; border-radius: 8px; padding: 40px; text-align: center; cursor: pointer; transition: all 0.3s; }
        .upload-area:hover { border-color: #667eea; background: #f8f9fa; }
        .quality-slider { margin: 20px 0; }
        .preview-container { margin: 20px 0; text-align: center; }
        .preview-container img { max-width: 100%; border-radius: 8px; }
        .result-info { margin: 20px 0; padding: 15px; background: #f8f9fa; border-radius: 8px; }
        .btn-group { margin-top: 20px; }
        .language-selector { margin-top: 30px; text-align: center; }
        select { padding: 8px 12px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <nav>
                <a href="../" class="logo">🛠️ Multi Tools</a>
                <div class="language-selector">
                    <select id="langSelect" onchange="i18n.setLanguage(this.value)">
                        <option value="en">English</option>
                        <option value="zh">中文</option>
                        <option value="ja">日本語</option>
                        <option value="ko">한국어</option>
                        <option value="es">Español</option>
                        <option value="fr">Français</option>
                        <option value="de">Deutsch</option>
                        <option value="ru">Русский</option>
                        <option value="ar">العربية</option>
                    </select>
                </div>
            </nav>
        </header>
        
        <main>
            <div class="tool-header">
                <h1 data-i18n="tools.image-compressor.name">🗜️ Image Compressor</h1>
                <p data-i18n="tools.image-compressor.desc">Compress images online for free</p>
            </div>
            <div class="tool-container">
                <div class="tool-content">
                    <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
                        <div style="font-size: 3rem; margin-bottom: 15px;">📁</div>
                        <h3>Click to upload image</h3>
                        <p>or drag and drop</p>
                        <input type="file" id="fileInput" accept="image/*" onchange="handleFile(event)">
                    </div>
                    <div class="quality-slider" id="qualityControl" style="display: none;">
                        <label>Compression Quality: <span id="qualityValue">80</span>%</label>
                        <input type="range" id="quality" min="10" max="100" value="80" oninput="updateQuality()">
                    </div>
                    <div class="preview-container" id="previewContainer">
                        <img id="preview" src="" alt="Preview">
                    </div>
                    <div class="result-info" id="resultInfo">
                        <p><strong>Original Size:</strong> <span id="originalSize">-</span></p>
                        <p><strong>Compressed Size:</strong> <span id="compressedSize">-</span></p>
                        <p><strong>Reduction:</strong> <span id="reduction">-</span></p>
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-primary" id="compressBtn" style="display: none;" onclick="compress()">Compress</button>
                        <button class="btn btn-secondary" id="downloadBtn" style="display: none;" onclick="download()">Download</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
    <script>
        // 初始化多语言
        i18n.init();
        
        // 调试日志
        console.log('[DEBUG] Language initialized:', i18n.getLanguage());
        console.log('[DEBUG] translations available:', typeof translations !== 'undefined');
        console.log('[DEBUG] image-compressor translation:', translations[i18n.getLanguage()]?.tools?.['image-compressor']);
        
        // 工具功能代码
        let originalFile = null;
        let compressedBlob = null;
        
        document.addEventListener('DOMContentLoaded', function() {
            const uploadArea = document.getElementById('uploadArea');
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.style.borderColor = '#667eea';
                uploadArea.style.background = '#f8f9fa';
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.style.borderColor = '#e0e0e0';
                uploadArea.style.background = 'transparent';
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith('image/')) {
                    handleFile({ target: { files: [file] } });
                }
            });
        });
        
        function handleFile(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            originalFile = file;
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('preview').src = e.target.result;
                document.getElementById('previewContainer').style.display = 'block';
                document.getElementById('qualityControl').style.display = 'block';
                document.getElementById('compressBtn').style.display = 'block';
                document.getElementById('originalSize').textContent = formatBytes(file.size);
            };
            reader.readAsDataURL(file);
        }
        
        function updateQuality() {
            document.getElementById('qualityValue').textContent = document.getElementById('quality').value;
        }
        
        function compress() {
            const quality = parseInt(document.getElementById('quality').value) / 100;
            const img = document.getElementById('preview');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob(function(blob) {
                compressedBlob = blob;
                document.getElementById('compressedSize').textContent = formatBytes(blob.size);
                document.getElementById('reduction').textContent = Math.round((1 - blob.size / originalFile.size) * 100) + '%';
                document.getElementById('downloadBtn').style.display = 'inline-block';
            }, 'image/jpeg', quality);
        }
        
        function download() {
            if (!compressedBlob) return;
            const url = URL.createObjectURL(compressedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed-image.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        
        function formatBytes(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
    </script>
</body>
</html>`;

fs.writeFileSync(path, htmlContent);
console.log('恢复 image-compressor.html 完整代码');
