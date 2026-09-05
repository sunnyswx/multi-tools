# 🏗️ 多工具网站矩阵 - 详细架构规划

**规划时间**: 2026-09-02
**目标**: 技术选型 + 网站结构 + 实施细节

---

## 📊 一、技术栈选型

### 1.1 前端框架对比

| 框架 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **纯 HTML/CSS/JS** | 简单、快速、无构建 | 维护困难、代码重复 | ⭐⭐⭐ |
| **Vue 3 (CDN)** | 组件化、易学、无构建 | 需要 CDN | ⭐⭐⭐⭐ |
| **React (CDN)** | 生态好、性能好 | 学习曲线陡 | ⭐⭐⭐ |
| **Alpine.js** | 轻量、简洁、Vue风格 | 功能有限 | ⭐⭐⭐⭐ |
| **htmx** | 极简、服务端渲染 | 需要后端 | ⭐⭐ |

### ✅ 推荐方案：纯 HTML + Alpine.js (CDN)

```
理由：
1. 无需构建工具，直接部署
2. 代码简洁，易于维护
3. 响应式数据绑定
4. 组件化开发
5. 适合工具类网站
```

---

### 1.2 样式方案

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **Tailwind CSS (CDN)** | 实用类、快速开发 | CDN 版本大 | ⭐⭐⭐⭐ |
| **Pure CSS** | 无依赖、轻量 | 开发慢 | ⭐⭐⭐ |
| **Bootstrap** | 组件丰富 | 文件大、不灵活 | ⭐⭐ |
| **Custom CSS** | 完全控制 | 重复代码多 | ⭐⭐⭐ |

### ✅ 推荐方案：Custom CSS + 少量 Tailwind

```
理由：
1. 保持代码可控
2. 避免 CDN 依赖
3. 可针对工具站优化
4. 统一多站点风格
```

---

### 1.3 翻译系统

```
现状：lang.js (纯 JS 对象)
问题：重复代码、维护困难

推荐方案：
├─ 共享翻译文件 (translations/en.json, zh.json...)
├─ 翻译键命名规范
├─ 自动检测缺失翻译
└─ 批量更新脚本
```

---

## 📁 二、网站结构设计

### 2.1 目录结构

```
functional-website/
│
├─ main-site/                    # 主站
│   ├─ index.html                 # 首页 (所有工具列表)
│   ├─ tools/                     # 44 个工具页面
│   │   ├─ image-compressor.html
│   │   ├─ json-formatter.html
│   │   └─ ...
│   ├─ css/
│   │   ├─ style.css             # 主样式
│   │   └─ components/           # 组件样式
│   ├─ js/
│   │   ├─ lang.js               # 翻译系统
│   │   ├─ search.js             # 搜索功能
│   │   └─ analytics.js          # GA4 追踪
│   └─ docs/
│       └─ ...
│
├─ image-tools/                  # 图片工具站
│   ├─ index.html                 # 首页 (4个工具)
│   ├─ tools/
│   │   ├─ compressor.html
│   │   ├─ converter.html
│   │   ├─ resizer.html
│   │   └─ base64-image.html
│   ├─ css/style.css
│   └─ js/lang.js
│
├─ dev-tools/                    # 开发者工具站
│   ├─ index.html
│   ├─ tools/
│   │   ├─ json-formatter.html
│   │   ├─ json-validator.html
│   │   ├─ base64.html
│   │   ├─ url-encoder.html
│   │   ├─ hash-generator.html
│   │   ├─ regex-tester.html
│   │   ├─ cron-generator.html
│   │   └─ uuid-generator.html
│   ├─ css/style.css
│   └─ js/lang.js
│
├─ calc-tools/                   # 计算器站
│   ├─ index.html
│   ├─ tools/
│   │   ├─ age-calculator.html
│   │   ├─ bmi-calculator.html
│   │   ├─ mortgage-calculator.html
│   │   ├─ percentage-calculator.html
│   │   └─ online-calculator.html
│   ├─ css/style.css
│   └─ js/lang.js
│
├─ text-tools/                   # 文本工具站
│   ├─ index.html
│   ├─ tools/
│   │   ├─ markdown-editor.html
│   │   ├─ word-counter.html
│   │   ├─ lorem-ipsum.html
│   │   ├─ case-converter.html
│   │   ├─ text-repeater.html
│   │   └─ readability-score.html
│   ├─ css/style.css
│   └─ js/lang.js
│
├─ shared/                       # 共享资源
│   ├─ config.js                 # 公共配置
│   ├─ translations/
│   │   ├─ en.json
│   │   ├─ zh.json
│   │   ├─ ja.json
│   │   └─ ...
│   ├─ components/
│   │   ├─ header.html
│   │   ├─ footer.html
│   │   └─ nav.html
│   └─ scripts/
│       ├─ init-lang.js
│       └─ analytics.js
│
└─ scripts/                      # 自动化脚本
    ├─ sync-translations.js      # 同步翻译
    ├─ build-sites.js            # 构建站点
    ├─ check-integrity.js        # 完整性检查
    └─ deploy.js                 # 部署脚本
```

