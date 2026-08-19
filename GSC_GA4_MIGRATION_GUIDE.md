# GSC和GA4迁移指南

**时间**: 2026-08-18 01:15  
**旧域名**: zh8888.dpdns.org  
**新域名**: zh8888.dpdns.org

---

## 🔍 需要更新的项目

### 1. Google Search Console (GSC)
```
✅ 添加新域名属性
✅ 验证域名所有权
✅ 提交新Sitemap
✅ 设置域名重定向（可选）
```

### 2. Google Analytics 4 (GA4)
```
✅ 创建新Property（推荐）
✅ 或更新现有Property（可选）
✅ 更新网站代码
✅ 验证数据收集
```

---

## 📝 详细操作步骤

### 第一部分：Google Search Console

#### 步骤1：添加新域名属性
```
1. 访问 https://search.google.com/search-console
2. 点击"添加属性"
3. 选择"URL前缀"
4. 输入：https://zh8888.dpdns.org/
5. 点击"继续"
```

#### 步骤2：验证域名所有权
```
方法1：HTML标签验证（推荐）
1. 在GSC中下载HTML验证文件
2. 上传到网站根目录
3. 访问 https://zh8888.dpdns.org/googlexxx.html 验证

方法2：HTML标签验证（代码方式）
1. 在GSC中选择"HTML标签"验证方式
2. 复制<meta>标签代码
3. 添加到网站的<head>中
4. 点击"验证"

方法3：DNS记录验证
1. 在GSC中获取TXT记录值
2. 在Cloudflare DNS中添加TXT记录
3. 等待DNS传播
4. 点击"验证"
```

#### 步骤3：提交新Sitemap
```
1. 在GSC中进入新域名属性
2. 点击左侧"站点地图"
3. 输入：zh8888.dpdns.org/sitemap.xml
4. 点击"提交"
```

#### 步骤4：设置301重定向（推荐）
```
在Cloudflare Pages中设置：
1. 进入 https://dash.cloudflare.com/pages
2. 选择项目 sunnyswx-tools
3. 点击"Custom domains"
4. 点击"Manage DNS"
5. 添加CNAME记录：
   - 类型: CNAME
   - 名称: @
   - 内容: zh8888.dpdns.org
   - 代理状态: Proxied（橙云）
6. Pages会自动设置301重定向
```

---

### 第二部分：Google Analytics 4 (GA4)

#### 方案A：创建新Property（推荐）
```
优点：
✅ 数据完全分离
✅ 不影响原有数据
✅ 便于对比分析

步骤：
1. 访问 https://analytics.google.com
2. 点击"管理"（左下角齿轮图标）
3. 在"Property"列点击"创建Property"
4. 输入信息：
   - 账户名称：Multi Tools（可相同）
   - Property名称：Multi Tools - 新域名
   - 报告时区：Asia/Shanghai
   - 货币单位：CNY
5. 点击"下一步"
6. 选择数据流：Web
7. 输入网站URL：https://zh8888.dpdns.org
8. 输入流名称：Web Stream
9. 点击"创建"
10. 复制Measurement ID（格式：G-XXXXXXXXXX）
11. 点击"完成"
```

#### 方案B：更新现有Property（可选）
```
优点：
✅ 数据连续
✅ 无需更改代码

缺点：
⚠️ 域名变更可能影响数据
⚠️ 需要重新配置

步骤：
1. 在GSC中验证新域名
2. 在GA4中更新网站URL
3. 更新网站代码（如需要）
```

---

### 第三部分：更新网站代码

#### 更新GA4代码
```
1. 打开 index.html 和所有工具页面
2. 找到GA4代码：
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-7B5H09J4KB"></script>
3. 如果创建了新Property，更新Measurement ID
4. 保存并推送到GitHub
```

#### 更新Sitemap
```
1. 打开 sitemap.xml
2. 将所有URL从 zh8888.dpdns.org 改为 zh8888.dpdns.org
3. 更新 lastmod 日期为今天
4. 保存并推送到GitHub
```

---

## 📊 域名对比

| 项目 | 旧域名 | 新域名 |
|------|--------|--------|
| **GSC属性** | https://zh8888.dpdns.org/ | https://zh8888.dpdns.org/ |
| **GA4 Property** | 现有Property | 新建Property |
| **Sitemap** | pages.dev/sitemap.xml | zh8888.dpdns.org/sitemap.xml |
| **robots.txt** | pages.dev/robots.txt | zh8888.dpdns.org/robots.txt |

---

## ⏱️ 预计时间

```
GSC验证：10-30分钟
GA4设置：5-10分钟
代码更新：10-20分钟
DNS传播：5-30分钟
完全生效：最长24小时
```

---

## ✅ 验证清单

### GSC验证
```
□ 新域名属性已添加
□ 域名所有权已验证
□ Sitemap已提交
□ 无索引错误
```

### GA4验证
```
□ 新Property已创建
□ Measurement ID已获取
□ 网站代码已更新
□ 实时数据已验证
```

### 网站验证
```
□ 新域名可正常访问
□ SSL证书正常
□ 301重定向正常（如有）
□ 所有工具功能正常
```

---

## 💡 建议

### 短期（本周）
```
1. 在Cloudflare Dashboard绑定域名
2. 在GSC添加并验证新域名
3. 在GA4创建新Property
4. 更新网站代码和Sitemap
5. 测试所有功能正常
```

### 中期（本月）
```
1. 监控新域名流量
2. 对比新旧域名数据
3. 优化新域名的SEO
4. 更新所有分享链接
```

### 长期（3个月）
```
1. 完全切换为新域名
2. 保留旧域名重定向
3. 监控搜索引擎表现
4. 持续优化网站
```

---

**雄哥，域名绑定后需要更新GSC和GA4配置。建议先绑定域名，然后按步骤更新GSC和GA4。需要我帮你更新网站代码吗？** ✅