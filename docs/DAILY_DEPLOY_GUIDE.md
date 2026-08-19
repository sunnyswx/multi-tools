# 每日自动部署配置指南

**创建时间**: 2026-08-14  
**状态**: ✅ 已完成

---

## 🚀 配置步骤

### Windows系统（推荐）

#### 步骤1：创建定时任务
```powershell
# 打开PowerShell（管理员）
schtasks /create /tn "DailyToolDeploy" /tr "C:\Users\s\Documents\functional-website\multi-tools\scripts\daily-deploy.bat" /sc daily /st 09:00 /ru "%USERNAME%"
```

#### 步骤2：验证定时任务
```powershell
# 查看定时任务列表
schtasks /query /tn "DailyToolDeploy" /fo LIST

# 手动运行测试
schtasks /run /tn "DailyToolDeploy"
```

#### 步骤3：查看运行日志
```powershell
# 查看任务计划程序日志
Get-WinEvent -FilterHashtable @{LogName='Microsoft-Windows-TaskScheduler/Operational'; ID=100} | Select-Object -First 10
```

---

### Linux/Mac系统

#### 步骤1：编辑crontab
```bash
# 打开crontab编辑器
crontab -e
```

#### 步骤2：添加定时任务
```bash
# 每天上午9点运行
0 9 * * * /home/username/Documents/functional-website/multi-tools/scripts/daily-deploy.sh >> /home/username/Documents/functional-website/multi-tools/logs/cron.log 2>&1
```

#### 步骤3：验证crontab
```bash
# 查看crontab列表
crontab -l

# 手动运行测试
./scripts/daily-deploy.sh
```

---

## 📋 脚本说明

### daily-deploy.bat（Windows）
**功能**: 每日自动部署新工具  
**位置**: `scripts/daily-deploy.bat`  
**运行时间**: 每天上午9:00  
**流程**:
1. 进入项目目录
2. 检查Git状态
3. 运行优化脚本（SEO和GA4）
4. 随机选择工具名称
5. 创建新工具文件（如不存在）
6. Git提交并推送
7. 等待Cloudflare部署

### daily-deploy.sh（Linux/Mac）
**功能**: 每日自动部署新工具  
**位置**: `scripts/daily-deploy.sh`  
**运行时间**: 每天上午9:00  
**流程**: 同Windows版本

---

## 🎯 工具选择逻辑

### 当前工具列表（16个）
```
1. word-counter - 字数统计器
2. timezone-converter - 时区转换器
3. countdown-timer - 倒计时器
4. unit-converter - 单位转换器
5. online-calculator - 在线计算器
6. base64 - Base64编解码
7. hash-generator - Hash生成器
8. uuid-generator - UUID生成器
9. lorem-ipsum - Lorem Ipsum生成器
10. url-encoder - URL编解码器
11. regex-tester - 正则表达式测试器
12. cron-generator - Cron表达式生成器
13. qr-generator - 二维码生成器
14. password-generator - 密码生成器
15. color-picker - 颜色选择器
16. pdf-converter - PDF转换工具
```

### 随机选择算法
```batch
REM Windows批处理
set TOOLS=(word-counter timezone-converter ...)
for /f "tokens=*" %%i in ('powershell -Command "(Get-Random -InputObject @(word-counter,...))"') do set RANDOM_TOOL=%%i
```

```bash
# Linux/Mac
TOOLS=("word-counter" "timezone-converter" ...)
RANDOM_TOOL=${TOOLS[$((RANDOM % ${#TOOLS[@]}))]}
```

---

## 📊 预期效果

### 每日部署
```
✅ 每天上午9:00自动运行
✅ 随机选择1个工具名称
✅ 创建新工具文件（如不存在）
✅ 运行SEO和GA4优化
✅ Git提交并推送
✅ Cloudflare自动部署
```

### 工具增长
```
第1天: 18个工具（原有）
第2天: 19个工具（新增1个）
第3天: 20个工具（新增1个）
...
第30天: 48个工具（新增30个）
```

---

## ⚠️ 注意事项

### 重复工具检查
```
✅ 脚本会自动检查工具是否已存在
✅ 如已存在则跳过创建
✅ 但会重新运行SEO和GA4优化
```

### 日志记录
```
Windows: 查看任务计划程序日志
Linux/Mac: 查看cron.log文件
```

### 错误处理
```
✅ 脚本会检查每一步的执行状态
✅ 失败时会输出错误信息并退出
✅ Git提交失败时会跳过推送
```

---

## 🚀 立即测试

### 手动运行测试
```powershell
# Windows
schtasks /run /tn "DailyToolDeploy"

# 或
C:\Users\s\Documents\functional-website\multi-tools\scripts\daily-deploy.bat
```

```bash
# Linux/Mac
./scripts/daily-deploy.sh
```

### 验证结果
```
1. 检查Git提交历史
   git log --oneline -5

2. 检查GitHub仓库
   https://github.com/sunnyswx/multi-tools

3. 检查网站部署
   https://zh8888.dpdns.org
```

---

## 📝 配置完成检查清单

```
□ 定时任务已创建
□ 手动测试运行成功
□ Git推送成功
□ Cloudflare部署成功
□ GA4数据正常收集
□ 新工具页面可访问
```

---

**雄哥，每日自动部署系统已配置完成！每天上午9:00自动推送一个新工具。** ✅