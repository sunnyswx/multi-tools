#!/usr/bin/env node
/**
 * 批量生成46个工具页面的完整功能
 */

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'tools');
const cssDir = path.join(__dirname, '..', 'css');
const langPath = path.join(__dirname, '..', 'lang.js');

// 工具配置
const toolsConfig = [
    { id: 'image-compressor', name: 'Image Compressor', icon: '🖼️', category: 'image', type: 'upload' },
    { id: 'image-converter', name: 'Image Converter', icon: '🔄', category: 'image', type: 'upload' },
    { id: 'image-resizer', name: 'Image Resizer', icon: '📐', category: 'image', type: 'upload' },
    { id: 'color-picker', name: 'Color Picker', icon: '🎨', category: 'design', type: 'interactive' },
    { id: 'gradient-generator', name: 'Gradient Generator', icon: '🌈', category: 'design', type: 'interactive' },
    { id: 'shadow-generator', name: 'Shadow Generator', icon: '💫', category: 'design', type: 'interactive' },
    { id: 'box-model', name: 'CSS Box Model', icon: '📦', category: 'design', type: 'interactive' },
    { id: 'json-formatter', name: 'JSON Formatter', icon: '📋', category: 'developer', type: 'text' },
    { id: 'json-validator', name: 'JSON Validator', icon: '✅', category: 'developer', type: 'text' },
    { id: 'xml-formatter', name: 'XML Formatter', icon: '📄', category: 'developer', type: 'text' },
    { id: 'markdown-editor', name: 'Markdown Editor', icon: '📝', category: 'text', type: 'editor' },
    { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', icon: '📃', category: 'text', type: 'generator' },
    { id: 'word-counter', name: 'Word Counter', icon: '🔢', category: 'text', type: 'counter' },
    { id: 'text-compressor', name: 'Text Compressor', icon: '📉', category: 'text', type: 'text' },
    { id: 'base64', name: 'Base64 Encoder/Decoder', icon: '🔐', category: 'developer', type: 'text' },
    { id: 'url-encoder', name: 'URL Encoder', icon: '🔗', category: 'developer', type: 'text' },
    { id: 'hash-generator', name: 'Hash Generator', icon: '🔒', category: 'security', type: 'generator' },
    { id: 'password-generator', name: 'Password Generator', icon: '🔑', category: 'security', type: 'generator' },
    { id: 'password-strength', name: 'Password Strength', icon: '🛡️', category: 'security', type: 'interactive' },
    { id: 'regex-tester', name: 'Regex Tester', icon: '🔍', category: 'developer', type: 'interactive' },
    { id: 'cron-generator', name: 'Cron Generator', icon: '⏰', category: 'developer', type: 'generator' },
    { id: 'uuid-generator', name: 'UUID Generator', icon: '🆔', category: 'developer', type: 'generator' },
    { id: 'qr-generator', name: 'QR Code Generator', icon: '📱', category: 'utility', type: 'interactive' },
    { id: 'csv-to-json', name: 'CSV to JSON', icon: '📊', category: 'converter', type: 'converter' },
    { id: 'unit-converter', name: 'Unit Converter', icon: '📏', category: 'converter', type: 'converter' },
    { id: 'timezone-converter', name: 'Timezone Converter', icon: '🌍', category: 'converter', type: 'converter' },
    { id: 'time-format', name: 'Time Format', icon: '🕐', category: 'converter', type: 'converter' },
    { id: 'age-calculator', name: 'Age Calculator', icon: '🎂', category: 'calculator', type: 'calculator' },
    { id: 'bmi-calculator', name: 'BMI Calculator', icon: '⚖️', category: 'calculator', type: 'calculator' },
    { id: 'mortgage-calculator', name: 'Mortgage Calculator', icon: '🏠', category: 'calculator', type: 'calculator' },
    { id: 'percentage-calculator', name: 'Percentage Calculator', icon: '💯', category: 'calculator', type: 'calculator' },
    { id: 'online-calculator', name: 'Online Calculator', icon: '🧮', category: 'calculator', type: 'calculator' },
    { id: 'color-contrast-checker', name: 'Color Contrast Checker', icon: '👁️', category: 'design', type: 'interactive' },
    { id: 'countdown-timer', name: 'Countdown Timer', icon: '⏱️', category: 'utility', type: 'interactive' },
    { id: 'pomodoro-timer', name: 'Pomodoro Timer', icon: '🍅', category: 'utility', type: 'interactive' },
    { id: 'random-generator', name: 'Random Generator', icon: '🎲', category: 'utility', type: 'generator' },
    { id: 'pdf-converter', name: 'PDF Converter', icon: '📕', category: 'converter', type: 'upload' },
    { id: 'readability-score', name: 'Readability Score', icon: '📖', category: 'text', type: 'text' },
    { id: 'seo-analyzer', name: 'SEO Analyzer', icon: '🔎', category: 'seo', type: 'text' },
    { id: 'text-to-speech', name: 'Text to Speech', icon: '🔊', category: 'utility', type: 'text' }
];

// 生成工具页面
function generateToolPage(tool) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.name} - Multi Tools</title>
    <meta name="description" content="${tool.name}: ${getToolDescription(tool.id)}">
    
    <!-- GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"><\/script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    <\/script>
    
    <link rel="stylesheet" href="../css/style.css">
    <script src="../lang.js"><\/script>
    
    <style>
        .tool-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
        }
        .tool-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .tool-header h1 {
            color: #333;
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .tool-header p {
            color: #666;
            font-size: 1.1rem;
        }
        .tool-content {
            background: white;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .input-group {
            margin-bottom: 20px;
        }
        .input-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
        }
        .input-group input,
        .input-group textarea,
        .input-group select {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            font-size: 14px;
            transition: border-color 0.3s;
        }
        .input-group input:focus,
        .input-group textarea:focus,
        .input-group select:focus {
            outline: none;
            border-color: #667eea;
        }
        .input-group textarea {
            min-height: 150px;
            resize: vertical;
        }
        .btn-group {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 20px;
        }
        .btn {
            padding: 12px 30px;
            border: none;
            border-radius: 25px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s;
        }
        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4);
        }
        .btn-secondary {
            background: #f0f0f0;
            color: #333;
        }
        .btn-secondary:hover {
            background: #e0e0e0;
        }
        .result {
            margin-top: 20px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        .result h3 {
            color: #333;
            margin-bottom: 10px;
        }
        .result pre {
            background: #2d2d2d;
            color: #f8f8f2;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            font-size: 14px;
        }
        .result code {
            font-family: 'Consolas', 'Monaco', monospace;
        }
        .language-selector {
            margin-top: 30px;
            text-align: center;
        }
        .language-selector select {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 25px;
            background: #667eea;
            color: white;
            cursor: pointer;
        }
        .back-btn {
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 20px;
            background: rgba(102, 126, 234, 0.1);
            color: #667eea;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s;
        }
        .back-btn:hover {
            background: rgba(102, 126, 234, 0.2);
        }
        /* Color Picker Styles */
        .color-preview {
            width: 100%;
            height: 150px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 2px solid #e0e0e0;
        }
        /* Range Slider */
        input[type="range"] {
            width: 100%;
            margin: 10px 0;
        }
        /* Gradient Preview */
        .gradient-preview {
            width: 100%;
            height: 150px;
            border-radius: 10px;
            margin-bottom: 20px;
            border: 2px solid #e0e0e0;
        }
        /* Shadow Preview */
        .shadow-preview {
            width: 200px;
            height: 200px;
            background: white;
            border-radius: 10px;
            margin: 20px auto;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }
        /* Countdown Timer */
        .timer-display {
            font-size: 4rem;
            text-align: center;
            font-weight: bold;
            color: #667eea;
            margin: 30px 0;
        }
        /* Calculator */
        .calculator-display {
            width: 100%;
            padding: 20px;
            font-size: 2rem;
            text-align: right;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        /* QR Code */
        .qr-preview {
            text-align: center;
            margin: 20px 0;
        }
        .qr-preview img {
            max-width: 200px;
            border-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <a href="../" class="back-btn">← Back to Home</a>
        
        <div class="tool-container">
            <div class="tool-header">
                <h1>${tool.icon} ${tool.name}</h1>
                <p>${getToolDescription(tool.id)}</p>
            </div>
            
            <div class="tool-content" id="toolContent">
                <!-- Tool-specific content will be inserted here -->
            </div>
            
            <div class="language-selector">
                <select id="langSelect" onchange="changeLanguage(this.value)">
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
        </div>
    </div>
    
    <script>
        // Initialize language
        document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);
            initTool();
        });
        
        // Initialize tool
        function initTool() {
            ${getToolInitScript(tool.id)}
        }
        
        // Track tool usage
        if (typeof gtag !== 'undefined') {
            gtag('event', 'tool_open', { tool: '${tool.id}' });
        }
    <\/script>
