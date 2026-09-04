#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 检查是否已有 common 翻译
const hasCommonEN = content.includes("'back_to_home': 'Back to Home'");
const hasCommonZH = content.includes("'back_to_home': '返回首页'");

console.log('EN 包含 common:', hasCommonEN);
console.log('ZH 包含 common:', hasCommonZH);

// 如果没有 common，手动添加
if (!hasCommonEN) {
  // 在 en 块中添加 common
  const enMatch = content.match(/en: \{[\s\S]*?site_title: '[^']+',\n\s+site_subtitle:/);
  if (enMatch) {
    content = content.replace(enMatch[0], `en: {
    site_title: '🛠️ Multi Tools',
    common: {
      'back_to_home': 'Back to Home',
      'click_to_upload': 'Click to upload',
      'or_drag_drop': 'or drag and drop',
      'compress': 'Compress',
      'download': 'Download',
      'select_file': 'Select File'
    },
    site_subtitle:`);
    console.log('✓ 添加 en.common');
  }
}

if (!hasCommonZH) {
  // 在 zh 块中添加 common
  const zhMatch = content.match(/zh: \{[\s\S]*?site_title: '[^']+',\n\s+site_subtitle:/);
  if (zhMatch) {
    content = content.replace(zhMatch[0], `zh: {
    site_title: '🛠️ Multi Tools',
    common: {
      'back_to_home': '返回首页',
      'click_to_upload': '点击上传',
      'or_drag_drop': '或拖放文件',
      'compress': '压缩',
      'download': '下载',
      'select_file': '选择文件'
    },
    site_subtitle:`);
    console.log('✓ 添加 zh.common');
  }
}

// 对其他语言做同样处理
const otherLangs = ['ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
const commonTranslations = {
  ja: { back_to_home: 'ホームに戻る', click_to_upload: 'クリックしてアップロード', or_drag_drop: 'またはドラッグ＆ドロップ', compress: '圧縮', download: 'ダウンロード', select_file: 'ファイルを選択' },
  ko: { back_to_home: '홈으로 돌아가기', click_to_upload: '클릭하여 업로드', or_drag_drop: '또는 드래그 앤 드롭', compress: '압축', download: '다운로드', select_file: '파일 선택' },
  es: { back_to_home: 'Volver al inicio', click_to_upload: 'Hacer clic para cargar', or_drag_drop: 'o arrastrar y soltar', compress: 'Comprimir', download: 'Descargar', select_file: 'Seleccionar archivo' },
  fr: { back_to_home: 'Retour à l\'accueil', click_to_upload: 'Cliquez pour télécharger', or_drag_drop: 'ou glissez-déposez', compress: 'Compresser', download: 'Télécharger', select_file: 'Sélectionner un fichier' },
  de: { back_to_home: 'Zurück zur Startseite', click_to_upload: 'Klicken zum Hochladen', or_drag_drop: 'oder ziehen und ablegen', compress: 'Komprimieren', download: 'Herunterladen', select_file: 'Datei auswählen' },
  ru: { back_to_home: 'На главную', click_to_upload: 'Нажмите для загрузки', or_drag_drop: 'или перетащите', compress: 'Сжать', download: 'Скачать', select_file: 'Выбрать файл' },
  ar: { back_to_home: 'العودة إلى المنزل', click_to_upload: 'انقر للتحميل', or_drag_drop: 'أو اسحب وأفلت', compress: 'ضغط', download: 'تحميل', select_file: 'اختيار ملف' }
};

otherLangs.forEach(lang => {
  const langKey = content.match(new RegExp(`${lang}: \\{[\\s\\S]*?site_title: '[^']+',\\n\\s+site_subtitle:`));
  if (langKey && !content.includes(`'back_to_home': '${commonTranslations[lang].back_to_home}'`)) {
    const commonStr = Object.entries(commonTranslations[lang]).map(([k, v]) => `      '${k}': '${v}'`).join(',\n');
    content = content.replace(langKey[0], `${lang}: {
    site_title: '🛠️ Multi Tools',
    common: {
${commonStr}
    },
    site_subtitle:`);
    console.log(`✓ 添加 ${lang}.common`);
  }
});

fs.writeFileSync(path, content);
console.log('\n✅ lang.js 已更新');
