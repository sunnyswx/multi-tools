# Multi-Language Debug Workflow

This document describes the workflow for debugging multi-language issues.

## Step 1: Identify the Problem
```
Symptoms:
- Console shows "Key not found: common"
- Some translations work (tools.image-compressor.name)
- Others don't (common.back_to_home)
```

## Step 2: Check Translation File
```bash
# Check if common property exists
grep -n "common:" lang.js

# Check structure
head -100 lang.js | grep -A 5 "zh: {"
```

## Step 3: Add Missing Translations
```javascript
// Use script to add common translations
node scripts/fix-common-final-v2.js
```

## Step 4: Fix Syntax Errors
```javascript
// Fix French apostrophe
content = content.replace("'Retour à l'accueil'", "'Retour à l\\'accueil'");
```

## Step 5: Verify and Deploy
```bash
# Syntax check
node -c lang.js

# Git commit and push
git add -A
git commit -m "Add common translations"
git push origin main
```

## Step 6: Test
```
1. Open page in browser
2. Press Ctrl+Shift+R to force refresh
3. Open DevTools Console
4. Check for "Key not found" errors
```

## Common Issues
1. Browser cache - always use Ctrl+Shift+R
2. Cloudflare Pages deployment delay - wait 2-3 minutes
3. French apostrophe escaping - use \' in single-quoted strings
4. Missing closing brackets - check syntax with node -c
