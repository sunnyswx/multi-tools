#!/usr/bin/env python3
"""
智能工具开发工作流（完整版）
整合发现、生成、验证全流程
"""

import subprocess
import sys
import os
from datetime import datetime

def run_script(script_name):
    """运行Python脚本"""
    print(f"\n🚀 运行: {script_name}")
    print("=" * 60)
    
    script_path = f"scripts/{script_name}"
    if not os.path.exists(script_path):
        print(f"❌ 脚本不存在: {script_path}")
        return False
    
    try:
        result = subprocess.run(
            [sys.executable, script_path],
            capture_output=True,
            text=True,
            timeout=120
        )
        
        if result.stdout:
            print(result.stdout)
        
        if result.stderr:
            print(f"⚠️  错误输出:\n{result.stderr}")
        
        return result.returncode == 0
        
    except subprocess.TimeoutExpired:
        print("❌ 脚本执行超时")
        return False
    except Exception as e:
        print(f"❌ 执行失败: {e}")
        return False

def check_git_status():
    """检查Git状态"""
    print("\n📊 检查Git状态...")
    try:
        result = subprocess.run(
            ['git', 'status', '--short'],
            capture_output=True,
            text=True
        )
        changes = result.stdout.strip()
        
        if changes:
            print("有更改的文件:")
            print(changes)
            return True
        else:
            print("没有需要提交的更改")
            return False
    except Exception as e:
        print(f"❌ Git检查失败: {e}")
        return False

def commit_and_push(message):
    """提交并推送"""
    print("\n💾 提交并推送代码...")
    
    try:
        # 添加所有更改
        subprocess.run(['git', 'add', '-A'], check=True)
        
        # 提交
        subprocess.run(
            ['git', 'commit', '-m', message],
            check=True,
            capture_output=True
        )
        
        # 推送
        result = subprocess.run(
            ['git', 'push', 'origin', 'main'],
            capture_output=True,
            text=True
        )
        
        if result.returncode == 0:
            print("✅ 推送成功")
            return True
        else:
            print(f"❌ 推送失败: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ 提交推送失败: {e}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("🤖 智能工具开发工作流（完整版）")
    print("=" * 60)
    print(f"开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    # 步骤1: 发现新工具
    print("\n📋 步骤1: 发现新工具")
    if not run_script('auto-discover-tools.py'):
        print("⚠️ 工具发现失败，继续执行...")
    
    # 步骤2: 生成新工具
    print("\n📋 步骤2: 生成新工具")
    if not run_script('auto-generate-tools.py'):
        print("⚠️ 工具生成失败，继续执行...")
    
    # 步骤3: 运行SEO和GA4更新
    print("\n📋 步骤3: 运行SEO和GA4更新")
    if os.path.exists('scripts/batch-seo-ga4.py'):
        run_script('batch-seo-ga4.py')
    else:
        print("⚠️ batch-seo-ga4.py不存在，跳过")
    
    # 步骤4: 运行追踪更新
    print("\n📋 步骤4: 运行追踪更新")
    if os.path.exists('scripts/batch-tracking.py'):
        run_script('batch-tracking.py')
    else:
        print("⚠️ batch-tracking.py不存在，跳过")
    
    # 步骤5: 检查Git状态
    print("\n📋 步骤5: 检查Git状态")
    has_changes = check_git_status()
    
    # 步骤6: 提交并推送
    if has_changes:
        print("\n📋 步骤6: 提交并推送")
        commit_and_push(f"feat: automated tool development - {datetime.now().strftime('%Y-%m-%d')}")
    else:
        print("\n⚠️ 没有更改需要提交")
    
    # 步骤7: 验证工具
    print("\n📋 步骤7: 验证新工具")
    if os.path.exists('scripts/auto-verify-tools.py'):
        run_script('auto-verify-tools.py')
    else:
        print("⚠️ auto-verify-tools.py不存在，跳过验证")
    
    # 完成
    print("\n" + "=" * 60)
    print("✅ 智能工具开发工作流完成！")
    print("=" * 60)
    print(f"结束时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    print("🌐 网站: https://zh8888.dpdns.org")
    print("📊 GitHub: https://github.com/sunnyswx/multi-tools")

if __name__ == '__main__':
    main()