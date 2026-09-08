# -*- coding: utf-8 -*-
"""Fix all broken lang.js syntax issues"""

with open('lang.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix Spanish - add comma after closing brace
content = content.replace(
    """    'resizer.preview_label': 'Vista previa de imagen redimensionada'
    }
    'converted_size': 'Tamaño convertido',""",
    """    'resizer.preview_label': 'Vista previa de imagen redimensionada',
    },
    'converted_size': 'Tamaño convertido',"""
)

# Fix French - same pattern as Spanish fix
content = content.replace(
    """    'resizer.preview_label': 'Aperçu de l\\'image redimensionnée'
    }    converter: {""",
    """    'resizer.preview_label': 'Aperçu de l\\'image redimensionnée',
    },
    converter: {"""
)

# Also fix German if needed
content = content.replace(
    "'converting': 'Konvertieren...'\n    },\n    'resizer.width'",
    "'converting': 'Konvertieren...'\n    },\n    'resizer.width'"
)

# Check Russian and Arabic too
for lang, converting, resizer_key in [
    ('ru', "Конвертирование...", "'resizer.width': 'Ширина'"),
    ('ar', "جارٍ التحويل...", "'resizer.width': 'العرض'"),
]:
    # Check if resizer entries are inside common
    if converting in content:
        idx = content.find(converting)
        # Find the end of common block
        common_end = content.find('},', idx)
        if common_end > 0:
            snippet = content[idx:common_end+5]
            if resizer_key[:20] in snippet:
                print(f"{lang}: resizer still inside common - NEEDS FIX")
            else:
                print(f"{lang}: OK")
        else:
            print(f"{lang}: could not find common end")
    else:
        print(f"{lang}: converting not found")

with open('lang.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('\nDone!')
