# -*- coding: utf-8 -*-
"""Fix the broken lang.js - resizer.* was incorrectly placed inside common object"""

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix English
content = content.replace(
    "    'converting': 'Converting...',\n    'resizer.width': 'Width',\n    'resizer.height': 'Height',\n    'resizer.keep_ratio': 'Maintain aspect ratio',\n    'resizer.resize': 'Resize',\n    'resizer.original_size': 'Original Size',\n    'resizer.new_size': 'New Size',\n    'resizer.ratio': 'Ratio',\n    'resizer.preview_label': 'Resized image preview'\n    }    converter:",
    "    'converting': 'Converting...'\n    },\n    'resizer.width': 'Width',\n    'resizer.height': 'Height',\n    'resizer.keep_ratio': 'Maintain aspect ratio',\n    'resizer.resize': 'Resize',\n    'resizer.original_size': 'Original Size',\n    'resizer.new_size': 'New Size',\n    'resizer.ratio': 'Ratio',\n    'resizer.preview_label': 'Resized image preview',\n    converter:"
)

# Fix Chinese
content = content.replace(
    "    'converting': '转换中...',\n    'resizer.width': '宽度',\n    'resizer.height': '高度',\n    'resizer.keep_ratio': '保持宽高比',\n    'resizer.resize': '调整大小',\n    'resizer.original_size': '原始尺寸',\n    'resizer.new_size': '新尺寸',\n    'resizer.ratio': '比例',\n    'resizer.preview_label': '调整后的图片预览'\n    }    converter:",
    "    'converting': '转换中...'\n    },\n    'resizer.width': '宽度',\n    'resizer.height': '高度',\n    'resizer.keep_ratio': '保持宽高比',\n    'resizer.resize': '调整大小',\n    'resizer.original_size': '原始尺寸',\n    'resizer.new_size': '新尺寸',\n    'resizer.ratio': '比例',\n    'resizer.preview_label': '调整后的图片预览',\n    converter:"
)

# Fix Japanese
content = content.replace(
    "    'converting': '変換中...',\n    'resizer.width': '幅',\n    'resizer.height': '高さ',\n    'resizer.keep_ratio': '縦横比を維持',\n    'resizer.resize': 'リサイズ',\n    'resizer.original_size': '元のサイズ',\n    'resizer.new_size': '新しいサイズ',\n    'resizer.ratio': '比率',\n    'resizer.preview_label': 'リサイズ後の画像プレビュー'\n    }    converter:",
    "    'converting': '変換中...'\n    },\n    'resizer.width': '幅',\n    'resizer.height': '高さ',\n    'resizer.keep_ratio': '縦横比を維持',\n    'resizer.resize': 'リサイズ',\n    'resizer.original_size': '元のサイズ',\n    'resizer.new_size': '新しいサイズ',\n    'resizer.ratio': '比率',\n    'resizer.preview_label': 'リサイズ後の画像プレビュー',\n    converter:"
)

# Fix Korean
content = content.replace(
    "    'converting': '변환 중...',\n    'resizer.width': '너비',\n    'resizer.height': '높이',\n    'resizer.keep_ratio': '종횡비 유지',\n    'resizer.resize': '크기조정',\n    'resizer.original_size': '원본 크기',\n    'resizer.new_size': '새 크기',\n    'resizer.ratio': '비율',\n    'resizer.preview_label': '크기조정 후 이미지 미리보기'\n    }    converter:",
    "    'converting': '변환 중...'\n    },\n    'resizer.width': '너비',\n    'resizer.height': '높이',\n    'resizer.keep_ratio': '종횡비 유지',\n    'resizer.resize': '크기조정',\n    'resizer.original_size': '원본 크기',\n    'resizer.new_size': '새 크기',\n    'resizer.ratio': '비율',\n    'resizer.preview_label': '크기조정 후 이미지 미리보기',\n    converter:"
)

# Fix Spanish
content = content.replace(
    "    'converting': 'Convirtiendo...',\n    'resizer.width': 'Ancho',\n    'resizer.height': 'Alto',\n    'resizer.keep_ratio': 'Mantener proporción',\n    'resizer.resize': 'Redimensionar',\n    'resizer.original_size': 'Tamaño original',\n    'resizer.new_size': 'Nuevo tamaño',\n    'resizer.ratio': 'Relación',\n    'resizer.preview_label': 'Vista previa de imagen redimensionada'\n    },",
    "    'converting': 'Convirtiendo...'\n    },\n    'resizer.width': 'Ancho',\n    'resizer.height': 'Alto',\n    'resizer.keep_ratio': 'Mantener proporción',\n    'resizer.resize': 'Redimensionar',\n    'resizer.original_size': 'Tamaño original',\n    'resizer.new_size': 'Nuevo tamaño',\n    'resizer.ratio': 'Relación',\n    'resizer.preview_label': 'Vista previa de imagen redimensionada',\n    "
)

