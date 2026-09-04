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
      'image-compressor-page': { name: 'Image Compressor', desc: 'Compress images online for free' },
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
      'base64-image-converter': { name: 'Base64 Image Converter', desc: 'Convert images to Base64 data URL format.' },
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
      'seo-analyzer': { name: 'SEO Analyzer', desc: 'Analyze basic SEO factors for web pages.' },
      'base64-image-converter': { name: 'Base64 Image Converter', desc: 'Convert images to Base64 data URL format.' },
      'case-converter': { name: 'Case Converter', desc: 'Convert text to uppercase, lowercase, title case.' },
      'css-box-model': { name: 'CSS Box Model', desc: 'Visualize CSS margin, padding, border, and content.' },
      'css-minifier': { name: 'CSS Minifier', desc: 'Compress and minify CSS code for faster loading.' },
      'html-entity-encoder': { name: 'HTML Entity Encoder', desc: 'Encode or decode HTML special characters and entities.' },
      'lorem-ipsum-generator': { name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for designs and mockups.' },
      'markdown-to-html': { name: 'Markdown to HTML', desc: 'Convert Markdown text to HTML format instantly.' },
      'text-repeater': { name: 'Text Repeater', desc: 'Repeat text multiple times with custom separators.' },
      'url-encoder-decoder': { name: 'URL Encoder/Decoder', desc: 'Encode and decode URL components online.' },
      'timestamp-converter': { name: 'Timestamp Converter', desc: 'Convert Unix timestamps to human-readable dates.' },
      'text-to-speech': { name: 'Text to Speech', desc: 'Convert text to speech using Web Speech API.' },
      'image-compressor-desc': { name: 'Image Compressor', desc: 'Compress images online for free' },
      'image-compressor-name': { name: 'Image Compressor', desc: 'Compress images online for free' },
      'image-compressor-desc': { desc: 'Compress images online for free' }
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
      'image-compressor-page': { name: '图片压缩工具', desc: '免费在线压缩图片' },
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
      'base64-image-converter': { name: 'Base64图片转换器', desc: '将图片转换为Base64数据URL格式' },
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
      'seo-analyzer': { name: 'SEO分析器', desc: '分析网页基本SEO因素' },
      'base64-image-converter': { name: 'Base64图片转换', desc: '将图片转换为Base64数据URL格式' },
      'case-converter': { name: '大小写转换器', desc: '转换文本为大小写、标题格式' },
      'css-box-model': { name: 'CSS盒子模型', desc: '可视化CSS边距、内边距、边框和内容' },
      'css-minifier': { name: 'CSS压缩器', desc: '压缩和最小化CSS代码以提高加载速度' },
      'html-entity-encoder': { name: 'HTML实体编解码', desc: '编码或解码HTML特殊字符和实体' },
      'lorem-ipsum-generator': { name: 'Lorem Ipsum生成器', desc: '为设计和原型生成占位文本' },
      'markdown-to-html': { name: 'Markdown转HTML', desc: '将Markdown文本转换为HTML格式' },
      'text-repeater': { name: '文本重复器', desc: '使用自定义分隔符重复文本多次' },
      'url-encoder-decoder': { name: 'URL编解码器', desc: '在线编码和解码URL组件' },
      'timestamp-converter': { name: '时间戳转换器', desc: '将Unix时间戳转换为人类可读日期' },
      'text-to-speech': { name: '文本转语音', desc: '使用Web Speech API将文本转换为语音' },
      'image-compressor-desc': { name: '图片压缩工具', desc: '免费在线压缩图片' },
      'image-compressor-name': { name: '图片压缩工具', desc: '免费在线压缩图片' },
      'image-compressor-desc': { desc: '免费在线压缩图片' }
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
      'image-compressor-page': { name: '画像圧縮ツール', desc: 'オンラインで画像を無料で圧縮' },
      'image-converter': { name: '画像変換ツール', desc: '画像形式をJPG、PNG、WebPに変換' },
      'image-resizer': { name: '画像リサイズツール', desc: 'カスタムサイズで画像をリサイズ' },
      'color-picker': { name: 'カラーピッカー', desc: '色を選択してHEX、RGB、HSL値を取得' },
      'json-formatter': { name: 'JSONフォーマッター', desc: 'JSONデータをすぐにフォーマット' },
      'word-counter': { name: 'ワードカウンター', desc: '単語数、文字数、段落数をリアルタイムでカウント' },
      'base64': { name: 'Base64エンコーダー/デコーダー', desc: 'Base64文字列をオンラインでエンコードおよびデコード' },
      'base64-image-converter': { name: 'Base64画像変換', desc: '画像をBase64データURL形式に変換' },
      'case-converter': { name: 'ケース変換', desc: 'テキストを大文字、小文字、タイトルケースに変換' },
      'css-box-model': { name: 'CSSボックスモデル', desc: 'CSSのマージン、パディング、ボーダー、コンテンツを可視化' },
      'css-minifier': { name: 'CSSミニファイア', desc: '読み込みを高速化するためにCSSコードを圧縮・最小化' },
      'html-entity-encoder': { name: 'HTMLエンティティエンコーダ', desc: 'HTML特殊文字とエンティティをエンコードまたはデコード' },
      'lorem-ipsum-generator': { name: 'Lorem Ipsumジェネレータ', desc: 'デザインとモックアップ用のプレースホルダーテキストを生成' },
      'markdown-to-html': { name: 'Markdown to HTML', desc: 'MarkdownテキストをHTML形式に変換' },
      'text-repeater': { name: 'テキストリピーター', desc: 'カスタムセパレータでテキストを複数回繰り返す' },
      'url-encoder-decoder': { name: 'URLエンコーダ/デコーダ', desc: 'URLコンポーネントをオンラインでエンコードおよびデコード' },
      'timestamp-converter': { name: 'タイムスタンプコンバーター', desc: 'Unixタイムスタンプを人間が読みできる日付に変換' },
      'text-to-speech': { name: 'テキスト読み上げ', desc: 'Web Speech APIを使用してテキストを音声に変換' },
      'image-compressor-desc': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' },
      'image-compressor-name': { name: '画像圧縮ツール', desc: 'オンラインで画像を圧縮' },
      'image-compressor-desc': { desc: 'オンラインで画像を圧縮' }
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
      'image-compressor-page': { name: '이미지 압축기', desc: '온라인으로 이미지를 무료로 압축' },
      'color-picker': { name: '색상 선택기', desc: '색상을 선택하고 HEX, RGB, HSL 값을 얻으세요' },
      'json-formatter': { name: 'JSON 포매터', desc: 'JSON 데이터를 즉시 포맷팅' },
      'word-counter': { name: '워드 카운터', desc: '단어 수, 문자 수, 단락을 실시간으로 카운트' },
      'base64': { name: 'Base64 인코더/디코더', desc: 'Base64 문자열을 온라인으로 인코딩 및 디코딩' },
      'base64-image-converter': { name: 'Base64 이미지 변환기', desc: '이미지를 Base64 데이터 URL 형식으로 변환' },
      'case-converter': { name: '대소문자 변환기', desc: '텍스트를 대문자, 소문자, 제목 사례로 변환' },
      'css-box-model': { name: 'CSS 박스 모델', desc: 'CSS 마진, 패딩, 테두리 및 콘텐츠를 시각화' },
      'css-minifier': { name: 'CSS 미니파일러', desc: '로드 속도를 빠르게 하기 위해 CSS 코드 압축 및 최소화' },
      'html-entity-encoder': { name: 'HTML 엔티티 인코더', desc: 'HTML 특수 문자 및 엔티티 인코딩 또는 디코딩' },
      'lorem-ipsum-generator': { name: 'Lorem Ipsum 생성기', desc: '디자인 및 목업용 플레이스홀더 텍스트 생성' },
      'markdown-to-html': { name: 'Markdown to HTML', desc: 'Markdown 텍스트를 HTML 형식으로 변환' },
      'text-repeater': { name: '텍스트 반복기', desc: '사용자 정의 구분 기호로 텍스트 반복' },
      'url-encoder-decoder': { name: 'URL 인코더/디코더', desc: 'URL 구성 요소를 온라인으로 인코딩 및 디코딩' },
      'timestamp-converter': { name: '타임스탬프 변환기', desc: 'Unix 타임스탬프를 사람이 읽을 수 있는 날짜로 변환' },
      'text-to-speech': { name: '텍스트 음성 변환', desc: 'Web Speech API를 사용하여 텍스트를 음성으로 변환' },
      'image-compressor-desc': { name: '이미지 압축기', desc: '온라인으로 이미지 압축' },
      'image-compressor-name': { name: '이미지 압축기', desc: '온라인으로 이미지 압축' },
      'image-compressor-desc': { desc: '온라인으로 이미지 압축' }
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
      'image-compressor-page': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea gratis' },
      'color-picker': { name: 'Selector de Color', desc: 'Selecciona colores y obtén valores HEX, RGB, HSL' },
      'json-formatter': { name: 'Formateador JSON', desc: 'Formatea datos JSON al instante' },
      'word-counter': { name: 'Contador de Palabras', desc: 'Cuenta palabras, caracteres y párrafos en tiempo real' },
      'base64': { name: 'Codificador/Decodificador Base64', desc: 'Codifica y decodifica cadenas Base64 en línea' },
      'base64-image-converter': { name: 'Conversor de Imágenes Base64', desc: 'Convierte imágenes a formato URL de datos Base64' },
      'case-converter': { name: 'Convertidor de Mayúsculas y Minúsculas', desc: 'Convierte texto a mayúsculas, minúsculas y título' },
      'css-box-model': { name: 'Modelo de Caja CSS', desc: 'Visualiza márgenes, relleno, borde y contenido CSS' },
      'css-minifier': { name: 'Minificador CSS', desc: 'Comprime y minimiza código CSS para carga más rápida' },
      'html-entity-encoder': { name: 'Codificador de Entidades HTML', desc: 'Codifica o decodifica caracteres y entidades especiales HTML' },
      'lorem-ipsum-generator': { name: 'Generador de Lorem Ipsum', desc: 'Genera texto de relleno para diseños y maquetas' },
      'markdown-to-html': { name: 'Markdown a HTML', desc: 'Convierte texto Markdown a formato HTML' },
      'text-repeater': { name: 'Repetidor de Texto', desc: 'Repite texto varias veces con separadores personalizados' },
      'url-encoder-decoder': { name: 'Codificador/Decodificador de URL', desc: 'Codifica y decodifica componentes de URL en línea' },
      'timestamp-converter': { name: 'Conversor de Marca de Tiempo', desc: 'Convierte marcas de tiempo Unix a fechas legibles' },
      'text-to-speech': { name: 'Texto a Voz', desc: 'Convierte texto a voz usando Web Speech API' },
      'image-compressor-desc': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea' },
      'image-compressor-name': { name: 'Compresor de Imágenes', desc: 'Comprime imágenes en línea' },
      'image-compressor-desc': { desc: 'Comprime imágenes en línea' }
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
      'image-compressor': { name: "Compresseur d'Images", desc: 'Compressez des images PNG, JPG, WebP gratuitement' },
      'image-compressor-page': { name: 'Compresseur d\'Images', desc: 'Compressez des images en ligne gratuitement' },
      'color-picker': { name: "Sélecteur de Couleurs", desc: 'Sélectionnez des couleurs et obtenez les valeurs HEX, RGB, HSL' },
      'json-formatter': { name: 'Formateur JSON', desc: 'Formatez des données JSON instantanément' },
      'word-counter': { name: 'Compteur de Mots', desc: 'Comptez les mots, caractères et paragraphes en temps réel' },
      'base64-image-converter': { name: 'Convertisseur d\'Images Base64', desc: 'Convertissez des images en format URL de données Base64' },
      'case-converter': { name: 'Convertisseur de Cas', desc: 'Convertissez le texte en majuscules, minuscules et titre' },
      'css-box-model': { name: 'Modèle de Boîte CSS', desc: 'Visualisez les marges, padding, bordure et contenu CSS' },
      'css-minifier': { name: 'Minifieur CSS', desc: 'Compressez et minimisez le code CSS pour un chargement plus rapide' },
      'html-entity-encoder': { name: 'Encodeur d\'Entités HTML', desc: 'Encodez ou décodez les caractères et entités spéciaux HTML' },
      'lorem-ipsum-generator': { name: 'Générateur de Lorem Ipsum', desc: 'Générez du texte de remplissage pour les designs et maquettes' },
      'markdown-to-html': { name: 'Markdown vers HTML', desc: 'Convertissez du texte Markdown en format HTML' },
      'text-repeater': { name: 'Répéteur de Texte', desc: 'Répétez le texte plusieurs fois avec des séparateurs personnalisés' },
      'url-encoder-decoder': { name: 'Encodeur/Décodeur URL', desc: 'Encodez et décodez les composants URL en ligne' },
      'timestamp-converter': { name: 'Convertisseur de Timestamp', desc: 'Convertissez les horodatages Unix en dates lisibles' },
      'text-to-speech': { name: 'Texte vers Parole', desc: "Convertissez du texte en parole utilisant l'API Web Speech" },
      'image-compressor-desc': { name: 'Compresseur d\'Images', desc: 'Compressez des images en ligne' },
      'image-compressor-name': { name: 'Compresseur d\'Images', desc: 'Compressez des images en ligne' },
      'image-compressor-desc': { desc: 'Compressez des images en ligne' }
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
      'image-compressor-page': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online kostenlos' },
      'color-picker': { name: 'Farbauswahl', desc: 'Wählen Sie Farben und erhalten Sie HEX, RGB, HSL Werte' },
      'json-formatter': { name: 'JSON-Formatter', desc: 'Formatieren Sie JSON-Daten sofort' },
      'word-counter': { name: 'Wortzähler', desc: 'Zählen Sie Wörter, Zeichen und Absätze in Echtzeit' },
      'base64': { name: 'Base64-Codierer/Decodierer', desc: 'Codieren und decodieren Sie Base64-Zeichenfolgen online' },
      'base64-image-converter': { name: 'Base64-Bildkonverter', desc: 'Konvertieren Sie Bilder in Base64-Daten-URL-Format' },
      'case-converter': { name: 'Fallkonverter', desc: 'Konvertieren Sie Text in Großbuchstaben, Kleinbuchstaben und Titelformat' },
      'css-box-model': { name: 'CSS-Boxmodell', desc: 'Visualisieren Sie CSS-Ränder, Auffüllung, Rand und Inhalt' },
      'css-minifier': { name: 'CSS-Minifizierer', desc: 'Komprimieren und minimieren Sie CSS-Code für schnelleres Laden' },
      'html-entity-encoder': { name: 'HTML-Entitäten-Encoder', desc: 'Kodieren oderdekodieren Sie HTML-Sonderzeichen und Entitäten' },
      'lorem-ipsum-generator': { name: 'Lorem-Ipsum-Generator', desc: 'Generieren Sie Platzhaltertext für Designs und Mockups' },
      'markdown-to-html': { name: 'Markdown zu HTML', desc: 'Konvertieren Sie Markdown-Text in HTML-Format' },
      'text-repeater': { name: 'Textwiederholer', desc: 'Wiederholen Sie Text mehrmals mit benutzerdefinierten Trennern' },
      'url-encoder-decoder': { name: 'URL-Codierer/Decodierer', desc: 'Codieren und Decodieren Sie URL-Komponenten online' },
      'timestamp-converter': { name: 'Zeitstempel-Konverter', desc: 'Konvertieren Sie Unix-Zeitstempel in lesbare Daten' },
      'text-to-speech': { name: 'Text-zu-Sprache', desc: 'Konvertieren Sie Text mit Web Speech API in Sprache' },
      'image-compressor-desc': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online' },
      'image-compressor-name': { name: 'Bild-Kompressor', desc: 'Komprimieren Sie Bilder online' },
      'image-compressor-desc': { desc: 'Komprimieren Sie Bilder online' }
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
      'image-compressor-page': { name: 'Компрессор Изображений', desc: 'Бесплатно сжимайте изображения онлайн' },
      'color-picker': { name: 'Селектор Цвета', desc: 'Выбирайте цвета и получайте значения HEX, RGB, HSL' },
      'json-formatter': { name: 'JSON Форматировщик', desc: 'Мгновенно форматируйте JSON данные' },
      'word-counter': { name: 'Счетчик Слов', desc: 'Подсчитывайте слова, символы и абзацы в реальном времени' },
      'base64-image-converter': { name: 'Конвертер Изображений Base64', desc: 'Преобразуйте изображения в формат URL-данных Base64' },
      'case-converter': { name: 'Конвертер Регистара', desc: 'Преобразуйте текст в верхний, нижний регистр и заглавные буквы' },
      'css-box-model': { name: 'CSS Модель Блока', desc: 'Визуализируйте CSS отступы, поля и содержимое' },
      'css-minifier': { name: 'Минификатор CSS', desc: 'Сжимайте и минимизируйте CSS-код для быстрой загрузки' },
      'html-entity-encoder': { name: 'Кодировщик HTML-Сущностей', desc: 'Кодируйте или декодируйте специальные символы и сущности HTML' },
      'lorem-ipsum-generator': { name: 'Генератор Lorem Ipsum', desc: 'Генерируйте текст-заполнитель для дизайнов и макетов' },
      'markdown-to-html': { name: 'Markdown в HTML', desc: 'Преобразуйте текст Markdown в формат HTML' },
      'text-repeater': { name: 'Повторитель Текста', desc: 'Повторяйте текст несколько раз с пользовательскими разделителями' },
      'url-encoder-decoder': { name: 'Кодировщик/Декодировщик URL', desc: 'Кодируйте и декодируйте компоненты URL онлайн' },
      'timestamp-converter': { name: 'Конвертер Времени', desc: 'Преобразуйте Unix-временные метки в читаемые даты' },
      'text-to-speech': { name: 'Текст в Речь', desc: 'Преобразуйте текст в речь с помощью Web Speech API' },
      'image-compressor-desc': { name: 'Компрессор Изображений', desc: 'Сжимайте изображения онлайн' },
      'image-compressor-name': { name: 'Компрессор Изображений', desc: 'Сжимайте изображения онлайн' },
      'image-compressor-desc': { desc: 'Сжимайте изображения онлайн' }
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
      'image-compressor-page': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت مجانا' },
      'color-picker': { name: 'منتقي الألوان', desc: 'اختر الألوان واحصل على قيم HEX و RGB و HSL' },
      'json-formatter': { name: 'منسق JSON', desc: 'نسق بيانات JSON فورا' },
      'word-counter': { name: 'عداد الكلمات', desc: 'عد الكلمات والحروف والفقرات في الوقت الفعلي' },
      'base64-image-converter': { name: 'محول الصور Base64', desc: 'حولي الصور إلى تنسيق URL للبيانات Base64' },
      'case-converter': { name: 'محول الحالة', desc: 'حولي النص إلى أحرف كبيرة وصغيرة وعنوان' },
      'css-box-model': { name: 'نموذج مربع CSS', desc: 'تصور هوامش CSS والتحشى والحدود والمحتوى' },
      'css-minifier': { name: 'مصحح CSS', desc: 'اضغط وصغّر كود CSS لتحميل أسرع' },
      'html-entity-encoder': { name: 'مشفّر كيان HTML', desc: 'شفّر أو لفك تشفير الأحرف والكيانات الخاصة بـ HTML' },
      'lorem-ipsum-generator': { name: 'مولد Lorem Ipsum', desc: 'ولّد نصًا بديلًا للتصاميم والنماذج الأولية' },
      'markdown-to-html': { name: 'Markdown إلى HTML', desc: 'حوّل نص Markdown إلى تنسيق HTML' },
      'text-repeater': { name: 'مكرر النص', desc: 'كرر النص عدة مرات مع فواصل مخصصة' },
      'url-encoder-decoder': { name: 'مشفّر/نافك تشفير URL', desc: 'شفّر وفك تشفير مكونات URL عبر الإنترنت' },
      'timestamp-converter': { name: 'محوّل الطابع الزمني', desc: 'حوّل طوابع الوقت من Unix إلى تواريخ مقروءة' },
      'text-to-speech': { name: 'النص إلى كلام', desc: 'حوّل النص إلى كلام باستخدام Web Speech API' },
      'image-compressor-desc': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت' },
      'image-compressor-name': { name: 'ضاغط الصور', desc: 'اضغط الصور عبر الإنترنت' },
      'image-compressor-desc': { desc: 'اضغط الصور عبر الإنترنت' }
    }
  }
};

