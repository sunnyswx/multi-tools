@echo off
REM 每日自动部署新工具
REM 用法: 配置为Windows定时任务

echo 🚀 开始每日自动部署...
echo 时间: %date% %time%
echo.

REM 1. 进入项目目录
cd /d "C:\Users\s\Documents\functional-website\multi-tools"
echo ✅ 进入项目目录
echo.

REM 2. 检查Git状态
echo 📝 步骤1: 检查Git状态...
git status >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ 错误: 不在Git仓库目录
    exit /b 1
)
echo ✅ Git状态正常
echo.

REM 3. 运行所有优化脚本
echo 📝 步骤2: 运行优化脚本...
python scripts\run-all-scripts.py
if %ERRORLEVEL% neq 0 (
    echo ❌ 脚本运行失败
    exit /b 1
)
echo ✅ 脚本运行成功
echo.

REM 4. 创建新工具（随机选择）
echo 📝 步骤3: 创建新工具...
set TOOLS=(word-counter timezone-converter countdown-timer unit-converter online-calculator base64 hash-generator uuid-generator lorem-ipsum url-encoder regex-tester cron-generator qr-generator password-generator color-picker pdf-converter)

REM 使用PowerShell随机选择
for /f "tokens=*" %%i in ('powershell -Command "(Get-Random -InputObject @(word-counter,timezone-converter,countdown-timer,unit-converter,online-calculator,base64,hash-generator,uuid-generator,lorem-ipsum,url-encoder,regex-tester,cron-generator,qr-generator,password-generator,color-picker,pdf-converter))"') do set RANDOM_TOOL=%%i

echo ✅ 随机选择工具: %RANDOM_TOOL%
echo.

REM 5. 检查工具是否已存在
if exist "tools\%RANDOM_TOOL%.html" (
    echo ⚠️ 工具已存在，跳过创建
) else (
    echo 📝 创建新工具文件...
    copy tools\template.html "tools\%RANDOM_TOOL%.html" >nul
    echo ✅ 工具文件已创建
)
echo.

REM 6. 提交代码
echo 📝 步骤4: 提交代码...
git add -A
git commit -m "auto: daily tool deployment - %RANDOM_TOOL% - %date%"
if %ERRORLEVEL% neq 0 (
    echo ⚠️ 无更改需要提交
) else (
    echo ✅ 代码提交成功
)
echo.

REM 7. 推送到GitHub
echo 📝 步骤5: 推送到GitHub...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo ❌ 推送失败
    exit /b 1
)
echo ✅ 代码推送成功
echo.

REM 8. 等待部署
echo 📝 步骤6: 等待Cloudflare部署...
timeout /t 10 /nobreak >nul
echo ✅ 部署中（约需1-3分钟）
echo.

REM 9. 输出结果
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ 每日部署完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 🌐 网站: https://sunnyswx-tools.pages.dev
echo 📊 GitHub: https://github.com/sunnyswx/multi-tools
echo 📈 GA4: https://analytics.google.com/
echo.
echo 💡 下次运行时间: 明天上午9:00
echo.