# -*- coding: utf-8 -*-
import re

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 定义每个语言的 resizer 翻译
resizer_entries = {
    # English (already added)
    "'image-resizer': { name: 'Image Resizer', desc: 'Resize images to custom dimensions online.' },\n      'color-picker'":
        "'image-resizer': { name: 'Image Resizer', desc: 'Resize images to custom dimensions online.' },\n      'resizer.width': 'Width',\n      'resizer.height': 'Height',\n      'resizer.keep_ratio': 'Maintain aspect ratio',\n      'resizer.resize': 'Resize',\n      'resizer.original_size': 'Original Size',\n      'resizer.new_size': 'New Size',\n      'resizer.ratio': 'Ratio',\n      'resizer.preview_label': 'Resized image preview',\n      'color-picker'",
    
    # Chinese (already added)
    "'image-resizer': { name: '图片尺寸调整', desc: '自定义尺寸调整图片大小' },\n      'color-picker'":
        "'image-resizer': { name: '图片尺寸调整', desc: '自定义尺寸调整图片大小' },\n      'resizer.width': '宽度',\n      'resizer.height': '高度',\n      'resizer.keep_ratio': '保持宽高比',\n      'resizer.resize': '调整大小',\n      'resizer.original_size': '原始尺寸',\n      'resizer.new_size': '新尺寸',\n      'resizer.ratio': '比例',\n      'resizer.preview_label': '调整后的图片预览',\n      'color-picker'",
    
    # Japanese
    "'image-resizer': { name: '画像リサイズツール', desc: 'カスタムサイズで画像をリサイズ' }":
        "'image-resizer': { name: '画像リサイズツール', desc: 'カスタムサイズで画像をリサイズ' },\n      'resizer.width': '幅',\n      'resizer.height': '高さ',\n      'resizer.keep_ratio': '縦横比を維持',\n      'resizer.resize': 'リサイズ',\n      'resizer.original_size': '元のサイズ',\n      'resizer.new_size': '新しいサイズ',\n      'resizer.ratio': '比率',\n      'resizer.preview_label': 'リサイズ後の画像プレビュー'",
    
    # Korean - need to add image-resizer first
    "'timestamp-converter': { name: '타임스탬프 변환기', desc: 'Unix 타임스탬프를 사람이 읽을 수 있는 날짜로 변환' },":
        "'timestamp-converter': { name: '타임스탬프 변환기', desc: 'Unix 타임스탬프를 사람이 읽을 수 있는 날짜로 변환' },\n      'image-resizer': { name: '이미지 크기조정 도구', desc: '무료로 이미지 크기를 조정하세요.' },\n      'resizer.width': '너비',\n      'resizer.height': '높이',\n      'resizer.keep_ratio': '종횡비 유지',\n      'resizer.resize': '크기조정',\n      'resizer.original_size': '원본 크기',\n      'resizer.new_size': '새 크기',\n      'resizer.ratio': '비율',\n      'resizer.preview_label': '크기조정 후 이미지 미리보기',",
    
    # Spanish
    "'timestamp-converter': { name: 'Conversor de Marca de Tiempo', desc: 'Convierte marcas de tiempo Unix a fechas legibles' },":
        "'timestamp-converter': { name: 'Conversor de Marca de Tiempo', desc: 'Convierte marcas de tiempo Unix a fechas legibles' },\n      'image-resizer': { name: 'Redimensionar Imagen', desc: 'Redimensiona imágenes en línea gratis.' },\n      'resizer.width': 'Ancho',\n      'resizer.height': 'Alto',\n      'resizer.keep_ratio': 'Mantener proporción',\n      'resizer.resize': 'Redimensionar',\n      'resizer.original_size': 'Tamaño original',\n      'resizer.new_size': 'Nuevo tamaño',\n      'resizer.ratio': 'Relación',\n      'resizer.preview_label': 'Vista previa de imagen redimensionada',",
    
    # French
    "'timestamp-converter': { name: 'Convertisseur de Timestamp', desc: 'Convertissez les horodatages Unix en dates lisibles' },":
        "'timestamp-converter': { name: 'Convertisseur de Timestamp', desc: 'Convertissez les horodatages Unix en dates lisibles' },\n      'image-resizer': { name: 'Redimensionner Image', desc: 'Redimensionnez des images en ligne gratuitement.' },\n      'resizer.width': 'Largeur',\n      'resizer.height': 'Hauteur',\n      'resizer.keep_ratio': 'Conserver les proportions',\n      'resizer.resize': 'Redimensionner',\n      'resizer.original_size': 'Taille originale',\n      'resizer.new_size': 'Nouvelle taille',\n      'resizer.ratio': 'Rapport',\n      'resizer.preview_label': 'Aperçu de l\\'image redimensionnée',",
    
    # German
    "'timestamp-converter': { name: 'Zeitstempel-Konverter', desc: 'Konvertieren Sie Unix-Zeitstempel in lesbare Daten' },":
        "'timestamp-converter': { name: 'Zeitstempel-Konverter', desc: 'Konvertieren Sie Unix-Zeitstempel in lesbare Daten' },\n      'image-resizer': { name: 'Bild Skalieren', desc: 'Skalieren Sie Bilder online kostenlos.' },\n      'resizer.width': 'Breite',\n      'resizer.height': 'Höhe',\n      'resizer.keep_ratio': 'Seitenverhältnis beibehalten',\n      'resizer.resize': 'Skalieren',\n      'resizer.original_size': 'Originalgröße',\n      'resizer.new_size': 'Neue Größe',\n      'resizer.ratio': 'Verhältnis',\n      'resizer.preview_label': 'Vorschau des skalierten Bildes',",
    
    # Russian
    "'timestamp-converter': { name: 'Конвертер Времени', desc: 'Преобразуйте Unix-временные метки в читаемые даты' },":
        "'timestamp-converter': { name: 'Конвертер Времени', desc: 'Преобразуйте Unix-временные метки в читаемые даты' },\n      'image-resizer': { name: 'Изменить Размер Изображения', desc: 'Бесплатное изменение размера изображений онлайн.' },\n      'resizer.width': 'Ширина',\n      'resizer.height': 'Высота',\n      'resizer.keep_ratio': 'Сохранять пропорции',\n      'resizer.resize': 'Изменить размер',\n      'resizer.original_size': 'Исходный размер',\n      'resizer.new_size': 'Новый размер',\n      'resizer.ratio': 'Соотношение',\n      'resizer.preview_label': 'Предпросмотр измененного изображения',",
    
    # Arabic
    "'timestamp-converter': { name: 'محول الوقت', desc: 'حول علامات الوقت UNIX إلى تواريخ يمكن قراءتها' },":
        "'timestamp-converter': { name: 'محول الوقت', desc: 'حول علامات الوقت UNIX إلى تواريخ يمكن قراءتها' },\n      'image-resizer': { name: 'تغيير حجم الصورة', desc: 'قم بتغيير حجم الصور عبر الإنترنت مجانًا.' },\n      'resizer.width': 'العرض',\n      'resizer.height': 'الارتفاع',\n      'resizer.keep_ratio': 'الحفاظ على النسبة',\n      'resizer.resize': 'تغيير الحجم',\n      'resizer.original_size': 'الحجم الأصلي',\n      'resizer.new_size': 'الحجم الجديد',\n      'resizer.ratio': 'النسبة',\n      'resizer.preview_label': 'معاينة الصورة بعد تغيير الحجم',",
}

for old, new in resizer_entries.items():
    if old in content:
        content = content.replace(old, new, 1)
        print(f'Added: {old[:50]}...')
    else:
        # Try to find partial match
        pattern = old.split("'")[1] if "'" in old else old[:30]
        print(f'Not found: {pattern}...')

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone!')
