#!/usr/bin/env python3
"""
新工具开发工作流
步骤：开发/搜索 → 保存本地 → 验证 → 推送远程
"""

import os
import sys
import subprocess
import shutil
from datetime import datetime

# 新工具配置（可以根据需要扩展）
NEW_TOOLS = {
    "text-compressor": {
        "name": "文本压缩器",
        "icon": "📝",
        "description": "在线压缩文本，去除多余空格和换行",
        "features": ["去除多余空格", "去除空行", "压缩换行", "自定义压缩级别"]
    },
    "json-validator": {
        "name": "JSON验证器",
        "icon": "🔍",
        "description": "验证JSON格式是否正确，显示错误位置",
        "features": ["格式验证", "错误定位", "语法高亮", "错误提示"]
    },
    "xml-formatter": {
        "name": "XML格式化器",
        "icon": "📄",
        "description": "格式化XML文档，支持缩进和语法高亮",
        "features": ["格式化输出", "缩进调整", "语法高亮", "错误检测"]
    },
    "csv-to-json": {
        "name": "CSV转JSON",
        "icon": "📊",
        "description": "将CSV数据转换为JSON格式",
        "features": ["CSV解析", "JSON生成", "字段映射", "数据验证"]
    },
    "image-resizer": {
        "name": "图片调整大小",
        "icon": "🖼️",
        "description": "调整图片尺寸，支持自定义宽度和高度",
        "features": ["尺寸调整", "比例保持", "批量处理", "格式转换"]
    }
}

def get_existing_tools():
    """获取已存在的工具列表"""
    tools_dir = "tools"
    if not os.path.exists(tools_dir):
        return []
    
    existing = []
    for file in os.listdir(tools_dir):
        if file.endswith(".html") and not file.endswith("-seo.html"):
            existing.append(file.replace(".html", ""))
    return existing

def check_tool_exists(tool_name):
    """检查工具是否已存在"""
    existing = get_existing_tools()
    return tool_name in existing

