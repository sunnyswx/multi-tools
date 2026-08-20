#!/usr/bin/env python3
"""
批量优化工具页面 - SEO、GA4和追踪代码（合并版）
整合batch-seo-ga4.py和batch-tracking.py的功能
"""

import os
import re
import sys
from pathlib import Path

# 配置
BASE_DIR = Path(__file__).parent.parent
TOOLS_DIR = BASE_DIR / "tools"
GA4_ID = "G-L7GQFYBWB6"
BASE_URL = "https://zh8888.dpdns.org"

# GA4基础代码模板
GA4_BASE_CODE = f'''
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={GA4_ID}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', '{GA4_ID}');
    </script>
'''

# 工具追踪代码模板
TRACKING_CODE = '''
    <script>
        // 工具使用追踪
        function trackToolUsage(toolName) {{
            if (typeof gtag !== 'undefined') {{
                gtag('event', 'tool_usage', {{
                    'event_category': 'tools',
                    'event_label': toolName,
                    'value': 1
                }});
            }}
        }}
        
        // 页面加载时追踪
        trackToolUsage('{tool_name}');
        
        // 按钮点击追踪
        document.querySelectorAll('button').forEach(btn => {{
            btn.addEventListener('click', () => {{
                trackToolUsage('{tool_name}', 'click');
            }});
        }});
    </script>
'''