// Get current language
function getLanguage() {
  return localStorage.getItem('multi-tools-lang') || 'en';
}

// Apply language to page
function applyLanguage(lang) {
  console.log('[ApplyLang] Starting applyLanguage for:', lang);
  
  const t = translations[lang] || translations.en;
  console.log('[ApplyLang] translations[', lang, ']:', t ? 'found' : 'not found');
  
  if (!t) {
    console.log('[ApplyLang] No translations found for:', lang);
    console.log('[ApplyLang] Available languages:', Object.keys(translations));
    return;
  }
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
  
  // Update all elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('[ApplyLang] Found', elements.length, 'elements with data-i18n');
  
  elements.forEach((el, index) => {
    const key = el.getAttribute('data-i18n');
    console.log('[ApplyLang] Processing element', index + 1, ':', key);
    
    // 支持嵌套键访问 (tools.image-compressor.name)
    const keys = key.split('.');
    let value = t;
    let found = true;
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        found = false;
        console.log('[ApplyLang] Key not found:', k);
        console.log('[ApplyLang] Available keys:', value ? Object.keys(value).slice(0, 10).join(', ') : 'none');
        break;
      }
    }
    
    if (found && value) {
      if (typeof value === 'object') {
        el.textContent = value.name || value.desc || '';
      } else {
        el.textContent = value;
      }
      console.log('[ApplyLang] Updated:', el.tagName, '->', el.textContent.substring(0, 30));
    } else {
      console.log('[ApplyLang] Value not found for key:', key);
    }
  });
  
  // Update all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let value = t;
    for (const k of keys) {
      if (value && value[k]) value = value[k];
      else return;
    }
    if (value) el.placeholder = value;
  });
  
  // Update direction for RTL languages
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  
  console.log('[ApplyLang] Completed for lang:', lang);
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


