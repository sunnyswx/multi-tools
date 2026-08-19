#!/usr/bin/env python3
"""
从Git历史恢复所有旧工具页面
"""

import os
import subprocess

def restore_tool(tool_name):
    """恢复单个工具"""
    commit = 'a7a7278'
    source_path = f'tools/{tool_name}.html'
    
    try:
        result = subprocess.run(
            ['git', 'show', f'{commit}:{source_path}'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            with open(source_path, 'w', encoding='utf-8') as f:
                f.write(result.stdout)
            return True
        else:
            print(f"  ❌ {tool_name}: 无法获取")
            return False
    except Exception as e:
        print(f"  ❌ {tool_name}: {e}")
        return False

def main():
    print("=" * 60)
    print("🔄 从Git历史恢复所有旧工具")
    print("=" * 60)
    print()
    
    # 27个旧工具
    old_tools = [
        'image-compressor', 'markdown-editor', 'json-formatter', 'image-converter',
        'mortgage-calculator', 'base64', 'hash-generator', 'uuid-generator',
        'lorem-ipsum', 'url-encoder', 'regex-tester', 'cron-generator',
        'pdf-converter', 'qr-generator', 'password-generator', 'color-picker',
        'word-counter', 'timezone-converter', 'countdown-timer', 'unit-converter',
        'online-calculator', 'random-generator', 'text-compressor', 'json-validator',
        'xml-formatter', 'csv-to-json', 'image-resizer'
    ]
    
    success = 0
    for tool in old_tools:
        print(f"🔄 恢复: {tool}")
        if restore_tool(tool):
            success += 1
            print(f"  ✅ 成功")
        else:
            print(f"  ❌ 失败")
        print()
    
    print("=" * 60)
    print(f"✅ 恢复完成: {success}/{len(old_tools)}")
    print("=" * 60)

if __name__ == '__main__':
    main()