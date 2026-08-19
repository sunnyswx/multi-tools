# 域名绑定配置指南

**域名**: zh8888.dpdns.org  
**状态**: ✅ DNS配置正确  
**目标**: 绑定到 Cloudflare Pages (sunnyswx-tools)

---

## ✅ 当前状态

### DNS解析检查
```
✅ 域名: zh8888.dpdns.org
✅ A记录: 104.21.60.56 (Cloudflare代理IP)
✅ AAAA记录: 2606:4700:3033::ac43:c077
✅ Cloudflare代理: 已启用 (代理状态: proxy)
```

### 网站状态
```
✅ Pages项目: sunnyswx-tools
✅ 默认域名: https://zh8888.dpdns.org
✅ 自定义域名: 待绑定
```

---

## 🔧 绑定步骤

### 方法1：通过Cloudflare Dashboard（推荐）

#### 步骤1：登录Cloudflare
```
1. 访问 https://dash.cloudflare.com
2. 使用你的账号登录
3. 完成安全验证
```

#### 步骤2：进入Pages管理
```
1. 左侧菜单点击 "Pages"
2. 找到项目 "sunnyswx-tools"
3. 点击进入项目详情
```

#### 步骤3：添加自定义域名
```
1. 点击左侧菜单 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入域名: zh8888.dpdns.org
4. 点击 "Continue"
5. 确认DNS记录（应该已存在）
6. 点击 "Activate domain"
```

#### 步骤4：验证绑定
```
1. 等待DNS propagation（通常几分钟）
2. 访问 https://zh8888.dpdns.org
3. 确认网站正常访问
```

---

### 方法2：通过Cloudflare API（自动化）

#### 获取Pages项目ID
```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/3381c3123008ec98d3a9554a3965b2fe/pages/projects" \
  -H "Authorization: Bearer [REDACTED_CF_TOKEN]" \
  -H "Content-Type: application/json"
```

#### 添加自定义域名
```bash
curl -s "https://api.cloudflare.com/client/v4/accounts/3381c3123008ec98d3a9554a3965b2fe/pages/projects/sunnyswx-tools/domains" \
  -H "Authorization: Bearer [REDACTED_CF_TOKEN]" \
  -H "Content-Type: application/json" \
  -d '{"name":"zh8888.dpdns.org"}'
```

---

## 📝 DNS记录说明

### 当前DNS记录（已正确配置）
```
类型    名称              内容                   代理状态
A       zh8888.dpdns.org  104.21.60.56          Proxied (橙云)
AAAA    zh8888.dpdns.org  2606:4700:3033::ac43:c077  Proxied (橙云)
```

### Pages要求的DNS记录
```
类型    名称                  内容                              代理状态
CNAME @或根域名       zh8888.dpdns.org    Proxied (推荐) 或 DNS only
CNAME www             zh8888.dpdns.org    Proxied (推荐)
```

---

## ⚠️ 注意事项

### 1. 代理模式选择
```
推荐：Proxied (橙云)
- 启用Cloudflare CDN
- 启用DDoS防护
- 启用SSL加密
- 访问速度更快

可选：DNS only (灰云)
- 不启用CDN
- 直接访问Pages
- 无额外防护
```

### 2. SSL设置
```
推荐：Full (Strict)
- Cloudflare到Origin使用HTTPS
- 确保Pages项目已启用HTTPS
- 安全性最高
```

### 3. 等待时间
```
DNS传播：通常5-30分钟
SSL证书签发：通常5-10分钟
完全生效：最长24小时
```

---

## 🧪 测试验证

### 测试DNS解析
```bash
nslookup zh8888.dpdns.org
# 应该返回Cloudflare的IP地址
```

### 测试网站访问
```
1. 访问 https://zh8888.dpdns.org
2. 确认显示与Pages域名相同的内容
3. 确认SSL证书正常（绿色锁标志）
```

### 测试搜索引擎
```
1. 在Google搜索 "site:zh8888.dpdns.org"
2. 确认域名可被索引
```

---

## 🚀 后续优化

### 1. 设置WWW前缀
```
建议添加 www.zh8888.dpdns.org 并重定向到根域名
或统一使用非WWW版本
```

### 2. 更新Sitemap
```
将 sitemap.xml 中的域名从 pages.dev 改为 zh8888.dpdns.org
```

### 3. 更新Google Search Console
```
添加新域名属性
重新提交Sitemap
```

---

**雄哥，域名DNS配置正确，只需在Cloudflare Dashboard中绑定即可。按上述步骤操作，约10分钟完成绑定！** ✅