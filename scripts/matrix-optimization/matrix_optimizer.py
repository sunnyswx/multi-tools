#!/usr/bin/env python3
"""
Matrix优化系统 - 主入口
用法: python3 matrix_optimizer.py <command> [args]
"""

import sys
import os
import subprocess
from datetime import datetime

def print_banner():
    """打印横幅"""
    print("=" * 60)
    print("🚀 Matrix优化系统 v1.0")
    print("=" * 60)
    print()

def print_help():
    """打印帮助信息"""
    print("可用命令:")
    print()
    print("  worker <type> <description> [base_dir]")
    print("      创建并调度Worker")
    print("      示例: python3 matrix_optimizer.py worker execution '开发图片压缩工具'")
    print()
    print("  closed-loop <task_id>")
    print("      验证任务闭环")
    print("      示例: python3 matrix_optimizer.py closed-loop task-001")
    print()
    print("  proof <task_id>")
    print("      验证任务完成证明")
    print("      示例: python3 matrix_optimizer.py proof task-001")
    print()
    print("  handoff <task_id>")
    print("      验证交接文档")
    print("      示例: python3 matrix_optimizer.py handoff task-001")
    print()
    print("  validate <task_id>")
    print("      验证任务全流程（闭环+证明+交接）")
    print("      示例: python3 matrix_optimizer.py validate task-001")
    print()
    print("  help")
    print("      显示此帮助信息")
    print()

def cmd_worker(args):
    """处理worker命令"""
    if len(args) < 2:
        print("❌ 参数不足")
        print("用法: python3 matrix_optimizer.py worker <type> <description> [base_dir]")
        return 1
    
    task_type = args[0]
    task_description = args[1]
    base_dir = args[2] if len(args) > 2 else "."
    
    # 调用worker_scheduler.py
    script_path = os.path.join(os.path.dirname(__file__), "worker_scheduler.py")
    result = subprocess.run(
        [sys.executable, script_path, task_type, task_description, base_dir],
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print("❌ 错误:", result.stderr)
    
    return result.returncode

def cmd_closed_loop(args):
    """处理closed-loop命令"""
    if len(args) < 1:
        print("❌ 参数不足")
        print("用法: python3 matrix_optimizer.py closed-loop <task_id>")
        return 1
    
    task_id = args[0]
    
    # 调用closed_loop_validator.py
    script_path = os.path.join(os.path.dirname(__file__), "closed_loop_validator.py")
    result = subprocess.run(
        [sys.executable, script_path, task_id],
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print("❌ 错误:", result.stderr)
    
    return result.returncode

def cmd_proof(args):
    """处理proof命令"""
    if len(args) < 1:
        print("❌ 参数不足")
        print("用法: python3 matrix_optimizer.py proof <task_id>")
        return 1
    
    task_id = args[0]
    
    # 调用proof_validator.py
    script_path = os.path.join(os.path.dirname(__file__), "proof_validator.py")
    result = subprocess.run(
        [sys.executable, script_path, task_id],
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print("❌ 错误:", result.stderr)
    
    return result.returncode

def cmd_handoff(args):
    """处理handoff命令"""
    if len(args) < 1:
        print("❌ 参数不足")
        print("用法: python3 matrix_optimizer.py handoff <task_id>")
        return 1
    
    task_id = args[0]
    
    # 调用handoff_validator.py
    script_path = os.path.join(os.path.dirname(__file__), "handoff_validator.py")
    result = subprocess.run(
        [sys.executable, script_path, task_id],
        capture_output=True,
        text=True
    )
    
    print(result.stdout)
    if result.stderr:
        print("❌ 错误:", result.stderr)
    
    return result.returncode

def cmd_validate(args):
    """处理validate命令"""
    if len(args) < 1:
        print("❌ 参数不足")
        print("用法: python3 matrix_optimizer.py validate <task_id>")
        return 1
    
    task_id = args[0]
    
    print(f"🔍 开始验证任务: {task_id}")
    print()
    
    # 验证闭环
    print("=" * 60)
    print("📋 阶段1: 验证闭环")
    print("=" * 60)
    loop_result = subprocess.run(
        [sys.executable, os.path.join(os.path.dirname(__file__), "closed_loop_validator.py"), task_id],
        capture_output=True,
        text=True
    )
    print(loop_result.stdout)
    
    # 验证证明
    print("=" * 60)
    print("📋 阶段2: 验证证明")
    print("=" * 60)
    proof_result = subprocess.run(
        [sys.executable, os.path.join(os.path.dirname(__file__), "proof_validator.py"), task_id],
        capture_output=True,
        text=True
    )
    print(proof_result.stdout)
    
    # 验证交接
    print("=" * 60)
    print("📋 阶段3: 验证交接")
    print("=" * 60)
    handoff_result = subprocess.run(
        [sys.executable, os.path.join(os.path.dirname(__file__), "handoff_validator.py"), task_id],
        capture_output=True,
        text=True
    )
    print(handoff_result.stdout)
    
    # 汇总结果
    print("=" * 60)
    print("📊 验证汇总")
    print("=" * 60)
    
    loop_success = loop_result.returncode == 0
    proof_success = proof_result.returncode == 0
    handoff_success = handoff_result.returncode == 0
    
    if loop_success and proof_success and handoff_success:
        print("✅ 全部验证通过！任务已完成Matrix优化标准。")
        return 0
    else:
        print("⚠️ 部分验证未通过:")
        if not loop_success:
            print("   - 闭环验证未通过")
        if not proof_success:
            print("   - 证明验证未通过")
        if not handoff_success:
            print("   - 交接验证未通过")
        return 1

def main():
    if len(sys.argv) < 2:
        print_banner()
        print_help()
        sys.exit(1)
    
    command = sys.argv[1]
    args = sys.argv[2:]
    
    print_banner()
    
    if command == "help":
        print_help()
    elif command == "worker":
        sys.exit(cmd_worker(args))
    elif command == "closed-loop":
        sys.exit(cmd_closed_loop(args))
    elif command == "proof":
        sys.exit(cmd_proof(args))
    elif command == "handoff":
        sys.exit(cmd_handoff(args))
    elif command == "validate":
        sys.exit(cmd_validate(args))
    else:
        print(f"❌ 未知命令: {command}")
        print()
        print_help()
        sys.exit(1)

if __name__ == "__main__":
    main()