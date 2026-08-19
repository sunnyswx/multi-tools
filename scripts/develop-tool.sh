#!/bin/bash
# 新工具开发工作流（Linux/Mac版）
# 用法: ./develop-tool.sh [工具名]

echo "🚀 开始新工具开发工作流..."
echo "时间: $(date)"
echo ""

cd ~/Documents/functional-website/multi-tools

# 0. 检测WARP状态（如果存在）
if [ -f "scripts/check-warp.sh" ]; then
    echo "📝 步骤0: 检测WARP状态..."
    bash scripts/check-warp.sh
    if [ $? -ne 0 ]; then
        echo "❌ WARP检测失败，停止开发"
        exit 1
    fi
    echo ""
fi

# 1. 运行开发工作流
echo "📝 步骤1: 开发新工具..."
python scripts/develop-new-tool-workflow.py
if [ $? -ne 0 ]; then
    echo "❌ 开发工作流失败"
    exit 1
fi
echo ""

echo "✅ 新工具开发工作流完成！"
echo ""
echo "🌐 网站: https://zh8888.dpdns.org"
echo "📊 GitHub: https://github.com/sunnyswx/multi-tools"