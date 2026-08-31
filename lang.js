// Multi-language support system
// Supported languages: en, zh, ja, ko, es, fr, de, ru, ar

const translations = {
  en: {
    // Homepage
    site_title: "Multi Tools - Free Online Tools Collection",
    site_description: "43+ free online tools for developers, designers, and everyone.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ Free Online Tools for Everyone",
    search_placeholder: "Search tools...",
    footer_text: "Free online tools for developers, designers, and everyone.",
    
    // Tool categories
    image_tools: "Image Tools",
    text_tools: "Text Tools",
    developer_tools: "Developer Tools",
    security_tools: "Security Tools",
    calculator_tools: "Calculator Tools",
    design_tools: "Design Tools",
    converter_tools: "Converter Tools",
    utility_tools: "Utility Tools",
    seo_tools: "SEO Tools",
    
    // Tool names and descriptions
    tools: [
      { name: "Image Compressor", desc: "Compress images online for free. Reduce file size while maintaining quality." },
      { name: "Image Converter", desc: "Convert images between JPG, PNG, WebP formats online." },
      { name: "Image Resizer", desc: "Resize images to custom dimensions online." },
      { name: "Markdown Editor", desc: "Edit Markdown online with live preview." },
      { name: "Lorem Ipsum Generator", desc: "Generate placeholder text for your designs." },
      { name: "Word Counter", desc: "Count words, characters, and paragraphs in real-time." },
      { name: "Text Compressor", desc: "Compress text to reduce size using deflate algorithm." },
      { name: "JSON Formatter", desc: "Format, validate and beautify JSON data instantly." },
      { name: "JSON Validator", desc: "Validate JSON syntax and check for errors." },
      { name: "XML Formatter", desc: "Format and validate XML data online." },
      { name: "Base64 Encoder/Decoder", desc: "Encode and decode Base64 strings online." },
      { name: "URL Encoder", desc: "Encode and decode URL components online." },
      { name: "Regex Tester", desc: "Test regular expressions with real-time matching." },
      { name: "Hash Generator", desc: "Generate MD5, SHA-1, SHA-256, SHA-512 hashes." },
      { name: "UUID Generator", desc: "Generate unique UUIDs instantly." },
      { name: "Cron Generator", desc: "Generate cron expressions for scheduling." },
      { name: "Password Generator", desc: "Generate strong, secure passwords online." },
      { name: "Password Strength", desc: "Check password strength and security level." },
      { name: "Age Calculator", desc: "Calculate your exact age from birthdate." },
      { name: "BMI Calculator", desc: "Calculate Body Mass Index online." },
      { name: "Mortgage Calculator", desc: "Calculate monthly mortgage payments." },
      { name: "Percentage Calculator", desc: "Calculate percentages easily online." },
      { name: "Online Calculator", desc: "Basic calculator for everyday math." },
      { name: "Color Picker", desc: "Pick colors and get HEX, RGB, HSL values." },
      { name: "Gradient Generator", desc: "Create beautiful CSS gradients online." },
      { name: "CSS Box Model", desc: "Visualize and generate CSS box model code." },
      { name: "CSS Shadow Generator", desc: "Create box-shadow and text-shadow CSS code." },
      { name: "Unit Converter", desc: "Convert between different units of measurement." },
      { name: "Timezone Converter", desc: "Convert time between different timezones." },
      { name: "Time Format", desc: "Format and convert date/time strings." },
      { name: "CSV to JSON", desc: "Convert CSV data to JSON format instantly." },
      { name: "QR Code Generator", desc: "Generate QR codes for text, URLs, WiFi." },
      { name: "PDF Converter", desc: "Convert images to PDF online." },
      { name: "Countdown Timer", desc: "Create countdown timers online." },
      { name: "Random Generator", desc: "Generate random numbers, strings, passwords." },
      { name: "SEO Analyzer", desc: "Analyze basic SEO factors for web pages." },
      { name: "Readability Score", desc: "Check text readability and comprehension level." }
    ]
  },
  
  zh: {
    // Homepage
    site_title: "Multi Tools - 免费在线工具集",
    site_description: "43+免费在线工具，专为开发者、设计师和所有人打造。",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ 免费在线工具",
    search_placeholder: "搜索工具...",
    footer_text: "为开发者、设计师和所有人提供的免费在线工具。",
    
    // Tool categories
    image_tools: "图片工具",
    text_tools: "文本工具",
    developer_tools: "开发工具",
    security_tools: "安全工具",
    calculator_tools: "计算器工具",
    design_tools: "设计工具",
    converter_tools: "转换工具",
    utility_tools: "实用工具",
    seo_tools: "SEO工具",
    
    // Tool names and descriptions
    tools: [
      { name: "图片压缩工具", desc: "免费在线压缩PNG、JPG、WebP图片，本地处理保护隐私" },
      { name: "图片格式转换", desc: "在线转换图片格式为JPG、PNG、WebP" },
      { name: "图片尺寸调整", desc: "自定义尺寸调整图片大小" },
      { name: "Markdown编辑器", desc: "实时预览，支持GitHub Flavored Markdown" },
      { name: "Lorem Ipsum生成器", desc: "生成设计占位文本" },
      { name: "字数统计器", desc: "实时统计字数、字符数和段落数" },
      { name: "文本压缩工具", desc: "使用deflate算法压缩文本" },
      { name: "JSON格式化", desc: "即时格式化、验证和美化JSON数据" },
      { name: "JSON验证器", desc: "验证JSON语法并检查错误" },
      { name: "XML格式化", desc: "在线格式化和验证XML数据" },
      { name: "Base64编解码器", desc: "在线编码和解码Base64字符串" },
      { name: "URL编解码器", desc: "在线编码和解码URL组件" },
      { name: "正则表达式测试器", desc: "实时测试正则表达式" },
      { name: "Hash生成器", desc: "生成MD5、SHA-1、SHA-256、SHA-512哈希" },
      { name: "UUID生成器", desc: "即时生成唯一UUID" },
      { name: "Cron表达式生成器", desc: "生成定时任务Cron表达式" },
      { name: "密码生成器", desc: "在线生成强密码" },
      { name: "密码强度检测", desc: "检查密码强度和安全性" },
      { name: "年龄计算器", desc: "根据出生日期计算精确年龄" },
      { name: "BMI计算器", desc: "在线计算身体质量指数" },
      { name: "房贷计算器", desc: "计算每月房贷还款额" },
      { name: "百分比计算器", desc: "轻松计算百分比" },
      { name: "在线计算器", desc: "日常数学基本计算器" },
      { name: "颜色选择器", desc: "选择颜色并获取HEX、RGB、HSL值" },
      { name: "渐变生成器", desc: "在线创建美丽的CSS渐变" },
      { name: "CSS盒子模型", desc: "可视化并生成CSS盒子模型代码" },
      { name: "CSS阴影生成器", desc: "创建box-shadow和text-shadow CSS代码" },
      { name: "单位转换器", desc: "在不同测量单位之间转换" },
      { name: "时区转换器", desc: "在不同时区之间转换时间" },
      { name: "时间格式化工具", desc: "格式化和转换日期时间字符串" },
      { name: "CSV转JSON", desc: "即时将CSV数据转换为JSON格式" },
      { name: "二维码生成器", desc: "为文本、URL、WiFi生成二维码" },
      { name: "PDF转换器", desc: "将图片转换为PDF在线" },
      { name: "倒计时器", desc: "在线创建倒计时" },
      { name: "随机生成器", desc: "生成随机数字、字符串、密码" },
      { name: "SEO分析器", desc: "分析网页基本SEO因素" },
      { name: "可读性评分", desc: "检查文本可读性和理解水平" }
    ]
  },
  
  ja: {
    site_title: "Multi Tools - 無料オンラインツールコレクション",
    site_description: "開発者、デザイナー、すべての人のための43+の無料オンラインツール。",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ 無料オンラインツール",
    search_placeholder: "ツールを検索...",
    footer_text: "開発者、デザイナー、すべての人のための無料オンラインツール。",
    image_tools: "画像ツール",
    text_tools: "テキストツール",
    developer_tools: "開発者向けツール",
    security_tools: "セキュリティツール",
    calculator_tools: "計算ツール",
    design_tools: "デザインツール",
    converter_tools: "変換ツール",
    utility_tools: "ユーティリティツール",
    seo_tools: "SEOツール",
    tools: [
      { name: "画像圧縮ツール", desc: "PNG、JPG、WebP画像を無料で圧縮" },
      { name: "Markdownエディター", desc: "ライブプレビュー付きでMarkdownを編集" },
      { name: "JSONフォーマッター", desc: "JSONデータをすぐにフォーマット" },
      { name: "パスワード生成器", desc: "強力なセキュリティパスワードを生成" },
      { name: "QRコード生成器", desc: "テキスト、URL、WiFi用のQRコードを生成" }
    ]
  },
  
  ko: {
    site_title: "Multi Tools - 무료 온라인 도구 모음",
    site_description: "개발자, 디자이너 및 모든 사람을 위한 43+ 무료 온라인 도구.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ 무료 온라인 도구",
    search_placeholder: "도구 검색...",
    footer_text: "개발자, 디자이너 및 모든 사람을 위한 무료 온라인 도구.",
    image_tools: "이미지 도구",
    text_tools: "텍스트 도구",
    developer_tools: "개발자 도구",
    security_tools: "보안 도구",
    calculator_tools: "계산기 도구",
    design_tools: "디자인 도구",
    converter_tools: "변환 도구",
    utility_tools: "유틸리티 도구",
    seo_tools: "SEO 도구",
    tools: [
      { name: "이미지 압축기", desc: "PNG, JPG, WebP 이미지를 무료로 압축" },
      { name: "Markdown 편집기", desc: "실시간 미리보기로 Markdown 편집" },
      { name: "JSON 포매터", desc: "JSON 데이터를 즉시 포맷팅" },
      { name: "비밀번호 생성기", desc: "강력한 보안 비밀번호 생성" },
      { name: "QR 코드 생성기", desc: "텍스트, URL, WiFi용 QR 코드 생성" }
    ]
  },
  
  es: {
    site_title: "Multi Tools - Colección de Herramientas Online Gratis",
    site_description: "Más de 43 herramientas online gratuitas para desarrolladores, diseñadores y todos.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ Herramientas Online Gratis",
    search_placeholder: "Buscar herramientas...",
    footer_text: "Herramientas online gratuitas para desarrolladores, diseñadores y todos.",
    image_tools: "Herramientas de Imagen",
    text_tools: "Herramientas de Texto",
    developer_tools: "Herramientas para Desarrolladores",
    security_tools: "Herramientas de Seguridad",
    calculator_tools: "Calculadoras",
    design_tools: "Herramientas de Diseño",
    converter_tools: "Herramientas de Conversión",
    utility_tools: "Herramientas de Utilidad",
    seo_tools: "Herramientas SEO",
    tools: [
      { name: "Compresor de Imágenes", desc: "Comprime imágenes PNG, JPG, WebP gratis" },
      { name: "Editor Markdown", desc: "Edita Markdown con vista previa en vivo" },
      { name: "Formateador JSON", desc: "Formatea datos JSON al instante" },
      { name: "Generador de Contraseñas", desc: "Genera contraseñas seguras y fuertes" },
      { name: "Generador de QR", desc: "Genera códigos QR para texto, URLs, WiFi" }
    ]
  },
  
  fr: {
    site_title: "Multi Tools - Collection d'Outils en Ligne Gratuits",
    site_description: "Plus de 43 outils en ligne gratuits pour développeurs, designers et tout le monde.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ Outils en Ligne Gratuits",
    search_placeholder: "Rechercher des outils...",
    footer_text: "Outils en ligne gratuits pour développeurs, designers et tout le monde.",
    image_tools: "Outils Image",
    text_tools: "Outils Texte",
    developer_tools: "Outils Développeur",
    security_tools: "Outils de Sécurité",
    calculator_tools: "Calculateurs",
    design_tools: "Outils de Design",
    converter_tools: "Outils de Conversion",
    utility_tools: "Outils Utility",
    seo_tools: "Outils SEO",
    tools: [
      { name: "Compresseur d'Images", desc: "Compressez des images PNG, JPG, WebP gratuitement" },
      { name: "Éditeur Markdown", desc: "Éditez du Markdown avec prévisualisation en direct" },
      { name: "Formateur JSON", desc: "Formatez des données JSON instantanément" },
      { name: "Générateur de Mot de Passe", desc: "Générez des mots de passe sécurisés" },
      { name: "Générateur de QR", desc: "Générez des codes QR pour texte, URLs, WiFi" }
    ]
  },
  
  de: {
    site_title: "Multi Tools - Kostenlose Online-Tools Sammlung",
    site_description: "Über 43 kostenlose Online-Tools für Entwickler, Designer und alle.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ Kostenlose Online-Tools",
    search_placeholder: "Tools suchen...",
    footer_text: "Kostenlose Online-Tools für Entwickler, Designer und alle.",
    image_tools: "Bild-Tools",
    text_tools: "Text-Tools",
    developer_tools: "Entwickler-Tools",
    security_tools: "Sicherheits-Tools",
    calculator_tools: "Rechner",
    design_tools: "Design-Tools",
    converter_tools: "Konverter",
    utility_tools: "Utility-Tools",
    seo_tools: "SEO-Tools",
    tools: [
      { name: "Bild-Kompressor", desc: "Komprimieren Sie PNG, JPG, WebP Bilder kostenlos" },
      { name: "Markdown-Editor", desc: "Bearbeiten Sie Markdown mit Live-Vorschau" },
      { name: "JSON-Formatter", desc: "Formatieren Sie JSON-Daten sofort" },
      { name: "Passwort-Generator", desc: "Generieren Sie sichere Passwörter" },
      { name: "QR-Generator", desc: "Generieren Sie QR-Codes für Text, URLs, WiFi" }
    ]
  },
  
  ru: {
    site_title: "Multi Tools - Коллекция Бесплатных Онлайн-Инструментов",
    site_description: "Более 43 бесплатных онлайн-инструментов для разработчиков, дизайнеров и всех.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ Бесплатных Онлайн-Инструмента",
    search_placeholder: "Поиск инструментов...",
    footer_text: "Бесплатные онлайн-инструменты для разработчиков, дизайнеров и всех.",
    image_tools: "Инструменты для Изображений",
    text_tools: "Инструменты для Текста",
    developer_tools: "Инструменты для Разработчиков",
    security_tools: "Инструменты Безопасности",
    calculator_tools: "Калькуляторы",
    design_tools: "Инструменты Дизайна",
    converter_tools: "Конвертеры",
    utility_tools: "Утилиты",
    seo_tools: "SEO-Инструменты",
    tools: [
      { name: "Компрессор Изображений", desc: "Бесплатно сжимайте PNG, JPG, WebP изображения" },
      { name: "Markdown Редактор", desc: "Редактируйте Markdown с предпросмотром" },
      { name: "JSON Форматировщик", desc: "Мгновенно форматируйте JSON данные" },
      { name: "Генератор Паролей", desc: "Генерируйте надежные пароли" },
      { name: "QR Генератор", desc: "Генерируйте QR-коды для текста, URL, WiFi" }
    ]
  },
  
  ar: {
    site_title: "أدوات متعددة - مجموعة أدوات عبر الإنترنت مجانية",
    site_description: "أكثر من 43 أداة عبر الإنترنت مجانية للمطورين والمصممين والجميع.",
    header_title: "🛠️ Multi Tools",
    header_subtitle: "43+ أداة عبر الإنترنت مجانية",
    search_placeholder: "البحث عن أدوات...",
    footer_text: "أدوات عبر الإنترنت مجانية للمطورين والمصممين والجميع.",
    image_tools: "أدوات الصور",
    text_tools: "أدوات النص",
    developer_tools: "أدوات المطور",
    security_tools: "أدوات الأمان",
    calculator_tools: "الحاسبات",
    design_tools: "أدوات التصميم",
    converter_tools: "أدوات التحويل",
    utility_tools: "أدوات مفيدة",
    seo_tools: "أدوات SEO",
    tools: [
      { name: "ضاغط الصور", desc: "اضغط الصور PNG, JPG, WebP مجاناً" },
      { name: "محرر Markdown", desc: "حرر Markdown مع معاينة مباشرة" },
      { name: "منسق JSON", desc: "نسق بيانات JSON فوراً" },
      { name: "مولد كلمة المرور", desc: "أنشئ كلمات مرور آمنة" },
      { name: "مولد QR", desc: "أنشئ رموز QR للنص وURLs وWiFi" }
    ]
  }
};

