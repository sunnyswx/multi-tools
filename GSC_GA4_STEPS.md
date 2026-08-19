# GSC和GA4更新步骤

**时间**: 2026-08-18 01:25  
**状态**: 等待用户操作

---

## 📋 需要你完成的操作

### 1️⃣ Google Search Console (GSC)

#### 步骤1：访问GSC
```
访问: https://search.google.com/search-console
```

#### 步骤2：添加新属性
```
1. 点击右上角"添加属性"按钮
2. 选择"URL前缀"
3. 输入: https://zh8888.dpdns.org/
4. 点击"继续"
```

#### 步骤3：验证域名所有权
```
推荐方法：HTML标签验证
1. 在GSC中选择"HTML标签"验证方式
2. 复制<meta>标签代码
3. 添加到index.html的<head>中
4. 点击"验证"

备选方法：DNS记录验证
1. 在GSC中获取TXT记录值
2. 在Cloudflare DNS中添加TXT记录
3. 等待DNS传播（5-30分钟）
4. 点击"验证"
```

#### 步骤4：提交Sitemap
```
1. 验证通过后，点击左侧"站点地图"
2. 输入: zh8888.dpdns.org/sitemap.xml
3. 点击"提交"
```

---

### 2️⃣ Google Analytics 4 (GA4)

#### 步骤1：访问GA4
```
访问: https://analytics.google.com
```

#### 步骤2：创建新Property（推荐）
```
1. 点击左下角"管理"（齿轮图标）
2. 在"Property"列点击"创建Property"
3. 填写信息：
   - 账户名称：Multi Tools（可相同）
   - Property名称：Multi Tools - 新域名
   - 报告时区：Asia/Shanghai
   - 货币单位：CNY
4. 点击"下一步"
5. 选择"Web"数据流
6. 输入网站URL: https://zh8888.dpdns.org
7. 输入流名称: Web Stream
8. 点击"创建"
9. 复制Measurement ID（格式：G-XXXXXXXXXX）
10. 点击"完成"
```

#### 步骤3：更新网站代码（如需）
```
如果需要新的Measurement ID：
1. 打开index.html和所有工具页面
2. 找到GA4代码（约第11-17行）
3. 替换Measurement ID
4. 推送到GitHub
```

---

## ⏱️ 预计时间

```
GSC设置: 10-15分钟
GA4设置: 5-10分钟
代码更新: 10-20分钟
总计: 25-45分钟
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
□ 网站代码已更新（如需）
□ 实时数据已验证（1个用户）
```

---

## 💡 建议

```
1. 先完成GSC，再完成GA4
2. GSC验证需要DNS传播时间
3. GA4数据实时可见
4. 两个服务可以同时操作
```

---

**雄哥，请按照上述步骤完成GSC和GA4的配置。完成后告诉我，我帮你验证。** ✅