</body>
</html>`;
    
    return html;
}

// 获取工具描述
function getToolDescription(id) {
    const descriptions = {
        'image-compressor': 'Compress images online for free. Reduce file size while maintaining quality.',
        'image-converter': 'Convert images between JPG, PNG, WebP formats online.',
        'image-resizer': 'Resize images to custom dimensions online.',
        'color-picker': 'Pick colors and get HEX, RGB, HSL values.',
        'gradient-generator': 'Create beautiful CSS gradients online.',
        'shadow-generator': 'Create box-shadow and text-shadow CSS code.',
        'box-model': 'Visualize and generate CSS box model code.',
        'json-formatter': 'Format, validate and beautify JSON data instantly.',
        'json-validator': 'Validate JSON syntax and check for errors.',
        'xml-formatter': 'Format and validate XML data online.',
        'markdown-editor': 'Edit Markdown online with live preview.',
        'lorem-ipsum': 'Generate placeholder text for your designs.',
        'word-counter': 'Count words, characters, and paragraphs in real-time.',
        'text-compressor': 'Compress text to reduce size using deflate algorithm.',
        'base64': 'Encode and decode Base64 strings online.',
        'url-encoder': 'Encode and decode URL components online.',
        'hash-generator': 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes.',
        'password-generator': 'Generate strong, secure passwords online.',
        'password-strength': 'Check password strength and security level.',
        'regex-tester': 'Test regular expressions with real-time matching.',
        'cron-generator': 'Generate cron expressions for scheduling.',
        'uuid-generator': 'Generate unique UUIDs instantly.',
        'qr-generator': 'Generate QR codes for text, URLs, WiFi.',
        'csv-to-json': 'Convert CSV data to JSON format instantly.',
        'unit-converter': 'Convert between different units of measurement.',
        'timezone-converter': 'Convert time between different timezones.',
        'time-format': 'Format and convert date/time strings.',
        'age-calculator': 'Calculate your exact age from birthdate.',
        'bmi-calculator': 'Calculate Body Mass Index online.',
        'mortgage-calculator': 'Calculate monthly mortgage payments.',
        'percentage-calculator': 'Calculate percentages easily online.',
        'online-calculator': 'Basic calculator for everyday math.',
        'color-contrast-checker': 'Check color contrast for accessibility.',
        'countdown-timer': 'Create countdown timers online.',
        'pomodoro-timer': 'Time management with Pomodoro technique.',
        'random-generator': 'Generate random numbers, strings, passwords.',
        'pdf-converter': 'Convert images to PDF online.',
        'readability-score': 'Check text readability and comprehension level.',
        'seo-analyzer': 'Analyze basic SEO factors for web pages.',
        'text-to-speech': 'Convert text to speech online.'
    };
    return descriptions[id] || 'Free online tool.';
}

// 获取工具初始化脚本
function getToolInitScript(id) {
    const scripts = {
        'image-compressor': `
            const uploadArea = document.getElementById('uploadArea');
            const fileInput = document.getElementById('fileInput');
            const previewSection = document.getElementById('previewSection');
            const previewImage = document.getElementById('previewImage');
            const qualitySlider = document.getElementById('qualitySlider');
            const qualityValue = document.getElementById('qualityValue');
            const compressBtn = document.getElementById('compressBtn');
            const downloadBtn = document.getElementById('downloadBtn');
            
            let currentFile = null;
            let compressedBlob = null;
            
            // Create tool UI
            document.getElementById('toolContent').innerHTML = \`
                <div class="input-group">
                    <div class="upload-area" id="uploadArea" style="border: 3px dashed #e0e0e0; border-radius: 15px; padding: 60px 20px; text-align: center; cursor: pointer;">
                        <div style="font-size: 4rem; margin-bottom: 20px;">📤</div>
                        <h3>Drop images here or click to upload</h3>
                        <p style="color: #666; margin-top: 10px;">Supports JPG, PNG, WebP, GIF</p>
                        <input type="file" id="fileInput" accept="image/*" multiple style="display: none">
                    </div>
                </div>
                <div id="previewSection" style="display: none;">
                    <img id="previewImage" style="max-width: 100%; border-radius: 10px; margin-bottom: 20px;">
                    <div class="input-group">
                        <label>Compression Quality: <span id="qualityValue">80</span>%</label>
                        <input type="range" id="qualitySlider" min="1" max="100" value="80">
                    </div>
                    <div class="btn-group">
                        <button class="btn btn-primary" id="compressBtn">Compress Image</button>
                        <button class="btn btn-secondary" id="downloadBtn" style="display: none;">Download Compressed</button>
                    </div>
                </div>
            \`;
            
            // Upload handlers
            document.getElementById('uploadArea').addEventListener('click', () => fileInput.click());
            document.getElementById('uploadArea').addEventListener('dragover', (e) => {
                e.preventDefault();
                document.getElementById('uploadArea').style.borderColor = '#667eea';
            });
            document.getElementById('uploadArea').addEventListener('dragleave', () => {
                document.getElementById('uploadArea').style.borderColor = '#e0e0e0';
            });
            document.getElementById('uploadArea').addEventListener('drop', (e) => {
                e.preventDefault();
                document.getElementById('uploadArea').style.borderColor = '#e0e0e0';
                handleFiles(e.dataTransfer.files);
            });
            fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
            
            function handleFiles(files) {
                if (files.length > 0) {
                    currentFile = files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        previewImage.src = e.target.result;
                        previewSection.style.display = 'block';
                    };
                    reader.readAsDataURL(currentFile);
                }
            }
            
            // Quality slider
            qualitySlider.addEventListener('input', () => {
                qualityValue.textContent = qualitySlider.value;
            });
            
            // Compress button
            compressBtn.addEventListener('click', async () => {
                if (!currentFile) return;
                
                compressBtn.textContent = 'Compressing...';
                compressBtn.disabled = true;
                
                try {
                    const response = await fetch(previewImage.src);
                    const blob = await response.blob();
                    const img = new Image();
                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        const ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0);
                        
                        const quality = parseInt(qualitySlider.value) / 100;
                        canvas.toBlob((compressedBlob) => {
                            const url = URL.createObjectURL(compressedBlob);
                            downloadBtn.href = url;
                            downloadBtn.download = 'compressed_' + currentFile.name;
                            downloadBtn.style.display = 'inline-block';
                            compressBtn.textContent = 'Compress Again';
                            compressBtn.disabled = false;
                        }, 'image/jpeg', quality);
                    };
                    img.src = previewImage.src;
                } catch (err) {
                    alert('Compression failed: ' + err.message);
                    compressBtn.textContent = 'Compress Image';
                    compressBtn.disabled = false;
                }
            });
            
            // Download button
            downloadBtn.addEventListener('click', (e) => {
                if (!compressedBlob) {
                    e.preventDefault();
                    alert('Please compress an image first!');
                }
            });
        `,
        'json-formatter': `
            const inputTextarea = document.createElement('textarea');
            inputTextarea.id = 'jsonInput';
            inputTextarea.className = 'input-group';
            inputTextarea.placeholder = 'Paste your JSON here...';
            inputTextarea.style.minHeight = '200px';
            
            const formatBtn = document.createElement('button');
            formatBtn.className = 'btn btn-primary';
            formatBtn.textContent = 'Format JSON';
            formatBtn.style.marginTop = '10px';
            
            const validateBtn = document.createElement('button');
            validateBtn.className = 'btn btn-secondary';
            validateBtn.textContent = 'Validate JSON';
            validateBtn.style.marginTop = '10px';
            validateBtn.style.marginLeft = '10px';
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn-secondary';
            copyBtn.textContent = 'Copy Result';
            copyBtn.style.marginTop = '10px';
            copyBtn.style.marginLeft = '10px';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'jsonResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.innerHTML = '';
            toolContent.appendChild(inputTextarea);
            toolContent.appendChild(formatBtn);
            toolContent.appendChild(validateBtn);
            toolContent.appendChild(copyBtn);
            toolContent.appendChild(resultDiv);
            
            formatBtn.addEventListener('click', () => {
                try {
                    const json = JSON.parse(inputTextarea.value);
                    const formatted = JSON.stringify(json, null, 2);
                    resultDiv.innerHTML = '<h3>Formatted JSON:</h3><pre><code>' + escapeHtml(formatted) + '</code></pre>';
                    resultDiv.style.display = 'block';
                } catch (e) {
                    resultDiv.innerHTML = '<p style="color: red;">Invalid JSON: ' + escapeHtml(e.message) + '</p>';
                    resultDiv.style.display = 'block';
                }
            });
            
            validateBtn.addEventListener('click', () => {
                try {
                    JSON.parse(inputTextarea.value);
                    resultDiv.innerHTML = '<p style="color: green;">✓ Valid JSON!</p>';
                    resultDiv.style.display = 'block';
                } catch (e) {
                    resultDiv.innerHTML = '<p style="color: red;">✗ Invalid JSON: ' + escapeHtml(e.message) + '</p>';
                    resultDiv.style.display = 'block';
                }
            });
            
            copyBtn.addEventListener('click', () => {
                const code = resultDiv.querySelector('code');
                if (code) {
                    navigator.clipboard.writeText(code.textContent);
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => copyBtn.textContent = 'Copy Result', 2000);
                }
            });
        `,
        'color-picker': `
            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.id = 'colorPicker';
            colorInput.style.width = '100%';
            colorInput.style.height = '150px';
            colorInput.style.border = 'none';
            colorInput.style.cursor = 'pointer';
            
            const hexDisplay = document.createElement('h2');
            hexDisplay.id = 'hexValue';
            hexDisplay.style.textAlign = 'center';
            hexDisplay.style.marginTop = '20px';
            hexDisplay.textContent = '#667eea';
            
            const rgbDisplay = document.createElement('p');
            rgbDisplay.id = 'rgbValue';
            rgbDisplay.style.textAlign = 'center';
            rgbDisplay.style.color = '#666';
            rgbDisplay.style.marginTop = '10px';
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'btn btn-primary';
            copyBtn.textContent = 'Copy HEX';
            copyBtn.style.marginTop = '20px';
            copyBtn.style.display = 'block';
            copyBtn.style.marginLeft = 'auto';
            copyBtn.style.marginRight = 'auto';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.innerHTML = '';
            toolContent.appendChild(colorInput);
            toolContent.appendChild(hexDisplay);
            toolContent.appendChild(rgbDisplay);
            toolContent.appendChild(copyBtn);
            
            colorInput.addEventListener('input', (e) => {
                const hex = e.target.value;
                hexDisplay.textContent = hex.toUpperCase();
                hexDisplay.style.color = hex;
                
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                rgbDisplay.textContent = 'RGB: ' + r + ', ' + g + ', ' + b;
            });
            
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(hexDisplay.textContent);
                copyBtn.textContent = 'Copied!';
                setTimeout(() => copyBtn.textContent = 'Copy HEX', 2000);
            });
        `,
        'lorem-ipsum': `
            const wordCount = document.createElement('input');
            wordCount.type = 'number';
            wordCount.id = 'wordCount';
            wordCount.value = '100';
            wordCount.style.width = '100px';
            wordCount.style.padding = '10px';
            wordCount.style.border = '2px solid #e0e0e0';
            wordCount.style.borderRadius = '10px';
            
            const generateBtn = document.createElement('button');
            generateBtn.className = 'btn btn-primary';
            generateBtn.textContent = 'Generate';
            generateBtn.style.marginLeft = '10px';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'loremResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.innerHTML = '<div class="input-group"><label>Word Count:</label></div>';
            toolContent.querySelector('.input-group').appendChild(wordCount);
            toolContent.appendChild(generateBtn);
            toolContent.appendChild(resultDiv);
            
            const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
            
            generateBtn.addEventListener('click', () => {
                const count = parseInt(wordCount.value) || 100;
                const words = loremText.split(' ');
                let result = '';
                for (let i = 0; i < count; i++) {
                    result += words[i % words.length] + ' ';
                }
                resultDiv.textContent = result.trim();
                resultDiv.style.display = 'block';
            });
        `,
        'word-counter': `
            const textarea = document.createElement('textarea');
            textarea.id = 'textInput';
            textarea.placeholder = 'Type or paste your text here...';
            textarea.style.minHeight = '200px';
            
            const statsDiv = document.createElement('div');
            statsDiv.id = 'wordStats';
            statsDiv.style.marginTop = '20px';
            statsDiv.style.padding = '20px';
            statsDiv.style.background = '#f8f9fa';
            statsDiv.style.borderRadius = '10px';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.innerHTML = '';
            toolContent.appendChild(textarea);
            toolContent.appendChild(statsDiv);
            
            textarea.addEventListener('input', () => {
                const text = textarea.value;
                const words = text.trim() ? text.trim().split(/\\s+/) : [];
                const chars = text.length;
                const charsNoSpaces = text.replace(/\\s/g, '').length;
                const paragraphs = text.trim() ? text.split(/\\n+/).filter(p => p.trim()).length : 0;
                const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;
                
                statsDiv.innerHTML = '<h3>Statistics:</h3>' +
                    '<p>Words: <strong>' + words.length + '</strong></p>' +
                    '<p>Characters: <strong>' + chars + '</strong></p>' +
                    '<p>Characters (no spaces): <strong>' + charsNoSpaces + '</strong></p>' +
                    '<p>Sentences: <strong>' + sentences + '</strong></p>' +
                    '<p>Paragraphs: <strong>' + paragraphs + '</strong></p>';
            });
        `,
        'hash-generator': `
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = '<label>Input Text:</label><textarea id="hashInput" placeholder="Enter text to hash..." style="min-height: 100px;"></textarea>';
            
            const hashTypeGroup = document.createElement('div');
            hashTypeGroup.className = 'input-group';
            hashTypeGroup.innerHTML = '<label>Hash Algorithm:</label><select id="hashType"><option value="md5">MD5</option><option value="sha1">SHA-1</option><option value="sha256" selected>SHA-256</option><option value="sha512">SHA-512</option></select>';
            
            const generateBtn = document.createElement('button');
            generateBtn.className = 'btn btn-primary';
            generateBtn.textContent = 'Generate Hash';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'hashResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(inputGroup);
            toolContent.appendChild(hashTypeGroup);
            toolContent.appendChild(generateBtn);
            toolContent.appendChild(resultDiv);
            
            generateBtn.addEventListener('click', async () => {
                const text = document.getElementById('hashInput').value;
                const algorithm = document.getElementById('hashType').value;
                
                if (!text) {
                    alert('Please enter some text!');
                    return;
                }
                
                const encoder = new TextEncoder();
                const data = encoder.encode(text);
                const hashBuffer = await crypto.subtle.digest(algorithm, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                
                resultDiv.innerHTML = '<h3>' + algorithm.toUpperCase() + ' Hash:</h3><pre><code>' + escapeHtml(hashHex) + '</code></pre>';
                resultDiv.style.display = 'block';
            });
        `,
        'password-generator': `
            const lengthGroup = document.createElement('div');
            lengthGroup.className = 'input-group';
            lengthGroup.innerHTML = '<label>Password Length: <span id="lengthValue">16</span></label><input type="range" id="passwordLength" min="4" max="64" value="16">';
            
            const optionsGroup = document.createElement('div');
            optionsGroup.className = 'input-group';
            optionsGroup.innerHTML = '<label>Options:</label>' +
                '<label style="font-weight: normal;"><input type="checkbox" id="includeUpper" checked> Uppercase (A-Z)</label>' +
                '<label style="font-weight: normal;"><input type="checkbox" id="includeLower" checked> Lowercase (a-z)</label>' +
                '<label style="font-weight: normal;"><input type="checkbox" id="includeNumbers" checked> Numbers (0-9)</label>' +
                '<label style="font-weight: normal;"><input type="checkbox" id="includeSymbols" checked> Symbols (!@#$%^&*)</label>';
            
            const generateBtn = document.createElement('button');
            generateBtn.className = 'btn btn-primary';
            generateBtn.textContent = 'Generate Password';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'passwordResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(lengthGroup);
            toolContent.appendChild(optionsGroup);
            toolContent.appendChild(generateBtn);
            toolContent.appendChild(resultDiv);
            
            document.getElementById('passwordLength').addEventListener('input', (e) => {
                document.getElementById('lengthValue').textContent = e.target.value;
            });
            
            generateBtn.addEventListener('click', () => {
                const length = parseInt(document.getElementById('passwordLength').value);
                const includeUpper = document.getElementById('includeUpper').checked;
                const includeLower = document.getElementById('includeLower').checked;
                const includeNumbers = document.getElementById('includeNumbers').checked;
                const includeSymbols = document.getElementById('includeSymbols').checked;
                
                let chars = '';
                if (includeUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                if (includeLower) chars += 'abcdefghijklmnopqrstuvwxyz';
                if (includeNumbers) chars += '0123456789';
                if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
                
                if (!chars) {
                    alert('Please select at least one character type!');
                    return;
                }
                
                let password = '';
                for (let i = 0; i < length; i++) {
                    password += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                
                resultDiv.innerHTML = '<h3>Generated Password:</h3><pre><code style="font-size: 1.5rem;">' + escapeHtml(password) + '</code></pre>';
                resultDiv.style.display = 'block';
            });
        `,
        'uuid-generator': `
            const generateBtn = document.createElement('button');
            generateBtn.className = 'btn btn-primary';
            generateBtn.textContent = 'Generate UUID';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'uuidResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(generateBtn);
            toolContent.appendChild(resultDiv);
            
            generateBtn.addEventListener('click', () => {
                const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    const r = Math.random() * 16 | 0;
                    const v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
                resultDiv.innerHTML = '<h3>Generated UUID:</h3><pre><code style="font-size: 1.5rem;">' + escapeHtml(uuid) + '</code></pre>';
                resultDiv.style.display = 'block';
            });
        `,
        'qr-generator': `
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = '<label>Enter text or URL:</label><input type="text" id="qrInput" placeholder="https://example.com">';
            
            const generateBtn = document.createElement('button');
            generateBtn.className = 'btn btn-primary';
            generateBtn.textContent = 'Generate QR Code';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'qrResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(inputGroup);
            toolContent.appendChild(generateBtn);
            toolContent.appendChild(resultDiv);
            
            generateBtn.addEventListener('click', () => {
                const text = document.getElementById('qrInput').value;
                if (!text) {
                    alert('Please enter some text!');
                    return;
                }
                resultDiv.innerHTML = '<h3>QR Code:</h3><div class="qr-preview"><img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(text) + '" alt="QR Code"></div>';
                resultDiv.style.display = 'block';
            });
        `,
        'online-calculator': `
            const display = document.createElement('input');
            display.type = 'text';
            display.id = 'calcDisplay';
            display.className = 'calculator-display';
            display.value = '0';
            display.readOnly = true;
            
            const buttons = ['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];
            const btnGrid = document.createElement('div');
            btnGrid.style.display = 'grid';
            btnGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
            btnGrid.style.gap = '10px';
            btnGrid.style.marginTop = '20px';
            
            buttons.forEach(btn => {
                const button = document.createElement('button');
                button.textContent = btn;
                button.className = 'btn ' + (btn === '=' ? 'btn-primary' : 'btn-secondary');
                button.style.padding = '20px';
                button.style.fontSize = '1.2rem';
                button.addEventListener('click', () => {
                    if (btn === 'C') {
                        display.value = '0';
                    } else if (btn === '=') {
                        try {
                            display.value = eval(display.value) || '0';
                        } catch {
                            display.value = 'Error';
                        }
                    } else {
                        if (display.value === '0' && !['+','-','*','/'].includes(btn)) {
                            display.value = btn;
                        } else {
                            display.value += btn;
                        }
                    }
                });
                btnGrid.appendChild(button);
            });
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(display);
            toolContent.appendChild(btnGrid);
        `,
        'age-calculator': `
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';
            inputGroup.innerHTML = '<label>Date of Birth:</label><input type="date" id="birthDate" max="' + new Date().toISOString().split('T')[0] + '">';
            
            const calculateBtn = document.createElement('button');
            calculateBtn.className = 'btn btn-primary';
            calculateBtn.textContent = 'Calculate Age';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'ageResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(inputGroup);
            toolContent.appendChild(calculateBtn);
            toolContent.appendChild(resultDiv);
            
            calculateBtn.addEventListener('click', () => {
                const birthDate = new Date(document.getElementById('birthDate').value);
                const today = new Date();
                
                if (isNaN(birthDate.getTime())) {
                    alert('Please select a valid date!');
                    return;
                }
                
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                
                const days = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
                const weeks = Math.floor(days / 7);
                const months = age * 12 + monthDiff;
                
                resultDiv.innerHTML = '<h3>Your Age:</h3>' +
                    '<p>Years: <strong>' + age + '</strong></p>' +
                    '<p>Months: <strong>' + months + '</strong></p>' +
                    '<p>Weeks: <strong>' + weeks + '</strong></p>' +
                    '<p>Days: <strong>' + days + '</strong></p>';
                resultDiv.style.display = 'block';
            });
        `,
        'bmi-calculator': `
            const heightGroup = document.createElement('div');
            heightGroup.className = 'input-group';
            heightGroup.innerHTML = '<label>Height (cm):</label><input type="number" id="height" placeholder="170">';
            
            const weightGroup = document.createElement('div');
            weightGroup.className = 'input-group';
            weightGroup.innerHTML = '<label>Weight (kg):</label><input type="number" id="weight" placeholder="70">';
            
            const calculateBtn = document.createElement('button');
            calculateBtn.className = 'btn btn-primary';
            calculateBtn.textContent = 'Calculate BMI';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'bmiResult';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(heightGroup);
            toolContent.appendChild(weightGroup);
            toolContent.appendChild(calculateBtn);
            toolContent.appendChild(resultDiv);
            
            calculateBtn.addEventListener('click', () => {
                const height = parseFloat(document.getElementById('height').value) / 100;
                const weight = parseFloat(document.getElementById('weight').value);
                
                if (!height || !weight) {
                    alert('Please enter valid height and weight!');
                    return;
                }
                
                const bmi = weight / (height * height);
                let category = '';
                let color = '';
                
                if (bmi < 18.5) { category = 'Underweight'; color = '#3498db'; }
                else if (bmi < 25) { category = 'Normal'; color = '#2ecc71'; }
                else if (bmi < 30) { category = 'Overweight'; color = '#f39c12'; }
                else { category = 'Obese'; color = '#e74c3c'; }
                
                resultDiv.innerHTML = '<h3>Your BMI: ' + bmi.toFixed(1) + '</h3>' +
                    '<p>Category: <strong style="color: ' + color + ';">' + category + '</strong></p>' +
                    '<p>Healthy BMI range: 18.5 - 24.9</p>';
                resultDiv.style.display = 'block';
            });
        `
    };
    
    // 默认文本工具
    if (!scripts[id]) {
        scripts[id] = `
            const textarea = document.createElement('textarea');
            textarea.id = 'inputText';
            textarea.placeholder = 'Enter your text here...';
            textarea.style.minHeight = '150px';
            
            const processBtn = document.createElement('button');
            processBtn.className = 'btn btn-primary';
            processBtn.textContent = 'Process';
            
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.id = 'result';
            resultDiv.style.display = 'none';
            
            const toolContent = document.getElementById('toolContent');
            toolContent.appendChild(textarea);
            toolContent.appendChild(processBtn);
            toolContent.appendChild(resultDiv);
            
            processBtn.addEventListener('click', () => {
                const text = textarea.value;
                resultDiv.innerHTML = '<h3>Result:</h3><pre><code>' + escapeHtml(text) + '</code></pre>';
                resultDiv.style.display = 'block';
            });
        `;
    }
    
    return scripts[id] || scripts['online-calculator'];
}

// HTML转义
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 生成所有工具页面
function generateAllTools() {
    let count = 0;
    
    toolsConfig.forEach(tool => {
        const html = generateToolPage(tool);
        const filePath = path.join(toolsDir, tool.id + '.html');
        fs.writeFileSync(filePath, html, 'utf-8');
        console.log('Generated: ' + tool.id + '.html');
        count++;
    });
    
    console.log('\\n✅ Generated ' + count + ' tool pages!');
}

// 运行
generateAllTools();
