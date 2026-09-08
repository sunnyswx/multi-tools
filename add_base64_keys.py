import re

def read_lang_file():
    with open('lang.js', 'r', encoding='utf-8') as f:
        return f.read()

def write_lang_file(content):
    with open('lang.js', 'w', encoding='utf-8') as f:
        f.write(content)

content = read_lang_file()

languages = [
    ('en', "'copied': 'Copied!'", '\n    },\n    \'original_size\': \'Original Size\',\n    \'format\': \'Format\',\n    \'copy\': \'Copy\''),
    ('zh', "'copied': '已复制！'", '\n    },\n    \'original_size\': \'原始大小\',\n    \'format\': \'格式\',\n    \'copy\': \'复制\''),
    ('ja', "'copied': 'コピーしました！'", '\n    },\n    \'original_size\': \'元のサイズ\',\n    \'format\': \'フォーマット\',\n    \'copy\': \'コピー\''),
    ('ko', "'copied': '복사됨!'", '\n    },\n    \'original_size\': \'원본 크기\',\n    \'format\': \'형식\',\n    \'copy\': \'복사\''),
    ('es', "'copied': '¡Copiado!'", '\n    },\n    \'original_size\': \'Tamaño original\',\n    \'format\': \'Formato\',\n    \'copy\': \'Copiar\''),
    ('fr', "'copied': 'Copié!'", '\n    },\n    \'original_size\': \'Taille originale\',\n    \'format\': \'Format\',\n    \'copy\': \'Copier\''),
    ('de', "'copied': 'Kopiert!'", '\n    },\n    \'original_size\': \'Originalgröße\',\n    \'format\': \'Format\',\n    \'copy\': \'Kopieren\''),
    ('ru', "'copied': 'Скопировано!'", '\n    },\n    \'original_size\': \'Исходный размер\',\n    \'format\': \'Формат\',\n    \'copy\': \'Копировать\''),
    ('ar', "'copied': 'تم النسخ!'", '\n    },\n    \'original_size\': \'الحجم الأصلي\',\n    \'format\': \'الصيغة\',\n    \'copy\': \'نسخ\'')
]

for lang, search, replace in languages:
    # 找到语言块中 common 对象里的 copied 行
    full_search = f"{lang}: {{\n.*?common: {{.*?{re.escape(search)}"
    pattern = full_search
    match = re.search(pattern, content, re.DOTALL)
    if match:
        # 在 copied 行后面插入新内容
        insert_pos = match.end()
        # 需要找到 copied 行的结束位置（下一个逗号或换行）
        remaining = content[insert_pos:]
        newline_pos = remaining.find('\n')
        if newline_pos >= 0:
            new_pos = insert_pos + newline_pos
            content = content[:new_pos] + replace + content[new_pos:]
            print(f'Added translations to {lang}')
        else:
            print(f'Warning: could not find newline after copied for {lang}')
    else:
        print(f'Warning: could not find pattern for {lang}')

write_lang_file(content)
print('Done')
