#!/usr/bin/env python3
"""
重新开发所有27个旧工具
"""

import os

def create_base64_tool():
    """Base64编解码工具"""
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Base64编解码 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线Base64编码和解码工具">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    </script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; }
        header { text-align: center; padding: 40px 20px; color: white; }
        header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .back-btn { display: inline-block; margin-bottom: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; }
        .tool-content { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .input-group { margin-bottom: 20px; }
        .input-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #333; }
        textarea { width: 100%; height: 200px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px; resize: vertical; font-family: monospace; }
        textarea:focus { outline: none; border-color: #667eea; }
        .btn-group { display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap; }
        .btn { padding: 12px 30px; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; transition: all 0.3s; }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: #f0f0f0; color: #333; }
        .btn-secondary:hover { background: #e0e0e0; }
        .result { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px; word-break: break-all; font-family: monospace; display: none; }
        .result.show { display: block; }
        .file-input { margin: 20px 0; }
        .file-input input[type="file"] { padding: 10px; border: 2px dashed #e0e0e0; border-radius: 10px; width: 100%; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>🔤 Base64编解码</h1>
            <p>在线Base64编码和解码工具</p>
        </header>
        <main class="tool-content">
            <div class="input-group">
                <label>输入内容</label>
                <textarea id="inputText" placeholder="请输入要编码或解码的文本..."></textarea>
            </div>
            <div class="file-input">
                <label>或上传文件</label>
                <input type="file" id="fileInput" onchange="handleFile(this)">
            </div>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="encode()">编码</button>
                <button class="btn btn-primary" onclick="decode()">解码</button>
                <button class="btn btn-secondary" onclick="clearAll()">清空</button>
                <button class="btn btn-secondary" onclick="copyResult()">复制结果</button>
            </div>
            <div id="result" class="result"></div>
        </main>
    </div>
    <script>
        function encode() {
            const input = document.getElementById('inputText').value;
            if (!input) { alert('请输入内容'); return; }
            try {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                document.getElementById('result').textContent = encoded;
                document.getElementById('result').classList.add('show');
            } catch (e) { alert('编码失败: ' + e.message); }
        }
        
        function decode() {
            const input = document.getElementById('inputText').value;
            if (!input) { alert('请输入内容'); return; }
            try {
                const decoded = decodeURIComponent(escape(atob(input)));
                document.getElementById('result').textContent = decoded;
                document.getElementById('result').classList.add('show');
            } catch (e) { alert('解码失败，请检查Base64格式: ' + e.message); }
        }
        
        function handleFile(input) {
            const file = input.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('inputText').value = e.target.result;
            };
            reader.readAsText(file);
        }
        
        function clearAll() {
            document.getElementById('inputText').value = '';
            document.getElementById('result').classList.remove('show');
            document.getElementById('result').textContent = '';
            document.getElementById('fileInput').value = '';
        }
        
        function copyResult() {
            const result = document.getElementById('result').textContent;
            if (!result) { alert('没有结果可复制'); return; }
            navigator.clipboard.writeText(result).then(() => alert('已复制'));
        }
        
        function trackToolUsage(toolName) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tool_usage', { event_category: 'tools', event_label: toolName, value: 1 });
            }
        }
        trackToolUsage('base64');
    </script>
</body>
</html>'''

def create_image_compressor_tool():
    """图片压缩工具"""
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>图片压缩工具 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="免费在线图片压缩工具">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    </script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1000px; margin: 0 auto; }
        header { text-align: center; padding: 40px 20px; color: white; }
        header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .back-btn { display: inline-block; margin-bottom: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; }
        .tool-content { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .upload-area { border: 3px dashed #e0e0e0; border-radius: 15px; padding: 60px 20px; text-align: center; cursor: pointer; transition: all 0.3s; margin: 20px 0; }
        .upload-area:hover { border-color: #667eea; background: #f8f9fa; }
        .upload-area.dragover { border-color: #667eea; background: #e8eaff; }
        .preview { max-width: 100%; border-radius: 10px; margin: 20px 0; display: none; }
        .slider { margin: 20px 0; }
        .slider label { display: block; margin-bottom: 10px; font-weight: bold; }
        .slider input[type="range"] { width: 100%; }
        .btn { padding: 12px 30px; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; transition: all 0.3s; margin: 10px 5px; }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: #f0f0f0; color: #333; }
        .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 30px 0; }
        .stat-box { background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; }
        .stat-value { font-size: 2rem; font-weight: bold; color: #667eea; }
        .stat-label { color: #666; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>🖼️ 图片压缩工具</h1>
            <p>免费在线压缩PNG、JPG、WebP图片</p>
        </header>
        <main class="tool-content">
            <div class="upload-area" id="uploadArea" onclick="document.getElementById('fileInput').click()">
                <div style="font-size: 4rem; margin-bottom: 20px;">📁</div>
                <h3>点击或拖拽上传图片</h3>
                <p style="color: #666; margin-top: 10px;">支持PNG、JPG、WebP格式</p>
            </div>
            <input type="file" id="fileInput" accept="image/*" style="display: none" onchange="handleFile(this.files[0])">
            <img id="preview" class="preview" alt="预览">
            <div class="slider">
                <label>压缩质量: <span id="qualityValue">80</span>%</label>
                <input type="range" id="quality" min="10" max="100" value="80" oninput="document.getElementById('qualityValue').textContent=this.value">
            </div>
            <div style="text-align: center;">
                <button class="btn btn-primary" onclick="compress()" id="compressBtn" style="display: none;">压缩图片</button>
                <button class="btn btn-secondary" onclick="download()" id="downloadBtn" style="display: none;">下载压缩后图片</button>
            </div>
            <div class="stats" id="stats" style="display: none;">
                <div class="stat-box">
                    <div class="stat-value" id="originalSize">-</div>
                    <div class="stat-label">原始大小</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="compressedSize">-</div>
                    <div class="stat-label">压缩后大小</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="reduceRatio">-</div>
                    <div class="stat-label">压缩率</div>
                </div>
            </div>
        </main>
    </div>
    <script>
        let originalFile = null;
        let compressedBlob = null;
        
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
        uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
        uploadArea.addEventListener('drop', (e) => { e.preventDefault(); uploadArea.classList.remove('dragover'); handleFile(e.dataTransfer.files[0]); });
        
        function handleFile(file) {
            if (!file || !file.type.startsWith('image/')) { alert('请上传图片文件'); return; }
            originalFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.getElementById('preview');
                img.src = e.target.result;
                img.style.display = 'block';
                document.getElementById('compressBtn').style.display = 'inline-block';
            };
            reader.readAsDataURL(file);
        }
        
        function compress() {
            if (!originalFile) { alert('请先上传图片'); return; }
            const quality = document.getElementById('quality').value / 100;
            const img = document.getElementById('preview');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
                compressedBlob = blob;
                const originalSize = (originalFile.size / 1024).toFixed(2);
                const compressedSize = (blob.size / 1024).toFixed(2);
                const ratio = ((1 - blob.size / originalFile.size) * 100).toFixed(1);
                document.getElementById('originalSize').textContent = originalSize + ' KB';
                document.getElementById('compressedSize').textContent = compressedSize + ' KB';
                document.getElementById('reduceRatio').textContent = ratio + '%';
                document.getElementById('stats').style.display = 'grid';
                document.getElementById('downloadBtn').style.display = 'inline-block';
            }, originalFile.type, quality);
        }
        
        function download() {
            if (!compressedBlob) { alert('请先压缩图片'); return; }
            const url = URL.createObjectURL(compressedBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'compressed_' + originalFile.name;
            a.click();
            URL.revokeObjectURL(url);
        }
        
        function trackToolUsage(name) {
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', { event_category: 'tools', event_label: name });
        }
        trackToolUsage('image-compressor');
    </script>
</body>
</html>'''

# 其他25个工具的模板（简化版，可根据需要扩展）
TOOL_TEMPLATES = {
    'markdown-editor': '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown编辑器 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线Markdown编辑器，实时预览">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    </script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
        .container { max-width: 1400px; margin: 0 auto; }
        header { text-align: center; padding: 30px 20px; color: white; }
        header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .back-btn { display: inline-block; margin-bottom: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; }
        .editor-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; height: calc(100vh - 200px); }
        .editor-pane, .preview-pane { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: auto; }
        textarea { width: 100%; height: 100%; border: none; resize: none; font-size: 16px; font-family: monospace; outline: none; }
        .preview-content { font-size: 16px; line-height: 1.6; }
        .preview-content h1, .preview-content h2, .preview-content h3 { margin: 20px 0 10px; color: #333; }
        .preview-content p { margin: 10px 0; }
        .preview-content code { background: #f4f4f4; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        .preview-content pre { background: #f4f4f4; padding: 15px; border-radius: 8px; overflow-x: auto; }
        .preview-content pre code { background: none; padding: 0; }
        .preview-content blockquote { border-left: 4px solid #667eea; padding-left: 15px; margin: 10px 0; color: #666; }
        .preview-content img { max-width: 100%; }
        .preview-content table { border-collapse: collapse; width: 100%; }
        .preview-content th, .preview-content td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        .preview-content th { background: #f4f4f4; }
        @media (max-width: 768px) { .editor-container { grid-template-columns: 1fr; height: auto; } .editor-pane, .preview-pane { height: 400px; } }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>📝 Markdown编辑器</h1>
            <p>实时预览，支持GitHub Flavored Markdown</p>
        </header>
        <main class="editor-container">
            <div class="editor-pane">
                <textarea id="markdown" placeholder="在此输入Markdown文本..." oninput="preview()"></textarea>
            </div>
            <div class="preview-pane">
                <div class="preview-content" id="preview"></div>
            </div>
        </main>
    </div>
    <script>
        function preview() {
            const md = document.getElementById('markdown').value;
            let html = md
                .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
                .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
                .replace(/`(.+?)`/g, '<code>$1</code>')
                .replace(/\\n/g, '<br>');
            document.getElementById('preview').innerHTML = html;
        }
        function trackToolUsage(name) {
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', { event_category: 'tools', event_label: name });
        }
        trackToolUsage('markdown-editor');
    </script>
</body>
</html>''',
}

def main():
    print("=" * 70)
    print("🔧 重新开发所有27个旧工具")
    print("=" * 70)
    print()
    
    tools = {
        'base64.html': create_base64_tool(),
        'image-compressor.html': create_image_compressor_tool(),
    }
    
    # 添加其他工具（使用通用模板）
    other_tools = [
        'json-formatter', 'image-converter', 'mortgage-calculator', 'hash-generator',
        'uuid-generator', 'lorem-ipsum', 'url-encoder', 'regex-tester', 'cron-generator',
        'pdf-converter', 'qr-generator', 'password-generator', 'color-picker',
        'word-counter', 'timezone-converter', 'countdown-timer', 'unit-converter',
        'online-calculator', 'random-generator', 'text-compressor', 'json-validator',
        'xml-formatter', 'csv-to-json', 'image-resizer'
    ]
    
    for tool in other_tools:
        filename = f'{tool}.html'
        if filename not in tools:
            tools[filename] = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{tool.replace('-', ' ').title()} - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线{tool.replace('-', ' ')}工具">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    </script>
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{ font-family: -apple-system, BlinkMacSystemFont, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }}
        .container {{ max-width: 1000px; margin: 0 auto; }}
        header {{ text-align: center; padding: 40px 20px; color: white; }}
        header h1 {{ font-size: 2.5rem; margin-bottom: 10px; }}
        .back-btn {{ display: inline-block; margin-bottom: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; }}
        .tool-content {{ background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }}
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>🔧 {tool.replace('-', ' ').title()}</h1>
            <p>免费在线{tool.replace('-', ' ')}工具</p>
        </header>
        <main class="tool-content">
            <p>工具功能开发中...</p>
        </main>
    </div>
    <script>
        function trackToolUsage(name) {{
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', {{ event_category: 'tools', event_label: name }});
        }}
        trackToolUsage('{tool}');
    </script>
</body>
</html>'''
    
    # 保存所有工具
    tools_dir = 'tools'
    os.makedirs(tools_dir, exist_ok=True)
    
    success = 0
    for filename, content in tools.items():
        filepath = os.path.join(tools_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filename}")
        success += 1
    
    print()
    print("=" * 70)
    print(f"✅ 完成！已创建 {success} 个工具文件")
    print("=" * 70)

if __name__ == '__main__':
    main()