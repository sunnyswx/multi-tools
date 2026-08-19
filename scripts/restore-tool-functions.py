#!/usr/bin/env python3
"""
恢复工具页面功能 - 从Git历史恢复原始功能代码
"""

import os
import subprocess
import re

def get_git_content(commit_hash, filepath):
    """从Git获取文件内容"""
    try:
        result = subprocess.run(
            ['git', 'show', f'{commit_hash}:{filepath}'],
            capture_output=True,
            text=True,
            cwd='.'
        )
        if result.returncode == 0:
            return result.stdout
        else:
            print(f"❌ 无法获取文件: {filepath}")
            return None
    except Exception as e:
        print(f"❌ 错误: {e}")
        return None

def restore_tool_function(commit_hash, tool_name):
    """恢复单个工具的功能"""
    
    # 源文件路径
    source_path = f'tools/{tool_name}.html'
    
    # 从Git获取原始内容
    content = get_git_content(commit_hash, source_path)
    
    if not content:
        print(f"⚠️  无法恢复 {tool_name}")
        return False
    
    # 只保留功能代码部分，应用统一样式
    # 提取<body>标签内的内容
    body_match = re.search(r'<body>(.*?)</body>', content, re.DOTALL)
    
    if not body_match:
        print(f"⚠️  无法解析 {tool_name} 的body内容")
        return False
    
    body_content = body_match.group(1)
    
    # 创建新的统一格式页面
    new_content = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{tool_name.replace('-', ' ').title()} - 免费在线工具 | Multi Tools</title>
    <meta name="description" content="{tool_name.replace('-', ' ')}，在线工具">
    
    <!-- GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L7GQFYBWB6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-L7GQFYBWB6');
    </script>
    
    <style>
        * {{ margin: 0; padding: 0; box-sizing: border-box; }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
        }}
        header {{
            text-align: center;
            padding: 40px 20px;
            color: white;
        }}
        header h1 {{
            font-size: 2.5rem;
            margin-bottom: 10px;
        }}
        header p {{
            font-size: 1.1rem;
            opacity: 0.9;
        }}
        .back-btn {{
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 20px;
            background: rgba(255,255,255,0.2);
            color: white;
            text-decoration: none;
            border-radius: 25px;
            transition: all 0.3s;
        }}
        .back-btn:hover {{
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }}
        .tool-content {{
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            margin-bottom: 30px;
        }}
        .tool-content h2 {{
            color: #333;
            margin-bottom: 20px;
            font-size: 1.8rem;
        }}
        /* 保留原有工具样式 */
        {extract_tool_styles(content)}
        @media (max-width: 768px) {{
            header h1 {{ font-size: 2rem; }}
            .tool-content {{ padding: 20px; }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back-btn">← 返回首页</a>
        
        <header>
            <h1>🛠️ {tool_name.replace('-', ' ').title()}</h1>
            <p>免费在线{tool_name.replace('-', ' ')}工具</p>
        </header>
        
        <main class="tool-content">
            {body_content}
        </main>
        
        <footer style="text-align: center; color: white; padding: 20px;">
            <p>© 2026 Multi Tools - 免费在线工具集</p>
        </footer>
    </div>
    
    <!-- 工具追踪 -->
    <script>
        function trackToolUsage(toolName) {{
            if (typeof gtag !== 'undefined') {{
                gtag('event', 'tool_usage', {{
                    'event_category': 'tools',
                    'event_label': toolName,
                    'value': 1
                }});
            }}
            console.log('工具使用:', toolName);
        }}
        
        trackToolUsage('{tool_name}');
    </script>
</body>
</html>
'''
    
    # 保存文件
    with open(source_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    return True

def extract_tool_styles(content):
    """提取工具特有样式"""
    style_match = re.search(r'<style>(.*?)</style>', content, re.DOTALL)
    if style_match:
        return style_match.group(1)
    return ''

def main():
    """主函数"""
    print("=" * 60)
    print("🔧 恢复工具页面功能")
    print("=" * 60)
    print()
    
    # 使用HEAD~3作为源（修复前的版本）
    source_commit = 'HEAD~3'
    
    # 获取所有工具文件
    tools_dir = 'tools'
    if not os.path.exists(tools_dir):
        print(f"❌ 工具目录不存在: {tools_dir}")
        return
    
    html_files = [f for f in os.listdir(tools_dir) if f.endswith('.html') and not f.startswith('template') and 'seo' not in f]
    
    print(f"📊 找到 {len(html_files)} 个工具文件")
    print()
    
    # 恢复每个工具的功能
    restored_count = 0
    for html_file in html_files:
        tool_name = html_file.replace('.html', '')
        print(f"🔧 恢复: {tool_name}")
        
        if restore_tool_function(source_commit, tool_name):
            restored_count += 1
            print(f"   ✅ 成功")
        else:
            print(f"   ❌ 失败")
    
    print()
    print("=" * 60)
    print(f"✅ 恢复完成！共恢复 {restored_count}/{len(html_files)} 个工具")
    print("=" * 60)

if __name__ == '__main__':
    main()