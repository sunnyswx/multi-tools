# -*- coding: utf-8 -*-
import re

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 找到每个语言的 tools 对象结束位置，在 common 部分之后添加顶层翻译
# 使用正则匹配每个语言块

# 定义9种语言的替换
replacements = [
    # English
    (r"(    'converting': 'Converting\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': 'Width',\n    'resizer.height': 'Height',\n    'resizer.keep_ratio': 'Maintain aspect ratio',\n    'resizer.resize': 'Resize',\n    'resizer.original_size': 'Original Size',\n    'resizer.new_size': 'New Size',\n    'resizer.ratio': 'Ratio',\n    'resizer.preview_label': 'Resized image preview',\n\2\3"),
    
    # Chinese
    (r"(    'converting': '转换中\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': '宽度',\n    'resizer.height': '高度',\n    'resizer.keep_ratio': '保持宽高比',\n    'resizer.resize': '调整大小',\n    'resizer.original_size': '原始尺寸',\n    'resizer.new_size': '新尺寸',\n    'resizer.ratio': '比例',\n    'resizer.preview_label': '调整后的图片预览',\n\2\3"),
    
    # Japanese
    (r"(    'converting': '変換中\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': '幅',\n    'resizer.height': '高さ',\n    'resizer.keep_ratio': '縦横比を維持',\n    'resizer.resize': 'リサイズ',\n    'resizer.original_size': '元のサイズ',\n    'resizer.new_size': '新しいサイズ',\n    'resizer.ratio': '比率',\n    'resizer.preview_label': 'リサイズ後の画像プレビュー',\n\2\3"),
    
    # Korean
    (r"(    'converting': '변환 중\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': '너비',\n    'resizer.height': '높이',\n    'resizer.keep_ratio': '종횡비 유지',\n    'resizer.resize': '크기조정',\n    'resizer.original_size': '원본 크기',\n    'resizer.new_size': '새 크기',\n    'resizer.ratio': '비율',\n    'resizer.preview_label': '크기조정 후 이미지 미리보기',\n\2\3"),
    
    # Spanish
    (r"(    'converting': 'Convirtiendo\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': 'Ancho',\n    'resizer.height': 'Alto',\n    'resizer.keep_ratio': 'Mantener proporción',\n    'resizer.resize': 'Redimensionar',\n    'resizer.original_size': 'Tamaño original',\n    'resizer.new_size': 'Nuevo tamaño',\n    'resizer.ratio': 'Relación',\n    'resizer.preview_label': 'Vista previa de imagen redimensionada',\n\2\3"),
    
    # French
    (r"(    'converting': 'Conversion\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': 'Largeur',\n    'resizer.height': 'Hauteur',\n    'resizer.keep_ratio': 'Conserver les proportions',\n    'resizer.resize': 'Redimensionner',\n    'resizer.original_size': 'Taille originale',\n    'resizer.new_size': 'Nouvelle taille',\n    'resizer.ratio': 'Rapport',\n    'resizer.preview_label': 'Aperçu de l\'image redimensionnée',\n\2\3"),
    
    # German
    (r"(    'converting': 'Konvertieren\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': 'Breite',\n    'resizer.height': 'Höhe',\n    'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n    'resizer.resize': 'Skalieren',\n    'resizer.original_size': 'Originalgröße',\n    'resizer.new_size': 'Neue Größe',\n    'resizer.ratio': 'Verhältnis',\n    'resizer.preview_label': 'Vorschau des skalierten Bildes',\n\2\3"),
    
    # Russian
    (r"(    'converting': 'Конвертирование\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': 'Ширина',\n    'resizer.height': 'Высота',\n    'resizer.keep_ratio': 'Сохранять пропорции',\n    'resizer.resize': 'Изменить размер',\n    'resizer.original_size': 'Исходный размер',\n    'resizer.new_size': 'Новый размер',\n    'resizer.ratio': 'Соотношение',\n    'resizer.preview_label': 'Предпросмотр измененного изображения',\n\2\3"),
    
    # Arabic
    (r"(    'converting': 'جارٍ التحويل\.\.\.'\\n    },\\n)(\\s*)(// Image converter UI)",
     r"\1\2'resizer.width': 'العرض',\n    'resizer.height': 'الارتفاع',\n    'resizer.keep_ratio': 'الحفاظ على النسبة',\n    'resizer.resize': 'تغيير الحجم',\n    'resizer.original_size': 'الحجم الأصلي',\n    'resizer.new_size': 'الحجم الجديد',\n    'resizer.ratio': 'النسبة',\n    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',\n\2\3"),
]

