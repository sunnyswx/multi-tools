#!/bin/bash
# 每日自动部署新工具（Linux/Mac版本）

echo "🚀 开始每日自动部署..."
echo "时间: $(date)"
echo ""

# 0. 检测WARP状态（如果存在）
if [ -f "scripts/check-warp.sh" ]; then
    echo "📝 步骤0: 检测WARP状态..."
    bash scripts/check-warp.sh
    if [ $? -ne 0 ]; then
        echo "❌ WARP检测失败，停止部署"
        exit 1
    fi
    echo ""
fi

# 1. 进入项目目录
cd ~/Documents/functional-website/multi-tools
echo "✅ 进入项目目录"
echo ""

# 2. 检查Git状态
echo "📝 步骤1: 检查Git状态..."
git status > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "❌ 错误: 不在Git仓库目录"
    exit 1
fi
echo "✅ Git状态正常"
echo ""

# 3. 运行开发新工具脚本
echo "📝 步骤2: 开发新工具..."
python3 scripts/develop-new-tool.py
if [ $? -ne 0 ]; then
    echo "⚠️ 没有创建新工具，继续后续步骤..."
fi
echo ""

# 4. 运行SEO优化脚本
echo "📝 步骤3: 优化工具SEO..."
python3 scripts/optimize-tool-seo.py
if [ $? -ne 0 ]; then
    echo "❌ SEO优化失败"
    exit 1
fi
echo ""

# 5. 运行追踪添加脚本
echo "📝 步骤4: 添加工具追踪..."
python3 scripts/add-tool-tracking.py
if [ $? -ne 0 ]; then
    echo "❌ 追踪添加失败"
    exit 1
fi
echo ""

# 6. Git提交并推送
echo "📝 步骤5: Git提交并推送..."
git add -A
git commit -m "auto: daily tool deployment - $(date +%Y%m%d)"
git push origin main
if [ $? -ne 0 ]; then
    echo "❌ Git推送失败"
    exit 1
fi
echo "✅ 已推送到GitHub"
echo ""

echo "🎉 每日自动部署完成！"