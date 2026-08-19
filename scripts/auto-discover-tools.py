#!/usr/bin/env python3
"""
智能工具发现系统
自动从GitHub搜索热门工具项目
"""

import requests
import json
import time
from datetime import datetime, timedelta
import re

class ToolDiscovery:
    def __init__(self):
        self.github_token = None  # 可选：添加GitHub Token提高速率限制
        self.existing_tools = self.load_existing_tools()
        self.search_keywords = [
            "online tool",
            "web utility",
            "converter tool",
            "calculator tool",
            "generator tool",
            "formatter tool",
            "compressor tool",
            "validator tool"
        ]
        self.filters = {
            "min_stars": 50,
            "max_stars": 10000,
            "language": ["HTML", "JavaScript", "TypeScript"],
            "last_updated": 90,  # 天内更新
            "license": ["mit", "apache-2.0", "bsd-3-Clause"]
        }
    
    def load_existing_tools(self):
        """加载已有工具列表"""
        existing = []
        try:
            with open('index.html', 'r', encoding='utf-8') as f:
                content = f.read()
                # 提取工具名称
                tools = re.findall(r'data-tool="([^"]+)"', content)
                existing = [t.lower() for t in tools]
        except Exception as e:
            print(f"⚠️ 无法加载已有工具列表: {e}")
        return existing
    
    def search_github(self, keyword, page=1):
        """搜索GitHub项目"""
        url = "https://api.github.com/search/repositories"
        query = f"{keyword} in:name,description"
        params = {
            "q": query,
            "sort": "stars",
            "order": "desc",
            "per_page": 10,
            "page": page
        }
        
        try:
            response = requests.get(url, params=params, timeout=10)
            if response.status_code == 200:
                return response.json().get('items', [])
            else:
                print(f"❌ GitHub API错误: {response.status_code}")
                return []
        except Exception as e:
            print(f"❌ 搜索失败: {e}")
            return []
    
    def filter_repository(self, repo):
        """过滤仓库"""
        # 检查stars数量
        stars = repo.get('stargazers_count', 0)
        if stars < self.filters['min_stars'] or stars > self.filters['max_stars']:
            return False
        
        # 检查语言
        language = repo.get('language', '')
        if language not in self.filters['language']:
            return False
        
        # 检查最后更新时间
        pushed_at = repo.get('pushed_at', '')
        if pushed_at:
            pushed_date = datetime.fromisoformat(pushed_at.replace('Z', '+00:00'))
            days_old = (datetime.now(pushed_date.tzinfo) - pushed_date).days
            if days_old > self.filters['last_updated']:
                return False
        
        # 检查许可证
        license = repo.get('license', {})
        if license:
            spdx_id = license.get('spdx_id', '')
            if spdx_id not in self.filters['license'] and spdx_id != 'NOASSERTION':
                return False
        
        return True
    
    def extract_tool_info(self, repo):
        """提取工具信息"""
        name = repo.get('name', '')
        description = repo.get('description', '') or ''
        url = repo.get('html_url', '')
        stars = repo.get('stargazers_count', 0)
        language = repo.get('language', '')
        
        # 提取工具类型
        tool_type = self.classify_tool(description, name)
        
        return {
            'name': name,
            'description': description[:200],
            'url': url,
            'stars': stars,
            'language': language,
            'type': tool_type,
            'source': 'github'
        }
    
    def classify_tool(self, description, name):
        """分类工具类型"""
        text = (description + ' ' + name).lower()
        
        if 'converter' in text or '转换' in text:
            return 'converter'
        elif 'generator' in text or '生成' in text:
            return 'generator'
        elif 'calculator' in text or '计算' in text:
            return 'calculator'
        elif 'compressor' in text or '压缩' in text:
            return 'compressor'
        elif 'formatter' in text or '格式化' in text:
            return 'formatter'
        elif 'validator' in text or '验证' in text:
            return 'validator'
        elif 'encoder' in text or 'decoder' in text or '编解码' in text:
            return 'encoder'
        else:
            return 'other'
    
    def discover_tools(self, max_tools=20):
        """发现新工具"""
        discovered = []
        seen_names = set()
        
        print("🔍 开始搜索GitHub项目...")
        
        for keyword in self.search_keywords:
            if len(discovered) >= max_tools:
                break
            
            print(f"  搜索关键词: {keyword}")
            
            repos = self.search_github(keyword)
            
            for repo in repos:
                if len(discovered) >= max_tools:
                    break
                
                # 过滤
                if not self.filter_repository(repo):
                    continue
                
                # 提取信息
                tool_info = self.extract_tool_info(repo)
                
                # 去重
                tool_name = tool_info['name'].lower()
                if tool_name in seen_names:
                    continue
                seen_names.add(tool_name)
                
                # 检查是否已存在
                if tool_name in self.existing_tools:
                    continue
                
                discovered.append(tool_info)
            
            # 避免速率限制
            time.sleep(1)
        
        print(f"✅ 发现 {len(discovered)} 个新工具")
        return discovered
    
    def save_discovery(self, tools, filename='discovered-tools.json'):
        """保存发现结果"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump({
                'timestamp': datetime.now().isoformat(),
                'tools': tools
            }, f, indent=2, ensure_ascii=False)
        print(f"💾 已保存到 {filename}")

def main():
    """主函数"""
    print("=" * 60)
    print("🔍 智能工具发现系统")
    print("=" * 60)
    print()
    
    # 创建发现器
    discovery = ToolDiscovery()
    
    # 发现工具
    tools = discovery.discover_tools(max_tools=20)
    
    # 保存结果
    if tools:
        discovery.save_discovery(tools)
        
        # 显示结果
        print("\n📋 发现的新工具:")
        for i, tool in enumerate(tools[:10], 1):
            print(f"  {i}. {tool['name']} ({tool['type']}) - ⭐{tool['stars']}")
            print(f"     {tool['description'][:80]}...")
            print(f"     {tool['url']}")
            print()
    else:
        print("⚠️ 未发现新工具")
    
    print("=" * 60)

if __name__ == '__main__':
    main()