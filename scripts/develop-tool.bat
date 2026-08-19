@echo off
REM 新工具开发工作流（Windows版）
REM 用法: develop-tool.bat [工具名]

echo 🚀 开始新工具开发工作流...
echo 时间: %date% %time%
echo.

cd /d "C:\Users\s\Documents\functional-website\multi-tools"

REM 0. 检测WARP状态
echo 📝 步骤0: 检测WARP状态...
call scripts\check-warp.bat
if %ERRORLEVEL% neq 0 (
    echo ❌ WARP检测失败，停止开发
    exit /b 1
)
echo.

REM 1. 运行开发工作流
echo 📝 步骤1: 开发新工具...
python scripts\develop-new-tool-workflow.py
if %ERRORLEVEL% neq 0 (
    echo ❌ 开发工作流失败
    exit /b 1
)
echo.

echo ✅ 新工具开发工作流完成！
echo.
echo 🌐 网站: https://zh8888.dpdns.org
echo 📊 GitHub: https://github.com/sunnyswx/multi-tools