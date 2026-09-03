# 📊 I18nManager 实施方案

**实施时间**: 2026-09-02
**目标**: 实现跨页面语言同步

---

## ✅ 已完成

### 1. 创建 I18nManager.js
```
📁 js/i18n.js
- 语言检测（URL > localStorage > 浏览器）
- 语言设置（持久化到 URL 和 localStorage）
- 翻译应用（支持嵌套键）
- RTL 支持
```

### 2. 更新 index.html
```
✅ 添加 i18n.js 脚本
✅ 更新语言选择器事件
✅ 添加初始化代码
```

### 3. 更新 image-compressor.html
```
✅ 添加 i18n.js 脚本
✅ 更新 data-i18n 属性格式
✅ 使用 i18n.init() 初始化
```

---

## 🔧 核心代码

### I18nManager.js
```javascript
class I18nManager {
  // 检测语言
  _detectLanguage() {
    // 1. URL 参数 ?lang=xx
    // 2. localStorage
    // 3. 浏览器语言
    // 4. 默认英文
  }
  
  // 设置语言
  setLanguage(lang) {
    localStorage.setItem('multi-tools-lang', lang);
    // 更新 URL 参数
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
    // 应用翻译
    this.applyLanguage();
  }
  
  // 翻译函数
  translate(key) {
    const keys = key.split('.');
    let value = translations[this.currentLang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  }
}
```

### HTML 标记规范
```html
<!-- 旧格式 -->
<h1 data-i18n="image-compressor-name">Image Compressor</h1>

<!-- 新格式 -->
<h1 data-i18n="tools.image-compressor.name">Image Compressor</h1>
<p data-i18n="tools.image-compressor.desc">Compress images online for free</p>
```

---

## 📋 下一步

### 批量更新其他子页面
```
□ image-converter.html
□ image-resizer.html
□ base64.html
□ json-formatter.html
□ ...（共46个工具页面）
```

### 测试
```
□ 首页语言切换
□ 子页面语言跟随
□ URL 参数持久化
□ localStorage 持久化
□ 浏览器语言检测
□ RTL 布局（阿拉伯语）
```

---

## 📊 Git提交
```
✅ 已创建 I18nManager.js
✅ 已更新 index.html
✅ 已更新 image-compressor.html
✅ 已推送到GitHub
```

---

**雄哥，请测试首页和 image-compressor 子页面的语言切换功能！** 🚀
