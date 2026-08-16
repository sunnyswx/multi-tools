@echo off
REM WARP状态检测脚本
REM 用法: check-warp.bat

echo 🔍 检测WARP状态...
echo.

REM 1. 检查warp-cli是否可用
where warp-cli.exe >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ❌ 错误: warp-cli未找到
    echo 💡 请确保Cloudflare WARP已安装
    exit /b 1
)
echo ✅ warp-cli已安装
echo.

REM 2. 检查WARP连接状态
echo 📝 步骤1: 检查WARP连接状态...
warp-cli.exe status 2>&1 | findstr /i "connected" >nul
if %ERRORLEVEL% equ 0 (
    echo ✅ WARP已连接
    set WARP_STATUS=connected
) else (
    echo ⚠️ WARP未连接
    set WARP_STATUS=disconnected
)
echo.

REM 3. 如果需要，启动WARP
if "%WARP_STATUS%"=="disconnected" (
    echo 📝 步骤2: 启动WARP...
    warp-cli.exe connect 2>&1
    if %ERRORLEVEL% equ 0 (
        echo ✅ WARP启动成功
    ) else (
        echo ❌ WARP启动失败
        exit /b 1
    )
    echo.
    
    REM 等待连接稳定
    echo 📝 步骤3: 等待WARP连接稳定...
    timeout /t 5 /nobreak >nul
    echo ✅ 等待完成
    echo.
)

REM 4. 验证网络连通性
echo 📝 步骤4: 验证网络连通性...
curl -s --max-time 10 "https://www.cloudflare.com" >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo ✅ 网络连通性正常
) else (
    echo ❌ 网络连通性测试失败
    echo 💡 请检查网络连接或手动启动WARP
    exit /b 1
)
echo.

echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo ✅ WARP状态检测完成！
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📊 状态: %WARP_STATUS%
echo 💡 WARP已就绪，可以开始部署任务
echo.