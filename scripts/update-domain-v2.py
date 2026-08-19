#!/usr/bin/env python3
"""
域名迁移脚本 - 更新sitemap和GA4代码
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

def update_ga4_code(file_path, old_measurement_id, new_measurement_id):
    """更新GA4代码"""
    
    print(f"📝 更新GA4代码: {file_path}")
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 更新Measurement ID
    new_content = content.replace(old_measurement_id, new_measurement_id)
    
    # 保存
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ GA4代码已更新")
    print(f"   - Measurement ID: {old_measurement_id} → {new_measurement_id}")
    
    return new_content

def main():
    # 配置
    ROOT_DIR = '.'
    OLD_DOMAIN = 'zh8888.dpdns.org'
    NEW_DOMAIN = 'zh8888.dpdns.org'
    OLD_MEASUREMENT_ID = 'G-7B5H09J4KB'
    NEW_MEASUREMENT_ID = None  # 如果创建了新Property，在这里填写
    
    print("🚀 开始更新网站配置...\n")
    
    # 更新sitemap
    sitemap_path = os.path.join(ROOT_DIR, 'sitemap.xml')
    if os.path.exists(sitemap_path):
        update_sitemap(sitemap_path, OLD_DOMAIN, NEW_DOMAIN)
    
    # 更新所有HTML文件
    html_files = []
    for root, dirs, files in os.walk(ROOT_DIR):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    print(f"\n📝 发现 {len(html_files)} 个HTML文件")
    
    for file_path in html_files:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if OLD_MEASUREMENT_ID in content:
                update_ga4_code(file_path, OLD_MEASUREMENT_ID, NEW_MEASUREMENT_ID if NEW_MEASUREMENT_ID else OLD_MEASUREMENT_ID)
            elif OLD_DOMAIN in content:
                # 更新域名引用
                new_content = content.replace(OLD_DOMAIN, NEW_DOMAIN)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"✅ 域名已更新: {file_path}")
    
    print(f"\n✅ 所有文件更新完成！")
    print(f"\n📋 下一步：")
    print(f"   1. 推送到GitHub")
    print(f"   2. 等待Cloudflare部署")
    print(f"   3. 访问 https://{NEW_DOMAIN} 验证")

if __name__ == '__main__':
    main()