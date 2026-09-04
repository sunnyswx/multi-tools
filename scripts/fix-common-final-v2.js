#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 定义所有语言的 common 翻译
const commonTranslations = {
  en: {
    'back_to_home': 'Back to Home',
    'click_to_upload': 'Click to upload',
    'or_drag_drop': 'or drag and drop',
    'compress': 'Compress',
    'download': 'Download',
    'select_file': 'Select File'
  },
  zh: {
    'back_to_home': '返回首页',
    'click_to_upload': '点击上传',
    'or_drag_drop': '或拖放文件',
    'compress': '压缩',
    'download': '下载',
    'select_file': '选择文件'
  },
  ja: {
    'back_to_home': 'ホームに戻る',
    'click_to_upload': 'クリックしてアップロード',
    'or_drag_drop': 'またはドラッグ＆ドロップ',
    'compress': '圧縮',
    'download': 'ダウンロード',
    'select_file': 'ファイルを選択'
  },
  ko: {
    'back_to_home': '홈으로 돌아가기',
    'click_to_upload': '클릭하여 업로드',
    'or_drag_drop': '또는 드래그 앤 드롭',
    'compress': '압축',
    'download': '다운로드',
    'select_file': '파일 선택'
  },
  es: {
    'back_to_home': 'Volver al inicio',
    'click_to_upload': 'Hacer clic para cargar',
    'or_drag_drop': 'o arrastrar y soltar',
    'compress': 'Comprimir',
    'download': 'Descargar',
    'select_file': 'Seleccionar archivo'
  },
  fr: {
    'back_to_home': "Retour à l'accueil",
    'click_to_upload': 'Cliquez pour télécharger',
    'or_drag_drop': 'ou glissez-déposez',
    'compress': 'Compresser',
    'download': 'Télécharger',
    'select_file': 'Sélectionner un fichier'
  },
  de: {
    'back_to_home': 'Zurück zur Startseite',
    'click_to_upload': 'Klicken zum Hochladen',
    'or_drag_drop': 'oder ziehen und ablegen',
    'compress': 'Komprimieren',
    'download': 'Herunterladen',
    'select_file': 'Datei auswählen'
  },
  ru: {
    'back_to_home': 'На главную',
    'click_to_upload': 'Нажмите для загрузки',
    'or_drag_drop': 'или перетащите',
    'compress': 'Сжать',
    'download': 'Скачать',
    'select_file': 'Выбрать файл'
  },
  ar: {
    'back_to_home': 'العودة إلى المنزل',
    'click_to_upload': 'انقر للتحميل',
    'or_drag_drop': 'أو اسحب وأفلت',
    'compress': 'ضغط',
    'download': 'تحميل',
    'select_file': 'اختيار ملف'
  }
};

// 为每种语言添加 common 对象
Object.entries(commonTranslations).forEach(([lang, common]) => {
  const langPattern = new RegExp(`(${lang}: \\{\\s*\\n\\s*site_title: '[^']+',\\s*\\n)`, 'm');
  const match = content.match(langPattern);
  
  if (match) {
    const commonStr = Object.entries(common).map(([k, v]) => `    '${k}': '${v}'`).join(',\n');
    const replacement = `${match[1]}    common: {\n${commonStr}\n    },\n`;
    content = content.replace(match[0], replacement);
    console.log(`✓ 添加 ${lang} 的 common 翻译`);
  } else {
    console.log(`✗ 未找到 ${lang} 的位置`);
  }
});

// 验证是否添加成功
const hasCommonZH = content.includes("'back_to_home': '返回首页'");
const hasCommonEN = content.includes("'back_to_home': 'Back to Home'");

console.log(`\n验证结果:`);
console.log(`- zh 包含 common: ${hasCommonZH}`);
console.log(`- en 包含 common: ${hasCommonEN}`);

if (hasCommonZH && hasCommonEN) {
  fs.writeFileSync(path, content);
  console.log('\n✅ lang.js 已更新');
} else {
  console.log('\n❌ 更新失败，请检查');
}