# Fix French
content = content.replace(
    "    'converting': 'Conversion...',\n    'resizer.width': 'Largeur',\n    'resizer.height': 'Hauteur',\n    'resizer.keep_ratio': 'Conserver les proportions',\n    'resizer.resize': 'Redimensionner',\n    'resizer.original_size': 'Taille originale',\n    'resizer.new_size': 'Nouvelle taille',\n    'resizer.ratio': 'Rapport',\n    'resizer.preview_label': 'Aperçu de l\\'image redimensionnée'\n    },",
    "    'converting': 'Conversion...'\n    },\n    'resizer.width': 'Largeur',\n    'resizer.height': 'Hauteur',\n    'resizer.keep_ratio': 'Conserver les proportions',\n    'resizer.resize': 'Redimensionner',\n    'resizer.original_size': 'Taille originale',\n    'resizer.new_size': 'Nouvelle taille',\n    'resizer.ratio': 'Rapport',\n    'resizer.preview_label': 'Aperçu de l\\'image redimensionnée',\n    "
)

# Fix German
content = content.replace(
    "    'converting': 'Konvertieren...',\n    'resizer.width': 'Breite',\n    'resizer.height': 'Höhe',\n    'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n    'resizer.resize': 'Skalieren',\n    'resizer.original_size': 'Originalgröße',\n    'resizer.new_size': 'Neue Größe',\n    'resizer.ratio': 'Verhältnis',\n    'resizer.preview_label': 'Vorschau des skalierten Bildes'\n    },",
    "    'converting': 'Konvertieren...'\n    },\n    'resizer.width': 'Breite',\n    'resizer.height': 'Höhe',\n    'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n    'resizer.resize': 'Skalieren',\n    'resizer.original_size': 'Originalgröße',\n    'resizer.new_size': 'Neue Größe',\n    'resizer.ratio': 'Verhältnis',\n    'resizer.preview_label': 'Vorschau des skalierten Bildes',\n    "
)

# Fix Russian
content = content.replace(
    "    'converting': 'Конвертирование...',\n    'resizer.width': 'Ширина',\n    'resizer.height': 'Высота',\n    'resizer.keep_ratio': 'Сохранять пропорции',\n    'resizer.resize': 'Изменить размер',\n    'resizer.original_size': 'Исходный размер',\n    'resizer.new_size': 'Новый размер',\n    'resizer.ratio': 'Соотношение',\n    'resizer.preview_label': 'Предпросмотр измененного изображения'\n    },",
    "    'converting': 'Конвертирование...'\n    },\n    'resizer.width': 'Ширина',\n    'resizer.height': 'Высота',\n    'resizer.keep_ratio': 'Сохранять пропорции',\n    'resizer.resize': 'Изменить размер',\n    'resizer.original_size': 'Исходный размер',\n    'resizer.new_size': 'Новый размер',\n    'resizer.ratio': 'Соотношение',\n    'resizer.preview_label': 'Предпросмотр измененного изображения',\n    "
)

# Fix Arabic
content = content.replace(
    "    'converting': 'جارٍ التحويل...',\n    'resizer.width': 'العرض',\n    'resizer.height': 'الارتفاع',\n    'resizer.keep_ratio': 'الحفاظ على النسبة',\n    'resizer.resize': 'تغيير الحجم',\n    'resizer.original_size': 'الحجم الأصلي',\n    'resizer.new_size': 'الحجم الجديد',\n    'resizer.ratio': 'النسبة',\n    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم'\n    },",
    "    'converting': 'جارٍ التحويل...'\n    },\n    'resizer.width': 'العرض',\n    'resizer.height': 'الارتفاع',\n    'resizer.keep_ratio': 'الحفاظ على النسبة',\n    'resizer.resize': 'تغيير الحجم',\n    'resizer.original_size': 'الحجم الأصلي',\n    'resizer.new_size': 'الحجم الجديد',\n    'resizer.ratio': 'النسبة',\n    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',\n    "
)

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Fixed!')
