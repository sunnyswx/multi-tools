import re

def read_lang_file():
    with open('lang.js', 'r', encoding='utf-8') as f:
        return f.read()

def write_lang_file(content):
    with open('lang.js', 'w', encoding='utf-8') as f:
        f.write(content)

content = read_lang_file()

# 为所有9种语言添加 'convert' 和 'copied' 到 common 对象
common_additions = {
    'en': ("    'converting': 'Converting...'", "    'converting': 'Converting...',\n    'convert': 'Convert',\n    'copied': 'Copied!'"),
    'zh': ("    'converting': '转换中...'", "    'converting': '转换中...',\n    'convert': '转换',\n    'copied': '已复制！'"),
    'ja': ("    'converting': '変換中...'", "    'converting': '変換中...',\n    'convert': '変換',\n    'copied': 'コピーしました！'"),
    'ko': ("    'converting': '변환 중...'", "    'converting': '변환 중...,\\n    'convert': '변환',\n    'copied': '복사됨!'"),
    'es': ("    'converting': 'Convirtiendo...'", "    'converting': 'Convirtiendo...,\\n    'convert': 'Convertir',\n    'copied': '¡Copiado!'"),
    'fr': ("    'converting': 'Conversion...'", "    'converting': 'Conversion...,\\n    'convert': 'Convertir',\n    'copied': 'Copié !'"),
    'de': ("    'converting': 'Konvertierung...'", "    'converting': 'Konvertierung...,\\n    'convert': 'Konvertieren',\n    'copied': 'Kopiert!'"),
    'ru': ("    'converting': 'Конвертация...'", "    'converting': 'Конвертация...,\\n    'convert': 'Конвертировать',\n    'copied': 'Скопировано!'"),
    'ar': ("    'converting': 'جار التحويل...'", "    'converting': 'جار التحويل...,\\n    'convert': 'تحويل',\n    'copied': 'تم النسخ!'")
}

# 找到每个语言的 common 对象中的 converting 行并添加
languages = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar']

for lang in languages:
    # 找到该语言的 common 对象
    pattern = rf"(  {lang}: \{{[^}}]*common: \{{[^}}]*)'converting': '[^']*'"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        old_text = match.group(0)
        # 添加 convert 和 copied
        new_text = old_text.replace(
            "'converting': '",
            "'converting': '",
            1
        )
        # 在 converting 行后面添加新行
        insert_pos = old_text.rfind("'converting': '")
        if insert_pos >= 0:
            # 找到 converting 行的结束位置
            end_quote = old_text.find("'", insert_pos + len("'converting': '"))
            if end_quote >= 0:
                insert_at = end_quote + 1
                # 添加逗号和换行
                before = old_text[:insert_at]
                after = old_text[insert_at:]
                # 确保有逗号
                if not before.endswith(','):
                    before = before.rstrip() + ','
                new_line = "\n    'convert': 'Convert',\n    'copied': 'Copied!'"
                if lang == 'zh':
                    new_line = "\n    'convert': '转换',\n    'copied': '已复制！'"
                elif lang == 'ja':
                    new_line = "\n    'convert': '変換',\n    'copied': 'コピーしました！'"
                elif lang == 'ko':
                    new_line = "\n    'convert': '변환',\n    'copied': '복사됨!'"
                elif lang == 'es':
                    new_line = "\n    'convert': 'Convertir',\n    'copied': '¡Copiado!'"
                elif lang == 'fr':
                    new_line = "\n    'convert': 'Convertir',\n    'copied': 'Copié!'"
                elif lang == 'de':
                    new_line = "\n    'convert': 'Konvertieren',\n    'copied': 'Kopiert!'"
                elif lang == 'ru':
                    new_line = "\n    'convert': 'Конвертировать',\n    'copied': 'Скопировано!'"
                elif lang == 'ar':
                    new_line = "\n    'convert': 'تحويل',\n    'copied': 'تم النسخ!'"
                content = content[:match.start()] + before + new_line + after + content[match.end():]

write_lang_file(content)
print('Added convert and copied to all 9 languages')
