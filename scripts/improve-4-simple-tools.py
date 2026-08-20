#!/usr/bin/env python3
"""
完善4个简单工具
"""

import os

def create_url_encoder_tool():
    """URL编解码工具"""
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>URL编解码器 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线URL编码和解码工具">
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
        textarea { width: 100%; height: 150px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px; resize: vertical; font-family: monospace; }
        textarea:focus { outline: none; border-color: #667eea; }
        .btn-group { display: flex; gap: 10px; margin: 20px 0; flex-wrap: wrap; }
        .btn { padding: 12px 30px; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; transition: all 0.3s; }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: #f0f0f0; color: #333; }
        .btn-secondary:hover { background: #e0e0e0; }
        .result { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px; word-break: break-all; font-family: monospace; display: none; }
        .result.show { display: block; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>🔗 URL编解码器</h1>
            <p>在线URL编码和解码工具</p>
        </header>
        <main class="tool-content">
            <div class="input-group">
                <label>输入内容</label>
                <textarea id="inputText" placeholder="请输入URL或文本..."></textarea>
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
                const encoded = encodeURIComponent(input);
                document.getElementById('result').textContent = encoded;
                document.getElementById('result').classList.add('show');
            } catch (e) { alert('编码失败: ' + e.message); }
        }
        
        function decode() {
            const input = document.getElementById('inputText').value;
            if (!input) { alert('请输入内容'); return; }
            try {
                const decoded = decodeURIComponent(input);
                document.getElementById('result').textContent = decoded;
                document.getElementById('result').classList.add('show');
            } catch (e) { alert('解码失败: ' + e.message); }
        }
        
        function clearAll() {
            document.getElementById('inputText').value = '';
            document.getElementById('result').classList.remove('show');
            document.getElementById('result').textContent = '';
        }
        
        function copyResult() {
            const result = document.getElementById('result').textContent;
            if (!result) { alert('没有结果可复制'); return; }
            navigator.clipboard.writeText(result).then(() => alert('已复制到剪贴板'));
        }
        
        function trackToolUsage(name) {
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', { event_category: 'tools', event_label: name });
        }
        trackToolUsage('url-encoder');
    </script>
</body>
</html>'''

def create_word_counter_tool():
    """字数统计工具"""
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>字数统计器 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线字数统计工具">
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
        textarea { width: 100%; height: 300px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 16px; resize: vertical; font-family: inherit; }
        textarea:focus { outline: none; border-color: #667eea; }
        .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 30px; }
        .stat-box { background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center; }
        .stat-value { font-size: 2rem; font-weight: bold; color: #667eea; }
        .stat-label { color: #666; margin-top: 5px; font-size: 14px; }
        @media (max-width: 768px) { .stats { grid-template-columns: repeat(2, 1fr); } }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>📊 字数统计器</h1>
            <p>实时统计文字数量</p>
        </header>
        <main class="tool-content">
            <textarea id="inputText" placeholder="请输入或粘贴文本..." oninput="count()"></textarea>
            <div class="stats">
                <div class="stat-box">
                    <div class="stat-value" id="charCount">0</div>
                    <div class="stat-label">字符数</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="wordCount">0</div>
                    <div class="stat-label">词数</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="lineCount">0</div>
                    <div class="stat-label">行数</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paragraphCount">0</div>
                    <div class="stat-label">段落数</div>
                </div>
            </div>
        </main>
    </div>
    <script>
        function count() {
            const text = document.getElementById('inputText').value;
            
            const charCount = text.length;
            const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
            const lineCount = text === '' ? 0 : text.split(/\n/).length;
            const paragraphCount = text.trim() === '' ? 0 : text.trim().split(/\n\s*\n/).length;
            
            document.getElementById('charCount').textContent = charCount;
            document.getElementById('wordCount').textContent = wordCount;
            document.getElementById('lineCount').textContent = lineCount;
            document.getElementById('paragraphCount').textContent = paragraphCount;
            
            trackToolUsage('word-counter');
        }
        
        function trackToolUsage(name) {
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', { event_category: 'tools', event_label: name });
        }
        trackToolUsage('word-counter');
    </script>
</body>
</html>'''

def create_color_picker_tool():
    """颜色选择器"""
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>颜色选择器 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线颜色选择工具">
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
        .container { max-width: 800px; margin: 0 auto; }
        header { text-align: center; padding: 40px 20px; color: white; }
        header h1 { font-size: 2.5rem; margin-bottom: 10px; }
        .back-btn { display: inline-block; margin-bottom: 20px; padding: 10px 20px; background: rgba(255,255,255,0.2); color: white; text-decoration: none; border-radius: 25px; }
        .tool-content { background: white; border-radius: 20px; padding: 40px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .preview { width: 100%; height: 200px; border-radius: 15px; margin: 20px 0; border: 2px solid #e0e0e0; transition: background 0.3s; }
        .color-inputs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0; }
        .input-group { text-align: center; }
        .input-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #333; }
        .input-group input[type="number"] { width: 100%; padding: 10px; border: 2px solid #e0e0e0; border-radius: 8px; text-align: center; font-size: 16px; }
        .input-group input[type="color"] { width: 100%; height: 50px; border: none; border-radius: 8px; cursor: pointer; }
        .result { background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px; font-family: monospace; font-size: 16px; word-break: break-all; }
        .result-item { margin: 10px 0; display: flex; justify-content: space-between; align-items: center; }
        .copy-btn { padding: 5px 15px; font-size: 12px; background: #667eea; color: white; border: none; border-radius: 15px; cursor: pointer; }
        .copy-btn:hover { background: #5568d3; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>🎨 颜色选择器</h1>
            <p>在线选择颜色，获取多种格式</p>
        </header>
        <main class="tool-content">
            <div id="preview" class="preview"></div>
            
            <div class="color-inputs">
                <div class="input-group">
                    <label>红色 (R)</label>
                    <input type="number" id="red" min="0" max="255" value="102" oninput="updateColor()">
                </div>
                <div class="input-group">
                    <label>绿色 (G)</label>
                    <input type="number" id="green" min="0" max="255" value="126" oninput="updateColor()">
                </div>
                <div class="input-group">
                    <label>蓝色 (B)</label>
                    <input type="number" id="blue" min="0" max="255" value="234" oninput="updateColor()">
                </div>
            </div>
            
            <div class="input-group">
                <label>或选择颜色</label>
                <input type="color" id="colorPicker" value="#667eea" oninput="fromPicker(this.value)">
            </div>
            
            <div class="result">
                <div class="result-item">
                    <span>HEX:</span>
                    <span id="hex">#667eea</span>
                    <button class="copy-btn" onclick="copyValue('hex')">复制</button>
                </div>
                <div class="result-item">
                    <span>RGB:</span>
                    <span id="rgb">rgb(102, 126, 234)</span>
                    <button class="copy-btn" onclick="copyValue('rgb')">复制</button>
                </div>
                <div class="result-item">
                    <span>HSL:</span>
                    <span id="hsl">hsl(232, 77%, 66%)</span>
                    <button class="copy-btn" onclick="copyValue('hsl')">复制</button>
                </div>
            </div>
        </main>
    </div>
    <script>
        function updateColor() {
            const r = parseInt(document.getElementById('red').value) || 0;
            const g = parseInt(document.getElementById('green').value) || 0;
            const b = parseInt(document.getElementById('blue').value) || 0;
            
            const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
            const rgb = `rgb(${r}, ${g}, ${b})`;
            const hsl = rgbToHsl(r, g, b);
            
            document.getElementById('preview').style.background = hex;
            document.getElementById('hex').textContent = hex;
            document.getElementById('rgb').textContent = rgb;
            document.getElementById('hsl').textContent = hsl;
            document.getElementById('colorPicker').value = hex;
            
            trackToolUsage('color-picker');
        }
        
        function fromPicker(value) {
            document.getElementById('red').value = parseInt(value.slice(1, 3), 16);
            document.getElementById('green').value = parseInt(value.slice(3, 5), 16);
            document.getElementById('blue').value = parseInt(value.slice(5, 7), 16);
            updateColor();
        }
        
        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            
            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            
            return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        }
        
        function copyValue(id) {
            const text = document.getElementById(id).textContent;
            navigator.clipboard.writeText(text).then(() => alert('已复制'));
        }
        
        function trackToolUsage(name) {
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', { event_category: 'tools', event_label: name });
        }
        trackToolUsage('color-picker');
        updateColor();
    </script>
</body>
</html>'''

def create_json_validator_tool():
    """JSON验证工具"""
    return '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON验证器 - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="在线验证JSON格式">
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
        textarea { width: 100%; height: 300px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 10px; font-size: 14px; font-family: monospace; resize: vertical; }
        textarea:focus { outline: none; border-color: #667eea; }
        .btn-group { display: flex; gap: 10px; margin: 20px 0; }
        .btn { padding: 12px 30px; border: none; border-radius: 25px; cursor: pointer; font-size: 16px; transition: all 0.3s; }
        .btn-primary { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(102, 126, 234, 0.4); }
        .btn-secondary { background: #f0f0f0; color: #333; }
        .result { margin-top: 20px; padding: 20px; border-radius: 10px; display: none; }
        .result.show { display: block; }
        .result.success { background: #d1fae5; color: #065f46; border-left: 4px solid #10b981; }
        .result.error { background: #fee2e2; color: #991b1b; border-left: 4px solid #ef4444; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        <header>
            <h1>🔍 JSON验证器</h1>
            <p>验证JSON格式，显示错误位置</p>
        </header>
        <main class="tool-content">
            <textarea id="jsonInput" placeholder='粘贴JSON数据，例如：{"name": "张三", "age": 25}'></textarea>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="validate()">验证</button>
                <button class="btn btn-secondary" onclick="formatJSON()">格式化</button>
                <button class="btn btn-secondary" onclick="clearAll()">清空</button>
            </div>
            <div id="result" class="result"></div>
        </main>
    </div>
    <script>
        function validate() {
            const input = document.getElementById('jsonInput').value.trim();
            const result = document.getElementById('result');
            
            if (!input) {
                showResult('请输入JSON数据', false);
                return;
            }
            
            try {
                JSON.parse(input);
                showResult('✅ JSON格式正确！', true);
            } catch (e) {
                showResult('❌ JSON格式错误: ' + e.message, false);
            }
        }
        
        function formatJSON() {
            const input = document.getElementById('jsonInput').value.trim();
            const result = document.getElementById('result');
            
            if (!input) {
                showResult('请输入JSON数据', false);
                return;
            }
            
            try {
                const obj = JSON.parse(input);
                document.getElementById('jsonInput').value = JSON.stringify(obj, null, 2);
                showResult('✅ JSON格式化成功', true);
            } catch (e) {
                showResult('❌ JSON格式错误: ' + e.message, false);
            }
        }
        
        function showResult(message, isSuccess) {
            const result = document.getElementById('result');
            result.textContent = message;
            result.className = 'result show ' + (isSuccess ? 'success' : 'error');
        }
        
        function clearAll() {
            document.getElementById('jsonInput').value = '';
            document.getElementById('result').className = 'result';
        }
        
        function trackToolUsage(name) {
            if (typeof gtag !== 'undefined') gtag('event', 'tool_usage', { event_category: 'tools', event_label: name });
        }
        trackToolUsage('json-validator');
    </script>
</body>
</html>'''

def main():
    print("=" * 70)
    print("🔧 完善4个简单工具")
    print("=" * 70)
    print()
    
    tools = {
        'url-encoder.html': create_url_encoder_tool(),
        'word-counter.html': create_word_counter_tool(),
        'color-picker.html': create_color_picker_tool(),
        'json-validator.html': create_json_validator_tool(),
    }
    
    tools_dir = 'tools'
    success = 0
    for filename, content in tools.items():
        filepath = os.path.join(tools_dir, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ {filename}")
        success += 1
    
    print()
    print("=" * 70)
    print(f"✅ 完成！已完善 {success} 个工具")
    print("=" * 70)

if __name__ == '__main__':
    main()