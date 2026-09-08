# -*- coding: utf-8 -*-
"""Fix all broken lang.js - move resizer.* from inside common to top level"""

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern: find common block end with resizer entries inside, move them out
import re

# Fix all languages: remove resizer.* from common, add after common closing brace
patterns = [
    # English
    ("('converting': 'Converting\\.\\.\\.'\n    },)(\n    converter:)",
     r"\1\n    'resizer.width': 'Width',\n    'resizer.height': 'Height',\n    'resizer.keep_ratio': 'Maintain aspect ratio',\n    'resizer.resize': 'Resize',\n    'resizer.original_size': 'Original Size',\n    'resizer.new_size': 'New Size',\n    'resizer.ratio': 'Ratio',\n    'resizer.preview_label': 'Resized image preview',\n\2"),
    # Chinese
    ("('converting': '转换中\\.\\.\\.'\n    },)(\n    converter:)",
     r"\1\n    'resizer.width': '宽度',\n    'resizer.height': '高度',\n    'resizer.keep_ratio': '保持宽高比',\n    'resizer.resize': '调整大小',\n    'resizer.original_size': '原始尺寸',\n    'resizer.new_size': '新尺寸',\n    'resizer.ratio': '比例',\n    'resizer.preview_label': '调整后的图片预览',\n\2"),
    # Japanese
    ("('converting': '変換中\\.\\.\\.'\n    },)(\n    converter:)",
     r"\1\n    'resizer.width': '幅',\n    'resizer.height': '高さ',\n    'resizer.keep_ratio': '縦横比を維持',\n    'resizer.resize': 'リサイズ',\n    'resizer.original_size': '元のサイズ',\n    'resizer.new_size': '新しいサイズ',\n    'resizer.ratio': '比率',\n    'resizer.preview_label': 'リサイズ後の画像プレビュー',\n\2"),
    # Korean
    ("('converting': '변환 중\\.\\.\\.'\n    },)(\n    converter:)",
     r"\1\n    'resizer.width': '너비',\n    'resizer.height': '높이',\n    'resizer.keep_ratio': '종횡비 유지',\n    'resizer.resize': '크기조정',\n    'resizer.original_size': '원본 크기',\n    'resizer.new_size': '새 크기',\n    'resizer.ratio': '비율',\n    'resizer.preview_label': '크기조정 후 이미지 미리보기',\n\2"),
]

for pattern, replacement in patterns:
    if re.search(pattern, content):
        content = re.sub(pattern, replacement, content)
        print(f'Applied pattern for converter section')

# Fix German, Russian, Arabic - they have different patterns (}    converter:)
fixes = [
    # German
    ("    'resizer.preview_label': 'Vorschau des skalierten Bildes'\n    }    converter:",
     "    'resizer.preview_label': 'Vorschau des skalierten Bildes',\n    },\n    'resizer.width': 'Breite',\n    'resizer.height': 'Höhe',\n    'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n    'resizer.resize': 'Skalieren',\n    'resizer.original_size': 'Originalgröße',\n    'resizer.new_size': 'Neue Größe',\n    'resizer.ratio': 'Verhältnis',\n    'resizer.preview_label': 'Vorschau des skalierten Bildes',\n    converter:"),
    # Russian
    ("    'resizer.preview_label': 'Предпросмотр измененного изображения'\n    }    converter:",
     "    'resizer.preview_label': 'Предпросмотр измененного изображения',\n    },\n    'resizer.width': 'Ширина',\n    'resizer.height': 'Высота',\n    'resizer.keep_ratio': 'Сохранять пропорции',\n    'resizer.resize': 'Изменить размер',\n    'resizer.original_size': 'Исходный размер',\n    'resizer.new_size': 'Новый размер',\n    'resizer.ratio': 'Соотношение',\n    'resizer.preview_label': 'Предпросмотр измененного изображения',\n    converter:"),
    # Arabic
    ("    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم'\n    }    converter:",
     "    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',\n    },\n    'resizer.width': 'العرض',\n    'resizer.height': 'الارتفاع',\n    'resizer.keep_ratio': 'الحفاظ على النسبة',\n    'resizer.resize': 'تغيير الحجم',\n    'resizer.original_size': 'الحجم الأصلي',\n    'resizer.new_size': 'الحجم الجديد',\n    'resizer.ratio': 'النسبة',\n    'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',\n    converter:"),
]

for old, new in fixes:
    if old in content:
        content = content.replace(old, new)
        print(f'Applied fix')

# Remove duplicate resizer entries (they were already added correctly in previous step)
# Find and remove duplicate blocks
import re
dup_pattern = re.compile(r"    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    'resizer\.\w+': '[^']*'\n    },")
matches = dup_pattern.findall(content)
print(f'Found {len(matches)} duplicate blocks')

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done!')
