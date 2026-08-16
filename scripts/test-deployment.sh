#!/bin/bash
# test-deployment.sh - 测试部署流程
# 用法: ./test-deployment.sh

set -e

TOOL_NAME="test-tool"
TOOLS_DIR="tools"

echo "🧪 测试部署流程..."
echo ""

# 1. 检查测试工具文件
echo "📝 步骤1: 检查测试工具文件"
if [ -f "$TOOLS_DIR/$TOOL_NAME.html" ]; then
    echo "✅ 测试工具文件存在: $TOOLS_DIR/$TOOL_NAME.html"
else
    echo "❌ 测试工具文件不存在"
    exit 1
fi

# 2. 验证GA4代码
echo ""
echo "📝 步骤2: 验证GA4代码"
GA4_COUNT=$(grep -c "G-7B5H09J4KB" "$TOOLS_DIR/$TOOL_NAME.html" || echo "0")
if [ "$GA4_COUNT" -gt "0" ]; then
    echo "✅ GA4代码已添加（出现$GA4_COUNT次）"
else
    echo "❌ GA4代码缺失"
    exit 1
fi

# 3. 验证追踪函数
echo ""
echo "📝 步骤3: 验证追踪函数"
TRACK_COUNT=$(grep -c "trackToolUsage" "$TOOLS_DIR/$TOOL_NAME.html" || echo "0")
if [ "$TRACK_COUNT" -gt "0" ]; then
    echo "✅ 追踪函数已添加（出现$TRACK_COUNT次）"
else
    echo "❌ 追踪函数缺失"
    exit 1
fi

# 4. 提交代码
echo ""
echo "📝 步骤4: 提交代码"
git add -A
git commit -m "test: verify deployment workflow" || echo "无更改需要提交"

# 5. 推送到GitHub
echo ""
echo "📝 步骤5: 推送到GitHub"
git push origin main

# 6. 验证部署
echo ""
echo "📝 步骤6: 验证部署"
sleep 5
if curl -s "https://sunnyswx-tools.pages.dev/tools/$TOOL_NAME.html" | grep -q "G-7B5H09J4KB"; then
    echo "✅ GA4代码已部署"
else
    echo "⚠️ GA4代码可能还未部署，请稍后检查"
fi

if curl -s "https://sunnyswx-tools.pages.dev/tools/$TOOL_NAME.html" | grep -q "trackToolUsage"; then
    echo "✅ 追踪代码已部署"
else
    echo "⚠️ 追踪代码可能还未部署，请稍后检查"
fi

# 7. 输出结果
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 部署流程测试完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 测试工具地址: https://sunnyswx-tools.pages.dev/tools/$TOOL_NAME.html"
echo "📊 GitHub: https://github.com/sunnyswx/multi-tools"
echo ""
echo "💡 提示: Cloudflare自动部署需要1-3分钟"
echo ""