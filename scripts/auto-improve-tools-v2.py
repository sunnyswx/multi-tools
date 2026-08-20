#!/usr/bin/env python3
"""
自动完善工具脚本 - 带微信报告
"""

import os
import subprocess
import sys
from datetime import datetime

# 配置
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOG_FILE = os.path.join(PROJECT_DIR, 'logs', 'auto-improve.log')

def log(message, level="INFO"):
    """记录日志"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] [{level}] {message}"
    print(log_message)
    
    # 写入日志文件
    os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_message + "\n")

def send_weixin_report(title, content):
    """发送微信报告"""
    try:
        from send_weixin_report import send_weixin_report_simple
        send_weixin_report_simple(title, content)
    except Exception as e:
        log(f"发送微信报告失败: {e}", "WARNING")

def get_current_phase():
    """获取当前完善阶段"""
    phase_file = os.path.join(PROJECT_DIR, 'scripts', '.current_phase')
    if os.path.exists(phase_file):
        with open(phase_file, 'r') as f:
            return int(f.read().strip())
    return 1

def improve_tools():
    """完善工具"""
    phase = get_current_phase()
    
    # 定义各阶段工具
    phases = {
        1: ['url-encoder.html', 'word-counter.html', 'color-picker.html', 'json-validator.html'],
        2: ['password-generator.html', 'random-generator.html', 'unit-converter.html', 'countdown-timer.html'],
        3: ['regex-tester.html', 'cron-generator.html', 'qr-generator.html', 'csv-to-json.html'],
        4: ['pdf-converter.html', 'image-resizer.html', 'text-compressor.html', 'xml-formatter.html', 'timezone-converter.html', 'online-calculator.html'],
    }
    
    tools = phases.get(phase, [])
    
    if not tools:
        return 0, "所有工具已完善完成"
    
    completed = 0
    for tool in tools:
        tool_path = os.path.join(PROJECT_DIR, 'tools', tool)
        if os.path.exists(tool_path):
            with open(tool_path, 'r', encoding='utf-8') as f:
                content = f.read()
            if '功能开发中' not in content and len(content) > 2000:
                completed += 1
    
    if completed == len(tools):
        next_phase = phase + 1
        if next_phase in phases:
            # 保存下一阶段
            phase_file = os.path.join(PROJECT_DIR, 'scripts', '.current_phase')
            with open(phase_file, 'w') as f:
                f.write(str(next_phase))
            return next_phase, f"阶段{phase}完成，进入阶段{next_phase}"
        else:
            return 0, "所有工具已完善完成！"
    else:
        return phase, f"阶段{phase}: {completed}/{len(tools)}个工具已完成"

def auto_commit_and_push():
    """自动提交和推送"""
    try:
        subprocess.run(['git', 'add', '-A'], check=True, cwd=PROJECT_DIR)
        subprocess.run(['git', 'commit', '-m', f'auto: improve tools - {datetime.now().strftime("%Y-%m-%d %H:%M")}'], check=True, cwd=PROJECT_DIR)
        result = subprocess.run(['git', 'push', 'origin', 'main'], capture_output=True, text=True, cwd=PROJECT_DIR)
        if result.returncode == 0:
            return True, "推送成功"
        else:
            return False, f"推送失败: {result.stderr}"
    except subprocess.CalledProcessError as e:
        return False, f"提交失败: {e}"

def main():
    """主函数"""
    log("=" * 70)
    log("开始自动完善工具")
    log("=" * 70)
    log()
    
    try:
        # 完善工具
        phase, message = improve_tools()
        log(message)
        
        # 自动提交推送
        success, push_message = auto_commit_and_push()
        if success:
            log(push_message)
        else:
            log(push_message, "WARNING")
        
        # 发送微信报告
        title = f"工具完善任务 - 阶段{phase}"
        content = f"{message}\n{push_message}"
        send_weixin_report(title, content)
        
        log()
        log("=" * 70)
        log(f"完成！当前阶段: {phase}")
        log("=" * 70)
        
        return 0
        
    except Exception as e:
        log(f"执行失败: {e}", "ERROR")
        
        # 发送错误报告
        send_weixin_report("工具完善失败", f"错误: {e}")
        
        return 1

if __name__ == '__main__':
    sys.exit(main())