#!/usr/bin/env python3
"""
GSC和GA4更新步骤指南
"""

def print_gsc_steps():
    print("=" * 60)
    print("Google Search Console (GSC) 更新步骤")
    print("=" * 60)
    
    steps = [
        ("步骤1", "访问GSC", "https://search.google.com/search-console"),
        ("步骤2", "添加属性", "点击右上角'添加属性'按钮"),
        ("步骤3", "输入域名", "输入: https://zh8888.dpdns.org/"),
        ("步骤4", "选择验证方式", "推荐选择'HTML标签'验证"),
        ("步骤5", "复制验证代码", "复制<meta>标签代码"),
        ("步骤6", "添加到网站", "将代码添加到index.html的<head>中"),
        ("步骤7", "提交验证", "点击'验证'按钮"),
        ("步骤8", "提交Sitemap", "验证通过后，提交sitemap.xml"),
    ]
    
    for i, (num, title, desc) in enumerate(steps, 1):
        print(f"\n{num}. {title}")
        print(f"   {desc}")
    
    print("\n" + "=" * 60)
    print("验证方法")
    print("=" * 60)
    print("1. HTML标签验证（推荐）")
    print("   - 在GSC中复制<meta>标签")
    print("   - 添加到网站的<head>中")
    print("   - 点击验证")
    print("\n2. DNS记录验证")
    print("   - 在GSC中获取TXT记录值")
    print("   - 在Cloudflare DNS中添加TXT记录")
    print("   - 等待DNS传播后点击验证")
    print("\n3. HTML文件验证")
    print("   - 下载GSC提供的HTML文件")
    print("   - 上传到网站根目录")
    print("   - 访问验证文件URL")

def print_ga4_steps():
    print("\n" + "=" * 60)
    print("Google Analytics 4 (GA4) 更新步骤")
    print("=" * 60)
    
    steps = [
        ("步骤1", "访问GA4", "https://analytics.google.com"),
        ("步骤2", "进入管理", "点击左下角齿轮图标"),
        ("步骤3", "创建Property", "在'Property'列点击'创建Property'"),
        ("步骤4", "填写信息", "输入Property名称和网站URL"),
        ("步骤5", "选择数据流", "选择'Web'数据流"),
        ("步骤6", "输入网站", "输入: https://zh8888.dpdns.org"),
        ("步骤7", "创建流", "点击'创建'按钮"),
        ("步骤8", "获取ID", "复制Measurement ID（G-XXXXXXXXXX）"),
    ]
    
    for i, (num, title, desc) in enumerate(steps, 1):
        print(f"\n{num}. {title}")
        print(f"   {desc}")
    
    print("\n" + "=" * 60)
    print("建议")
    print("=" * 60)
    print("✅ 创建新Property（推荐）")
    print("   - 数据完全分离")
    print("   - 不影响原有数据")
    print("   - 便于对比分析")
    print("\n⚠️  更新现有Property（可选）")
    print("   - 数据连续")
    print("   - 需要重新配置")
    print("   - 可能影响历史数据")

if __name__ == '__main__':
    print_gsc_steps()
    print_ga4_steps()