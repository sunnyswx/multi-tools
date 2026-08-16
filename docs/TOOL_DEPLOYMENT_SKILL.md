# 工具网站部署技能

**创建时间**: 2026-08-14  
**版本**: 1.0.0  
**用途**: 为新工具页面快速完成SEO优化和GA4追踪设置

---

## 🚀 快速开始

### 方法1：使用一键部署脚本（推荐）

```bash
# 1. 创建工具HTML文件
cp tools/template.html tools/new-tool.html

# 2. 运行一键部署脚本
chmod +x scripts/deploy-tool.sh
./scripts/deploy-tool.sh new-tool

# 3. 等待Cloudflare自动部署（1-3分钟）
```

### 方法2：手动运行优化脚本

```bash
# 1. 运行SEO和GA4优化
python3 scripts/batch-seo-ga4.py

# 2. 运行工具追踪优化
python3 scripts/batch-tracking.py

# 3. 提交并推送
cd ~/Documents/functional-website/multi-tools
git add -A
git commit -m "feat: add new tool"
git push origin main
```

---

## 📋 配置信息

### 必须配置

```bash
# GA4测量ID
GA4_ID="G-7B5H09J4KB"

# Cloudflare项目名
CF_PROJECT="sunnyswx-tools"

# GitHub仓库
GITHUB_REPO="sunnyswx/multi-tools"

# 网站基础URL
BASE_URL="https://sunnyswx-tools.pages.dev"
```

### 可选配置

```bash
# Open Graph图片（1200x630像素）
OG_IMAGE_URL="$BASE_URL/og-image.jpg"

# 自定义域名
CUSTOM_DOMAIN="zh8888.dpdns.org"
```

---

## 🔧 脚本说明

### batch-seo-ga4.py
**功能**: 批量为工具页面添加SEO标签和GA4代码  
**用法**: `python3 scripts/batch-seo-ga4.py`  
**输出**: 为所有工具页面添加：
- GA4测量代码（G-7B5H09J4KB）
- Title标签（包含关键词）
- Meta description（工具描述）
- Meta keywords（5-8个关键词）
- Open Graph标签（Facebook/LinkedIn分享）
- Twitter Card标签（Twitter分享）
- Canonical URL（防止重复内容）

### batch-tracking.py
**功能**: 批量为工具页面添加工具使用追踪  
**用法**: `python3 scripts/batch-tracking.py`  
**输出**: 为所有工具页面添加：
- trackToolUsage()函数
- 按钮点击事件追踪
- GA4事件发送

### deploy-tool.sh
**功能**: 一键部署新工具  
**用法**: `./scripts/deploy-tool.sh [工具名]`  
**流程**:
1. 检查工具文件是否存在
2. 运行SEO和GA4优化
3. 运行工具追踪优化
4. Git提交并推送
5. 验证部署状态

---

## 📊 工具追踪事件

### 标准事件格式

```javascript
gtag('event', 'tool_usage', {
    'tool_name': '工具名',
    'action': '动作名',
    'event_category': 'Tool',
    'event_label': '工具名_动作名'
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

## 🎯 使用场景

### 场景1：新增单个工具

```bash
# 1. 创建工具文件
echo '<html>...</html>' > tools/my-tool.html

# 2. 运行一键部署
./scripts/deploy-tool.sh my-tool
```

### 场景2：批量优化现有工具

```bash
# 1. 更新工具配置文件
# 编辑 scripts/batch-seo-ga4.py 中的 TOOLS_CONFIG

# 2. 运行批量优化
python3 scripts/batch-seo-ga4.py
python3 scripts/batch-tracking.py

# 3. 提交推送
git add -A && git commit -m "feat: optimize all tools" && git push
```

### 场景3：验证部署状态

```bash
# 检查GA4代码
curl -s "https://sunnyswx-tools.pages.dev/tools/my-tool.html" | grep "G-7B5H09J4KB"

# 检查追踪代码
curl -s "https://sunnyswx-tools.pages.dev/tools/my-tool.html" | grep "trackToolUsage"

# 查看Git提交历史
git log --oneline -5
```

---

## ⚠️ 注意事项

### 常见问题

```
1. GA4代码未生效
   → 清除浏览器缓存，按Ctrl+F5强制刷新

2. 工具追踪事件未触发
   → 检查按钮事件绑定是否正确
   → 查看浏览器控制台是否有错误

3. SEO标签未显示
   → 检查<meta>标签是否在<head>内
   → 检查HTML结构是否完整
```

### 最佳实践

```
1. 每个工具保持独立的HTML文件
2. 使用统一的CSS样式（可引用公共样式表）
3. 添加完整的SEO标签
4. 添加工具使用追踪事件
5. 推送到GitHub后自动部署到Cloudflare
```

---

## 📈 效果评估

### 优化前
```
- 无SEO标签
- 无GA4追踪
- 无工具使用数据
- 月访问量：100-500
```

### 优化后
```
- 完整SEO标签
- GA4实时追踪
- 工具使用数据完整
- 月访问量：5,000-20,000（预期）
```

---

## 🔗 相关文档

- [Google Analytics 4 文档](https://developers.google.com/analytics)
- [Google Search Console 文档](https://developers.google.com/search/docs)
- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)

---

## 📝 版本历史

### v1.0.0 (2026-08-14)
- ✅ 初始版本
- ✅ 批量SEO和GA4优化
- ✅ 批量工具追踪添加
- ✅ 一键部署脚本