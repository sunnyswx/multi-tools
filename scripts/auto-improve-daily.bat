@echo off
REM Windows定时任务批处理文件
REM 每天自动完善工具

cd /d "C:\Users\s\Documents\functional-website\multi-tools"

REM 连接WARP
warp-cli.exe connect

REM 等待连接
timeout /t 3 /nobreak > nul

REM 执行完善脚本
python scripts\auto-improve-tools.py

REM 断开WARP
warp-cli.exe disconnect

exit /b 0