---

## 🎨 三、页面模板设计

### 3.1 工具页面模板 (标准结构)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{tool_name}} - {{site_name}}</title>
    <meta name="description" content="{{tool_description}}">
    
    <!-- 样式 -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="./css/tool.css">
    
    <!-- 翻译系统 -->
    <script src="../js/lang.js"></script>
    <script src="./js/tool.js"></script>
    
    <!-- GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXX"></script>
</head>
<body>
    <!-- 导航 -->
    <nav class="tool-nav">
        <a href="../" class="back-btn" data-i18n="common.back_to_home">← Back</a>
        <div class="site-brand">{{site_name}}</div>
    </nav>
    
    <!-- 主要内容 -->
    <main class="tool-container">
        <header class="tool-header">
            <h1 data-i18n="{{tool_key}}.name">{{tool_name}}</h1>
            <p data-i18n="{{tool_key}}.desc">{{tool_description}}</p>
        </header>
        
        <section class="tool-content">
            <!-- 工具功能区域 -->
            {{tool_ui}}
        </section>
    </main>
    
    <!-- 页脚 -->
    <footer class="tool-footer">
        <p data-i18n="footer.text">{{footer_text}}</p>
    </footer>
</body>
</html>
```

### 3.2 站点首页模板

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{site_name}} - Free Online Tools</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/lang.js"></script>
</head>
<body>
    <header class="site-header">
        <h1>{{site_icon}} {{site_name}}</h1>
        <p>{{site_tagline}}</p>
        <div class="search-box">
            <input type="text" id="searchInput" placeholder="{{search_placeholder}}">
        </div>
    </header>
    
    <main class="tools-grid" id="toolsGrid">
        <!-- 工具卡片由 JS 动态生成 -->
    </main>
    
    <footer class="site-footer">
        <p>{{footer_text}}</p>
        <nav class="footer-nav">
            <a href="https://zh8888.dpdns.org/">主站</a>
            <!-- 其他站点链接 -->
        </nav>
    </footer>
</body>
</html>
```

---

## 🔧 四、工具开发规范

### 4.1 工具文件命名

```
tools/
├─ tool-name.html          # 工具页面
├─ css/
│   └─ tool-name.css       # 工具样式 (可选)
└─ js/
    └─ tool-name.js        # 工具逻辑 (可选)
```

### 4.2 工具 JavaScript 结构

```javascript
// tool-name.js
(function() {
    'use strict';
    
    // 状态管理
    let state = {
        file: null,
        result: null,
        // ...
    };
    
    // 初始化
    function init() {
        bindEvents();
        applyLanguage(getLanguage());
    }
    
    // 事件绑定
    function bindEvents() {
        document.getElementById('uploadBtn').addEventListener('click', handleUpload);
        document.getElementById('convertBtn').addEventListener('click', convert);
    }
    
    // 核心功能
    function handleUpload(e) {
        // ...
    }
    
    function convert() {
        // ...
    }
    
    // 语言切换
    function applyLanguage(lang) {
        // ...
    }
    
    // 启动
    init();
})();
```

---

## 🌍 五、多语言系统

### 5.1 翻译文件结构

```json
{
  "site_name": "Image Tools",
  "site_tagline": "Free Online Image Tools",
  "search_placeholder": "Search tools...",
  "footer_text": "Free online tools for everyone.",
  "common": {
    "back_to_home": "返回首页",
    "click_to_upload": "点击上传",
    "compress": "压缩",
    "download": "下载"
  },
  "tools": {
    "image-compressor": {
      "name": "图片压缩工具",
      "desc": "免费在线压缩图片",
      "quality_label": "压缩质量",
      "original_size": "原始大小",
      "compressed_size": "压缩后大小",
      "reduction": "压缩率"
    }
  }
}
```

