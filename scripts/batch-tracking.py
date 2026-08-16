#!/usr/bin/env python3
"""
批量添加工具使用追踪
用法: python3 batch-tracking.py [工具名列表]
"""

import os
import re
import sys

def add_tracking_to_tool(file_path, tool_name):
    """为工具添加追踪代码"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已有追踪函数
        if 'function trackToolUsage' not in content:
            # 添加追踪函数到</style>前
            tracking_function = '''
        // 工具使用追踪
        function trackToolUsage(toolName, action) {
            gtag('event', 'tool_usage', {
                'tool_name': toolName,
                'action': action,
                'event_category': 'Tool',
                'event_label': toolName + '_' + action
            });
        }
'''
            content = content.replace('</style>', tracking_function + '</style>')
        
        # 添加简单的按钮点击追踪
        # 查找第一个按钮
        btn_match = re.search(r'<button[^>]*>(.*?)</button>', content, re.DOTALL)
        if btn_match:
            # 在</script>前添加事件监听
            track_script = f'''
        // 追踪工具使用
        document.querySelectorAll('button').forEach(btn => {{
            btn.addEventListener('click', () => {{
                trackToolUsage('{tool_name}', 'click');
            }});
        }});
'''
            if '</script>' in content:
                content = content.replace('</script>', track_script + '</script>')
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'✓ {tool_name}.html: 已添加工具追踪')
        return True
        
    except Exception as e:
        print(f'✗ {tool_name}: 错误 - {e}')
        return False

def main():
    # 所有工具列表
    all_tools = [
        'image-compressor',
        'markdown-editor',
        'json-formatter',
        'image-converter',
        'mortgage-calculator',
        'base64',
        'hash-generator',
        'uuid-generator',
        'lorem-ipsum',
        'url-encoder',
        'regex-tester',
        'cron-generator',
        'pdf-converter',
        'qr-generator',
        'password-generator',
        'color-picker',
        'word-counter',
        'timezone-converter',
        'countdown-timer',
        'unit-converter',
        'online-calculator',
    ]
    
    # 获取脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.join(script_dir, '..', 'tools')
    
    added_count = 0
    for tool in all_tools:
        file_path = os.path.join(base_path, f'{tool}.html')
        if os.path.exists(file_path):
            if add_tracking_to_tool(file_path, tool):
                added_count += 1
        else:
            print(f'✗ {tool}: 文件不存在')
    
    print(f'\n✅ 完成！共优化 {added_count} 个工具页面')
    return added_count

if __name__ == '__main__':
    main()