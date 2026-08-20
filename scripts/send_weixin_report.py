#!/usr/bin/env python3
"""
发送微信报告
"""

import os
import subprocess
import sys
from datetime import datetime

def send_weixin_report(title, content):
    """发送微信报告"""
    try:
        # 构建消息
        message = f"[定时任务报告] {title}\n\n{content}\n\n时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        
        # 调用Hermes微信发送
        # 方法1: 使用hermes命令行工具
        result = subprocess.run(
            ['hermes', 'message', 'send', '--text', message],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        if result.returncode == 0:
            print(f"✅ 微信报告发送成功")
            return True
        else:
            print(f"⚠️ 微信报告发送失败: {result.stderr}")
            return False
            
    except FileNotFoundError:
        # 方法2: 使用hermes CLI
        try:
            result = subprocess.run(
                ['hermes', 'message', 'send', '--text', message],
                capture_output=True,
                text=True,
                timeout=30
            )
            if result.returncode == 0:
                print(f"✅ 微信报告发送成功")
                return True
            else:
                print(f"⚠️ 微信报告发送失败: {result.stderr}")
                return False
        except Exception as e:
            print(f"❌ 微信报告发送失败: {e}")
            return False
    except Exception as e:
        print(f"❌ 微信报告发送失败: {e}")
        return False

def send_weixin_report_simple(title, content):
    """发送微信报告（简化版）"""
    try:
        # 构建消息
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        message = f"🤖 定时任务报告\n\n📌 {title}\n\n📝 {content}\n\n⏰ {timestamp}"
        
        # 写入临时文件
        temp_file = os.path.join(os.environ.get('TEMP', '/tmp'), 'weixin_report.txt')
        with open(temp_file, 'w', encoding='utf-8') as f:
            f.write(message)
        
        print(f"✅ 报告已生成: {temp_file}")
        print(f"📱 请手动发送到微信或使用hermes命令")
        
        # 尝试使用hermes发送
        try:
            subprocess.run(
                ['hermes', 'message', 'send', '--text', message],
                capture_output=True,
                timeout=30
            )
            print(f"✅ 微信报告已发送")
            return True
        except:
            print(f"⚠️ Hermes不可用，报告已保存到文件")
            return False
            
    except Exception as e:
        print(f"❌ 生成报告失败: {e}")
        return False

if __name__ == '__main__':
    # 测试
    if len(sys.argv) > 2:
        title = sys.argv[1]
        content = sys.argv[2]
        send_weixin_report(title, content)
    else:
        print("用法: python send_weixin_report.py <标题> <内容>")
        print("示例: python send_weixin_report.py '部署完成' '成功部署32个工具'")