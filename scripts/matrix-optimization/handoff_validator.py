#!/usr/bin/env python3
"""
交接验证器 - 验证交接文档完整性
用法: python3 handoff_validator.py <task_id>
"""

import sys
import json
import os
from datetime import datetime

class HandoffValidator:
    def __init__(self, task_id):
        self.task_id = task_id
        self.checklist = {
            "上下文": ["摘要清晰", "已完成工作", "待完成工作"],
            "工件": ["文件存在", "格式正确", "内容完整"],
            "需求": ["具体明确", "截止时间", "优先级清晰"],
            "证明": ["类型明确", "标准可验证", "收集方法可行"],
            "约束": ["条件完整", "条件合理", "条件可执行"],
            "风险": ["风险识别", "缓解措施", "风险可接受"]
        }
        self.results = {}
    
    def validate_context(self):
        """验证上下文"""
        print("📋 验证上下文...")
        
        handoff_file = f"tasks/{self.task_id}/handoff.md"
        if not os.path.exists(handoff_file):
            print("   ❌ 交接文档不存在")
            return
        
        with open(handoff_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查摘要
        if "摘要" in content or "summary" in content.lower():
            self.checklist["上下文"][0] = "摘要清晰"
            print("   ✅ 摘要清晰")
        else:
            print("   ⚠️ 缺少摘要部分")
        
        # 检查已完成工作
        if "已完成" in content or "completed" in content.lower():
            self.checklist["上下文"][1] = "已完成工作"
            print("   ✅ 已完成工作已记录")
        else:
            print("   ⚠️ 缺少已完成工作记录")
        
        # 检查待完成工作
        if "待完成" in content or "pending" in content.lower():
            self.checklist["上下文"][2] = "待完成工作"
            print("   ✅ 待完成工作已记录")
        else:
            print("   ⚠️ 缺少待完成工作记录")
    
    def validate_artifacts(self):
        """验证工件"""
        print("📋 验证工件...")
        
        handoff_file = f"tasks/{self.task_id}/handoff.md"
        if not os.path.exists(handoff_file):
            return
        
        with open(handoff_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查工件引用
        import re
        artifact_refs = re.findall(r'\[.*?\]\(.*?\)', content)
        
        if len(artifact_refs) > 0:
            self.checklist["工件"][0] = "文件存在"
            print(f"   ✅ 工件引用: {len(artifact_refs)} 个")
            
            # 验证工件文件是否存在
            for ref in artifact_refs[:5]:  # 只验证前5个
                match = re.search(r'\(.*?\)', ref)
                if match:
                    file_path = match.group(0)[1:-1]
                    if os.path.exists(file_path):
                        print(f"      ✅ {file_path}")
                    else:
                        print(f"      ❌ {file_path} 不存在")
                        self.results[f"artifact_{file_path}"] = False
        else:
            print("   ⚠️ 未找到工件引用")
    
    def validate_requirements(self):
        """验证需求"""
        print("📋 验证需求...")
        
        handoff_file = f"tasks/{self.task_id}/handoff.md"
        if not os.path.exists(handoff_file):
            return
        
        with open(handoff_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查具体需求
        if "需求" in content or "requirement" in content.lower():
            self.checklist["需求"][0] = "具体明确"
            print("   ✅ 需求具体明确")
        else:
            print("   ⚠️ 缺少具体需求描述")
        
        # 检查截止时间
        if "截止" in content or "deadline" in content.lower() or "时间" in content:
            self.checklist["需求"][1] = "截止时间"
            print("   ✅ 截止时间已指定")
        else:
            print("   ⚠️ 缺少截止时间")
        
        # 检查优先级
        if "优先级" in content or "priority" in content.lower():
            self.checklist["需求"][2] = "优先级清晰"
            print("   ✅ 优先级已指定")
        else:
            print("   ⚠️ 缺少优先级说明")
    
    def validate_proof(self):
        """验证证明"""
        print("📋 验证证明...")
        
        handoff_file = f"tasks/{self.task_id}/handoff.md"
        if not os.path.exists(handoff_file):
            return
        
        with open(handoff_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查证明类型
        if "证明" in content or "proof" in content.lower():
            self.checklist["证明"][0] = "类型明确"
            print("   ✅ 证明类型已明确")
        else:
            print("   ⚠️ 缺少证明类型说明")
        
        # 检查验证标准
        if "验证" in content or "validate" in content.lower():
            self.checklist["证明"][1] = "标准可验证"
            print("   ✅ 验证标准已明确")
        else:
            print("   ⚠️ 缺少验证标准")
        
        # 检查收集方法
        if "收集" in content or "collect" in content.lower():
            self.checklist["证明"][2] = "收集方法可行"
            print("   ✅ 证明收集方法已明确")
        else:
            print("   ⚠️ 缺少证明收集方法")
    
    def validate_constraints(self):
        """验证约束"""
        print("📋 验证约束...")
        
        handoff_file = f"tasks/{self.task_id}/handoff.md"
        if not os.path.exists(handoff_file):
            return
        
        with open(handoff_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查约束条件
        if "约束" in content or "constraint" in content.lower():
            self.checklist["约束"][0] = "条件完整"
            print("   ✅ 约束条件已列出")
        else:
            print("   ⚠️ 缺少约束条件")
        
        # 检查约束合理性
        if "环境" in content or "依赖" in content.lower() or "要求" in content.lower():
            self.checklist["约束"][1] = "条件合理"
            print("   ✅ 约束条件合理")
        else:
            print("   ⚠️ 建议检查约束条件是否合理")
        
        # 检查约束可执行性
        if "如何" in content or "步骤" in content.lower() or "方法" in content.lower():
            self.checklist["约束"][2] = "条件可执行"
            print("   ✅ 约束条件可执行")
        else:
            print("   ⚠️ 建议提供具体的执行方法")
    
    def validate_risks(self):
        """验证风险"""
        print("📋 验证风险...")
        
        handoff_file = f"tasks/{self.task_id}/handoff.md"
        if not os.path.exists(handoff_file):
            return
        
        with open(handoff_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 检查风险识别
        if "风险" in content or "risk" in content.lower():
            self.checklist["风险"][0] = "风险识别"
            print("   ✅ 风险已识别")
        else:
            print("   ⚠️ 建议识别潜在风险")
        
        # 检查缓解措施
        if "缓解" in content or "mitigation" in content.lower() or "应对" in content.lower():
            self.checklist["风险"][1] = "缓解措施"
            print("   ✅ 缓解措施已制定")
        else:
            print("   ⚠️ 建议制定风险缓解措施")
        
        # 检查风险可接受性
        if "可接受" in content or "acceptable" in content.lower():
            self.checklist["风险"][2] = "风险可接受"
            print("   ✅ 风险已评估为可接受")
        else:
            print("   ⚠️ 建议评估风险是否可接受")
    
    def run_validation(self):
        """运行完整验证"""
        print(f"🔍 开始验证交接文档: {self.task_id}")
        print()
        
        self.validate_context()
        self.validate_artifacts()
        self.validate_requirements()
        self.validate_proof()
        self.validate_constraints()
        self.validate_risks()
        
        print()
        print("=" * 50)
        print("📊 验证结果:")
        print("=" * 50)
        
        total_checks = 0
        passed_checks = 0
        
        for category, checks in self.checklist.items():
            category_passed = 0
            category_total = len(checks)
            print(f"\n{category}:")
            for check in checks:
                total_checks += 1
                if "✅" in check or check.startswith("✅"):
                    passed_checks += 1
                    category_passed += 1
                    print(f"   ✅ {check}")
                else:
                    print(f"   ⚠️ {check}")
            
            if category_total > 0:
                print(f"   类别得分: {category_passed}/{category_total}")
        
        print()
        print("=" * 50)
        print(f"🎯 总得分: {passed_checks}/{total_checks}")
        
        if passed_checks == total_checks:
            print("✅ 交接验证通过！交接文档完整。")
            return True
        elif passed_checks >= total_checks * 0.7:
            print("⚠️ 交接验证基本通过，但建议完善以下内容:")
            for category, checks in self.checklist.items():
                for check in checks:
                    if "⚠️" in check:
                        print(f"   - {category}: {check}")
            return True
        else:
            print("❌ 交接验证未通过，请完善交接文档:")
            for category, checks in self.checklist.items():
                for check in checks:
                    if "⚠️" in check or "❌" in check:
                        print(f"   - {category}: {check}")
            return False

def main():
    if len(sys.argv) < 2:
        print("用法: python3 handoff_validator.py <task_id>")
        print("示例: python3 handoff_validator.py task-001")
        sys.exit(1)
    
    task_id = sys.argv[1]
    validator = HandoffValidator(task_id)
    
    success = validator.run_validation()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()