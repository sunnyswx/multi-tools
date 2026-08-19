#!/usr/bin/env python3
"""
更新GA4 Measurement ID
"""

import os
import re

OLD_ID = "G-7B5H09J4KB"
NEW_ID = "G-L7GQFYBWB6"

def update_file(file_path):
    """更新单个文件中的GA4代码"""
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if OLD_ID in content:
        # 替换Measurement ID
        new_content = content.replace(OLD_ID, NEW_ID)
        
        # 保存
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        return True
    return False

def main():
    print(f"🚀 开始更新GA4代码...")
    print(f"   旧ID: {OLD_ID}")
    print(f"   新ID: {NEW_ID}\n")
    
    updated_files = []
    
    # 遍历所有HTML文件
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                file_path = os.path.join(root, file)
                if update_file(file_path):
                    updated_files.append(file_path)
                    print(f"✅ 更新: {file_path}")
    
    print(f"\n📊 总共更新了 {len(updated_files)} 个文件")
    
    return updated_files

if __name__ == '__main__':
    main()