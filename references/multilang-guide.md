# Multi-Language Implementation Guide

## Language Detection Flow

```
1. Check URL parameter (?lang=zh)
2. Check LocalStorage (saved preference)
3. Check navigator.language (browser setting)
4. Default to English
```

## Code Implementation

### HTML Structure
```html
<html lang="en">
<head>
    <!-- SEO: hreflang tags -->
    <link rel="alternate" hreflang="en" href="https://example.com/">
    <link rel="alternate" hreflang="zh" href="https://example.com/?lang=zh">
    
    <!-- Language selector -->
    <select id="langSelector" onchange="changeLanguage(this.value)">
        <option value="en">English</option>
        <option value="zh">中文</option>
        <!-- ... more languages -->
    </select>
</head>
```

### JavaScript Translation System
```javascript
const translations = {
    en: {
        site_title: "Multi Tools",
        tools: {
            "image-compressor": { name: "Image Compressor", desc: "..." }
        }
    },
    zh: {
        site_title: "Multi Tools",
        tools: {
            "image-compressor": { name: "图片压缩工具", desc: "..." }
        }
    }
};

function changeLanguage(lang) {
    localStorage.setItem('lang', lang);
    applyTranslations(lang);
    updateUrlParam(lang);
}
```

## SEO Best Practices

### hreflang Tags
```html
<!-- Self-referencing -->
<link rel="alternate" hreflang="en" href="https://example.com/">
<link rel="alternate" hreflang="zh" href="https://example.com/?lang=zh">

<!-- X-default for unknown languages -->
<link rel="alternate" hreflang="x-default" href="https://example.com/">
```

### Meta Tags per Language
```html
<!-- English -->
<meta name="description" content="Free online tools collection">
<meta property="og:locale" content="en_US">

<!-- Chinese -->
<meta name="description" content="免费在线工具集">
<meta property="og:locale" content="zh_CN">
```

## Common Pitfalls

1. **Don't use Google Translate widget** - Poor quality, hurts SEO
2. **Don't detect language with JavaScript only** - Search engines won't see it
3. **Always include hreflang** - Helps search engines understand language versions
4. **Test RTL languages** - Arabic, Hebrew need special handling

## Performance Tips

1. **Lazy load translations** - Only load needed language
2. **Cache translations** - Use LocalStorage
3. **Minify translation files** - Keep payload small
4. **Use CDN** - Serve translations globally

## Testing Checklist

- [ ] Language detection works correctly
- [ ] Language selector persists choice
- [ ] All UI text translates
- [ ] Tool names and descriptions translate
- [ ] RTL layout works for Arabic
- [ ] hreflang tags present
- [ ] No broken links after language switch
- [ ] GA4 tracks language changes