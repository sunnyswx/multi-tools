#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 为每种语言添加 common 对象
const additions = [
  {
    lang: 'en',
    search: "  en: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  en: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'Back to Home',\n      'click_to_upload': 'Click to upload',\n      'or_drag_drop': 'or drag and drop',\n      'compress': 'Compress',\n      'download': 'Download',\n      'select_file': 'Select File'\n    },\n    site_subtitle:"
  },
  {
    lang: 'zh',
    search: "  zh: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  zh: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': '返回首页',\n      'click_to_upload': '点击上传',\n      'or_drag_drop': '或拖放文件',\n      'compress': '压缩',\n      'download': '下载',\n      'select_file': '选择文件'\n    },\n    site_subtitle:"
  },
  {
    lang: 'ja',
    search: "  ja: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  ja: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'ホームに戻る',\n      'click_to_upload': 'クリックしてアップロード',\n      'or_drag_drop': 'またはドラッグ＆ドロップ',\n      'compress': '圧縮',\n      'download': 'ダウンロード',\n      'select_file': 'ファイルを選択'\n    },\n    site_subtitle:"
  },
  {
    lang: 'ko',
    search: "  ko: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  ko: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': '홈으로 돌아가기',\n      'click_to_upload': '클릭하여 업로드',\n      'or_drag_drop': '또는 드래그 앤 드롭',\n      'compress': '압축',\n      'download': '다운로드',\n      'select_file': '파일 선택'\n    },\n    site_subtitle:"
  },
  {
    lang: 'es',
    search: "  es: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  es: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'Volver al inicio',\n      'click_to_upload': 'Hacer clic para cargar',\n      'or_drag_drop': 'o arrastrar y soltar',\n      'compress': 'Comprimir',\n      'download': 'Descargar',\n      'select_file': 'Seleccionar archivo'\n    },\n    site_subtitle:"
  },
  {
    lang: 'fr',
    search: "  fr: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  fr: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'Retour à l\\'accueil',\n      'click_to_upload': 'Cliquez pour télécharger',\n      'or_drag_drop': 'ou glissez-déposez',\n      'compress': 'Compresser',\n      'download': 'Télécharger',\n      'select_file': 'Sélectionner un fichier'\n    },\n    site_subtitle:"
  },
  {
    lang: 'de',
    search: "  de: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  de: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'Zurück zur Startseite',\n      'click_to_upload': 'Klicken zum Hochladen',\n      'or_drag_drop': 'oder ziehen und ablegen',\n      'compress': 'Komprimieren',\n      'download': 'Herunterladen',\n      'select_file': 'Datei auswählen'\n    },\n    site_subtitle:"
  },
  {
    lang: 'ru',
    search: "  ru: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  ru: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'На главную',\n      'click_to_upload': 'Нажмите для загрузки',\n      'or_drag_drop': 'или перетащите',\n      'compress': 'Сжать',\n      'download': 'Скачать',\n      'select_file': 'Выбрать файл'\n    },\n    site_subtitle:"
  },
  {
    lang: 'ar',
    search: "  ar: {\n    site_title: '🛠️ Multi Tools',\n    site_subtitle:",
    replace: "  ar: {\n    site_title: '🛠️ Multi Tools',\n    common: {\n      'back_to_home': 'العودة إلى المنزل',\n      'click_to_upload': 'انقر للتحميل',\n      'or_drag_drop': 'أو اسحب وأفلت',\n      'compress': 'ضغط',\n      'download': 'تحميل',\n      'select_file': 'اختيار ملف'\n    },\n    site_subtitle:"
  }
];

let modified = false;
additions.forEach(add => {
  if (content.includes(add.search) && !content.includes(`'back_to_home':`)) {
    content = content.replace(add.search, add.replace);
    console.log(`✓ 添加 ${add.lang} 的 common 翻译`);
    modified = true;
  }
});

if (modified) {
  fs.writeFileSync(path, content);
  console.log('\n✅ lang.js 已更新');
} else {
  console.log('\n未找到需要修改的位置，或已包含翻译');
}
