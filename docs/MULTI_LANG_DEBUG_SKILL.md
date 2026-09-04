---
name: multi-language-debug
category: web-development
description: Debug multi-language i18n issues - fix Key not found errors, add missing translations, handle syntax issues
---

# Multi-Language Website i18n Debugging

Use when debugging internationalization issues in multi-language websites.

## Problem Symptoms
- `Key not found: common` error in console
- Some translations work, others don't
- Console shows `translations[zh] keys: ['site_title', 'site_subtitle', ...]` but missing expected keys

## Root Cause
The translations object structure doesn't match the `data-i18n` attributes in HTML.

Common patterns:
```javascript
// ❌ Missing common property
zh: {
  site_title: '...',
  site_subtitle: '...',
  // no common: { ... }
}

// ✅ Correct structure
zh: {
  site_title: '...',
  common: {
    'back_to_home': '返回首页',
    'click_to_upload': '点击上传',
    // ...
  },
  site_subtitle: '...',
  tools: { ... }
}
```

## Debug Steps

### 1. Check if translation key exists
```bash
# Check local file
grep -n "common:" lang.js

# Check GitHub version
curl -s "https://raw.githubusercontent.com/<repo>/main/lang.js" | grep "common:"
```

### 2. Verify applyLanguage function
```javascript
// Check if function handles nested keys
const parts = key.split('.');
let value = t;
for (const part of parts) {
  if (value && value[part] !== undefined) {
    value = value[part];
  } else {
    console.log('[ApplyLang] Key not found:', part);
    break;
  }
}
```

### 3. Add missing translations
```javascript
// Pattern for adding common translations
const additions = {
  en: { 'back_to_home': 'Back to Home', ... },
  zh: { 'back_to_home': '返回首页', ... }
};
```

## Solutions

### Quick Fix Script
```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = 'lang.js';
let content = fs.readFileSync(path, 'utf8');

// Add common to each language
const langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];
langs.forEach(lang => {
  const pattern = new RegExp(`(${lang}: \\{\\s*\\n\\s*site_title: '[^']+',\\s*\\n)`);
  const match = content.match(pattern);
  if (match) {
    // Insert common after site_title
    const commonStr = `    common: {\n      'back_to_home': '${translations[lang].back_to_home}',\n      // ...
    },\n`;
    content = content.replace(match[0], `${match[1]}${commonStr}`);
  }
});

fs.writeFileSync(path, content);
```

### French Apostrophe Issue
```javascript
// ❌ Wrong - causes syntax error
'back_to_home': 'Retour à l'accueil'

// ✅ Correct - escape apostrophe
'back_to_home': 'Retour à l\'accueil'
```

## Verification
After fixing, check console output:
```
[ApplyLang] Processing: common.back_to_home
[ApplyLang] Updated to: 返回首页
```

Should NOT see:
```
[ApplyLang] Key not found: common
```

## Prevention
1. Always check `lang.js` structure before adding new `data-i18n` attributes
2. Use consistent naming: `common.xxx` for UI elements, `tools.xxx.name` for tool names
3. Test with browser language detection enabled
4. Clear browser cache (Ctrl+Shift+R) after deployment

## Files
- `lang.js` - Main translation file
- `tools/*.html` - Subpages with `data-i18n` attributes
- `index.html` - Homepage with language detection
