#!/usr/bin/env python3
"""
更新index.html添加新工具
"""

import re
import os
from datetime import datetime

def get_existing_tools():
    """获取已有工具列表"""
    tools = []
    tools_dir = 'tools'
    
    if os.path.exists(tools_dir):
        for file in os.listdir(tools_dir):
            if file.endswith('.html'):
                tool_name = file.replace('.html', '')
                tools.append(tool_name)
    
    return sorted(tools)

def get_tool_info(tool_name):
    """获取工具信息"""
    # 工具信息映射
    tool_info = {
        # 原有工具
        'image-compressor': {'icon': '🖼️', 'name': '图片压缩工具', 'desc': '免费在线压缩PNG、JPG、WebP图片，本地处理保护隐私'},
        'markdown-editor': {'icon': '📝', 'name': 'Markdown编辑器', 'desc': '实时预览，支持GitHub Flavored Markdown'},
        'json-formatter': {'icon': '🔧', 'name': 'JSON格式化器', 'desc': '在线格式化、验证、压缩JSON数据'},
        'image-converter': {'icon': '🔄', 'name': '图片格式转换', 'desc': 'JPG、PNG、WebP格式互转'},
        'mortgage-calculator': {'icon': '🏠', 'name': '房贷计算器', 'desc': '计算每月还款额和总利息'},
        'base64': {'icon': '🔤', 'name': 'Base64编解码', 'desc': '在线Base64编码和解码工具'},
        'hash-generator': {'icon': '🔐', 'name': 'Hash生成器', 'desc': 'MD5、SHA-1、SHA-256、SHA-512生成'},
        'uuid-generator': {'icon': '🔑', 'name': 'UUID生成器', 'desc': '生成随机UUID v4'},
        'lorem-ipsum': {'icon': '📄', 'name': 'Lorem Ipsum生成', 'desc': '生成随机占位文本'},
        'url-encoder': {'icon': '🔗', 'name': 'URL编解码器', 'desc': '在线URL编码和解码工具'},
        'regex-tester': {'icon': '🔍', 'name': '正则表达式测试', 'desc': '在线测试正则表达式'},
        'cron-generator': {'icon': '⏰', 'name': 'Cron表达式生成', 'desc': '轻松创建Cron定时任务'},
        'pdf-converter': {'icon': '📑', 'name': 'PDF转换工具', 'desc': '在线转换PDF格式'},
        'qr-generator': {'icon': '📱', 'name': '二维码生成器', 'desc': '快速生成二维码'},
        'password-generator': {'icon': '🔒', 'name': '密码生成器', 'desc': '生成高强度安全密码'},
        'color-picker': {'icon': '🎨', 'name': '颜色选择器', 'desc': '在线颜色选择'},
        'word-counter': {'icon': '📊', 'name': '字数统计器', 'desc': '实时统计文字数量'},
        'timezone-converter': {'icon': '🌍', 'name': '时区转换器', 'desc': '时区对比和时差计算'},
        'countdown-timer': {'icon': '⏱️', 'name': '倒计时器', 'desc': '自定义时间倒计时'},
        'unit-converter': {'icon': '📏', 'name': '单位转换器', 'desc': '长度、重量、温度转换'},
        'online-calculator': {'icon': '🧮', 'name': '在线计算器', 'desc': '基础计算器和科学计算器'},
        'random-generator': {'icon': '🎲', 'name': '随机工具生成器', 'desc': '随机数生成、随机选择、随机密码'},
        'text-compressor': {'icon': '📝', 'name': '文本压缩器', 'desc': '在线压缩文本，去除多余空格和换行'},
        'json-validator': {'icon': '🔍', 'name': 'JSON验证器', 'desc': '验证JSON格式，显示错误位置'},
        'xml-formatter': {'icon': '📄', 'name': 'XML格式化器', 'desc': '格式化XML文档，语法高亮'},
        'csv-to-json': {'icon': '📊', 'name': 'CSV转JSON', 'desc': '将CSV数据转换为JSON格式'},
        'image-resizer': {'icon': '🖼️', 'name': '图片调整大小', 'desc': '调整图片尺寸，支持自定义宽高'},
        
        # 新工具
        'bmi-calculator': {'icon': '⚖️', 'name': 'BMI计算器', 'desc': '计算身体质量指数，评估健康状况'},
        'percentage-calculator': {'icon': '💯', 'name': '百分比计算器', 'desc': '快速计算百分比，支持各种场景'},
        'age-calculator': {'icon': '🎂', 'name': '年龄计算器', 'desc': '精确计算年龄，显示详细时间信息'},
        'time-format': {'icon': '🕐', 'name': '时间格式转换', 'desc': '时间戳与格式化时间相互转换'},
        'gradient-generator': {'icon': '🌈', 'name': 'CSS渐变生成器', 'desc': '生成CSS渐变代码，支持多种类型'},
    }
    
    return tool_info.get(tool_name, {'icon': '🔧', 'name': tool_name, 'desc': '在线工具'})

def update_index_html():
    """更新index.html"""
    
    print("📝 更新index.html...")
    
    # 读取现有index.html
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 获取所有工具
    all_tools = get_existing_tools()
    print(f"✅ 找到 {len(all_tools)} 个工具")
    
    # 生成工具卡片HTML
    tool_cards = []
    for tool_name in all_tools:
        info = get_tool_info(tool_name)
        card = f'''    <a href="/tools/{tool_name}.html" class="tool-card" data-tool="{tool_name}">
      <div class="tool-icon">{info['icon']}</div>
      <div class="tool-info">
        <h3>{info['name']}</h3>
        <p>{info['desc']}</p>
      </div>
    </a>'''
        tool_cards.append(card)
    
    # 替换工具卡片区域
    # 查找 <div class="tools-grid"> 和 </div> 之间的内容
    pattern = r'(<div class="tools-grid">)(.*?)(</div>)'
    replacement = r'\1\n' + '\n\n'.join(tool_cards) + r'\n\3'
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    # 保存文件
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ 已更新index.html，包含 {len(all_tools)} 个工具")
    
    return all_tools

def main():
    """主函数"""
    print("=" * 60)
    print("🔧 更新工具列表")
    print("=" * 60)
    print()
    
    # 更新index.html
    tools = update_index_html()
    
    print()
    print("=" * 60)
    print("✅ 更新完成！")
    print("=" * 60)
    print()
    print(f"📊 工具总数: {len(tools)}")
    print()
    print("📋 新工具列表:")
    new_tools = ['bmi-calculator', 'percentage-calculator', 'age-calculator', 'time-format', 'gradient-generator']
    for tool in new_tools:
        if tool in tools:
            info = get_tool_info(tool)
            print(f"  ✅ {info['icon']} {info['name']}")
    
    print()
    print("💡 提示: 记得提交并推送到GitHub")

if __name__ == '__main__':
    main()