# 工具配置
TOOLS_CONFIG = [
    ('pdf-converter', 'PDF转换工具', 'pdf转换,pdf在线,pdf转word,pdf转图片,在线转换', '免费在线PDF转换工具，支持PDF转Word、PDF转图片、PDF合并拆分。快速转换，保持原文件格式。'),
    ('qr-generator', '二维码生成器', '二维码生成,qrcode,二维码制作,在线生成,扫码', '免费在线二维码生成器，支持文本、URL、Wi-Fi、联系信息等。快速生成高质量二维码。'),
    ('password-generator', '密码生成器', '密码生成,随机密码,强密码,密码生成器,安全密码', '免费在线密码生成器，支持自定义长度和字符类型。生成高强度安全密码，保护账户安全。'),
    ('color-picker', '颜色选择器', '颜色选择器,color picker,HEX,RGB,HSL,在线取色', '免费在线颜色选择器，支持HEX、RGB、HSL格式。一键复制颜色代码，适用于网页设计和开发。'),
    ('word-counter', '字数统计器', '字数统计,word counter,字符统计,在线统计,论文统计', '免费在线字数统计器，实时统计文字数量、字符数、段落数、行数。适用于论文写作和内容创作。'),
    ('timezone-converter', '时区转换器', '时区转换,time zone,时差计算,世界时钟,时间转换', '免费在线时区转换器，支持全球主要城市时区对比。快速计算时差，适用于国际商务和旅行。'),
    ('countdown-timer', '倒计时器', '倒计时,countdown,计时器,定时提醒,在线计时', '免费在线倒计时器，支持自定义时间和提醒功能。适用于考试、烹饪、会议等多种场景。'),
    ('unit-converter', '单位转换器', '单位转换,converter,长度转换,重量转换,温度转换', '免费在线单位转换器，支持长度、重量、温度、面积、体积等多种单位快速转换。'),
    ('online-calculator', '在线计算器', '计算器,calculator,在线计算,科学计算,数学计算', '免费在线计算器，支持基础计算和科学计算。功能强大，界面简洁，适用于日常计算需求。'),
    ('base64', 'Base64编解码', 'base64编解码,base64在线,编码解码,在线工具', '免费在线Base64编解码工具，支持文本和图片的Base64编码和解码。快速转换，本地处理保护隐私。'),
    ('hash-generator', 'Hash生成器', 'hash生成,md5,sha256,sha1,在线哈希,加密', '免费在线Hash生成器，支持MD5、SHA-1、SHA-256、SHA-512等多种哈希算法。快速生成哈希值。'),
    ('uuid-generator', 'UUID生成器', 'uuid生成,uuid在线,随机UUID,唯一标识符,UUID v4', '免费在线UUID生成器，支持生成UUID v4随机标识符。适用于数据库、API开发等多种场景。'),
    ('lorem-ipsum', 'Lorem Ipsum生成器', 'lorem ipsum,占位文本,虚拟文本,设计用文,随机文本', '免费在线Lorem Ipsum生成器，生成随机占位文本。适用于网页设计、印刷排版等场景。'),
    ('url-encoder', 'URL编解码器', 'url编解码,url编码,url解码,在线工具,百分号编码', '免费在线URL编解码器，支持URL编码和解码。适用于网页开发、API调试等多种场景。'),
    ('regex-tester', '正则表达式测试器', '正则表达式,regex,正则测试,在线正则,pattern匹配', '免费在线正则表达式测试器，实时匹配和验证。支持多种正则语法，适用于开发调试。'),
    ('cron-generator', 'Cron表达式生成器', 'cron表达式,cron生成器,定时任务,cron在线,cron语法', '免费在线Cron表达式生成器，支持可视化创建定时任务。适用于服务器定时任务配置。'),
    ('image-compressor', '图片压缩工具', '图片压缩,image compressor,png压缩,jpg压缩,在线压缩', '免费在线图片压缩工具，支持PNG、JPG、WebP格式压缩。本地处理，保护隐私。'),
    ('markdown-editor', 'Markdown编辑器', 'markdown编辑器,markdown在线,实时预览,gfm,在线写作', '免费在线Markdown编辑器，支持实时预览和GitHub Flavored Markdown。适用于写作者和开发者。'),
    ('json-formatter', 'JSON格式化器', 'json格式化,json验证,json压缩,在线json,json beautify', '免费在线JSON格式化工具，支持格式化、验证、压缩。快速美化JSON数据。'),
    ('image-converter', '图片格式转换', '图片转换,image converter,png转jpg,jpg转png,webp转换', '免费在线图片格式转换工具，支持PNG、JPG、WebP格式互转。快速转换，保持质量。'),
    ('mortgage-calculator', '房贷计算器', '房贷计算器,mortgage calculator,月供计算,等额本金,等额本息', '免费在线房贷计算器，计算每月还款额和总利息。支持等额本金和等额本息两种还款方式。'),
    ('bmi-calculator', 'BMI计算器', 'BMI计算器,bmi calculator,身体质量指数,健康评估,体重计算', '免费在线BMI计算器，计算身体质量指数并评估健康状况。输入身高体重即可得到结果。'),
    ('percentage-calculator', '百分比计算器', '百分比计算器,percentage calculator,百分比计算,比例计算,在线计算', '免费在线百分比计算器，支持三种百分比计算模式。快速计算百分比、比例和增减。'),
    ('age-calculator', '年龄计算器', '年龄计算器,age calculator,生日计算,精确年龄,日期计算', '免费在线年龄计算器，精确计算年龄并显示详细时间信息。输入出生日期即可得到结果。'),
    ('time-format', '时间格式转换', '时间格式转换,time format,时间戳转换,timestamp,日期转换', '免费在线时间格式转换工具，支持时间戳与格式化时间相互转换。快速转换，精准计算。'),
    ('gradient-generator', 'CSS渐变生成器', 'CSS渐变,gradient generator,渐变代码,网页设计,背景生成', '免费在线CSS渐变生成器，生成渐变代码并实时预览。支持线性渐变和径向渐变。'),
    ('image-resizer', '图片调整大小', '图片调整大小,image resizer,图片缩放,尺寸调整,批量调整', '免费在线图片调整大小工具，支持自定义宽高和批量处理。快速调整图片尺寸。'),
    ('text-compressor', '文本压缩器', '文本压缩,text compressor,压缩文本,去除空格,文本优化', '免费在线文本压缩工具，去除多余空格和换行。压缩文本，节省空间。'),
    ('json-validator', 'JSON验证器', 'JSON验证,json validator,json检查,格式验证,在线验证', '免费在线JSON验证工具，验证JSON格式并显示错误位置。快速检查JSON数据。'),
    ('xml-formatter', 'XML格式化器', 'XML格式化,xml formatter,XML美化,格式化XML,在线工具', '免费在线XML格式化工具，格式化XML文档并语法高亮。快速美化XML数据。'),
    ('csv-to-json', 'CSV转JSON', 'CSV转JSON,csv to json,CSV转换,数据转换,在线工具', '免费在线CSV转JSON工具，将CSV数据转换为JSON格式。快速转换，支持多种格式。'),
    ('random-generator', '随机工具生成器', '随机数生成,random generator,随机选择,随机密码,在线生成', '免费在线随机工具生成器，支持随机数生成、随机选择和随机密码。多种随机功能。'),
]

