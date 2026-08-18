#!/usr/bin/env python3
"""
GitHub开源项目搜索和克隆
用法: python3 search-github-tools.py [关键词]
"""

import os
import sys
import subprocess
import json
import requests
from datetime import datetime

def search_github_tools(keyword, limit=5):
    """搜索GitHub上的开源工具"""
    
    # GitHub API
    url = f"https://api.github.com/search/repositories"
    params = {
        "q": f"{keyword}+tools+html",
        "sort": "stars",
        "order": "desc",
        "per_page": limit
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        return data.get("items", [])
        
    except Exception as e:
        print(f"❌ 搜索失败: {e}")
        return []

def clone_repo(repo_url, target_dir):
    """克隆GitHub仓库"""
    
    try:
        # 提取仓库名称
        repo_name = repo_url.split("/")[-1].replace(".git", "")
        target_path = os.path.join(target_dir, repo_name)
        
        # 克隆仓库
        subprocess.run(
            ["git", "clone", repo_url, target_path],
            check=True,
            capture_output=True
        )
        
        print(f"✅ 已克隆: {repo_name}")
        return target_path
        
    except Exception as e:
        print(f"❌ 克隆失败: {e}")
        return None

def extract_tool_files(repo_dir, output_dir):
    """从仓库中提取工具文件"""
    
    extracted = []
    
    # 查找HTML文件
    for root, dirs, files in os.walk(repo_dir):
        for file in files:
            if file.endswith(".html") and not file.startswith("."):
                src_path = os.path.join(root, file)
                dst_path = os.path.join(output_dir, file)
                
                # 复制文件
                shutil.copy2(src_path, dst_path)
                extracted.append(file)
                
                print(f"   - 提取: {file}")
    
    return extracted

def main():
    print("=" * 60)
    print("GitHub开源工具搜索")
    print("=" * 60)
    print()
    
    # 获取关键词
    keyword = sys.argv[1] if len(sys.argv) > 1 else "calculator"
    
    print(f"🔍 搜索关键词: {keyword}")
    print()
    
    # 搜索GitHub
    print("📡 搜索GitHub...")
    repos = search_github_tools(keyword, limit=5)
    
    if not repos:
        print("❌ 未找到相关仓库")
        return
    
    print(f"\n✅ 找到 {len(repos)} 个仓库:")
    for i, repo in enumerate(repos, 1):
        name = repo["full_name"]
        stars = repo["stargazers_count"]
        description = repo["description"] or "无描述"
        print(f"   {i}. {name} ⭐{stars}")
        print(f"      {description}")
    print()
    
    # 选择仓库
    print("请选择要克隆的仓库编号 (1-5)，或输入 'q' 退出:")
    choice = input("> ").strip()
    
    if choice.lower() == 'q':
        print("❌ 用户取消")
        return
    
    try:
        index = int(choice) - 1
        if index < 0 or index >= len(repos):
            print("❌ 无效选择")
            return
    except ValueError:
        print("❌ 无效输入")
        return
    
    selected_repo = repos[index]
    repo_url = selected_repo["html_url"]
    
    print(f"\n📦 选择仓库: {selected_repo['full_name']}")
    print()
    
    # 克隆仓库
    print("📥 克隆仓库...")
    repo_dir = clone_repo(repo_url, "/tmp/github-clones")
    
    if not repo_dir:
        print("❌ 克隆失败")
        return
    
    print()
    
    # 提取工具文件
    print("🔧 提取工具文件...")
    output_dir = "tools"
    extracted = extract_tool_files(repo_dir, output_dir)
    
    if not extracted:
        print("❌ 未找到HTML文件")
        return
    
    print(f"\n✅ 提取了 {len(extracted)} 个文件")
    print()
    
    # 清理克隆仓库
    print("🧹 清理临时文件...")
    subprocess.run(["rm", "-rf", "/tmp/github-clones"], check=False)
    
    print()
    print("=" * 60)
    print("✅ GitHub工具搜索完成！")
    print("=" * 60)
    print(f"\n📂 文件已保存到: {output_dir}/")
    print(f"📊 原仓库: {repo_url}")

if __name__ == "__main__":
    import shutil
    main()