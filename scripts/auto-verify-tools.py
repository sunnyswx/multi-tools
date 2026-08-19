#!/usr/bin/env python3
"""
智能工具验证系统
验证开发的新工具是否可用
"""

import requests
import time
from datetime import datetime

class ToolVerifier:
    def __init__(self, base_url='https://zh8888.dpdns.org'):
        self.base_url = base_url
        self.timeout = 30
    
    def check_website_accessible(self):
        """检查网站是否可访问"""
        try:
            response = requests.get(self.base_url, timeout=self.timeout)
            return response.status_code == 200
        except Exception as e:
            print(f"❌ 网站访问失败: {e}")
            return False
    
    def check_tool_page(self, tool_name):
        """检查工具页面是否存在"""
        url = f"{self.base_url}/tools/{tool_name}.html"
        try:
            response = requests.get(url, timeout=self.timeout)
            return {
                'status_code': response.status_code,
                'exists': response.status_code == 200,
                'url': url
            }
        except Exception as e:
            print(f"❌ 工具页面访问失败: {e}")
            return {
                'status_code': None,
                'exists': False,
                'url': url
            }
    
    def check_tool_content(self, tool_name):
        """检查工具页面内容"""
        url = f"{self.base_url}/tools/{tool_name}.html"
        try:
            response = requests.get(url, timeout=self.timeout)
            if response.status_code == 200:
                content = response.text
                
                # 检查基本要素
                checks = {
                    'has_title': '<title>' in content,
                    'has_ga4': 'gtag' in content or 'googletagmanager' in content,
                    'has_tracking': 'trackToolUsage' in content,
                    'has_feedback': 'feedback' in content.lower(),
                    'has_navigation': '返回首页' in content or 'back-btn' in content
                }
                
                return {
                    'valid': all(checks.values()),
                    'checks': checks,
                    'url': url
                }
            else:
                return {
                    'valid': False,
                    'checks': {},
                    'url': url
                }
        except Exception as e:
            print(f"❌ 工具内容检查失败: {e}")
            return {
                'valid': False,
                'checks': {},
                'url': url
            }
    
    def verify_new_tools(self, tool_names):
        """验证多个新工具"""
        results = []
        
        print(f"🔍 开始验证 {len(tool_names)} 个新工具...")
        
        for tool_name in tool_names:
            print(f"\n📝 验证工具: {tool_name}")
            
            # 检查页面是否存在
            page_check = self.check_tool_page(tool_name)
            
            # 检查页面内容
            content_check = self.check_tool_content(tool_name)
            
            # 汇总结果
            result = {
                'name': tool_name,
                'page_exists': page_check['exists'],
                'content_valid': content_check['valid'],
                'checks': content_check['checks'],
                'status': '✅ 正常' if (page_check['exists'] and content_check['valid']) else '❌ 异常'
            }
            
            results.append(result)
            
            # 打印结果
            print(f"  页面状态: {'✅ 存在' if page_check['exists'] else '❌ 不存在'}")
            print(f"  内容验证: {'✅ 正常' if content_check['valid'] else '❌ 异常'}")
            
            if content_check['checks']:
                for check_name, passed in content_check['checks'].items():
                    status = '✅' if passed else '❌'
                    print(f"    {status} {check_name}")
            
            # 避免请求过快
            time.sleep(1)
        
        return results
    
    def generate_report(self, results):
        """生成验证报告"""
        total = len(results)
        passed = sum(1 for r in results if r['status'] == '✅ 正常')
        failed = total - passed
        
        report = {
            'timestamp': datetime.now().isoformat(),
            'total': total,
            'passed': passed,
            'failed': failed,
            'success_rate': f"{(passed/total*100):.1f}%" if total > 0 else "0%",
            'details': results
        }
        
        return report

def main():
    """主函数"""
    print("=" * 60)
    print("✅ 智能工具验证系统")
    print("=" * 60)
    print()
    
    # 示例工具列表（实际使用时从Git提交获取）
    new_tools = [
        'text-compressor',
        'json-validator',
        'xml-formatter',
        'csv-to-json',
        'image-resizer'
    ]
    
    # 创建验证器
    verifier = ToolVerifier()
    
    # 验证工具
    results = verifier.verify_new_tools(new_tools)
    
    # 生成报告
    report = verifier.generate_report(results)
    
    # 打印报告
    print("\n" + "=" * 60)
    print("📊 验证报告")
    print("=" * 60)
    print(f"验证时间: {report['timestamp']}")
    print(f"工具总数: {report['total']}")
    print(f"验证通过: {report['passed']}")
    print(f"验证失败: {report['failed']}")
    print(f"成功率: {report['success_rate']}")
    print()
    
    if report['failed'] > 0:
        print("❌ 失败的工具:")
        for result in results:
            if result['status'] == '❌ 异常':
                print(f"  - {result['name']}")
    else:
        print("✅ 所有工具验证通过！")

if __name__ == '__main__':
    main()