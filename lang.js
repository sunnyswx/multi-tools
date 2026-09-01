// Multi-language system - Complete translations
const translations = {
  en: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ Free Online Tools for Everyone',
    search_placeholder: 'Search tools...',
    footer_text: 'Free online tools for developers, designers, and everyone.',
    categories: {
      image: 'Image Tools',
      text: 'Text Tools',
      developer: 'Developer Tools',
      security: 'Security Tools',
      calculator: 'Calculator Tools',
      design: 'Design Tools',
      converter: 'Converter Tools',
      utility: 'Utility Tools',
      seo: 'SEO Tools'
    },
    tools: {
      'image-compressor': { name: 'Image Compressor', desc: 'Compress images online for free. Reduce file size while maintaining quality.' },
      'image-converter': { name: 'Image Converter', desc: 'Convert images between JPG, PNG, WebP formats online.' },
      'image-resizer': { name: 'Image Resizer', desc: 'Resize images to custom dimensions online.' },
      'color-picker': { name: 'Color Picker', desc: 'Pick colors and get HEX, RGB, HSL values.' },
      'gradient-generator': { name: 'Gradient Generator', desc: 'Create beautiful CSS gradients online.' },
      'shadow-generator': { name: 'Shadow Generator', desc: 'Create box-shadow and text-shadow CSS code.' },
      'box-model': { name: 'CSS Box Model', desc: 'Visualize and generate CSS box model code.' },
      'json-formatter': { name: 'JSON Formatter', desc: 'Format, validate and beautify JSON data instantly.' },
      'json-validator': { name: 'JSON Validator', desc: 'Validate JSON syntax and check for errors.' },
      'xml-formatter': { name: 'XML Formatter', desc: 'Format and validate XML data online.' },
      'markdown-editor': { name: 'Markdown Editor', desc: 'Edit Markdown online with live preview.' },
      'lorem-ipsum': { name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for your designs.' },
      'word-counter': { name: 'Word Counter', desc: 'Count words, characters, and paragraphs in real-time.' },
      'text-compressor': { name: 'Text Compressor', desc: 'Compress text to reduce size using deflate algorithm.' },
      'base64': { name: 'Base64 Encoder/Decoder', desc: 'Encode and decode Base64 strings online.' },
      'url-encoder': { name: 'URL Encoder', desc: 'Encode and decode URL components online.' },
      'hash-generator': { name: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes.' },
      'password-generator': { name: 'Password Generator', desc: 'Generate strong, secure passwords online.' },
      'password-strength': { name: 'Password Strength', desc: 'Check password strength and security level.' },
      'regex-tester': { name: 'Regex Tester', desc: 'Test regular expressions with real-time matching.' },
      'cron-generator': { name: 'Cron Generator', desc: 'Generate cron expressions for scheduling.' },
      'uuid-generator': { name: 'UUID Generator', desc: 'Generate unique UUIDs instantly.' },
      'qr-generator': { name: 'QR Code Generator', desc: 'Generate QR codes for text, URLs, WiFi.' },
      'csv-to-json': { name: 'CSV to JSON', desc: 'Convert CSV data to JSON format instantly.' },
      'unit-converter': { name: 'Unit Converter', desc: 'Convert between different units of measurement.' },
      'timezone-converter': { name: 'Timezone Converter', desc: 'Convert time between different timezones.' },
      'time-format': { name: 'Time Format', desc: 'Format and convert date/time strings.' },
      'age-calculator': { name: 'Age Calculator', desc: 'Calculate your exact age from birthdate.' },
      'bmi-calculator': { name: 'BMI Calculator', desc: 'Calculate Body Mass Index online.' },
      'mortgage-calculator': { name: 'Mortgage Calculator', desc: 'Calculate monthly mortgage payments.' },
      'percentage-calculator': { name: 'Percentage Calculator', desc: 'Calculate percentages easily online.' },
      'online-calculator': { name: 'Online Calculator', desc: 'Basic calculator for everyday math.' },
      'color-contrast-checker': { name: 'Color Contrast Checker', desc: 'Check color contrast for accessibility.' },
      'countdown-timer': { name: 'Countdown Timer', desc: 'Create countdown timers online.' },
      'pomodoro-timer': { name: 'Pomodoro Timer', desc: 'Time management with Pomodoro technique.' },
      'random-generator': { name: 'Random Generator', desc: 'Generate random numbers, strings, passwords.' },
      'pdf-converter': { name: 'PDF Converter', desc: 'Convert images to PDF online.' },
      'readability-score': { name: 'Readability Score', desc: 'Check text readability and comprehension level.' },
      'seo-analyzer': { name: 'SEO Analyzer', desc: 'Analyze basic SEO factors for web pages.' }
    }
  },
  
  zh: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ 免费在线工具',
    search_placeholder: '搜索工具...',
    footer_text: '为开发者、设计师和所有人提供的免费在线工具。',
    categories: {
      image: '图片工具',
      text: '文本工具',
      developer: '开发工具',
      security: '安全工具',
      calculator: '计算器工具',
      design: '设计工具',
      converter: '转换工具',
      utility: '实用工具',
      seo: 'SEO工具'
    },
    tools: {
      'image-compressor': { name: '图片压缩工具', desc: '免费在线压缩PNG、JPG、WebP图片，本地处理保护隐私' },
      'image-converter': { name: '图片格式转换', desc: '在线转换图片格式为JPG、PNG、WebP' },
      'image-resizer': { name: '图片尺寸调整', desc: '自定义尺寸调整图片大小' },
      'color-picker': { name: '颜色选择器', desc: '选择颜色并获取HEX、RGB、HSL值' },
      'gradient-generator': { name: '渐变生成器', desc: '在线创建美丽的CSS渐变' },
      'shadow-generator': { name: '阴影生成器', desc: '创建box-shadow和text-shadow CSS代码' },
      'box-model': { name: 'CSS盒子模型', desc: '可视化并生成CSS盒子模型代码' },
      'json-formatter': { name: 'JSON格式化', desc: '即时格式化、验证和美化JSON数据' },
      'json-validator': { name: 'JSON验证器', desc: '验证JSON语法并检查错误' },
      'xml-formatter': { name: 'XML格式化', desc: '在线格式化和验证XML数据' },
      'markdown-editor': { name: 'Markdown编辑器', desc: '实时预览，支持GitHub Flavored Markdown' },
      'lorem-ipsum': { name: 'Lorem Ipsum生成器', desc: '生成设计占位文本' },
      'word-counter': { name: '字数统计器', desc: '实时统计字数、字符数和段落数' },
      'text-compressor': { name: '文本压缩工具', desc: '使用deflate算法压缩文本' },
      'base64': { name: 'Base64编解码器', desc: '在线编码和解码Base64字符串' },
      'url-encoder': { name: 'URL编解码器', desc: '在线编码和解码URL组件' },
      'hash-generator': { name: 'Hash生成器', desc: '生成MD5、SHA-1、SHA-256、SHA-512哈希' },
      'password-generator': { name: '密码生成器', desc: '在线生成强密码' },
      'password-strength': { name: '密码强度检测', desc: '检查密码强度和安全性' },
      'regex-tester': { name: '正则表达式测试器', desc: '实时测试正则表达式' },
      'cron-generator': { name: 'Cron表达式生成器', desc: '生成定时任务Cron表达式' },
      'uuid-generator': { name: 'UUID生成器', desc: '即时生成唯一UUID' },
      'qr-generator': { name: '二维码生成器', desc: '为文本、URL、WiFi生成二维码' },
      'csv-to-json': { name: 'CSV转JSON', desc: '即时将CSV数据转换为JSON格式' },
      'unit-converter': { name: '单位转换器', desc: '在不同测量单位之间转换' },
      'timezone-converter': { name: '时区转换器', desc: '在不同时区之间转换时间' },
      'time-format': { name: '时间格式化工具', desc: '格式化和转换日期时间字符串' },
      'age-calculator': { name: '年龄计算器', desc: '根据出生日期计算精确年龄' },
      'bmi-calculator': { name: 'BMI计算器', desc: '在线计算身体质量指数' },
      'mortgage-calculator': { name: '房贷计算器', desc: '计算每月房贷还款额' },
      'percentage-calculator': { name: '百分比计算器', desc: '轻松计算百分比' },
      'online-calculator': { name: '在线计算器', desc: '日常数学基本计算器' },
      'color-contrast-checker': { name: '颜色对比度检查器', desc: '检查颜色对比度以符合无障碍标准' },
      'countdown-timer': { name: '倒计时器', desc: '在线创建倒计时' },
      'pomodoro-timer': { name: '番茄钟定时器', desc: '使用时间管理番茄工作法' },
      'random-generator': { name: '随机生成器', desc: '生成随机数字、字符串、密码' },
      'pdf-converter': { name: 'PDF转换器', desc: '将图片转换为PDF在线' },
      'readability-score': { name: '可读性评分', desc: '检查文本可读性和理解水平' },
      'seo-analyzer': { name: 'SEO分析器', desc: '分析网页基本SEO因素' }
    }
  },
  
  ja: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ 無料オンラインツール',
    search_placeholder: 'ツールを検索...',
    footer_text: '開発者、デザイナー、すべての人のための無料オンラインツール。',
    categories: {
      image: '画像ツール',
      text: 'テキストツール',
      developer: '開発者向けツール',
      security: 'セキュリティツール',
      calculator: '計算ツール',
      design: 'デザインツール',
      converter: '変換ツール',
      utility: 'ユーティリティツール',
      seo: 'SEOツール'
    },
    tools: {
      'image-compressor': { name: '画像圧縮ツール', desc: 'PNG、JPG、WebP画像を無料で圧縮' },
      'image-converter': { name: '画像変換ツール', desc: '画像形式をJPG、PNG、WebPに変換' },
      'color-picker': { name: 'カラーピッカー', desc: '色を選択してHEX、RGB、HSL値を取得' },
      'json-formatter': { name: 'JSONフォーマッター', desc: 'JSONデータをすぐにフォーマット' },
      'word-counter': { name: 'ワードカウンター', desc: '単語数、文字数、段落数をリアルタイムでカウント' }
    }
  },
  
  ko: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ 무료 온라인 도구',
    search_placeholder: '도구 검색...',
    footer_text: '개발자, 디자이너 및 모든 사람을 위한 무료 온라인 도구.',
    categories: {
      image: '이미지 도구',
      text: '텍스트 도구',
      developer: '개발자 도구',
      security: '보안 도구',
      calculator: '계산기 도구',
      design: '디자인 도구',
      converter: '변환 도구',
      utility: '유틸리티 도구',
      seo: 'SEO 도구'
    },
    tools: {
      'image-compressor': { name: '이미지 압축기', desc: 'PNG, JPG, WebP 이미지를 무료로 압축' },
      'color-picker': { name: '색상 선택기', desc: '색상을 선택하고 HEX, RGB, HSL 값을 얻으세요' },
      'json-formatter': { name: 'JSON 포매터', desc: 'JSON 데이터를 즉시 포맷팅' },
      'word-counter': { name: '워드 카운터', desc: '단어 수, 문자 수, 단락을 실시간으로 카운트' }
    }
  },
  
  es: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ Herramientas Online Gratis',
    search_placeholder: 'Buscar herramientas...',
    footer_text: 'Herramientas online gratuitas para desarrolladores, diseñadores y todos.',
    categories: {
      image: 'Herramientas de Imagen',
      text: 'Herramientas de Texto',
      developer: 'Herramientas para Desarrolladores',
      security: 'Herramientas de Seguridad',
      calculator: 'Calculadoras',
      design: 'Herramientas de Diseño',
      converter: 'Herramientas de Conversión',
      utility: 'Herramientas de Utilidad',
      seo: 'Herramientas SEO'
    },
    tools: {
      'image-compressor': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes PNG, JPG, WebP gratis' },
      'color-picker': { name: 'Selector de Color', desc: 'Selecciona colores y obtén valores HEX, RGB, HSL' },
      'json-formatter': { name: 'Formateador JSON', desc: 'Formatea datos JSON al instante' },
      'word-counter': { name: 'Contador de Palabras', desc: 'Cuenta palabras, caracteres y párrafos en tiempo real' }
    }
  },
  
  fr: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ Outils en Ligne Gratuits',
    search_placeholder: 'Rechercher des outils...',
    footer_text: 'Outils en ligne gratuits pour développeurs, designers et tout le monde.',
    categories: {
      image: 'Outils Image',
      text: 'Outils Texte',
      developer: 'Outils Développeur',
      security: 'Outils de Sécurité',
      calculator: 'Calculateurs',
      design: 'Outils de Design',
      converter: 'Outils de Conversion',
      utility: 'Outils Utility',
      seo: 'Outils SEO'
    },
    tools: {
      'image-compressor': { name: 'Compresseur d\'Images', desc: 'Compressez des images PNG, JPG, WebP gratuitement' },
      'color-picker': { name: 'Sélecteur de Couleurs', desc: 'Sélectionnez des couleurs et obtenez les valeurs HEX, RGB, HSL' },
      'json-formatter': { name: 'Formateur JSON', desc: 'Formatez des données JSON instantanément' },
      'word-counter': { name: 'Compteur de Mots', desc: 'Comptez les mots, caractères et paragraphes en temps réel' }
    }
  },
  
  de: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '43+ Kostenlose Online-Tools',
    search_placeholder: 'Tools suchen...',
    footer_text: 'Kostenlose Online-Tools für Entwickler, Designer und alle.',
    categories: {
      image: 'Bild-Tools',
      text: 'Text-Tools',
      developer: 'Entwickler-Tools',
      security: 'Sicherheits-Tools',
      calculator: 'Rechner',
      design: 'Design-Tools',
      converter: 'Konverter',
      utility: 'Utility-Tools',
      seo: 'SEO-Tools'
    },
    tools: {
      'image-compressor': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie PNG, JPG, WebP Bilder kostenlos' },
      'color-picker': { name: 'Farbauswahl', desc: 'Wählen Sie Farben und erhalten Sie HEX, RGB, HSL Werte' },
      'json-formatter': { name: 'JSON-Formatter', desc: 'Formatieren Sie JSON-Daten sofort' },
      'word-counter': { name: 'Wortzähler', desc: 'Zählen Sie Wörter, Zeichen und Absätze in Echtzeit' }
    }
  },
  
  ru: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ Бесплатных Онлайн-Инструментов',
    search_placeholder: 'Поиск инструментов...',
    footer_text: 'Бесплатные онлайн-инструменты для разработчиков, дизайнеров и всех.',
    categories: {
      image: 'Инструменты для Изображений',
      text: 'Инструменты для Текста',
      developer: 'Инструменты для Разработчиков',
      security: 'Инструменты Безопасности',
      calculator: 'Калькуляторы',
      design: 'Инструменты Дизайна',
      converter: 'Конвертеры',
      utility: 'Утилиты',
      seo: 'SEO-Инструменты'
    },
    tools: {
      'image-compressor': { name: 'Компрессор Изображений', desc: 'Бесплатно сжимайте PNG, JPG, WebP изображения' },
      'color-picker': { name: 'Селектор Цвета', desc: 'Выбирайте цвета и получайте значения HEX, RGB, HSL' },
      'json-formatter': { name: 'JSON Форматировщик', desc: 'Мгновенно форматируйте JSON данные' },
      'word-counter': { name: 'Счетчик Слов', desc: 'Подсчитывайте слова, символы и абзацы в реальном времени' }
    }
  },
  
  ar: {
    site_title: '🛠️ Multi Tools',
    site_subtitle: '46+ أداة عبر الإنترنت مجانية',
    search_placeholder: 'البحث عن أدوات...',
    footer_text: 'أدوات عبر الإنترنت مجانية للمطورين والمصممين والجميع.',
    categories: {
      image: 'أدوات الصور',
      text: 'أدوات النص',
      developer: 'أدوات المطور',
      security: 'أدوات الأمان',
      calculator: 'الحاسبات',
      design: 'أدوات التصميم',
      converter: 'أدوات التحويل',
      utility: 'أدوات مفيدة',
      seo: 'أدوات SEO'
    },
    tools: {
      'image-compressor': { name: 'ضاغط الصور', desc: 'اضغط الصور PNG, JPG, WebP مجانا' },
      'color-picker': { name: 'منتقي الألوان', desc: 'اختر الألوان واحصل على قيم HEX و RGB و HSL' },
      'json-formatter': { name: 'منسق JSON', desc: 'نسق بيانات JSON فورا' },
      'word-counter': { name: 'عداد الكلمات', desc: 'عد الكلمات والحروف والفقرات في الوقت الفعلي' }
    }
  }
};

// Get current language
function getLanguage() {
  return localStorage.getItem('multi-tools-lang') || 'en';
}

// Apply language to page
function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });
  
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) {
      el.placeholder = t[key];
    }
  });
  
  // Update language selector
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.value = lang;
  }
  
  // Update direction for RTL languages
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// Change language
function changeLanguage(lang) {
  localStorage.setItem('multi-tools-lang', lang);
  applyLanguage(lang);
  
  // Track language change
  if (typeof gtag !== 'undefined') {
    gtag('event', 'language_change', { language: lang });
  }
}

// Initialize language
function initLanguage() {
  const lang = getLanguage();
  applyLanguage(lang);
}
