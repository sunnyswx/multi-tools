@echo off
REM Windows批处理脚本 - 每日自动部署新工具
REM 用法: daily-deploy.bat

echo 🚀 开始每日自动部署...
echo 时间: %date% %time%
echo.

REM 1. 检查Git状态
echo 📝 步骤1: 检查Git状态...
cd /d "C:\Users\s\Documents\functional-website\multi-tools"
git status >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ 错误: 不在Git仓库目录
    exit /b 1
)
echo ✅ Git状态正常
echo.

REM 2. 创建新工具（随机选择）
echo 📝 步骤2: 创建新工具...
set TOOLS=(word-counter,timezone-converter,countdown-timer,unit-converter,online-calculator,base64,hash-generator,uuid-generator,lorem-ipsum,url-encoder,regex-tester,cron-generator,qr-generator,password-generator,color-picker,pdf-converter)
set /a RAND=%RANDOM%%%16
set TOOLS_LIST=word-counter timezone-converter countdown-timer unit-converter online-calculator base64 hash-generator uuid-generator lorem-ipsum url-encoder regex-tester cron-generator qr-generator password-generator color-picker pdf-converter

REM 这里简化处理，实际应该从列表中选择
echo ⚠️ 随机工具选择功能待实现
echo 💡 手动选择工具名称后运行: deploy-tool.bat [工具名]
echo.

REM 3. 运行脚本
echo 📝 步骤3: 运行自动化工具...
python scripts\run-all-scripts.py
if %ERRORLEVEL% neq 0 (
    echo ❌ 脚本运行失败
    exit /b 1
)
echo ✅ 脚本运行成功
echo.

REM 4. 提交并推送
echo 📝 步骤4: 提交并推送...
git add -A
git commit -m "auto: daily tool deployment - %date%"
git push origin main
if %ERRORLEVEL% neq 0 (
    echo ❌ 推送失败
    exit /b 1
)
echo ✅ 推送成功
echo.

REM 5. 输出结果
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ 每日部署完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 网站: https://sunnyswx-tools.pages.dev
echo 📊 GitHub: https://github.com/sunnyswx/multi-tools
echo.