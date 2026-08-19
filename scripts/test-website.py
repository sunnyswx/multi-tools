#!/usr/bin/env python3
"""
验证网站功能测试脚本
"""

import requests
from datetime import datetime

def test_website():
    """测试网站功能"""
    
    domains = [
        "https://zh8888.dpdns.org",
        "https://sunnyswx-tools.pages.dev"
    ]
    
    results = []
    
    for domain in domains:
        print(f"\n📝 测试域名: {domain}")
        
        # 测试主页
        try:
            response = requests.get(domain, timeout=10)
            status = "✅" if response.status_code == 200 else "❌"
            print(f"  {status} 主页访问: {response.status_code}")
            results.append({"domain": domain, "homepage": response.status_code})
        except Exception as e:
            print(f"  ❌ 主页访问失败: {e}")
            results.append({"domain": domain, "homepage": None})
        
        # 测试Sitemap
        try:
            response = requests.get(f"{domain}/sitemap.xml", timeout=10)
            status = "✅" if response.status_code == 200 else "❌"
            print(f"  {status} Sitemap: {response.status_code}")
            results.append({"domain": domain, "sitemap": response.status_code})
        except Exception as e:
            print(f"  ❌ Sitemap访问失败: {e}")
            results.append({"domain": domain, "sitemap": None})
        
        # 测试robots.txt
        try:
            response = requests.get(f"{domain}/robots.txt", timeout=10)
            status = "✅" if response.status_code == 200 else "❌"
            print(f"  {status} Robots.txt: {response.status_code}")
            results.append({"domain": domain, "robots": response.status_code})
        except Exception as e:
            print(f"  ❌ Robots.txt访问失败: {e}")
            results.append({"domain": domain, "robots": None})
    
    return results

if __name__ == '__main__':
    print("🚀 开始网站功能测试...")
    results = test_website()
    
    print("\n" + "=" * 60)
    print("测试完成")
    print("=" * 60)
    
    for result in results:
        print(f"\n域名: {result['domain']}")
        for key, value in result.items():
            if key != 'domain':
                status = "✅" if value == 200 else "❌" if value else "⚠️"
                print(f"  {status} {key}: {value}")