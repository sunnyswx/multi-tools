# -*- coding: utf-8 -*-
import re

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义每种语言的 common 部分末尾添加的内容
additions = {
    'en': ("'converting': 'Converting...'\n    },",
           "'converting': 'Converting...',\n    'resizer.width': 'Width',\n    'resizer.height': 'Height',\n    'resizer.keep_ratio': 'Maintain aspect ratio',\n    'resizer.resize': 'Resize',\n    'resizer.original_size': 'Original Size',\n    'resizer.new_size': 'New Size',\n    'resizer.ratio': 'Ratio',\n    'resizer.preview_label': 'Resized image preview'\n    }"),
    'zh': ("'converting': '转换中...'\n    },",
           "'converting': '转换中...',\n    'resizer.width': '宽度',\n    'resizer.height': '高度',\n    'resizer.keep_ratio': '保持宽高比',\n    'resizer.resize': '调整大小',\n    'resizer.original_size': '原始尺寸',\n    'resizer.new_size': '新尺寸',\n    'resizer.ratio': '比例',\n    'resizer.preview_label': '调整后的图片预览'\n    }"),
    'ja': ("'converting': '変換中...'\n    },",
           "'converting': '変換中...',\n    'resizer.width': '幅',\n    'resizer.height': '高さ',\n    'resizer.keep_ratio': '縦横比を維持',\n    'resizer.resize': 'リサイズ',\n    'resizer.original_size': '元のサイズ',\n    'resizer.new_size': '新しいサイズ',\n    'resizer.ratio': '比率',\n    'resizer.preview_label': 'リサイズ後の画像プレビュー'\n    }"),
    'ko': ("'converting': '변환 중...'\n    },",
           "'converting': '변환 중...',\n    'resizer.width': '너비',\n    'resizer.height': '높이',\n    'resizer.keep_ratio': '종횡비 유지',\n    'resizer.resize': '크기조정',\n    'resizer.original_size': '원본 크기',\n    'resizer.new_size': '새 크기',\n    'resizer.ratio': '비율',\n    'resizer.preview_label': '크기조정 후 이미지 미리보기'\n    }"),
    'es': ("'converting': 'Convirtiendo...'\n    },",
           "'converting': 'Convirtiendo...',\n    'resizer.width': 'Ancho',\n    'resizer.height': 'Alto',\n    'resizer.keep_ratio': 'Mantener proporción',\n    'resizer.resize': 'Redimensionar',\n    'resizer.original_size': 'Tamaño original',\n    'resizer.new_size': 'Nuevo tamaño',\n    'resizer.ratio': 'Relación',\n    'resizer.preview_label': 'Vista previa de imagen redimensionada'\n    }"),
    'fr': ("'converting': 'Conversion...'\n    },",
           "'converting': 'Conversion...',\n    'resizer.width': 'Largeur',\n    'resizer.height': 'Hauteur',\n    'resizer.keep_ratio': 'Conserver les proportions',\n    'resizer.resize': 'Redimensionner',\n    'resizer.original_size': 'Taille originale',\n    'resizer.new_size': 'Nouvelle taille',\n    'resizer.ratio': 'Rapport',\n    'resizer.preview_label': 'Aperçu de l\\'image redimensionnée'\n    }"),
    'de': ("'converting': 'Konvertieren...'\n    },",
           "'converting': 'Konvertieren...',\n    'resizer.width': 'Breite',\n    'resizer.height': 'Höhe',\n    'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n    'resizer.resize': 'Skalieren',\n    'resizer.original_size': 'Originalgröße',\n    'resizer.new_size': 'Neue Größe',\n    'resizer.ratio': 'Verhältnis',\n    'resizer.preview_label': 'Vorschau des skalierten Bildes'\n    }"),
    'ru': ("'converting': 'Конвертирование...'\n    },",
           "'converting': 'Конвертирование...',\n    'resizer.width': 'Ширина',\n    'resizer.height': 'Высота',\n    'resizer.keep_ratio': 'Сохранять пропорции',\n    'resizer.resize': 'Изменить размер',\n    'resizer.original_size': 'Исходный размер',\n    'resizer.new_size': 'Новый размер',\n    'resizer.ratio': 'Соотношение',\n    'resizer.preview_label': 'Предпросмотр измененного изображения'\n    }"),
    'ar': ("'converting': 'جارٍ التحويل...'\n    },",
           "'converting': 'جارٍ التحويل...',\n    'resizer.width': 'العرض',\n    'resizer.height': 'الارتفاع',\n    'resizer.keep_ratio': 'الحفاظ على النسبة',\n    'resizer.resize': 'تغيير الحجم',\n    'resizer.original_size': 'الحجم الأصلي',\n    'resizer.new_size': 'الحجم الجديد',\n    'resizer.ratio': 'النسبة',\n    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم'\n    }"),
}

