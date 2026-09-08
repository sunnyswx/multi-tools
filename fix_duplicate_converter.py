import re

def read_lang_file():
    with open('lang.js', 'r', encoding='utf-8') as f:
        return f.read()

def write_lang_file(content):
    with open('lang.js', 'w', encoding='utf-8') as f:
        f.write(content)

content = read_lang_file()

# 移除中文翻译中重复的 converter 对象
# 找到第一个 converter 对象（西班牙语的），然后移除到第二个 converter 对象之前的内容
pattern = r"(converter: \{[^}]*\},)\s*(converter: \{[^}]*\},)"
match = re.search(pattern, content)
if match:
    # 保留第二个（中文的）
    content = content[:match.start()] + match.group(2) + content[match.end():]
    print('Removed duplicate converter object')

# 移除重复的注释
content = content.replace('// Image converter UI\n    // Image converter UI', '// Image converter UI')
print('Removed duplicate comment')

write_lang_file(content)
print('Done')
