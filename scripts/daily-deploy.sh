#!/bin/bash
# 每日自动部署新工具（Linux/Mac版本）
# 用法: 配置为crontab定时任务

echo "🚀 开始每日自动部署..."
echo "时间: $(date)"
echo ""

# 0. 检测WARP状态
echo "📝 步骤0: 检测WARP状态..."
./scripts/check-warp.sh
if [ $? -ne 0 ]; then
    echo "❌ WARP检测失败，停止部署"
    exit 1
fi
echo ""

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

# 3. 运行所有优化脚本
echo "📝 步骤2: 运行优化脚本..."
python3 scripts/run-all-scripts.py
if [ $? -ne 0 ]; then
    echo "❌ 脚本运行失败"
    exit 1
fi
echo "✅ 脚本运行成功"
echo ""

# 4. 创建新工具（随机选择）
echo "📝 步骤3: 创建新工具..."
TOOLS=("word-counter" "timezone-converter" "countdown-timer" "unit-converter" "online-calculator" "base64" "hash-generator" "uuid-generator" "lorem-ipsum" "url-encoder" "regex-tester" "cron-generator" "qr-generator" "password-generator" "color-picker" "pdf-converter")
RANDOM_TOOL=${TOOLS[$((RANDOM % ${#TOOLS[@]}))]}
echo "✅ 随机选择工具: $RANDOM_TOOL"
echo ""

# 5. 检查工具是否已存在
if [ -f "tools/$RANDOM_TOOL.html" ]; then
    echo "⚠️ 工具已存在，跳过创建"
else
    echo "📝 创建新工具文件..."
    cp tools/template.html "tools/$RANDOM_TOOL.html"
    echo "✅ 工具文件已创建"
fi
echo ""

# 5.5 更新index.html添加工具卡片（如果新工具已存在）
echo "📝 步骤5.5: 更新index.html..."
if [ -f "tools/$RANDOM_TOOL.html" ]; then
    # 使用Python更新index.html（跨平台兼容）
    python3 -c "
import re
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()
# 检查是否已包含该工具
if '$RANDOM_TOOL.html' not in content:
    # 在最后一个</a>前添加工具卡片
    tool_card = f'''
        <!-- {os.environ.get('RANDOM_TOOL', 'new-tool')} -->
        <a href=\"/tools/{os.environ.get('RANDOM_TOOL', 'new-tool')}.html\" class=\"tool-card\">
            <div class=\"tool-icon\">🎲</div>
            <div class=\"tool-name\">{os.environ.get('RANDOM_TOOL_NAME', 'New Tool')}</div>
            <div class=\"tool-desc\">自动部署新工具</div>
        </a>
    </div>'''
    content = content.replace('</div>\n    </div>', tool_card)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('✅ index.html已更新')
else:
    print('⚠️ 工具已存在于index.html，跳过更新')
" 2>/dev/null || echo "⚠️ index.html更新失败，请手动检查"
else
    echo "⚠️ 工具文件未创建，跳过index.html更新"
fi
echo ""

# 6. 提交代码
echo "📝 步骤4: 提交代码..."
git add -A
git commit -m "auto: daily tool deployment - $RANDOM_TOOL - $(date +%Y-%m-%d)"
if [ $? -ne 0 ]; then
    echo "⚠️ 无更改需要提交"
else
    echo "✅ 代码提交成功"
fi
echo ""

# 7. 推送到GitHub
echo "📝 步骤5: 推送到GitHub..."
git push origin main
if [ $? -ne 0 ]; then
    echo "❌ 推送失败"
    exit 1
fi
echo "✅ 代码推送成功"
echo ""

# 8. 等待部署
echo "📝 步骤6: 等待Cloudflare部署..."
sleep 10
echo "✅ 部署中（约需1-3分钟）"
echo ""

# 9. 输出结果
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 每日部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 网站: https://sunnyswx-tools.pages.dev"
echo "📊 GitHub: https://github.com/sunnyswx/multi-tools"
echo "📈 GA4: https://analytics.google.com/"
echo ""
echo "💡 下次运行时间: 明天上午9:00"
echo ""