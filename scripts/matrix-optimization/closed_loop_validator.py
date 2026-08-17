#!/usr/bin/env python3
"""
闭环验证器 - 验证任务是否形成完整闭环
用法: python3 closed_loop_validator.py <task_id>
"""

import sys
import json
import os
from datetime import datetime

class ClosedLoopValidator:
    def __init__(self, task_id):
        self.task_id = task_id
        self.checklist = self.load_checklist()
        self.results = {}
    
    def load_checklist(self):
        """加载闭环检查清单"""
        return {
            "目标阶段": {
                "目标明确": False,
                "目标可衡量": False,
                "目标有约束": False
            },
            "计划阶段": {
                "计划完整": False,
                "计划可行": False
            },
            "派遣Worker阶段": {
                "Worker合适": False,
                "任务清晰": False,
                "证据明确": False
            },
            "收集证据阶段": {
                "证据完整": False,
                "证据有效": False
            },
            "综合阶段": {
                "综合全面": False,
                "综合清晰": False
            },
            "请求决策阶段": {
                "决策点明确": False,
                "决策支持充分": False
            }
        }
    
    def validate_goal(self):
        """验证目标阶段"""
        print("📋 验证目标阶段...")
        
        # 检查目标文件
        goal_file = f"tasks/{self.task_id}/goal.md"
        if os.path.exists(goal_file):
            with open(goal_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查目标是否明确（不超过3句话）
            sentences = content.split('.')
            if len(sentences) <= 3:
                self.checklist["目标阶段"]["目标明确"] = True
                print("   ✅ 目标明确")
            else:
                print("   ⚠️ 目标描述过长，建议精简到3句话以内")
            
            # 检查目标是否可衡量
            if any(keyword in content.lower() for keyword in ["测量", "标准", "完成", "通过", "测试"]):
                self.checklist["目标阶段"]["目标可衡量"] = True
                print("   ✅ 目标可衡量")
            else:
                print("   ⚠️ 目标缺少可衡量的标准")
            
            # 检查目标是否有约束
            if any(keyword in content.lower() for keyword in ["时间", "资源", "质量", "约束", "限制"]):
                self.checklist["目标阶段"]["目标有约束"] = True
                print("   ✅ 目标有约束")
            else:
                print("   ⚠️ 目标缺少约束条件")
        else:
            print("   ❌ 目标文件不存在")
    
    def validate_plan(self):
        """验证计划阶段"""
        print("📋 验证计划阶段...")
        
        plan_file = f"tasks/{self.task_id}/plan.md"
        if os.path.exists(plan_file):
            with open(plan_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # 检查任务是否分解
            if content.count("##") >= 2 or content.count("-") >= 3:
                self.checklist["计划阶段"]["计划完整"] = True
                print("   ✅ 任务已分解为子任务")
            else:
                print("   ⚠️ 建议将任务分解为更小的子任务")
            
            # 检查资源是否充足
            if any(keyword in content.lower() for keyword in ["资源", "工具", "数据", "依赖"]):
                self.checklist["计划阶段"]["计划可行"] = True
                print("   ✅ 资源已考虑")
            else:
                print("   ⚠️ 建议检查资源是否充足")
        else:
            print("   ⚠️ 计划文件不存在")
    
    def validate_dispatch(self):
        """验证派遣Worker阶段"""
        print("📋 验证派遣Worker阶段...")
        
        # 检查Worker配置
        worker_file = f"tasks/{self.task_id}/worker.yaml"
        if os.path.exists(worker_file):
            self.checklist["派遣Worker阶段"]["Worker合适"] = True
            print("   ✅ Worker已配置")
        else:
            print("   ⚠️ Worker配置不存在")
        
        # 检查任务描述
        task_file = f"tasks/{self.task_id}/task.md"
        if os.path.exists(task_file):
            with open(task_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content.split('.')) <= 3:
                self.checklist["派遣Worker阶段"]["任务清晰"] = True
                print("   ✅ 任务描述清晰")
            else:
                print("   ⚠️ 任务描述过长，建议精简")
        else:
            print("   ⚠️ 任务文件不存在")
    
    def validate_evidence(self):
        """验证收集证据阶段"""
        print("📋 验证收集证据阶段...")
        
        evidence_dir = f"tasks/{self.task_id}/evidence"
        if os.path.exists(evidence_dir):
            evidence_files = os.listdir(evidence_dir)
            if len(evidence_files) > 0:
                self.checklist["收集证据阶段"]["证据完整"] = True
                print(f"   ✅ 已收集 {len(evidence_files)} 个证据文件")
            else:
                print("   ⚠️ 证据目录为空")
        else:
            print("   ⚠️ 证据目录不存在")
    
    def validate_synthesis(self):
        """验证综合阶段"""
        print("📋 验证综合阶段...")
        
        synthesis_file = f"tasks/{self.task_id}/synthesis.md"
        if os.path.exists(synthesis_file):
            with open(synthesis_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if len(content) > 100:
                self.checklist["综合阶段"]["综合全面"] = True
                print("   ✅ 综合报告完整")
            else:
                print("   ⚠️ 综合报告过短，建议补充详细内容")
        else:
            print("   ⚠️ 综合报告不存在")
    
    def validate_decision(self):
        """验证请求决策阶段"""
        print("📋 验证请求决策阶段...")
        
        decision_file = f"tasks/{self.task_id}/decision.md"
        if os.path.exists(decision_file):
            with open(decision_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            if "决策" in content or "选项" in content:
                self.checklist["请求决策阶段"]["决策点明确"] = True
                print("   ✅ 决策点已明确")
            
            if "推荐" in content or "建议" in content:
                self.checklist["请求决策阶段"]["决策支持充分"] = True
                print("   ✅ 决策支持充分")
        else:
            print("   ⚠️ 决策文件不存在")
    
    def run_validation(self):
        """运行完整验证"""
        print(f"🔍 开始验证任务: {self.task_id}")
        print()
        
        self.validate_goal()
        self.validate_plan()
        self.validate_dispatch()
        self.validate_evidence()
        self.validate_synthesis()
        self.validate_decision()
        
        print()
        print("=" * 50)
        print("📊 验证结果:")
        print("=" * 50)
        
        total_checks = 0
        passed_checks = 0
        
        for phase, checks in self.checklist.items():
            phase_passed = 0
            phase_total = 0
            print(f"\n{phase}:")
            for check, passed in checks.items():
                phase_total += 1
                total_checks += 1
                if passed:
                    passed_checks += 1
                    phase_passed += 1
                    print(f"   ✅ {check}")
                else:
                    print(f"   ⚠️ {check}")
            
            if phase_total > 0:
                print(f"   阶段得分: {phase_passed}/{phase_total}")
        
        print()
        print("=" * 50)
        print(f"🎯 总得分: {passed_checks}/{total_checks}")
        
        if passed_checks == total_checks:
            print("✅ 闭环验证通过！任务已完成闭环。")
            return True
        elif passed_checks >= total_checks * 0.7:
            print("⚠️ 闭环验证基本通过，但建议完善以下内容:")
            for phase, checks in self.checklist.items():
                for check, passed in checks.items():
                    if not passed:
                        print(f"   - {phase}: {check}")
            return True
        else:
            print("❌ 闭环验证未通过，请完善以下内容:")
            for phase, checks in self.checklist.items():
                for check, passed in checks.items():
                    if not passed:
                        print(f"   - {phase}: {check}")
            return False

def main():
    if len(sys.argv) < 2:
        print("用法: python3 closed_loop_validator.py <task_id>")
        print("示例: python3 closed_loop_validator.py task-001")
        sys.exit(1)
    
    task_id = sys.argv[1]
    validator = ClosedLoopValidator(task_id)
    
    success = validator.run_validation()
    
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()