#!/bin/bash
# WARP状态检测脚本（Linux/Mac版本）
# 用法: ./check-warp.sh

echo "🔍 检测WARP状态..."
echo ""

# 1. 检查warp-cli是否可用
if ! command -v warp-cli &> /dev/null; then
    echo "❌ 错误: warp-cli未找到"
    echo "💡 请确保Cloudflare WARP已安装"
    exit 1
fi
echo "✅ warp-cli已安装"
echo ""

# 2. 检查WARP连接状态
echo "📝 步骤1: 检查WARP连接状态..."
if warp-cli status 2>&1 | grep -qi "connected"; then
    echo "✅ WARP已连接"
    WARP_STATUS="connected"
else
    echo "⚠️ WARP未连接"
    WARP_STATUS="disconnected"
fi
echo ""

# 3. 如果需要，启动WARP
if [ "$WARP_STATUS" == "disconnected" ]; then
    echo "📝 步骤2: 启动WARP..."
    warp-cli connect 2>&1
    if [ $? -eq 0 ]; then
        echo "✅ WARP启动成功"
    else
        echo "❌ WARP启动失败"
        exit 1
    fi
    echo ""
    
    # 等待连接稳定
    echo "📝 步骤3: 等待WARP连接稳定..."
    sleep 5
    echo "✅ 等待完成"
    echo ""
fi

# 4. 验证网络连通性
echo "📝 步骤4: 验证网络连通性..."
if curl -s --max-time 10 "https://www.cloudflare.com" > /dev/null; then
    echo "✅ 网络连通性正常"
else
    echo "❌ 网络连通性测试失败"
    echo "💡 请检查网络连接或手动启动WARP"
    exit 1
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ WARP状态检测完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 状态: $WARP_STATUS"
echo "💡 WARP已就绪，可以开始部署任务"
echo ""