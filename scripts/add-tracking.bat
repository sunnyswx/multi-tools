@echo off
REM 工具追踪添加 - 独立任务
REM 用法: 单独运行此任务添加工具追踪

echo 🚀 开始添加工具追踪...
echo 时间: %date% %time%
echo.

cd /d "C:\Users\s\Documents\functional-website\multi-tools"

REM 运行Python脚本添加追踪
echo 📝 步骤1: 添加工具追踪...
python scripts/add-tool-tracking.py
if %ERRORLEVEL% neq 0 (
    echo ❌ 追踪添加失败
    exit /b 1
)
echo.

echo ✅ 工具追踪添加完成！