@echo off
REM 工具SEO优化 - 独立任务
REM 用法: 单独运行此任务优化工具SEO

echo 🚀 开始工具SEO优化...
echo 时间: %date% %time%
echo.

cd /d "C:\Users\s\Documents\functional-website\multi-tools"

REM 运行Python脚本优化SEO
echo 📝 步骤1: 优化工具SEO...
python scripts/optimize-tool-seo.py
if %ERRORLEVEL% neq 0 (
    echo ❌ SEO优化失败
    exit /b 1
)
echo.

echo ✅ SEO优化完成！