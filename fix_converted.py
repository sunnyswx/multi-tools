# -*- coding: utf-8 -*-
import re

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 为每种语言添加 converted_size, converted_format, converted_preview_label
translations = [
    # English (already has them at top level)
    ("site_subtitle: '46+ Free Online Tools for Everyone'",
     "'converted_size': 'Converted Size',\n    'converted_format': 'Converted Format',\n    'converted_preview_label': 'Converted image preview',\n    site_subtitle: '46+ Free Online Tools for Everyone'"),
    
    # Chinese
    ("site_subtitle: '46+ 免费在线工具'",
     "'converted_size': '转换后大小',\n    'converted_format': '转换格式',\n    'converted_preview_label': '转换后图片预览',\n    site_subtitle: '46+ 免费在线工具'"),
    
    # Japanese
    ("site_subtitle: '46+ 無料オンラインツール'",
     "'converted_size': '変換後サイズ',\n    'converted_format': '変換フォーマット',\n    'converted_preview_label': '変換後画像プレビュー',\n    site_subtitle: '46+ 無料オンラインツール'"),
    
    # Korean
    ("site_subtitle: '46+ 무료 온라인 도구'",
     "'converted_size': '변환 후 크기',\n    'converted_format': '변환 형식',\n    'converted_preview_label': '변환 후 이미지 미리보기',\n    site_subtitle: '46+ 무료 온라인 도구'"),
    
    # Spanish
    ("site_subtitle: '46+ Herramientas Online Gratis'",
     "'converted_size': 'Tamaño convertido',\n    'converted_format': 'Formato convertido',\n    'converted_preview_label': 'Vista previa de imagen convertida',\n    site_subtitle: '46+ Herramientas Online Gratis'"),
    
    # French
    ("site_subtitle: '46+ Outils en Ligne Gratuits'",
     "'converted_size': 'Taille convertie',\n    'converted_format': 'Format converti',\n    'converted_preview_label': 'Aperçu de l\'image convertie',\n    site_subtitle: '46+ Outils en Ligne Gratuits'"),
    
    # German
    ("site_subtitle: '43+ Kostenlose Online-Tools'",
     "'converted_size': 'Konvertierte Größe',\n    'converted_format': 'Konvertiertes Format',\n    'converted_preview_label': 'Vorschau des konvertierten Bildes',\n    site_subtitle: '43+ Kostenlose Online-Tools'"),
    
    # Russian
    ("site_subtitle: '46+ Бесплатных Онлайн-Инструментов'",
     "'converted_size': 'Размер после конвертации',\n    'converted_format': 'Формат после конвертации',\n    'converted_preview_label': 'Предпросмотр конвертированного изображения',\n    site_subtitle: '46+ Бесплатных Онлайн-Инструментов'"),
    
    # Arabic
    ("site_subtitle: '46+ أداة عبر الإنترنت مجانية'",
     "'converted_size': 'الحجم المحول',\n    'converted_format': 'الصيغة المحولة',\n    'converted_preview_label': 'معاينة الصورة المحولة',\n    site_subtitle: '46+ أداة عبر الإنترنت مجانية'"),
]

for old, new in translations:
    if old in content and "'converted_size'" not in content.split(old)[1][:200]:
        content = content.replace(old, new, 1)
        print(f'Added: {old[:50]}...')

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone!')
