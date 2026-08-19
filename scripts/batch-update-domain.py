#!/usr/bin/env python3
"""
批量更新域名
"""

import os
import re

OLD_DOMAIN = "zh8888.dpdns.org"
NEW_DOMAIN = "zh8888.dpdns.org"

def update_file(file_path):
    """更新单个文件中的域名"""
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if OLD_DOMAIN in content:
            # 替换域名
            new_content = content.replace(OLD_DOMAIN, NEW_DOMAIN)
            
            # 保存
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            return True
    except Exception as e:
        print(f"⚠️ 无法读取文件 {file_path}: {e}")
    
    return False

def main():
    print(f"🚀 开始批量更新域名...")
    print(f"   旧域名: {OLD_DOMAIN}")
    print(f"   新域名: {NEW_DOMAIN}\n")
    
    updated_files = []
    
    # 遍历所有文件
    for root, dirs, files in os.walk('.'):
        # 跳过.git和node_modules目录
        dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.hermes']]
        
        for file in files:
            # 只更新特定类型的文件
            if file.endswith(('.bat', '.sh', '.py', '.json', '.toml', '.env', '.md', '.txt', '.html', '.xml')):
                file_path = os.path.join(root, file)
                if update_file(file_path):
                    updated_files.append(file_path)
                    print(f"✅ 更新: {file_path}")
    
    print(f"\n📊 总共更新了 {len(updated_files)} 个文件")
    
    return updated_files

if __name__ == '__main__':
    main()