#!/bin/bash
# Cloudflare Pages 自定义域名绑定脚本

echo "🚀 开始绑定自定义域名到 Cloudflare Pages..."
echo ""

# 配置变量
ACCOUNT_ID="3381c3123008ec98d3a9554a3965b2fe"
CF_TOKEN="[REDACTED_CF_TOKEN]"
PROJECT_NAME="sunnyswx-tools"
DOMAIN="zh8888.dpdns.org"

echo "📋 配置信息："
echo "   Account ID: $ACCOUNT_ID"
echo "   Project: $PROJECT_NAME"
echo "   Domain: $DOMAIN"
echo ""

# 步骤1：检查域名DNS解析
echo "📝 步骤1：检查域名DNS解析..."
DNS_RESULT=$(nslookup $DOMAIN 2>&1)
echo "$DNS_RESULT" | grep -E "Address|name" || echo "无法获取DNS信息"
echo ""

# 步骤2：获取Pages项目ID
echo "📝 步骤2：获取Pages项目信息..."
PROJECT_INFO=$(curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json")

PROJECT_ID=$(echo "$PROJECT_INFO" | grep -o "\"name\":\"$PROJECT_NAME\".*,\"id\":\"[^\"]*\"" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$PROJECT_ID" ]; then
    echo "❌ 错误：找不到项目 $PROJECT_NAME"
    echo "可用项目："
    echo "$PROJECT_INFO" | grep -o '"name":"[^"]*"' | head -10
    exit 1
fi

echo "✅ 项目ID: $PROJECT_ID"
echo ""

# 步骤3：添加自定义域名
echo "📝 步骤3：添加自定义域名..."
DOMAIN_RESULT=$(curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_ID/domains" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"$DOMAIN\"}")

echo "$DOMAIN_RESULT" | head -50
echo ""

# 步骤4：检查绑定状态
echo "📝 步骤4：检查绑定状态..."
sleep 5
DOMAIN_LIST=$(curl -s "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/$PROJECT_ID/domains" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json")

echo "$DOMAIN_LIST" | grep -E '"name"|"status"' || echo "正在处理中..."
echo ""

echo "✅ 绑定请求已发送！"
echo ""
echo "📌 下一步："
echo "   1. 等待DNS propagation（通常5-30分钟）"
echo "   2. 访问 https://$DOMAIN 验证"
echo "   3. 在Cloudflare Dashboard检查SSL状态"
echo ""
echo "🔗 相关链接："
echo "   - Pages管理: https://dash.cloudflare.com/pages/project/$PROJECT_NAME"
echo "   - 域名管理: https://dash.cloudflare.com/dns/$DOMAIN"
echo ""