// Debug function - check translations
function debugTranslations() {
  console.log('=== Debug Translations ===');
  console.log('translations type:', typeof translations);
  console.log('translations keys:', Object.keys(translations));
  
  const lang = getLanguage();
  console.log('Current lang:', lang);
  
  if (translations[lang]) {
    console.log('translations[' + lang + '] exists');
    console.log('translations[' + lang + '] keys:', Object.keys(translations[lang]));
    
    if (translations[lang].tools) {
      console.log('translations[' + lang + '].tools exists');
      console.log('tools keys:', Object.keys(translations[lang].tools).slice(0, 10).join(', '));
      
      if (translations[lang].tools['image-compressor']) {
        console.log('image-compressor found:', JSON.stringify(translations[lang].tools['image-compressor']));
      } else {
        console.log('❌ image-compressor not found in tools');
      }
    } else {
      console.log('❌ tools object not found');
    }
  } else {
    console.log('❌ translations[' + lang + '] not found');
  }
  
  // Check what the page is looking for
  const elements = document.querySelectorAll('[data-i18n]');
  console.log('Elements with data-i18n:', elements.length);
  elements.forEach((el, i) => {
    const key = el.getAttribute('data-i18n');
    console.log('Element', i + 1, ':', key);
    
    // Try to find it
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.log('  ❌ Not found at key:', k);
        break;
      }
    }
    if (value) {
      console.log('  ✅ Found:', typeof value === 'object' ? JSON.stringify(value) : value);
    }
  });
}