def add_seo_and_tracking(file_path, tool_name, tool_chinese, keywords, description):
    """为工具页面添加SEO和追踪代码"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查是否已添加GA4和追踪
        if GA4_ID in content and 'trackToolUsage' in content:
            print(f'✓ {tool_name}: 已存在SEO和追踪代码')
            return False
        
        # 添加GA4基础代码到<body>后
        if GA4_ID not in content:
            content = content.replace('<body>', f'<body>{GA4_BASE_CODE}', 1)
        
        # 更新title
        old_title = re.search(r'<title>(.*?)</title>', content)
        if old_title:
            new_title = f'{tool_chinese} - 免费在线{tool_chinese}工具 | Multi Tools'
            content = content.replace(old_title.group(0), f'<title>{new_title}</title>')
        
        # 添加meta description（如果没有）
        if 'meta name="description"' not in content:
            desc_meta = f'<meta name="description" content="{description}">'
            content = content.replace('</head>', f'{desc_meta}\n</head>', 1)
        
        # 添加meta keywords（如果没有）
        if 'meta name="keywords"' not in content:
            kw_meta = f'<meta name="keywords" content="{keywords}">'
            content = content.replace('</head>', f'{kw_meta}\n</head>', 1)
        
        # 添加Open Graph标签（如果没有）
        if 'og:title' not in content:
            og_tags = f'''
    <!-- Open Graph -->
    <meta property="og:title" content="{tool_chinese} - 免费在线工具">
    <meta property="og:description" content="{description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{BASE_URL}/tools/{tool_name}.html">
    <meta property="og:image" content="{BASE_URL}/og-image.jpg">
    <meta property="og:site_name" content="Multi Tools">
    <meta property="og:locale" content="zh_CN">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{tool_chinese} - 免费在线工具">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="{BASE_URL}/og-image.jpg">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="{BASE_URL}/tools/{tool_name}.html">
'''
            content = content.replace('</head>', og_tags + '\n</head>', 1)
        
        # 添加工具追踪代码（如果没有）
        if 'trackToolUsage' not in content:
            tracking_script = TRACKING_CODE.format(tool_name=tool_name)
            # 在</body>前插入追踪代码
            content = content.replace('</body>', f'{tracking_script}\n</body>', 1)
        
        # 写回文件
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f'✓ {tool_name}: 已添加SEO和追踪代码')
        return True
        
    except Exception as e:
        print(f'✗ {tool_name}: 错误 - {e}')
        return False

def main():
    """主函数"""
    print("=" * 70)
    print("🔧 批量优化工具页面 - SEO、GA4和追踪代码")
    print("=" * 70)
    print()
    
    added_count = 0
    for tool_name, tool_chinese, keywords, description in TOOLS_CONFIG:
        file_path = TOOLS_DIR / f'{tool_name}.html'
        if file_path.exists():
            if add_seo_and_tracking(file_path, tool_name, tool_chinese, keywords, description):
                added_count += 1
        else:
            print(f'✗ {tool_name}: 文件不存在')
    
    print()
    print("=" * 70)
    print(f"✅ 完成！共优化 {added_count} 个工具页面")
    print("=" * 70)
    return added_count

if __name__ == '__main__':
    sys.exit(main())