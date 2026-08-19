@echo off
REM Windows批处理脚本 - 自动部署新工具
REM 用法: deploy-tool.bat [工具名]

set TOOL_NAME=%1
if "%TOOL_NAME%"=="" (
    echo ❌ 错误: 请提供工具名称
    echo 用法: deploy-tool.bat [工具名]
    exit /b 1
)

echo 🚀 开始部署新工具: %TOOL_NAME%
echo.

REM 1. 检查工具文件是否存在
if not exist "tools\%TOOL_NAME%.html" (
    echo ❌ 错误: 工具文件不存在: tools\%TOOL_NAME%.html
    echo 请先创建工具文件，然后再次运行此脚本
    exit /b 1
)

echo 📝 步骤1: 检查工具文件...
echo ✅ 工具文件存在: tools\%TOOL_NAME%.html
echo.

REM 2. 运行SEO和GA4优化
echo 📝 步骤2: 运行SEO和GA4优化...
python scripts\run-all-scripts.py
if %ERRORLEVEL% neq 0 (
    echo ❌ 脚本运行失败
    exit /b 1
)
echo ✅ SEO和GA4优化完成
echo.

REM 3. 提交代码
echo 📝 步骤3: 提交代码...
git add -A
git commit -m "feat: add new tool - %TOOL_NAME%"
if %ERRORLEVEL% neq 0 (
    echo ⚠️ 无更改需要提交或提交失败
)
echo ✅ 代码提交完成
echo.

REM 4. 推送到GitHub
echo 📝 步骤4: 推送到GitHub...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo ❌ 推送失败
    exit /b 1
)
echo ✅ 代码推送完成
echo.

REM 5. 验证部署
echo 📝 步骤5: 验证部署...
timeout /t 5 /nobreak > nul
curl -s "https://zh8888.dpdns.org/tools/%TOOL_NAME%.html" | findstr /i "G-7B5H09J4KB" >nul
if %ERRORLEVEL% equ 0 (
    echo ✅ GA4代码已部署
) else (
    echo ⚠️ GA4代码可能还未部署，请稍后检查
)
echo.

REM 6. 输出结果
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ 部署完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 工具地址: https://zh8888.dpdns.org/tools/%TOOL_NAME%.html
echo 📊 GitHub: https://github.com/sunnyswx/multi-tools
echo 📈 GA4: https://analytics.google.com/
echo.
echo 💡 提示: Cloudflare自动部署需要1-3分钟
echo.