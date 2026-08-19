#!/usr/bin/env python3
"""
更新Sitemap和GA4代码为新域名
"""

import os
import re
from datetime import datetime

def update_sitemap(sitemap_path, old_domain, new_domain):
    """更新sitemap.xml中的域名"""
    
    print(f"📝 更新Sitemap: {sitemap_path}")
    
    with open(sitemap_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 替换域名
    new_content = content.replace(old_domain, new_domain)
    
    # 更新lastmod日期
    today = datetime.now().strftime('%Y-%m-%d')
    new_content = re.sub(r'<lastmod>[^<]+</lastmod>', f'<lastmod>{today}</lastmod>', new_content)
    
    # 保存
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Sitemap已更新")
    print(f"   - 域名替换: {old_domain} → {new_domain}")
    print(f"   - 更新日期: {today}")
    
    return new_content

def update_ga4_code(file_path, new_measurement_id=None):
    """更新GA4代码"""
    
    print(f"📝 更新GA4代码: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 如果提供了新的Measurement ID，则更新
    if new_measurement_id:
        # 更新gtag配置
        content = re.sub(
            r"gtag\('config', 'G-[^']+'\);",
            f"gtag('config', '{new_measurement_id}');",
            content
        )
        print(f"   - Measurement ID已更新为: {new_measurement_id}")
    
    # 保存
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ GA4代码已更新")
    
    return content

def update_all_files(root_dir, old_domain, new_domain, new_measurement_id=None):
    """更新所有文件"""
    
    updated_files = []
    
    # 更新index.html
    index_path = os.path.join(root_dir, 'index.html')
    if os.path.exists(index_path):
        update_ga4_code(index_path, new_measurement_id)
        updated_files.append('index.html')
    
    # 更新所有工具页面
    tools_dir = os.path.join(root_dir, 'tools')
    if os.path.exists(tools_dir):
        for filename in os.listdir(tools_dir):
            if filename.endswith('.html'):
                file_path = os.path.join(tools_dir, filename)
                update_ga4_code(file_path, new_measurement_id)
                updated_files.append(f'tools/{filename}')
    
    # 更新sitemap.xml
    sitemap_path = os.path.join(root_dir, 'sitemap.xml')
    if os.path.exists(sitemap_path):
        update_sitemap(sitemap_path, old_domain, new_domain)
        updated_files.append('sitemap.xml')
    
    print(f"\n✅ 总共更新了 {len(updated_files)} 个文件")
    return updated_files

if __name__ == '__main__':
    # 配置
    ROOT_DIR = '.'
    OLD_DOMAIN = 'zh8888.dpdns.org'
    NEW_DOMAIN = 'zh8888.dpdns.org'
    NEW_MEASUREMENT_ID = None  # 如果有新的GA4 Measurement ID，在这里填写
    
    print("🚀 开始更新网站配置...\n")
    
    # 更新所有文件
    updated = update_all_files(ROOT_DIR, OLD_DOMAIN, NEW_DOMAIN, NEW_MEASUREMENT_ID)
    
    print(f"\n📋 已更新的文件:")
    for f in updated:
        print(f"   - {f}")
    
    print(f"\n✅ 完成！请推送到GitHub。")