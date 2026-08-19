#!/bin/bash
# deploy-tool.sh - 一键部署新工具
# 用法: ./deploy-tool.sh [工具名]

set -e

# 配置
TOOL_NAME=${1:-"new-tool"}
REPO_DIR="$HOME/Documents/functional-website/multi-tools"
TOOLS_DIR="$REPO_DIR/tools"

echo "🚀 开始部署新工具: $TOOL_NAME"
echo ""

# 1. 检查文件是否存在
if [ ! -f "$TOOLS_DIR/$TOOL_NAME.html" ]; then
    echo "❌ 错误: 工具文件不存在: $TOOLS_DIR/$TOOL_NAME.html"
    echo ""
    echo "请先创建工具文件，然后再次运行此脚本"
    exit 1
fi

# 2. 进入仓库目录
cd "$REPO_DIR"

# 3. 运行批量优化脚本
echo "📝 运行SEO和GA4优化..."
python3 scripts/batch-seo-ga4.py

echo ""
echo "📝 运化工具追踪优化..."
python3 scripts/batch-tracking.py

# 4. 提交更改
echo ""
echo "📦 提交更改..."
git add -A
git commit -m "feat: add new tool - $TOOL_NAME"

# 5. 推送到GitHub
echo ""
echo "☁️ 推送到GitHub..."
git push origin main

# 6. 验证部署
echo ""
echo "✅ 验证部署..."
if curl -s "https://zh8888.dpdns.org/tools/$TOOL_NAME.html" | grep -q "G-7B5H09J4KB"; then
    echo "✅ GA4代码已部署"
else
    echo "⚠️ GA4代码可能还未部署，请稍后检查"
fi

if curl -s "https://zh8888.dpdns.org/tools/$TOOL_NAME.html" | grep -q "trackToolUsage"; then
    echo "✅ 工具追踪代码已部署"
else
    echo "⚠️ 工具追踪代码可能还未部署，请稍后检查"
fi

# 7. 输出结果
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 网站地址: https://zh8888.dpdns.org/tools/$TOOL_NAME.html"
echo "📊 GitHub: https://github.com/sunnyswx/multi-tools"
echo "📈 GA4: https://analytics.google.com/"
echo ""
echo "💡 提示: Cloudflare自动部署需要1-3分钟"
echo ""