#!/bin/bash
# 工具SEO优化 - 独立任务
# 用法: 单独运行此任务优化工具SEO

echo "🚀 开始工具SEO优化..."
echo "时间: $(date)"
echo ""

cd ~/Documents/functional-website/multi-tools

# 运行Python脚本优化SEO
echo "📝 步骤1: 优化工具SEO..."
python scripts/optimize-tool-seo.py
if [ $? -ne 0 ]; then
    echo "❌ SEO优化失败"
    exit 1
fi
echo ""

echo "✅ SEO优化完成！"