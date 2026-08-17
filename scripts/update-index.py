#!/usr/bin/env python3
"""
更新index.html添加工具卡片
用法: python3 update-index.py [工具名] [工具中文名] [图标] [描述]
"""

import sys
import os

def update_index(tool_name, tool_chinese, icon="🔧", description="免费在线工具"):
    """更新index.html添加工具卡片"""
    
    # 读取index.html
    index_path = 'index.html'
    try:
        with open(index_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"❌ 错误: 找不到文件 {index_path}")
        return False
    
    # 检查是否已包含该工具
    tool_url = f"/tools/{tool_name}.html"
    if tool_url in content:
        print(f"✓ {tool_name}: 已存在于index.html")
        return False
    
    # 创建工具卡片HTML
    tool_card = f'''
        <!-- {tool_name} -->
        <a href="{tool_url}" class="tool-card">
            <div class="tool-icon">{icon}</div>
            <div class="tool-name">{tool_chinese}</div>
            <div class="tool-desc">{description}</div>
        </a>
    </div>'''
    
    # 在最后一个</a>前插入
    # 找到最后一个</a>的位置
    last_a_end = content.rfind('</a>')
    if last_a_end == -1:
        print("❌ 错误: 找不到</a>标签")
        return False
    
    # 在</a>后找到</div>的位置
    insert_pos = content.find('</div>', last_a_end)
    if insert_pos == -1:
        print("❌ 错误: 找不到结束标签")
        return False
    
    # 插入新工具卡片
    new_content = content[:insert_pos] + tool_card + content[insert_pos:]
    
    # 写回文件
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✓ {tool_name}: 已添加到index.html")
    return True

def main():
    if len(sys.argv) < 3:
        print("用法: python3 update-index.py [工具名] [工具中文名] [图标] [描述]")
        print("示例: python3 update-index.py random-generator 随机工具生成器 🎲 随机数生成、随机选择、随机密码")
        sys.exit(1)
    
    tool_name = sys.argv[1]
    tool_chinese = sys.argv[2]
    icon = sys.argv[3] if len(sys.argv) > 3 else "🔧"
    description = sys.argv[4] if len(sys.argv) > 4 else "免费在线工具"
    
    success = update_index(tool_name, tool_chinese, icon, description)
    sys.exit(0 if success else 1)

if __name__ == '__main__':
    main()