### 5.2 翻译键命名规范

```
格式：{模块}.{元素}.{属性}

示例：
- common.back_to_home
- tools.image-compressor.name
- tools.image-compressor.quality_label
- ui.upload_area.title
- ui.result.info.size
```

---

## 🚀 六、部署方案

### 6.1 Cloudflare Pages 配置

```toml
# cloudflare-pages.toml
[build]
  command = "npm run build"
  output = "dist"
  
[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6.2 GitHub Actions 工作流

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Cloudflare
        uses: cloudflare/pages-action@v1
        with:
          projectName: image-tools
          directory: ./image-tools
          apiToken: ${{ secrets.CF_API_TOKEN }}
```

---

## 🤖 七、Hermes Bots 设计

### 7.1 Bot 架构

```
bots/
├─ base-bot.js              # Bot 基类
├─ deployment-monitor.js    # 部署监控
├─ translation-checker.js   # 翻译检查
├─ seo-monitor.js           # SEO监控
├─ auto-tester.js           # 自动测试
└─ utils/
    ├─ weixin.js            # 微信通知
    ├─ github.js            # GitHub API
    └─ cloudflare.js        # Cloudflare API
```

### 7.2 Bot 调度

```javascript
// bots/scheduler.js
const cron = require('node-cron');

// 每天凌晨 2 点检查翻译
cron.schedule('0 2 * * *', async () => {
  await TranslationChecker.run();
});

// 每 6 小时检查部署状态
cron.schedule('0 */6 * * *', async () => {
  await DeploymentMonitor.run();
});

// 每天凌晨 3 点检查 SEO
cron.schedule('0 3 * * *', async () => {
  await SEO_MONITOR.run();
});

// 每天凌晨 4 点运行测试
cron.schedule('0 4 * * *', async () => {
  await AutoTester.run();
});
```

---

## 📋 八、实施计划

### Phase 1: 基础架构 (第1周)
```
□ 创建 5 个 GitHub 仓库
□ 配置 Cloudflare Pages 项目
□ 设置 GitHub Actions 自动部署
□ 开发共享翻译系统
□ 创建站点模板
```

### Phase 2: 工具迁移 (第2周)
```
□ 迁移图片工具到独立站点
□ 迁移开发者工具到独立站点
□ 迁移计算器工具到独立站点
□ 迁移文本工具到独立站点
□ 更新所有链接和导航
```

### Phase 3: Bot 开发 (第3周)
```
□ 开发部署监控 Bot
□ 开发翻译检查 Bot
□ 开发 SEO 监控 Bot
□ 开发自动测试 Bot
□ 集成微信通知
```

### Phase 4: 优化完善 (第4周)
```
□ 性能优化
□ SEO 优化
□ 用户体验优化
□ 文档完善
□ 全面测试
```

---

## 💰 九、成本分析

| 项目 | 费用 | 说明 |
|------|------|------|
| GitHub | $0 | 免费公开仓库 |
| Cloudflare Pages | $0 | 10万请求/月/站 |
| 域名 (可选) | $0-40/年 | 子域名免费，独立域名付费 |
| Hermes Agent | $0 | 本地运行 |
| Weixin Bot | $0 | 免费 |
| **总计** | **$0/月** | 完全免费 |

---

## 🤔 十、需要讨论的问题

雄哥，以下问题需要您确认：

```
1. 技术选型
   □ 纯 HTML + Alpine.js (推荐)
   □ Vue 3 CDN 版本
   □ 其他框架？

2. 域名策略
   □ 子域名 (image.zh8888.dpdns.org) - 免费
   □ 独立域名 - 需购买

3. 站点数量
   □ 先做 2 个 (image + dev)
   □ 一次做 4 个 (全部分类)

4. 代码管理
   □ 单仓库多目录 (推荐)
   □ 多仓库独立管理

5. 实施时间
   □ 本周开始
   □ 下周开始
   □ 需要更多时间讨论
```

---

**雄哥，以上是详细的架构规划，请告诉我您的想法，我们逐项讨论确认！** 🚀
