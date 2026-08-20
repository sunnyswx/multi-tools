@echo off
REM 每日自动部署脚本 - Windows版
REM 功能：整合daily-deploy.sh的所有功能

cd /d "%~dp0.."

echo ============================================================
echo 开始每日自动部署
echo 时间: %date% %time%
echo ============================================================
echo.

REM 1. 连接WARP
echo [1/9] 连接WARP...
warp-cli.exe connect
if %errorlevel% neq 0 (
    echo WARP连接失败，退出
    exit /b 1
)
echo WARP连接成功
echo.

REM 2. 拉取最新代码
echo [2/9] 拉取最新代码...
git pull origin main
if %errorlevel% neq 0 (
    echo 拉取失败，尝试重新连接WARP...
    warp-cli.exe connect
    git pull origin main
)
echo.

REM 3. 开发新工具
echo [3/9] 开发新工具...
if exist "scripts\smart-tool-dev-workflow.py" (
    python scripts\smart-tool-dev-workflow.py
) else (
    echo 智能开发脚本不存在，跳过
)
echo.

REM 4. 更新SEO和GA4
echo [4/9] 更新SEO和GA4...
if exist "scripts\batch-seo-ga4.py" (
    python scripts\batch-seo-ga4.py
) else (
    echo SEO更新脚本不存在，跳过
)
echo.

REM 5. 更新追踪代码
echo [5/9] 更新追踪代码...
if exist "scripts\batch-tracking.py" (
    python scripts\batch-tracking.py
) else (
    echo 追踪更新脚本不存在，跳过
)
echo.

REM 6. 提交更改
echo [6/9] 提交更改...
git status --short
git add -A
git commit -m "chore: daily automated deployment - %date%"
if %errorlevel% neq 0 (
    echo 没有需要提交的更改
)
echo.

REM 7. 推送到GitHub
echo [7/9] 推送到GitHub...
git push origin main
if %errorlevel% neq 0 (
    echo 推送失败，尝试重新连接WARP...
    warp-cli.exe connect
    git push origin main
)
echo.

REM 8. 检查网站
echo [8/9] 检查网站可访问性...
curl -I https://zh8888.dpdns.org --connect-timeout 10
echo.

REM 9. 断开WARP
echo [9/9] 断开WARP...
warp-cli.exe disconnect
echo.

echo ============================================================
echo 每日自动部署完成！
echo 时间: %date% %time%
echo ============================================================