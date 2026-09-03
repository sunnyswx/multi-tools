/**
 * I18nManager.js - 多语言状态管理器
 * 负责跨页面语言同步、翻译应用及UI交互
 */
class I18nManager {
  constructor() {
    // 支持的语言列表
    this.supportedLanguages = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
    // RTL (从右到左) 语言列表
    this.rtlLanguages = ['ar'];
    
    // 初始化语言：优先级为 URL参数 > localStorage > 浏览器语言 > 默认英文
    this.currentLang = this._detectLanguage();
  }

  /**
   * 内部方法：检测当前应使用的语言
   */
  _detectLanguage() {
    // 1. 检查 URL 参数 ?lang=xx
    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang');
    if (langFromUrl && this.supportedLanguages.includes(langFromUrl)) {
      return langFromUrl;
    }

    // 2. 检查 localStorage
    const langFromStorage = localStorage.getItem('multi-tools-lang');
    if (langFromStorage && this.supportedLanguages.includes(langFromStorage)) {
      return langFromStorage;
    }

    // 3. 检查浏览器语言
    const browserLang = navigator.language.split('-')[0];
    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // 4. 默认返回英文
    return 'en';
  }

  /**
   * 获取当前语言代码
   */
  getLanguage() {
    return this.currentLang;
  }

  /**
   * 设置语言并持久化
   * @param {string} lang - 语言代码
   */
  setLanguage(lang) {
    if (!this.supportedLanguages.includes(lang)) return;

    this.currentLang = lang;
    
    // 1. 更新 localStorage
    localStorage.setItem('multi-tools-lang', lang);
    
    // 2. 更新 URL 参数 (不刷新页面，使用 history.replaceState)
    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    // 3. 处理 RTL 布局
    document.documentElement.dir = this.rtlLanguages.includes(lang) ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // 4. 应用翻译到页面
    this.applyLanguage();
    
    // 5. 触发事件通知其他组件
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
  }

  /**
   * 翻译函数，支持嵌套键
   * @param {string} key - 翻译键，如 "tools.image-compressor.name"
   * @returns {string} 翻译后的文本
   */
  translate(key) {
    // 检查全局翻译字典是否存在
    if (typeof translations === 'undefined') {
      console.warn('translations dictionary not found.');
      return key;
    }

    // 支持嵌套键访问
    const keys = key.split('.');
    let value = translations[this.currentLang];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // 回退到英文
        value = translations['en'];
        for (const kk of keys) {
          if (value && value[kk]) {
            value = value[kk];
          } else {
            return key;
          }
        }
        break;
      }
    }

    // 如果是对象，返回 name 或 desc
    if (typeof value === 'object' && value !== null) {
      return value.name || value.desc || key;
    }

    return value || key;
  }

  /**
   * 将翻译应用到所有带 data-i18n 属性的 DOM 元素
   */
  applyLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translatedText = this.translate(key);
      
      // 根据元素类型决定如何设置内容
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translatedText;
      } else {
        el.textContent = translatedText;
      }
    });
  }

  /**
   * 初始化语言管理器，绑定语言切换事件
   */
  init() {
    // 首次加载时立即应用语言（防止闪烁）
    this.setLanguage(this.currentLang);

    // 绑定语言切换下拉菜单事件
    const langSelector = document.getElementById('langSelect');
    if (langSelector) {
      langSelector.addEventListener('change', (e) => {
        this.setLanguage(e.target.value);
      });
    }
  }

  /**
   * 获取支持的语言列表
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

// 创建全局实例
const i18n = new I18nManager();

// 导出到全局
window.I18nManager = I18nManager;
window.i18n = i18n;
