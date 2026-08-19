@echo off
REM Cloudflare Pages 自定义域名绑定脚本 (Windows版)

echo 🚀 开始绑定自定义域名到 Cloudflare Pages...
echo.

REM 配置变量
set ACCOUNT_ID=3381c3123008ec98d3a9554a3965b2fe
set CF_TOKEN=[REDACTED_CF_TOKEN]
set PROJECT_NAME=sunnyswx-tools
set DOMAIN=zh8888.dpdns.org

echo 📋 配置信息：
echo    Account ID: %ACCOUNT_ID%
echo    Project: %PROJECT_NAME%
echo    Domain: %DOMAIN%
echo.

REM 步骤1：检查域名DNS解析
echo 📝 步骤1：检查域名DNS解析...
nslookup %DOMAIN%
echo.

REM 步骤2：添加自定义域名
echo 📝 步骤2：添加自定义域名...
curl -s "https://api.cloudflare.com/client/v4/accounts/%ACCOUNT_ID%/pages/projects/%PROJECT_NAME%/domains" ^
  -H "Authorization: Bearer %CF_TOKEN%" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"%DOMAIN%\"}"
echo.

REM 步骤3：等待并检查状态
echo 📝 步骤3：等待绑定处理...
timeout /t 10 /nobreak > nul

echo 📝 步骤4：检查绑定状态...
curl -s "https://api.cloudflare.com/client/v4/accounts/%ACCOUNT_ID%/pages/projects/%PROJECT_NAME%/domains" ^
  -H "Authorization: Bearer %CF_TOKEN%" ^
  -H "Content-Type: application/json"
echo.

echo ✅ 绑定请求已发送！
echo.
echo 📌 下一步：
echo    1. 等待DNS propagation（通常5-30分钟）
echo    2. 访问 https://%DOMAIN% 验证
echo    3. 在Cloudflare Dashboard检查SSL状态
echo.
echo 🔗 相关链接：
echo    - Pages管理: https://dash.cloudflare.com/pages/project/%PROJECT_NAME%
echo    - 域名管理: https://dash.cloudflare.com/dns/%DOMAIN%
echo.
pause