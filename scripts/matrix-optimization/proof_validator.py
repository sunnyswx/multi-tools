#!/usr/bin/env python3
"""
证明验证器 - 验证任务完成证明
用法: python3 proof_validator.py <task_id>
"""

import sys
import json
import os
import subprocess
from datetime import datetime

class ProofValidator:
    def __init__(self, task_id):
        self.task_id = task_id
        self.proof_types = {
            "file": [],
            "test": [],
            "screenshot": [],
            "transcript": []
        }
        self.results = {}
    
    def load_proof_requirements(self):
        """加载证明要求"""
        proof_file = f"tasks/{self.task_id}/proof-requirements.yaml"
        if os.path.exists(proof_file):
            # 简化处理，实际应解析YAML
            with open(proof_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # 提取证明类型
                if "file" in content:
                    self.proof_types["file"].append("output.py")
                if "test" in content:
                    self.proof_types["test"].append("test_output.py")
                if "screenshot" in content:
                    self.proof_types["screenshot"].append("deployment.png")
                if "transcript" in content:
                    self.proof_types["transcript"].append("execution.log")
    
    def validate_file_proof(self):
        """验证文件证明"""
        print("📋 验证文件证明...")
        
        proofs_dir = f"tasks/{self.task_id}/evidence/files"
        if not os.path.exists(proofs_dir):
            print("   ⚠️ 文件证明目录不存在")
            return
        
        for proof_file in self.proof_types["file"]:
            file_path = os.path.join(proofs_dir, proof_file)
            if os.path.exists(file_path):
                # 检查文件大小
                file_size = os.path.getsize(file_path)
                if file_size > 0:
                    print(f"   ✅ 文件存在且非空: {proof_file} ({file_size} bytes)")
                    
                    # 根据文件类型验证
                    if proof_file.endswith('.py'):
                        try:
                            result = subprocess.run(
                                ['python3', '-m', 'py_compile', file_path],
                                capture_output=True,
                                text=True
                            )
                            if result.returncode == 0:
                                print(f"      ✅ Python语法检查通过")
                            else:
                                print(f"      ❌ Python语法错误: {result.stderr}")
                        except Exception as e:
                            print(f"      ⚠️ Python验证失败: {e}")
                    
                    elif proof_file.endswith('.js'):
                        try:
                            result = subprocess.run(
                                ['node', '-c', file_path],
                                capture_output=True,
                                text=True
                            )
                            if result.returncode == 0:
                                print(f"      ✅ JavaScript语法检查通过")
                            else:
                                print(f"      ❌ JavaScript语法错误: {result.stderr}")
                        except Exception as e:
                            print(f"      ⚠️ JavaScript验证失败: {e}")
                    
                    self.results[f"file_{proof_file}"] = True
                else:
                    print(f"   ❌ 文件为空: {proof_file}")
                    self.results[f"file_{proof_file}"] = False
            else:
                print(f"   ❌ 文件不存在: {proof_file}")
                self.results[f"file_{proof_file}"] = False
    
    def validate_test_proof(self):
        """验证测试证明"""
        print("📋 验证测试证明...")
        
        proofs_dir = f"tasks/{self.task_id}/evidence/tests"
        if not os.path.exists(proofs_dir):
            print("   ⚠️ 测试证明目录不存在")
            return
        
        # 检查测试结果文件
        results_file = os.path.join(proofs_dir, "results.json")
        if os.path.exists(results_file):
            with open(results_file, 'r', encoding='utf-8') as f:
                try:
                    results = json.load(f)
                    passed = results.get('passed', 0)
                    total = results.get('total', 0)
                    
                    if total > 0:
                        percentage = (passed / total) * 100
                        print(f"   ✅ 测试结果: {passed}/{total} 通过 ({percentage:.1f}%)")
                        
                        if percentage >= 80:
                            self.results["test_results"] = True
                        else:
                            print(f"   ⚠️ 测试通过率低于80%")
                            self.results["test_results"] = False
                    else:
                        print(f"   ⚠️ 无测试执行记录")
                        self.results["test_results"] = False
                except json.JSONDecodeError:
                    print(f"   ❌ 测试结果文件格式错误")
                    self.results["test_results"] = False
        else:
            print(f"   ⚠️ 测试结果文件不存在")
            self.results["test_results"] = False
    
    def validate_screenshot_proof(self):
        """验证截图证明"""
        print("📋 验证截图证明...")
        
        proofs_dir = f"tasks/{self.task_id}/evidence/screenshots"
        if not os.path.exists(proofs_dir):
            print("   ⚠️ 截图证明目录不存在")
            return
        
        screenshot_count = 0
        for root, dirs, files in os.walk(proofs_dir):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                    file_path = os.path.join(root, file)
                    file_size = os.path.getsize(file_path)
                    
                    if file_size > 10000:  # 至少10KB
                        screenshot_count += 1
                        print(f"   ✅ 截图存在且有效: {file} ({file_size} bytes)")
                        self.results[f"screenshot_{file}"] = True
                    else:
                        print(f"   ❌ 截图过小: {file} ({file_size} bytes)")
                        self.results[f"screenshot_{file}"] = False
        
        if screenshot_count == 0:
            print(f"   ⚠️ 未找到有效的截图证明")
    
    def validate_transcript_proof(self):
        """验证转录证明"""
        print("📋 验证转录证明...")
        
        proofs_dir = f"tasks/{self.task_id}/evidence/transcripts"
        if not os.path.exists(proofs_dir):
            print("   ⚠️ 转录证明目录不存在")
            return
        
        transcript_count = 0
        for root, dirs, files in os.walk(proofs_dir):
            for file in files:
                if file.endswith('.log') or file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if len(content) > 100:
                        transcript_count += 1
                        print(f"   ✅ 转录存在且完整: {file} ({len(content)} chars)")
                        
                        # 检查时间戳
                        import re
                        if re.search(r'\d{4}-\d{2}-\d{2}', content):
                            print(f"      ✅ 包含时间戳")
                        else:
                            print(f"      ⚠️ 缺少时间戳")
                        
                        self.results[f"transcript_{file}"] = True
                    else:
                        print(f"   ❌ 转录过短: {file} ({len(content)} chars)")
                        self.results[f"transcript_{file}"] = False
        
        if transcript_count == 0:
            print(f"   ⚠️ 未找到有效的转录证明")
    
    def run_validation(self):
        """运行完整验证"""
        print(f"🔍 开始验证任务: {self.task_id}")
        print()
        
        self.load_proof_requirements()
        self.validate_file_proof()
        self.validate_test_proof()
        self.validate_screenshot_proof()
        self.validate_transcript_proof()
        
        print()
        print("=" * 50)
        print("📊 验证结果:")
        print("=" * 50)
        
        total_checks = len(self.results)
        passed_checks = sum(1 for v in self.results.values() if v)
        
        for proof_type, passed in self.results.items():
            status = "✅" if passed else "❌"
            print(f"   {status} {proof_type}")
        
        print()
        print("=" * 50)
        print(f"🎯 总得分: {passed_checks}/{total_checks}")
        
        if total_checks == 0:
            print("⚠️ 未找到任何证明，请检查任务配置")
            return False
        elif passed_checks == total_checks:
            print("✅ 证明验证通过！所有证明有效。")
            return True
        elif passed_checks >= total_checks * 0.7:
            print("⚠️ 证明验证基本通过，但建议完善以下证明:")
            for proof_type, passed in self.results.items():
                if not passed:
                    print(f"   - {proof_type}")
            return True
        else:
            print("❌ 证明验证未通过，请完善以下证明:")
            for proof_type, passed in self.results.items():
                if not passed:
                    print(f"   - {proof_type}")
            return False

def main():
    if len(sys.argv) < 2:
        print("用法: python3 proof_validator.py <task_id>")
        print("示例: python3 proof_validator.py task-001")
        sys.exit(1)
    
    task_id = sys.argv[1]
    validator = ProofValidator(task_id)
    
    success = validator.run_validation()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()