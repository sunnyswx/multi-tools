# WARP代理配置指南

## 问题场景
在国内网络环境下，GitHub访问被屏蔽，git push/pull失败。

## 解决方案

### 1. 检查WARP安装位置
```bash
ls -la "/c Program Files/Cloudflare/Cloudflare WARP/warp-cli"
```

### 2. 启动WARP
```bash
# 查看状态
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" status

# 连接WARP
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" connect

# 验证连接
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" status
# 应显示: Status update: Connected, Network: healthy
```

### 3. 推送代码
```bash
cd /c/Users/s/Documents/functional-website/multi-tools
git push origin main
```

### 4. 关闭WARP
```bash
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" disconnect
```

## 验证方法
```bash
# 测试GitHub连接
curl -I https://github.com

# 查看WARP状态
"/c/Program Files/Cloudflare/Cloudflare WARP/warp-cli" status
```

## 常见问题

### Q: WARP已连接但仍无法访问GitHub
A: 尝试重启WARP或检查系统防火墙设置

### Q: 是否需要配置Git代理？
A: 通常不需要，WARP直接生效。如果仍需配置：
```bash
git config --global http.proxy http://127.0.0.1:8080
git config --global https.proxy http://127.0.0.1:8080
```
推送完成后务必清理：
```bash
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 注意事项
- WARP连接后通常不需要额外代理配置
- 推送完成后务必关闭WARP
- 不要在Git配置中永久保存代理设置
