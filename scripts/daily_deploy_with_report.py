#!/usr/bin/env python3
"""
每日自动部署脚本 - 带微信报告
"""

import os
import subprocess
import sys
import time
import requests
from datetime import datetime
from pathlib import Path

# 配置
PROJECT_DIR = Path.home() / "Documents" / "functional-website" / "multi-tools"
LOG_FILE = PROJECT_DIR / "logs" / "daily-deploy.log"
WARP_CLI = "warp-cli.exe" if sys.platform == "win32" else "warp-cli"
WEBSITE_URL = "https://zh8888.dpdns.org"

def log(message, level="INFO"):
    """记录日志"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"[{timestamp}] [{level}] {message}"
    print(log_message)
    
    # 写入日志文件
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(log_message + "\n")

def send_weixin_report(title, content):
    """发送微信报告"""
    try:
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        message = f"🤖 定时任务报告\n\n📌 {title}\n\n📝 {content}\n\n⏰ {timestamp}"
        
        # 写入临时文件
        temp_file = PROJECT_DIR / "logs" / "weixin_report.txt"
        with open(temp_file, 'w', encoding='utf-8') as f:
            f.write(message)
        
        # 尝试使用hermes发送
        try:
            subprocess.run(
                ['hermes', 'message', 'send', '--text', message],
                capture_output=True,
                timeout=30
            )
            log("✅ 微信报告已发送")
            return True
        except:
            log(f"⚠️ Hermes不可用，报告已保存: {temp_file}")
            return False
            
    except Exception as e:
        log(f"❌ 发送微信报告失败: {e}", "ERROR")
        return False

def run_command(cmd, cwd=None, check=True):
    """运行命令并返回结果"""
    try:
        result = subprocess.run(
            cmd,
            cwd=cwd or PROJECT_DIR,
            capture_output=True,
            text=True,
            check=check
        )
        return result.returncode == 0, result.stdout, result.stderr
    except subprocess.CalledProcessError as e:
        log(f"命令执行失败: {e}", "ERROR")
        return False, "", str(e)
    except Exception as e:
        log(f"执行错误: {e}", "ERROR")
        return False, "", str(e)

def connect_warp():
    """连接WARP"""
    log("连接WARP...")
    success, stdout, stderr = run_command([WARP_CLI, "connect"])
    if success:
        log("WARP连接成功")
        return True
    else:
        log(f"WARP连接失败: {stderr}", "ERROR")
        return False

def disconnect_warp():
    """断开WARP"""
    log("断开WARP...")
    run_command([WARP_CLI, "disconnect"])
    log("WARP已断开")

def check_warp():
    """检查WARP状态"""
    log("检查WARP状态...")
    success, stdout, stderr = run_command([WARP_CLI, "status"])
    if "Connected" in stdout or "connected" in stdout.lower():
        log("WARP已连接")
        return True
    else:
        log("WARP未连接，尝试连接...")
        return connect_warp()

def git_pull():
    """拉取最新代码"""
    log("拉取最新代码...")
    max_retries = 3
    for attempt in range(max_retries):
        success, stdout, stderr = run_command(["git", "pull", "origin", "main"])
        if success:
            log("代码拉取成功")
            return True
        else:
            log(f"拉取失败（尝试 {attempt + 1}/{max_retries}）: {stderr}", "WARNING")
            if attempt < max_retries - 1:
                log("等待5秒后重试...")
                time.sleep(5)
                connect_warp()
    return False

def develop_new_tools():
    """开发新工具"""
    log("开发新工具...")
    
    script_path = PROJECT_DIR / "scripts" / "smart-tool-dev-workflow.py"
    if script_path.exists():
        success, stdout, stderr = run_command([sys.executable, str(script_path)])
        if success:
            log("新工具开发成功")
            return True
        else:
            log(f"新工具开发失败: {stderr}", "WARNING")
            return False
    else:
        log("智能开发脚本不存在，跳过", "WARNING")
        return True

def update_seo_and_tracking():
    """更新SEO和追踪代码"""
    log("更新SEO和追踪代码...")
    
    script_path = PROJECT_DIR / "scripts" / "batch-seo-tracking.py"
    if script_path.exists():
        success, stdout, stderr = run_command([sys.executable, str(script_path)])
        if success:
            log("SEO和追踪代码更新成功")
            return True
        else:
            log(f"SEO更新失败: {stderr}", "WARNING")
            return False
    else:
        log("SEO更新脚本不存在，跳过", "WARNING")
        return True

def git_commit():
    """提交更改"""
    log("提交更改...")
    
    success, stdout, stderr = run_command(["git", "status", "--short"])
    if not success or not stdout.strip():
        log("没有需要提交的更改")
        return True
    
    date_str = datetime.now().strftime("%Y-%m-%d")
    success, stdout, stderr = run_command([
        "git", "commit", "-m", f"chore: daily automated deployment - {date_str}"
    ])
    
    if success:
        log("提交成功")
        return True
    else:
        log(f"提交失败: {stderr}", "ERROR")
        return False

def git_push():
    """推送到GitHub"""
    log("推送到GitHub...")
    
    max_retries = 3
    for attempt in range(max_retries):
        success, stdout, stderr = run_command(["git", "push", "origin", "main"])
        if success:
            log("推送成功")
            return True
        else:
            log(f"推送失败（尝试 {attempt + 1}/{max_retries}）: {stderr}", "WARNING")
            if attempt < max_retries - 1:
                log("尝试重新连接WARP...")
                connect_warp()
                time.sleep(3)
    return False

def check_website():
    """检查网站可访问性"""
    log("检查网站可访问性...")
    
    try:
        response = requests.get(WEBSITE_URL, timeout=10)
        if response.status_code == 200:
            log(f"网站访问成功: {WEBSITE_URL}")
            return True
        else:
            log(f"网站返回错误码: {response.status_code}", "WARNING")
            return False
    except Exception as e:
        log(f"网站访问失败: {e}", "ERROR")
        return False

def main():
    """主函数"""
    log("=" * 70)
    log("开始每日自动部署")
    log("=" * 70)
    log("")
    
    success_count = 0
    total_steps = 7
    errors = []
    
    try:
        # 1. 连接WARP
        if check_warp():
            success_count += 1
        else:
            errors.append("WARP连接失败")
            log("无法连接WARP，退出", "ERROR")
            send_weixin_report("部署失败", "\n".join(errors))
            return 1
        
        # 2. 拉取代码
        if git_pull():
            success_count += 1
        else:
            errors.append("代码拉取失败")
            log("拉取代码失败", "ERROR")
            send_weixin_report("部署失败", "\n".join(errors))
            return 1
        
        # 3. 开发新工具
        if develop_new_tools():
            success_count += 1
        
        # 4. 更新SEO和追踪
        if update_seo_and_tracking():
            success_count += 1
        
        # 5. 提交更改
        if git_commit():
            success_count += 1
        
        # 6. 推送到GitHub
        if git_push():
            success_count += 1
        else:
            errors.append("代码推送失败")
            log("推送失败", "ERROR")
            send_weixin_report("部署失败", "\n".join(errors))
            return 1
        
        # 7. 检查网站
        if check_website():
            success_count += 1
        
        log("=" * 70)
        log("每日自动部署完成！")
        log("=" * 70)
        log("")
        
        # 发送成功报告
        report_content = f"成功步骤: {success_count}/{total_steps}"
        if errors:
            report_content += f"\n失败步骤: {', '.join(errors)}"
        send_weixin_report("部署成功", report_content)
        
        # 8. 断开WARP
        disconnect_warp()
        
        return 0
        
    except Exception as e:
        log(f"部署过程中发生错误: {e}", "ERROR")
        errors.append(f"执行错误: {e}")
        send_weixin_report("部署失败", "\n".join(errors))
        disconnect_warp()
        return 1

if __name__ == "__main__":
    sys.exit(main())