for lang, (old, new) in additions.items():
    if old in content:
        content = content.replace(old, new, 1)
        print(f'Added resizer translations to {lang}')

# 移除 tools 对象内的重复翻译
removals = [
    "      'resizer.width': 'Width',\n      'resizer.height': 'Height',\n      'resizer.keep_ratio': 'Maintain aspect ratio',\n      'resizer.resize': 'Resize',\n      'resizer.original_size': 'Original Size',\n      'resizer.new_size': 'New Size',\n      'resizer.ratio': 'Ratio',\n      'resizer.preview_label': 'Resized image preview',\n",
    "      'resizer.width': '宽度',\n      'resizer.height': '高度',\n      'resizer.keep_ratio': '保持宽高比',\n      'resizer.resize': '调整大小',\n      'resizer.original_size': '原始尺寸',\n      'resizer.new_size': '新尺寸',\n      'resizer.ratio': '比例',\n      'resizer.preview_label': '调整后的图片预览',\n",
    "      'resizer.width': '幅',\n      'resizer.height': '高さ',\n      'resizer.keep_ratio': '縦横比を維持',\n      'resizer.resize': 'リサイズ',\n      'resizer.original_size': '元のサイズ',\n      'resizer.new_size': '新しいサイズ',\n      'resizer.ratio': '比率',\n      'resizer.preview_label': 'リサイズ後の画像プレビュー',\n",
    "      'resizer.width': '너비',\n      'resizer.height': '높이',\n      'resizer.keep_ratio': '종횡비 유지',\n      'resizer.resize': '크기조정',\n      'resizer.original_size': '원본 크기',\n      'resizer.new_size': '새 크기',\n      'resizer.ratio': '비율',\n      'resizer.preview_label': '크기조정 후 이미지 미리보기',\n",
    "      'resizer.width': 'Ancho',\n      'resizer.height': 'Alto',\n      'resizer.keep_ratio': 'Mantener proporción',\n      'resizer.resize': 'Redimensionar',\n      'resizer.original_size': 'Tamaño original',\n      'resizer.new_size': 'Nuevo tamaño',\n      'resizer.ratio': 'Relación',\n      'resizer.preview_label': 'Vista previa de imagen redimensionada',\n",
    "      'resizer.width': 'Largeur',\n      'resizer.height': 'Hauteur',\n      'resizer.keep_ratio': 'Conserver les proportions',\n      'resizer.resize': 'Redimensionner',\n      'resizer.original_size': 'Taille originale',\n      'resizer.new_size': 'Nouvelle taille',\n      'resizer.ratio': 'Rapport',\n      'resizer.preview_label': 'Aperçu de l\\'image redimensionnée',\n",
    "      'resizer.width': 'Breite',\n      'resizer.height': 'Höhe',\n      'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n      'resizer.resize': 'Skalieren',\n      'resizer.original_size': 'Originalgröße',\n      'resizer.new_size': 'Neue Größe',\n      'resizer.ratio': 'Verhältnis',\n      'resizer.preview_label': 'Vorschau des skalierten Bildes',\n",
    "      'resizer.width': 'Ширина',\n      'resizer.height': 'Высота',\n      'resizer.keep_ratio': 'Сохранять пропорции',\n      'resizer.resize': 'Изменить размер',\n      'resizer.original_size': 'Исходный размер',\n      'resizer.new_size': 'Новый размер',\n      'resizer.ratio': 'Соотношение',\n      'resizer.preview_label': 'Предпросмотр измененного изображения',\n",
    "      'resizer.width': 'العرض',\n      'resizer.height': 'الارتفاع',\n      'resizer.keep_ratio': 'الحفاظ على النسبة',\n      'resizer.resize': 'تغيير الحجم',\n      'resizer.original_size': 'الحجم الأصلي',\n      'resizer.new_size': 'الحجم الجديد',\n      'resizer.ratio': 'النسبة',\n      'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',\n",
]

for rem in removals:
    if rem in content:
        content = content.replace(rem, '')
        print(f'Removed duplicate from tools object')

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone!')
