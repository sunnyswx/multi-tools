#!/bin/bash
# 工具追踪添加 - 独立任务
# 用法: 单独运行此任务添加工具追踪

echo "🚀 开始添加工具追踪..."
echo "时间: $(date)"
echo ""

cd ~/Documents/functional-website/multi-tools

# 运行Python脚本添加追踪
echo "📝 步骤1: 添加工具追踪..."
python scripts/add-tool-tracking.py
if [ $? -ne 0 ]; then
    echo "❌ 追踪添加失败"
    exit 1
fi
echo ""

echo "✅ 工具追踪添加完成！"