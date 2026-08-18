#!/usr/bin/env python3
"""
工具SEO优化 - 独立任务
用法: python3 optimize-tool-seo.py [tool_name]
"""

import os
import sys
import re

def optimize_seo(tool_name=None):
    """优化工具SEO"""
    
    tools_dir = "tools"
    
    # 获取所有工具文件
    tool_files = [f for f in os.listdir(tools_dir) if f.endswith(".html") and not f.endswith("-seo.html")]
    
    if tool_name:
        # 只优化指定工具
        if f"{tool_name}.html" not in tool_files:
            print(f"❌ 工具 {tool_name} 不存在")
            return 0
        tool_files = [f"{tool_name}.html"]
    
    optimized = 0
    for tool_file in tool_files:
        file_path = os.path.join(tools_dir, tool_file)
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已有GA4代码
        if 'G-7B5H09J4KB' in content:
            print(f"✓ {tool_file}: 已存在GA4代码")
            continue
        
        # 添加GA4代码
        ga4_code = '''    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-7B5H09J4KB"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-7B5H09J4KB');
    </script>
'''
        
        # 在</head>前插入GA4代码
        if '</head>' in content:
            content = content.replace('</head>', ga4_code + '    </head>')
            optimized += 1
            print(f"✓ {tool_file}: 已添加GA4代码")
        else:
            print(f"⚠️ {tool_file}: 未找到</head>标签")
        
        # 保存文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return optimized

if __name__ == "__main__":
    tool_name = sys.argv[1] if len(sys.argv) > 1 else None
    count = optimize_seo(tool_name)
    print(f"\n总共优化了 {count} 个工具的SEO")