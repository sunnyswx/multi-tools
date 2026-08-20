#!/usr/bin/env python3
"""
自动完善工具脚本
每天自动执行，完善下一阶段的工具
"""

import os
import subprocess
from datetime import datetime

def get_current_phase():
    """获取当前完善阶段"""
    phase_file = 'scripts/.current_phase'
    if os.path.exists(phase_file):
        with open(phase_file, 'r') as f:
            return int(f.read().strip())
    return 1

def save_phase(phase):
    """保存当前阶段"""
    os.makedirs('scripts', exist_ok=True)
    with open('scripts/.current_phase', 'w') as f:
        f.write(str(phase))

def get_tools_for_phase(phase):
    """获取当前阶段需要完善的工具"""
    phases = {
        1: ['url-encoder.html', 'word-counter.html', 'color-picker.html', 'json-validator.html'],  # 已完成
        2: ['password-generator.html', 'random-generator.html', 'unit-converter.html', 'countdown-timer.html'],
        3: ['regex-tester.html', 'cron-generator.html', 'qr-generator.html', 'csv-to-json.html'],
        4: ['pdf-converter.html', 'image-resizer.html', 'text-compressor.html', 'xml-formatter.html', 'timezone-converter.html', 'online-calculator.html'],
    }
    return phases.get(phase, [])

def check_tool_completed(tool_file):
    """检查工具是否已完成"""
    if not os.path.exists(f'tools/{tool_file}'):
        return False
    with open(f'tools/{tool_file}', 'r', encoding='utf-8') as f:
        content = f.read()
    # 检查是否有实际功能代码（不只是占位符）
    return '功能开发中' not in content and len(content) > 2000

def improve_tools():
    """完善工具"""
    phase = get_current_phase()
    tools = get_tools_for_phase(phase)
    
    print("=" * 70)
    print(f"🤖 自动完善工具 - 阶段 {phase}")
    print("=" * 70)
    print()
    
    completed = 0
    for tool in tools:
        if check_tool_completed(tool):
            print(f"✅ {tool} 已完成")
            completed += 1
        else:
            print(f"⚠️ {tool} 需要完善")
    
    # 如果当前阶段全部完成，进入下一阶段
    if completed == len(tools) and len(tools) > 0:
        next_phase = phase + 1
        if next_phase in get_tools_for_phase:
            save_phase(next_phase)
            print()
            print(f"🎉 阶段{phase}完成！进入阶段{next_phase}")
            return next_phase
    elif completed == len(tools) and len(tools) > 0:
        print()
        print("🎉 所有工具已完善完成！")
        return 0
    
    return phase

def auto_commit_and_push():
    """自动提交和推送"""
    try:
        subprocess.run(['git', 'add', '-A'], check=True, cwd='.')
        subprocess.run(['git', 'commit', '-m', f'auto: improve tools - {datetime.now().strftime("%Y-%m-%d %H:%M")}'], check=True, cwd='.')
        subprocess.run(['git', 'push', 'origin', 'main'], check=True, cwd='.')
        print("✅ 已自动提交并推送")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ 提交失败: {e}")
        return False

def main():
    """主函数"""
    print(f"\n🕐 执行时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    # 完善工具
    current_phase = improve_tools()
    
    # 自动提交推送
    if current_phase > 0:
        auto_commit_and_push()
    
    print()
    print("=" * 70)
    print(f"✅ 完成！当前阶段: {current_phase}")
    print("=" * 70)

if __name__ == '__main__':
    main()