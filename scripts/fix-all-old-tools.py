#!/usr/bin/env python3
"""
彻底修复所有旧工具页面 - 从Git历史完整恢复
"""

import os
import subprocess
import re

def get_git_file_content(commit_hash, filepath):
    """从Git获取文件完整内容"""
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
            print(f"    ⚠️ 无法获取: {filepath}")
            return None
    except Exception as e:
        print(f"    ❌ 错误: {e}")
        return None

def fix_tool_page_completely(tool_name):
    """完全修复单个工具页面"""
    
    source_path = f'tools/{tool_name}.html'
    
    # 从Git历史获取原始内容（使用HEAD~5，确保有完整功能）
    content = get_git_file_content('HEAD~5', source_path)
    
    if not content:
        return False
    
    # 检查是否包含完整功能
    has_functionality = (
        '<script>' in content and 
        'function' in content and
        len(content) > 3000  # 功能完整的页面通常超过3000字符
    )
    
    if not has_functionality:
        print(f"    ⚠️ 页面功能不完整，尝试其他提交...")
        # 尝试更早的提交
        for offset in range(6, 15):
            content = get_git_file_content(f'HEAD~{offset}', source_path)
            if content and len(content) > 3000:
                break
    
    if not content or len(content) < 3000:
        print(f"    ❌ 无法找到完整版本")
        return False
    
    # 直接保存原始内容，不做任何修改
    with open(source_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return True

def main():
    """主函数"""
    print("=" * 70)
    print("🔧 彻底修复所有旧工具页面")
    print("=" * 70)
    print()
    
    # 旧工具列表（27个）
    old_tools = [
        'image-compressor', 'markdown-editor', 'json-formatter', 'image-converter',
        'mortgage-calculator', 'base64', 'hash-generator', 'uuid-generator',
        'lorem-ipsum', 'url-encoder', 'regex-tester', 'cron-generator',
        'pdf-converter', 'qr-generator', 'password-generator', 'color-picker',
        'word-counter', 'timezone-converter', 'countdown-timer', 'unit-converter',
        'online-calculator', 'random-generator', 'text-compressor', 'json-validator',
        'xml-formatter', 'csv-to-json', 'image-resizer'
    ]
    
    print(f"📊 需要修复 {len(old_tools)} 个旧工具")
    print()
    
    success_count = 0
    fail_count = 0
    
    for i, tool_name in enumerate(old_tools, 1):
        print(f"[{i:2d}/{len(old_tools)}] 修复: {tool_name}")
        
        if fix_tool_page_completely(tool_name):
            success_count += 1
            print(f"    ✅ 成功")
        else:
            fail_count += 1
            print(f"    ❌ 失败")
        
        print()
    
    print("=" * 70)
    print(f"✅ 修复完成！成功: {success_count}, 失败: {fail_count}")
    print("=" * 70)
    print()
    
    if fail_count > 0:
        print("⚠️  有部分工具修复失败，请检查上述日志")
    else:
        print("🎉 所有工具修复成功！")

if __name__ == '__main__':
    main()