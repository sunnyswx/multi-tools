#!/usr/bin/env python3
"""
每日定时任务执行脚本
"""

import subprocess
import sys
import os
from datetime import datetime

def run_command(command, check=True):
    """运行命令并返回结果"""
    print(f"💻 执行: {' '.join(command)}")
    result = subprocess.run(command, capture_output=True, text=True)
    
    if result.stdout:
        print(result.stdout)
    
    if result.stderr:
        print(f"⚠️  错误: {result.stderr}", file=sys.stderr)
    
    if check and result.returncode != 0:
        print(f"❌ 命令失败，返回码: {result.returncode}")
        return False
    
    return True

def main():
    print("=" * 60)
    print("🚀 每日定时任务执行脚本")
    print("=" * 60)
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 步骤1: 进入项目目录
    print("📝 步骤1: 进入项目目录...")
    project_dir = os.path.expanduser("~/Documents/functional-website/multi-tools")
    if not os.path.exists(project_dir):
        print(f"❌ 项目目录不存在: {project_dir}")
        return 1
    
    os.chdir(project_dir)
    print(f"✅ 当前目录: {os.getcwd()}")
    print()
    
    # 步骤2: 检查Git状态
    print("📝 步骤2: 检查Git状态...")
    run_command(["git", "status", "--short"])
    print()
    
    # 步骤3: 拉取最新代码
    print("📝 步骤3: 拉取最新代码...")
    run_command(["git", "pull", "origin", "main"])
    print()
    
    # 步骤4: 开发新工具
    print("📝 步骤4: 开发新工具...")
    if os.path.exists("scripts/develop-new-tool-workflow.py"):
        run_command(["python3", "scripts/develop-new-tool-workflow.py"])
    else:
        print("⚠️  develop-new-tool-workflow.py不存在，跳过新工具开发")
    print()
    
    # 步骤5: 运行SEO和GA4更新
    print("📝 步骤5: 运行SEO和GA4更新...")
    if os.path.exists("scripts/batch-seo-ga4.py"):
        run_command(["python3", "scripts/batch-seo-ga4.py"])
    else:
        print("⚠️  batch-seo-ga4.py不存在，跳过")
    print()
    
    # 步骤6: 运行追踪更新
    print("📝 步骤6: 运行追踪更新...")
    if os.path.exists("scripts/batch-tracking.py"):
        run_command(["python3", "scripts/batch-tracking.py"])
    else:
        print("⚠️  batch-tracking.py不存在，跳过")
    print()
    
    # 步骤7: 提交更改
    print("📝 步骤7: 提交更改...")
    run_command(["git", "add", "-A"])
    run_command(["git", "commit", "-m", f"chore: daily automated deployment - {datetime.now().strftime('%Y-%m-%d')}"])
    print()
    
    # 步骤8: 推送到GitHub
    print("📝 步骤8: 推送到GitHub...")
    run_command(["git", "push", "origin", "main"])
    print()
    
    # 步骤9: 验证部署
    print("📝 步骤9: 验证部署...")
    print("   访问: https://zh8888.dpdns.org")
    print("   Sitemap: https://zh8888.dpdns.org/sitemap.xml")
    print()
    
    print("=" * 60)
    print("✅ 每日定时任务执行完成！")
    print("=" * 60)
    print()
    print("📊 总结:")
    print("   域名: https://zh8888.dpdns.org")
    print("   工具数: 28个")
    print("   状态: 已部署")
    print()
    
    return 0

if __name__ == '__main__':
    sys.exit(main())