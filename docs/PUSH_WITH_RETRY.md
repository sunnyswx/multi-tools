# GitHub 推送重试机制

**创建时间**: 2026-08-31

---

## 📝 使用说明

### 方式1：使用Node.js脚本（推荐）

```bash
cd /c/Users/s/Documents/functional-website/multi-tools
node scripts/push-with-retry.js
```

### 方式2：使用WARP + 脚本

```bash
# 启动WARP
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" connect

# 执行推送脚本（自动重试3次，每次间隔300秒）
node scripts/push-with-retry.js

# 关闭WARP
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" disconnect
```

---

## ⚙️ 配置参数

```javascript
const MAX_RETRIES = 3;      // 最大重试次数
const RETRY_DELAY = 300;    // 重试间隔（秒）
```

---

## 📊 执行流程

```
第1次尝试 → 成功：结束
          → 失败：等待300秒

第2次尝试 → 成功：结束
          → 失败：等待300秒

第3次尝试 → 成功：结束
          → 失败：提示手动推送
```

---

## 🔧 手动推送（备选方案）

如果脚本失败，请雄哥手动执行：

```bash
cd /c/Users/s/Documents/functional-website/multi-tools
git push origin main
```

或使用GitHub Desktop。

---

## ⚠️ 注意事项

1. **网络问题**：国内访问GitHub可能需要WARP代理
2. **认证问题**：确保GitHub Token有效
3. **等待时间**：3次重试最多需要10分钟（含等待时间）

---

**雄哥，脚本已创建！可以直接使用！** 🚀
