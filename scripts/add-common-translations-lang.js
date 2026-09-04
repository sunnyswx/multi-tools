#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 在每个语言的 translations 对象中添加 common 部分
const commonTranslations = `    common: {
      'back_to_home': 'Back to Home',
      'click_to_upload': 'Click to upload',
      'or_drag_drop': 'or drag and drop',
      'compress': 'Compress',
      'download': 'Download',
      'select_file': 'Select File',
      'upload_area_title': 'Click to upload image or drag and drop',
      'quality_label': 'Compression Quality',
      'original_size': 'Original Size',
      'compressed_size': 'Compressed Size',
      'reduction': 'Reduction'
    },`;

// 为每种语言添加 common 翻译
const langTranslations = {
  'en': {
    prefix: "  en: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'Back to Home',\n      'click_to_upload': 'Click to upload',\n      'or_drag_drop': 'or drag and drop',\n      'compress': 'Compress',\n      'download': 'Download',\n      'select_file': 'Select File'\n    },`
  },
  'zh': {
    prefix: "  zh: {\n    site_title:",
    common: `    common: {\n      'back_to_home': '返回首页',\n      'click_to_upload': '点击上传',\n      'or_drag_drop': '或拖放文件',\n      'compress': '压缩',\n      'download': '下载',\n      'select_file': '选择文件'\n    },`
  },
  'ja': {
    prefix: "  ja: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'ホームに戻る',\n      'click_to_upload': 'クリックしてアップロード',\n      'or_drag_drop': 'またはドラッグ＆ドロップ',\n      'compress': '圧縮',\n      'download': 'ダウンロード',\n      'select_file': 'ファイルを選択'\n    },`
  },
  'ko': {
    prefix: "  ko: {\n    site_title:",
    common: `    common: {\n      'back_to_home': '홈으로 돌아가기',\n      'click_to_upload': '클릭하여 업로드',\n      'or_drag_drop': '또는 드래그 앤 드롭',\n      'compress': '압축',\n      'download': '다운로드',\n      'select_file': '파일 선택'\n    },`
  },
  'es': {
    prefix: "  es: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'Volver al inicio',\n      'click_to_upload': 'Hacer clic para cargar',\n      'or_drag_drop': 'o arrastrar y soltar',\n      'compress': 'Comprimir',\n      'download': 'Descargar',\n      'select_file': 'Seleccionar archivo'\n    },`
  },
  'fr': {
    prefix: "  fr: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'Retour à l\'accueil',\n      'click_to_upload': 'Cliquez pour télécharger',\n      'or_drag_drop': 'ou glissez-déposez',\n      'compress': 'Compresser',\n      'download': 'Télécharger',\n      'select_file': 'Sélectionner un fichier'\n    },`
  },
  'de': {
    prefix: "  de: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'Zurück zur Startseite',\n      'click_to_upload': 'Klicken zum Hochladen',\n      'or_drag_drop': 'oder ziehen und ablegen',\n      'compress': 'Komprimieren',\n      'download': 'Herunterladen',\n      'select_file': 'Datei auswählen'\n    },`
  },
  'ru': {
    prefix: "  ru: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'На главную',\n      'click_to_upload': 'Нажмите для загрузки',\n      'or_drag_drop': 'или перетащите',\n      'compress': 'Сжать',\n      'download': 'Скачать',\n      'select_file': 'Выбрать файл'\n    },`
  },
  'ar': {
    prefix: "  ar: {\n    site_title:",
    common: `    common: {\n      'back_to_home': 'العودة إلى المنزل',\n      'click_to_upload': 'انقر للتحميل',\n      'or_drag_drop': 'أو اسحب وأفلت',\n      'compress': 'ضغط',\n      'download': 'تحميل',\n      'select_file': 'اختيار ملف'\n    },`
  }
};

// 为每种语言添加 common 翻译
Object.keys(langTranslations).forEach(lang => {
  const langData = langTranslations[lang];
  const regex = new RegExp(langData.prefix + '([\\s\\S]*?)categories:');
  
  if (content.match(regex)) {
    const replacement = langData.prefix + '$1' + langData.common + '\n    categories:';
    content = content.replace(regex, replacement);
    console.log(`✓ 添加 ${lang} 语言的 common 翻译`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已更新');
