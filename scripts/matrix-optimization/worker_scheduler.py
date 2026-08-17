#!/usr/bin/env python3
"""
Worker调度器 - 根据任务类型自动选择Worker
用法: python3 worker_scheduler.py <task_type> <task_description>
"""

import sys
import json
import os
from datetime import datetime

# Worker类型定义
WORKER_TYPES = {
    "execution": {
        "name": "执行型Worker",
        "description": "执行具体的技术任务",
        "templates": ["worker-execution.yaml"],
        "examples": ["代码开发", "测试验证", "文档编写", "部署验证"]
    },
    "research": {
        "name": "研究型Worker",
        "description": "收集和分析信息",
        "templates": ["worker-research.yaml"],
        "examples": ["市场调研", "竞品分析", "技术调研", "数据收集"]
    },
    "creation": {
        "name": "创作型Worker",
        "description": "生成创意内容",
        "templates": ["worker-creation.yaml"],
        "examples": ["文案创作", "设计辅助", "视频制作", "音乐生成"]
    },
    "coordination": {
        "name": "协调型Worker",
        "description": "管理跨部门协作",
        "templates": ["worker-coordination.yaml"],
        "examples": ["交接协调", "进度跟踪", "质量审核", "风险预警"]
    }
}

def select_worker(task_type, task_description):
    """根据任务类型和描述选择Worker"""
    
    # 如果没有指定任务类型，根据描述自动判断
    if task_type == "auto":
        task_type = infer_task_type(task_description)
    
    # 验证任务类型
    if task_type not in WORKER_TYPES:
        print(f"❌ 不支持的任务类型: {task_type}")
        print(f"支持的任务类型: {', '.join(WORKER_TYPES.keys())}")
        return None
    
    # 创建Worker配置
    worker_config = {
        "type": task_type,
        "name": f"{task_type}-worker-{datetime.now().strftime('%Y%m%d-%H%M%S')}",
        "description": task_description,
        "created_at": datetime.now().isoformat(),
        "status": "pending",
        "config": WORKER_TYPES[task_type]
    }
    
    return worker_config

def infer_task_type(description):
    """根据任务描述推断任务类型"""
    
    keywords = {
        "execution": ["代码", "开发", "测试", "验证", "部署", "编写", "实现"],
        "research": ["调研", "分析", "收集", "研究", "市场", "竞品", "数据"],
        "creation": ["创作", "设计", "文案", "视频", "音乐", "生成", "创作"],
        "coordination": ["协调", "跟踪", "审核", "预警", "交接", "管理"]
    }
    
    for task_type, words in keywords.items():
        for word in words:
            if word in description:
                return task_type
    
    # 默认返回execution
    return "execution"

def create_worker_workspace(worker_config, base_dir):
    """创建Worker工作空间"""
    
    worker_id = worker_config["name"]
    workspace_dir = os.path.join(base_dir, worker_id)
    
    # 创建目录结构
    dirs = [
        "inputs",
        "outputs",
        "evidence",
        "transcripts",
        "temp"
    ]
    
    for dir_name in dirs:
        os.makedirs(os.path.join(workspace_dir, dir_name), exist_ok=True)
    
    # 创建元数据文件
    metadata = {
        "worker_id": worker_id,
        "worker_type": worker_config["type"],
        "description": worker_config["description"],
        "created_at": worker_config["created_at"],
        "status": worker_config["status"],
        "workspace_dir": workspace_dir
    }
    
    metadata_path = os.path.join(workspace_dir, "metadata.json")
    with open(metadata_path, 'w', encoding='utf-8') as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)
    
    return workspace_dir

def main():
    if len(sys.argv) < 3:
        print("用法: python3 worker_scheduler.py <task_type> <task_description>")
        print("任务类型: execution, research, creation, coordination, auto")
        print("示例: python3 worker_scheduler.py execution '开发一个图片压缩工具'")
        sys.exit(1)
    
    task_type = sys.argv[1]
    task_description = sys.argv[2]
    base_dir = sys.argv[3] if len(sys.argv) > 3 else "."
    
    print(f"🔧  Worker调度器")
    print(f"📝  任务类型: {task_type}")
    print(f"📄  任务描述: {task_description}")
    print(f"📁  工作空间: {base_dir}")
    print()
    
    # 选择Worker
    worker_config = select_worker(task_type, task_description)
    if not worker_config:
        sys.exit(1)
    
    print(f"✅ Worker选择成功")
    print(f"   Worker ID: {worker_config['name']}")
    print(f"   Worker类型: {worker_config['type']}")
    print(f"   Worker名称: {worker_config['config']['name']}")
    print()
    
    # 创建工作空间
    workspace_dir = create_worker_workspace(worker_config, base_dir)
    print(f"✅ 工作空间已创建")
    print(f"   路径: {workspace_dir}")
    print()
    
    # 输出Worker配置
    print(f"📋 Worker配置:")
    print(json.dumps(worker_config, indent=2, ensure_ascii=False))
    print()
    
    print(f"🎯 下一步:")
    print(f"   1. 将任务输入放入 {workspace_dir}/inputs/")
    print(f"   2. 运行Worker执行任务")
    print(f"   3. 收集证据到 {workspace_dir}/evidence/")
    print(f"   4. 记录转录到 {workspace_dir}/transcripts/")
    print(f"   5. 验证输出到 {workspace_dir}/outputs/")

if __name__ == "__main__":
    main()