// Detect browser language
function detectLanguage() {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.toLowerCase().slice(0, 2);
  
  // Check if we have translation for this language
  if (translations[langCode]) {
    return langCode;
  }
  
  // Check if it's a variant (e.g., zh-TW, zh-HK)
  if (langCode.startsWith('zh')) {
    return 'zh';
  }
  if (langCode.startsWith('es')) {
    return 'es';
  }
  if (langCode.startsWith('fr')) {
    return 'fr';
  }
  if (langCode.startsWith('de')) {
    return 'de';
  }
  if (langCode.startsWith('ru')) {
    return 'ru';
  }
  if (langCode.startsWith('ja')) {
    return 'ja';
  }
  if (langCode.startsWith('ko')) {
    return 'ko';
  }
  if (langCode.startsWith('ar')) {
    return 'ar';
  }
  
  // Default to English
  return 'en';
}

// Get current language - MANUAL ONLY, no auto-detection
function getCurrentLanguage() {
  // Always return stored language, never auto-detect
  return localStorage.getItem('multi-tools-lang') || 'en';
}

// Set language
function setLanguage(lang) {
  localStorage.setItem('multi-tools-lang', lang);
  applyLanguage(lang);
}

// Apply language to page
function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update title
  document.title = t.site_title;
  
  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = t.site_description;
  
  // Update header
  const headerTitle = document.querySelector('header h1');
  if (headerTitle) headerTitle.textContent = t.header_title;
  
  const headerSubtitle = document.querySelector('header p');
  if (headerSubtitle) headerSubtitle.textContent = t.header_subtitle;
  
  // Update search placeholder
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.placeholder = t.search_placeholder;
  
  // Update footer
  const footerText = document.querySelector('footer p:last-child');
  if (footerText) footerText.textContent = t.footer_text;
  
  // Update tool cards
  if (t.tools && t.tools.length > 0) {
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach((card, index) => {
      if (t.tools[index]) {
        const nameEl = card.querySelector('.tool-name');
        const descEl = card.querySelector('.tool-desc');
        if (nameEl) nameEl.textContent = t.tools[index].name;
        if (descEl) descEl.textContent = t.tools[index].desc;
      }
    });
  }
  
  // Update language selector
  updateLanguageSelector(lang);
  
  // Update direction for RTL languages
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Track language change
  if (typeof gtag !== 'undefined') {
    gtag('event', 'language_change', { 'language': lang });
  }
}

// Update language selector UI
function updateLanguageSelector(currentLang) {
  const selector = document.getElementById('langSelector');
  if (!selector) return;
  
  selector.value = currentLang;
}

// Initialize language
function initLanguage() {
  const lang = getCurrentLanguage();
  applyLanguage(lang);
}

// Export for use in other scripts
window.multiLanguage = {
  detect: detectLanguage,
  get: getCurrentLanguage,
  set: setLanguage,
  init: initLanguage,
  apply: applyLanguage,
  translations: translations
};