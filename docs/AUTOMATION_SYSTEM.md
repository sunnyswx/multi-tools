# 自动化工具部署系统

**创建时间**: 2026-08-14  
**状态**: ✅ 已完成（Windows兼容）

---

## 🚀 快速开始

### 方法1：一键部署单个工具（推荐）

```batch
# 创建工具文件
copy tools\template.html tools\my-tool.html

# 编辑工具内容
notepad tools\my-tool.html

# 运行部署脚本
scripts\deploy-tool.bat my-tool
```

### 方法2：批量部署

```batch
# 运行所有脚本
python scripts\run-all-scripts.py

# 提交并推送
git add -A && git commit -m "feat: add new tools" && git push
```

### 方法3：每日自动部署（定时任务）

```batch
# 配置定时任务（每天上午9点）
schtasks /create /tn "DailyToolDeploy" /tr "C:\Users\s\Documents\functional-website\multi-tools\scripts\daily-deploy.bat" /sc daily /st 09:00

# 运行定时任务
schtasks /run /tn "DailyToolDeploy"
```

---

## 📋 脚本说明

### 1. run-all-scripts.py
**功能**: 运行所有Python脚本  
**用法**: `python scripts/run-all-scripts.py`  
**输出**:
- 运行batch-seo-ga4.py（SEO和GA4优化）
- 运行batch-tracking.py（工具追踪添加）

### 2. deploy-tool.bat
**功能**: 一键部署单个工具  
**用法**: `scripts\deploy-tool.bat [工具名]`  
**流程**:
1. 检查工具文件存在
2. 运行SEO和GA4优化
3. 运行工具追踪优化
4. Git提交并推送
5. 验证部署状态

### 3. daily-deploy.bat
**功能**: 每日自动部署  
**用法**: `scripts\daily-deploy.bat`  
**流程**:
1. 检查Git状态
2. 随机选择工具（待实现）
3. 运行所有脚本
4. 提交并推送

---

## 🎯 配置信息

### 必须配置
```batch
set GA4_ID=G-7B5H09J4KB
set CF_PROJECT=sunnyswx-tools
set GITHUB_REPO=sunnyswx/multi-tools
set BASE_URL=https://zh8888.dpdns.org
```

### 可选配置
```batch
set TOOLS_DIR=tools
set SCRIPTS_DIR=scripts
set DEPLOY_SCHEDULE=daily
set DEPLOY_TIME=09:00
```

---

## 📊 工具追踪事件

### 标准事件格式
```javascript
gtag('event', 'tool_usage', {
    'tool_name': '工具名',
    'action': '动作名',
    'event_category': 'Tool'
});
```

### 常用动作
```
click - 点击按钮
upload - 上传图片
download - 下载文件
generate - 生成结果
convert - 转换格式
calculate - 计算结果
edit - 编辑内容
```

---

## ⚠️ 注意事项

### Windows兼容性
```
✅ 已测试环境: Windows 10, Python 3.11.15
✅ 脚本已适配Windows批处理
✅ 使用python而非python3命令
```

### 定时任务配置
```
1. 使用schtasks命令创建定时任务
2. 每天上午9点自动运行
3. 日志输出到logs/daily-deploy.log
```

---

## 🔗 相关文档

- [Google Analytics 4 文档](https://developers.google.com/analytics)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages)
- [Windows 定时任务](https://docs.microsoft.com/windows/win32/taskschd)

---

## 📝 版本历史

### v1.0.0 (2026-08-14)
- ✅ 初始版本
- ✅ Windows兼容性修复
- ✅ 批处理脚本开发
- ✅ 定时任务配置