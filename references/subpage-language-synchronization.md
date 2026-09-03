# 多语言跨页面同步方案

**创建时间**: 2026-09-02  
**问题**: 子页面语言不跟随首页切换  
**状态**: 待实施

---

## 问题根源

### 当前实现
```javascript
// 语言状态只在内存中
const lang = getLanguage(); // 从 localStorage 读取
applyLanguage(lang); // 应用翻译
```

### 问题
```
❌ 页面跳转时内存丢失
❌ 子页面无法获取语言设置
❌ 每次打开子页面都重置为英文
```

---

## 推荐方案：URL参数 + localStorage 双备份

### 架构设计
```
用户选择语言
    ↓
1. 更新 localStorage（快速缓存）
    ↓
2. 更新 URL 参数（权威来源）
    ↓
3. 页面跳转时从 URL 读取
    ↓
4. 无 URL 参数时从 localStorage 读取
    ↓
5. 无 localStorage 时使用浏览器语言
    ↓
6. 最终回退到英文
```

---

## 核心代码实现

### 1. I18nManager.js（新建）
```javascript
class I18nManager {
  constructor() {
    this.supportedLanguages = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
    this.rtlLanguages = ['ar'];
    this.currentLang = this._detectLanguage();
  }

  _detectLanguage() {
    // 1. URL 参数
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    if (langFromUrl && this.supportedLanguages.includes(langFromUrl)) {
      return langFromUrl;
    }

    // 2. localStorage
    const langFromStorage = localStorage.getItem('dpdns_lang');
    if (langFromStorage && this.supportedLanguages.includes(langFromStorage)) {
      return langFromStorage;
    }

    // 3. 浏览器语言
    const browserLang = navigator.language.split('-')[0];
    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // 4. 默认英文
    return 'en';
  }

  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) return;

    this.currentLang = lang;
    
    // 1. 更新 localStorage
    localStorage.setItem('dpdns_lang', lang);
    
    // 2. 更新 URL 参数
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    // 3. 处理 RTL
    document.documentElement.dir = this.rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // 4. 应用翻译
    this.applyLanguage();
  }

  translate(key) {
    if (typeof i18nMessages === 'undefined') {
      console.warn('i18nMessages dictionary not found.');
      return key;
    }

    const translation = i18nMessages[key];
    if (!translation) {
      console.warn(`Translation missing for key: "${key}"`);
      return key;
    }

    return translation[this.currentLang] || translation['en'] || key;
  }

  applyLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translatedText = this.translate(key);
      
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translatedText;
      } else {
        el.textContent = translatedText;
      }
    });
  }

  init() {
    this.setLanguage(this.currentLang);

    const langSelector = document.getElementById('language-selector');
    if (langSelector) {
      langSelector.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }
  }
}

// 全局实例
window.i18n = new I18nManager();
```

### 2. i18n.js（翻译字典，新建）
```javascript
const i18nMessages = {
  // 站点通用
  "site.title": {
    en: "DPDNS Tools",
    zh: "DPDNS 工具箱",
    ja: "DPDNS ツール",
    ko: "DPDNS 도구 모음",
    es: "Herramientas DPDNS",
    fr: "Outils DPDNS",
    de: "DPDNS Werkzeuge",
    ru: "Инструменты DPDNS",
    ar: "أدوات DPDNS"
  },
  
  // 工具示例
  "tools.compressor.name": {
    en: "Image Compressor",
    zh: "图片压缩工具",
    ja: "画像圧縮ツール",
    ko: "이미지 압축기",
    es: "Compresor de Imágenes",
    fr: "Compresseur d'Images",
    de: "Bild-Kompressor",
    ru: "Компрессор Изображений",
    ar: "ضاغط الصور"
  },
  
  "tools.compressor.desc": {
    en: "Compress images online for free",
    zh: "免费在线压缩图片",
    ja: "オンラインで画像を圧縮",
    ko: "온라인으로 이미지 압축",
    es: "Comprime imágenes en línea",
    fr: "Compressez des images en ligne",
    de: "Komprimieren Sie Bilder online",
    ru: "Сжимайте изображения онлайн",
    ar: "اضغط الصور عبر الإنترنت"
  }
};
```

### 3. HTML 标记规范
```html
<!-- 使用点分命名 -->
<h3 data-i18n="tools.compressor.name">Image Compressor</h3>
<p data-i18n="tools.compressor.desc">Compress images online for free</p>

<!-- 语言选择器 -->
<select id="language-selector" onchange="window.i18n.setLanguage(this.value)">
  <option value="en">English</option>
  <option value="zh">中文</option>
  <option value="ja">日本語</option>
  <!-- ... -->
</select>
```

---

## 实施步骤

### Phase 1: 创建核心文件（1小时）
```
□ 创建 I18nManager.js
□ 创建 i18n.js（翻译字典）
□ 更新 lang.js 格式（平铺字典）
```

### Phase 2: 更新首页（30分钟）
```
□ 引入 I18nManager.js 和 i18n.js
□ 更新语言选择器
□ 测试语言切换
```

### Phase 3: 批量更新子页面（3小时）
```
□ 创建批量更新脚本
□ 更新所有子页面
□ 测试语言跟随
```

### Phase 4: 测试验证（1小时）
```
□ 测试所有语言切换
□ 测试跨页面跳转
□ 测试刷新保持
□ 测试移动端
```

---

## 优势

### 1. URL 参数（权威来源）
```
✅ 支持分享带语言的链接
✅ 支持前进/后退按钮
✅ SEO 友好
✅ 页面刷新保持状态
```

### 2. localStorage（快速缓存）
```
✅ 快速读取，无需解析 URL
✅ 无 URL 参数时可回退
✅ 用户偏好持久化
```

### 3. 多层级回退
```
URL参数 > localStorage > 浏览器语言 > 英文
```

---

## 迁移策略

### 1. 保持向后兼容
```javascript
// 旧代码仍可用
function getLanguage() {
  return localStorage.getItem('multi-tools-lang') || 'en';
}

// 新代码优先
function getLanguage() {
  const urlParams = new URLSearchParams(window.location.search);
  const langFromUrl = urlParams.get('lang');
  if (langFromUrl) return langFromUrl;
  
  return localStorage.getItem('dpdns_lang') || 'en';
}
```

### 2. 渐进式迁移
```
1. 先创建新系统（I18nManager.js）
2. 更新首页测试
3. 批量更新子页面
4. 最终移除旧代码
```

---

## 参考资源

- 原文档：`多语言切换跨页面同步方案.docx`
- 翻译字典格式：平铺字典（点分命名）
- 语言代码：en, zh, ja, ko, es, fr, de, ru, ar

---

**雄哥，此方案已保存，可随时开始实施！** 🚀
