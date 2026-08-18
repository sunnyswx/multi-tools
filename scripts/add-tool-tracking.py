#!/usr/bin/env python3
"""
工具追踪添加 - 独立任务
用法: python3 add-tool-tracking.py [tool_name]
"""

import os
import sys
import re

def add_tracking(tool_name=None):
    """添加工具使用追踪"""
    
    tools_dir = "tools"
    
    # 获取所有工具文件
    tool_files = [f for f in os.listdir(tools_dir) if f.endswith(".html") and not f.endswith("-seo.html")]
    
    if tool_name:
        # 只处理指定工具
        if f"{tool_name}.html" not in tool_files:
            print(f"❌ 工具 {tool_name} 不存在")
            return 0
        tool_files = [f"{tool_name}.html"]
    
    added = 0
    for tool_file in tool_files:
        file_path = os.path.join(tools_dir, tool_file)
        
        # 读取文件内容
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已有追踪代码
        if 'trackToolUsage' in content:
            print(f"✓ {tool_file}: 已存在追踪代码")
            continue
        
        # 添加追踪函数
        tracking_code = '''    <script>
        function trackToolUsage(toolName, action) {
            if (typeof gtag !== 'undefined') {
                gtag('event', 'tool_usage', {
                    'event_category': 'Tool',
                    'event_label': toolName,
                    'value': action
                });
            }
        }
    </script>
'''
        
        # 在</head>前插入追踪代码
        if '</head>' in content:
            content = content.replace('</head>', tracking_code + '    </head>')
            added += 1
            print(f"✓ {tool_file}: 已添加追踪代码")
        else:
            print(f"⚠️ {tool_file}: 未找到</head>标签")
        
        # 保存文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return added

if __name__ == "__main__":
    tool_name = sys.argv[1] if len(sys.argv) > 1 else None
    count = add_tracking(tool_name)
    print(f"\n总共为 {count} 个工具添加了追踪")