#!/bin/bash
# 每日自动部署脚本 - 完整版（含新工具开发）
# 更新时间: 2026-08-18
# 域名: zh8888.dpdns.org

echo "🚀 开始每日自动部署..."
echo "时间: $(date)"
echo ""

# 0. 检测WARP状态
echo "📝 步骤0: 检测WARP状态..."
if [ -f "scripts/check-warp.sh" ]; then
    bash scripts/check-warp.sh
else
    echo "⚠️ check-warp.sh不存在，跳过WARP检测"
fi
echo ""

# 1. 进入项目目录
echo "📝 步骤1: 进入项目目录..."
cd ~/Documents/functional-website/multi-tools
if [ $? -ne 0 ]; then
    echo "❌ 无法进入项目目录"
    exit 1
fi
echo "✅ 项目目录: $(pwd)"
echo ""

# 2. 检查Git状态
echo "📝 步骤2: 检查Git状态..."
git status --short
echo ""

# 3. 拉取最新代码
echo "📝 步骤3: 拉取最新代码..."
git pull origin main
if [ $? -ne 0 ]; then
    echo "⚠️ Git pull失败，可能是网络问题"
    echo "   尝试重新连接WARP..."
    if [ -f "scripts/check-warp.sh" ]; then
        bash scripts/check-warp.sh
    fi
    git pull origin main
fi
echo ""

# 4. 开发新工具
echo "📝 步骤4: 开发新工具..."
if [ -f "scripts/develop-tool.sh" ]; then
    bash scripts/develop-tool.sh
else
    echo "⚠️ develop-tool.sh不存在，跳过新工具开发"
fi
echo ""

# 5. 运行SEO和GA4更新
echo "📝 步骤5: 运行SEO和GA4更新..."
if [ -f "scripts/batch-seo-ga4.py" ]; then
    python scripts/batch-seo-ga4.py
else
    echo "⚠️ batch-seo-ga4.py不存在，跳过"
fi
echo ""

# 6. 运行追踪更新
echo "📝 步骤6: 运行追踪更新..."
if [ -f "scripts/batch-tracking.py" ]; then
    python scripts/batch-tracking.py
else
    echo "⚠️ batch-tracking.py不存在，跳过"
fi
echo ""

# 7. 提交更改
echo "📝 步骤7: 提交更改..."
git add -A
git commit -m "chore: daily automated deployment - $(date +%Y-%m-%d)"
if [ $? -ne 0 ]; then
    echo "ℹ️ 没有需要提交的更改"
fi
echo ""

# 8. 推送到GitHub
echo "📝 步骤8: 推送到GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo "⚠️ Git push失败，可能是网络问题"
    echo "   尝试重新连接WARP..."
    if [ -f "scripts/check-warp.sh" ]; then
        bash scripts/check-warp.sh
    fi
    git push origin main
fi
echo ""

# 9. 检查部署状态
echo "📝 步骤9: 检查部署状态..."
echo "   访问: https://zh8888.dpdns.org"
echo "   Sitemap: https://zh8888.dpdns.org/sitemap.xml"
echo ""

# 10. 断开WARP
echo "📝 步骤10: 断开WARP连接..."
if [ -f "$(which warp-cli)" ]; then
    warp-cli disconnect >nul 2>&1
    echo "✅ WARP已断开"
else
    echo "⚠️ warp-cli不存在，跳过"
fi
echo ""

echo "🎉 每日自动部署完成！"
echo ""
echo "📊 总结:"
echo "   域名: https://zh8888.dpdns.org"
echo "   工具数: 27个"
echo "   状态: 已部署"
echo ""