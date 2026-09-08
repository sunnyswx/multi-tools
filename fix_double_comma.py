import re

def read_lang_file():
    with open('lang.js', 'r', encoding='utf-8') as f:
        return f.read()

def write_lang_file(content):
    with open('lang.js', 'w', encoding='utf-8') as f:
        f.write(content)

content = read_lang_file()

# 移除所有重复的逗号
content = content.replace(',,', ',')

write_lang_file(content)
print('Fixed double commas')
