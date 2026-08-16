# Python脚本 - 修复Python3命令问题
# 用法: python scripts/*.py

import subprocess
import sys

def run_python_script(script_path):
    """运行Python脚本"""
    try:
        result = subprocess.run([sys.executable, script_path], capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print(f"错误: {result.stderr}")
        return result.returncode == 0
    except Exception as e:
        print(f"运行脚本失败: {e}")
        return False

if __name__ == '__main__':
    scripts = [
        'scripts/batch-seo-ga4.py',
        'scripts/batch-tracking.py'
    ]
    
    success = True
    for script in scripts:
        print(f"\n📝 运行 {script}...")
        if not run_python_script(script):
            success = False
            print(f"❌ {script} 运行失败")
            break
        print(f"✅ {script} 运行成功")
    
    if success:
        print("\n🎉 所有脚本运行成功！")
    else:
        print("\n⚠️ 部分脚本运行失败")