def create_tool_from_template(tool_name, config):
    """从模板创建新工具"""
    template_path = "tools/template.html"
    
    if not os.path.exists(template_path):
        print(f"❌ 模板文件不存在: {template_path}")
        return False
    
    # 创建新工具文件
    tool_path = f"tools/{tool_name}.html"
    
    with open(template_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 替换占位符
    content = content.replace("{{TOOL_NAME}}", config["name"])
    content = content.replace("{{TOOL_ICON}}", config["icon"])
    content = content.replace("{{TOOL_DESCRIPTION}}", config["description"])
    
    # 添加功能特性
    features_html = "\n".join([f"                    <li>{feature}</li>" for feature in config["features"]])
    content = content.replace("{{FEATURES_LIST}}", features_html)
    
    # 保存文件
    with open(tool_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ 已创建工具: {tool_name} ({config['name']})")
    return True

def validate_tool(tool_name):
    """验证工具文件"""
    tool_path = f"tools/{tool_name}.html"
    
    if not os.path.exists(tool_path):
        print(f"❌ 工具文件不存在: {tool_path}")
        return False
    
    # 检查文件内容
    with open(tool_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 基本验证
    checks = [
        ("<html" in content, "包含<html>标签"),
        ("</html>" in content, "包含</html>标签"),
        ("<head>" in content, "包含<head>标签"),
        ("</head>" in content, "包含</head>标签"),
        ("<body>" in content, "包含<body>标签"),
        ("</body>" in content, "包含</body>标签"),
        ("{{TOOL_NAME}}" not in content, "已替换工具名称"),
    ]
    
    all_passed = True
    for check, message in checks:
        status = "✅" if check else "❌"
        print(f"{status} {message}")
        if not check:
            all_passed = False
    
    return all_passed

def commit_to_git(tool_name, message=None):
    """提交到Git"""
    if message is None:
        message = f"feat: add {tool_name} tool"
    
    try:
        # 添加文件
        subprocess.run(["git", "add", f"tools/{tool_name}.html"], check=True)
        subprocess.run(["git", "add", "index.html"], check=True)
        
        # 提交
        result = subprocess.run(
            ["git", "commit", "-m", message],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"✅ Git提交成功: {message}")
            return True
        else:
            print(f"❌ Git提交失败: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ Git操作失败: {e}")
        return False

def push_to_remote():
    """推送到远程仓库"""
    try:
        result = subprocess.run(
            ["git", "push", "origin", "main"],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print(f"✅ 推送到GitHub成功")
            return True
        else:
            print(f"❌ 推送失败: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ 推送失败: {e}")
        return False

def update_index_html(tool_name, config):
    """更新index.html添加工具卡片"""
    index_path = "index.html"
    
    if not os.path.exists(index_path):
        print(f"❌ index.html不存在")
        return False
    
    with open(index_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 检查是否已存在
    if f"/tools/{tool_name}.html" in content:
        print(f"✓ {tool_name} 已存在于index.html")
        return True
    
    # 添加工具卡片
    tool_card = f'''
        <!-- {tool_name} -->
        <a href="/tools/{tool_name}.html" class="tool-card">
            <div class="tool-icon">{config['icon']}</div>
            <div class="tool-name">{config['name']}</div>
            <div class="tool-desc">{config['description']}</div>
        </a>'''
    
    # 在最后一个</a>前插入
    last_a_end = content.rfind('</a>')
    if last_a_end == -1:
        print("❌ 找不到</a>标签")
        return False
    
    insert_pos = content.find('</div>', last_a_end)
    if insert_pos == -1:
        print("❌ 找不到结束标签")
        return False
    
    new_content = content[:insert_pos] + tool_card + content[insert_pos:]
    
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ 已更新index.html")
    return True

def main():
    print("=" * 60)
    print("新工具开发工作流")
    print("=" * 60)
    print()
    
    # 步骤1：选择要开发的工具
    print("📋 可用的新工具：")
    for tool_name, config in NEW_TOOLS.items():
        status = "✅ 已存在" if check_tool_exists(tool_name) else "⬜ 待开发"
        print(f"   - {tool_name}: {config['name']} {status}")
    print()
    
    # 步骤2：开发新工具
    print("🔧 步骤1: 开发新工具...")
    developed = []
    
    for tool_name, config in NEW_TOOLS.items():
        if not check_tool_exists(tool_name):
            if create_tool_from_template(tool_name, config):
                developed.append(tool_name)
        else:
            print(f"⚠️ {tool_name} 已存在，跳过")
    
    if not developed:
        print("\n❌ 没有新工具需要开发")
        print("💡 提示：所有预设工具都已存在，需要添加新工具到NEW_TOOLS配置")
        return
    
    print(f"\n✅ 开发了 {len(developed)} 个新工具: {', '.join(developed)}")
    print()
    
    # 步骤3：验证工具
    print("🔍 步骤2: 验证工具...")
    validated = []
    
    for tool_name in developed:
        print(f"\n验证 {tool_name}:")
        if validate_tool(tool_name):
            validated.append(tool_name)
            print(f"✅ {tool_name} 验证通过")
        else:
            print(f"❌ {tool_name} 验证失败")
    
    if not validated:
        print("\n❌ 没有工具通过验证")
        return
    
    print(f"\n✅ {len(validated)} 个工具验证通过")
    print()
    
    # 步骤4：更新index.html
    print("📝 步骤3: 更新index.html...")
    for tool_name in validated:
        update_index_html(tool_name, NEW_TOOLS[tool_name])
    print()
    
    # 步骤5：提交到Git
    print("💾 步骤4: 提交到Git...")
    if not commit_to_git(", ".join(validated)):
        print("\n❌ Git提交失败")
        return
    print()
    
    # 步骤6：推送到远程
    print("☁️ 步骤5: 推送到GitHub...")
    if not push_to_remote():
        print("\n❌ 推送失败")
        return
    print()
    
    # 完成
    print("=" * 60)
    print("✅ 新工具开发工作流完成！")
    print("=" * 60)
    print(f"\n📊 统计：")
    print(f"   - 开发工具: {len(developed)} 个")
    print(f"   - 验证通过: {len(validated)} 个")
    print(f"   - 网站: https://zh8888.dpdns.org")
    print(f"\n🎉 新工具将自动部署到Cloudflare Pages")

if __name__ == "__main__":
    main()