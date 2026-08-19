@echo off
REM 每日部署脚本 - 自动检测WARP并部署
REM 更新时间: 2026-08-18
REM 域名: zh8888.dpdns.org

echo 🚀 开始每日部署检查...
echo 时间: %date% %time%
echo.

REM 检查WARP连接
echo 📝 步骤1: 检查WARP连接状态...
call check-warp.bat
if %errorlevel% neq 0 (
    echo ⚠️ WARP检测失败，继续执行...
)
echo.

REM 进入项目目录
echo 📝 步骤2: 进入项目目录...
cd /d "C:\Users\s\Documents\functional-website\multi-tools"
if %errorlevel% neq 0 (
    echo ❌ 无法进入项目目录
    pause
    exit /b 1
)
echo ✅ 项目目录: %cd%
echo.

REM 检查Git状态
echo 📝 步骤3: 检查Git状态...
git status --short
echo.

REM 拉取最新代码
echo 📝 步骤4: 拉取最新代码...
git pull origin main
if %errorlevel% neq 0 (
    echo ⚠️ Git pull失败，可能是网络问题
    echo    尝试重新连接WARP...
    call check-warp.bat
    git pull origin main
)
echo.

REM 运行SEO和GA4更新脚本
echo 📝 步骤5: 运行SEO和GA4更新...
if exist scripts\batch-seo-ga4.py (
    python scripts\batch-seo-ga4.py
) else (
    echo ⚠️ batch-seo-ga4.py不存在，跳过
)
echo.

REM 运行追踪更新脚本
echo 📝 步骤6: 运行追踪更新...
if exist scripts\batch-tracking.py (
    python scripts\batch-tracking.py
) else (
    echo ⚠️ batch-tracking.py不存在，跳过
)
echo.

REM 提交更改
echo 📝 步骤7: 提交更改...
git add -A
git commit -m "chore: daily automated deployment - %date%"
if %errorlevel% neq 0 (
    echo ℹ️ 没有需要提交的更改
)
echo.

REM 推送到GitHub
echo 📝 步骤8: 推送到GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo ⚠️ Git push失败，可能是网络问题
    echo    尝试重新连接WARP...
    call check-warp.bat
    git push origin main
)
echo.

REM 检查部署状态
echo 📝 步骤9: 检查部署状态...
echo    访问: https://zh8888.dpdns.org
echo    Sitemap: https://zh8888.dpdns.org/sitemap.xml
echo.

REM 断开WARP
echo 📝 步骤10: 断开WARP连接...
warp-cli.exe disconnect >nul 2>&1
echo ✅ WARP已断开
echo.

echo 🎉 每日部署检查完成！
echo.
echo 📊 总结:
echo    域名: https://zh8888.dpdns.org
echo    工具数: 27个
echo    状态: 已部署
echo.
pause