for pattern, replacement in replacements:
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
        print(f'Applied pattern')

# 移除 tools 对象内的重复翻译
removals = [
    ("      'resizer.width': 'Width',\\n      'resizer.height': 'Height',\\n      'resizer.keep_ratio': 'Maintain aspect ratio',\\n      'resizer.resize': 'Resize',\\n      'resizer.original_size': 'Original Size',\\n      'resizer.new_size': 'New Size',\\n      'resizer.ratio': 'Ratio',\\n      'resizer.preview_label': 'Resized image preview',\\n", ""),
    ("      'resizer.width': '宽度',\\n      'resizer.height': '高度',\\n      'resizer.keep_ratio': '保持宽高比',\\n      'resizer.resize': '调整大小',\\n      'resizer.original_size': '原始尺寸',\\n      'resizer.new_size': '新尺寸',\\n      'resizer.ratio': '比例',\\n      'resizer.preview_label': '调整后的图片预览',\\n", ""),
    ("      'resizer.width': '幅',\\n      'resizer.height': '高さ',\\n      'resizer.keep_ratio': '縦横比を維持',\\n      'resizer.resize': 'リサイズ',\\n      'resizer.original_size': '元のサイズ',\\n      'resizer.new_size': '新しいサイズ',\\n      'resizer.ratio': '比率',\\n      'resizer.preview_label': 'リサイズ後の画像プレビュー',\\n", ""),
    ("      'resizer.width': '너비',\\n      'resizer.height': '높이',\\n      'resizer.keep_ratio': '종횡비 유지',\\n      'resizer.resize': '크기조정',\\n      'resizer.original_size': '원본 크기',\\n      'resizer.new_size': '새 크기',\\n      'resizer.ratio': '비율',\\n      'resizer.preview_label': '크기조정 후 이미지 미리보기',\\n", ""),
    ("      'resizer.width': 'Ancho',\\n      'resizer.height': 'Alto',\\n      'resizer.keep_ratio': 'Mantener proporción',\\n      'resizer.resize': 'Redimensionar',\\n      'resizer.original_size': 'Tamaño original',\\n      'resizer.new_size': 'Nuevo tamaño',\\n      'resizer.ratio': 'Relación',\\n      'resizer.preview_label': 'Vista previa de imagen redimensionada',\\n", ""),
    ("      'resizer.width': 'Largeur',\\n      'resizer.height': 'Hauteur',\\n      'resizer.keep_ratio': 'Conserver les proportions',\\n      'resizer.resize': 'Redimensionner',\\n      'resizer.original_size': 'Taille originale',\\n      'resizer.new_size': 'Nouvelle taille',\\n      'resizer.ratio': 'Rapport',\\n      'resizer.preview_label': 'Aperçu de l\\'image redimensionnée',\\n", ""),
    ("      'resizer.width': 'Breite',\\n      'resizer.height': 'Höhe',\\n      'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\\n      'resizer.resize': 'Skalieren',\\n      'resizer.original_size': 'Originalgröße',\\n      'resizer.new_size': 'Neue Größe',\\n      'resizer.ratio': 'Verhältnis',\\n      'resizer.preview_label': 'Vorschau des skalierten Bildes',\\n", ""),
    ("      'resizer.width': 'Ширина',\\n      'resizer.height': 'Высота',\\n      'resizer.keep_ratio': 'Сохранять пропорции',\\n      'resizer.resize': 'Изменить размер',\\n      'resizer.original_size': 'Исходный размер',\\n      'resizer.new_size': 'Новый размер',\\n      'resizer.ratio': 'Соотношение',\\n      'resizer.preview_label': 'Предпросмотр измененного изображения',\\n", ""),
    ("      'resizer.width': 'العرض',\\n      'resizer.height': 'الارتفاع',\\n      'resizer.keep_ratio': 'الحفاظ على النسبة',\\n      'resizer.resize': 'تغيير الحجم',\\n      'resizer.original_size': 'الحجم الأصلي',\\n      'resizer.new_size': 'الحجم الجديد',\\n      'resizer.ratio': 'النسبة',\\n      'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',\\n", ""),
]

for old, new in removals:
    if old in content:
        content = content.replace(old, new)
        print(f'Removed duplicate from tools object')

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone!')
