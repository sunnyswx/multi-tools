# -*- coding: utf-8 -*-
"""Clean up duplicate resizer entries and fix common block syntax"""

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# First, let's find all places where resizer is inside common blocks
# and move them out

# Pattern for English (line 25-33 area)
# The issue: resizer entries are between common closing and converter

# Let's do a more targeted fix - find each language's common block and fix it
langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar']

for lang in langs:
    # Find the common block for this lang
    pattern = rf"'{lang}': \{{.*?common: \{{.*?'converting': '[^']*'\n    \}},"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        print(f'{lang}: found common block at position {match.start()}')
    else:
        print(f'{lang}: no match')

# Better approach: just rebuild the file properly
# Split by language blocks and fix each one
lines = content.split('\n')
fixed_lines = []
in_common = False
skip_resizer = False
lang_count = 0

i = 0
while i < len(lines):
    line = lines[i]
    
    # Detect language start
    if re.match(r"^  \w+: \{$", line):
        lang_count += 1
        in_common = False
    
    # Detect common block start
    if "common: {" in line:
        in_common = True
        fixed_lines.append(line)
        i += 1
        continue
    
    # Detect common block end (with possible trailing content)
    if in_common and line.strip() == '},':
        fixed_lines.append(line)
        in_common = False
        i += 1
        continue
    
    # Skip resizer.* entries that are inside common blocks
    if in_common and line.strip().startswith("'resizer."):
        i += 1
        continue
    
    # After common block ends, add resizer entries if they're missing
    if not in_common and line.strip().startswith('converter:') or line.strip().startswith("},"):
        # Check if we need to add resizer entries
        # Look back to see if this is right after common
        pass
    
    fixed_lines.append(line)
    i += 1

# Write back
with open('lang.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(fixed_lines))

print(f'Processed {lang_count} languages')
print(f'Original lines: {len(lines)}, Fixed lines: {len(fixed_lines)}')
