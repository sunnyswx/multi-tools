#!/usr/bin/env node
// Fix all tool pages to properly apply language translations

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'tools');

// Get all HTML files
const files = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(toolsDir, f));

console.log(`Found ${files.length} HTML files\n`);

let fixedCount = 0;

files.forEach(filepath => {
    const filename = path.basename(filepath);
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;
    
    // Check if page has toolTranslations but missing apply function
    if (content.includes('toolTranslations') && !content.includes('applyToolTranslations')) {
        console.log(`✓ Fixing ${filename}...`);
        
        // Add applyToolTranslations function before closing </script>
        const applyFunc = `
        // Apply tool-specific translations
        function applyToolTranslations(lang) {
            const translations = toolTranslations[lang] || toolTranslations.en;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[key]) {
                    el.textContent = translations[key];
                }
            });
            if (translations.tool_title) {
                document.title = translations.tool_title + ' - Multi Tools';
            }
        }`;
        
        // Find the DOMContentLoaded event listener and add applyToolTranslations call
        content = content.replace(
            /document\.addEventListener\('DOMContentLoaded', function\(\) \{/,
            `document.addEventListener('DOMContentLoaded', function() {
            const lang = getLanguage();
            applyLanguage(lang);
            applyToolTranslations(lang);`
        );
        
        // Add the applyFunc before the closing </script>
        content = content.replace(
            /<\/script>/,
            applyFunc + '\n    </script>'
        );
        
        fs.writeFileSync(filepath, content, 'utf8');
        fixedCount++;
    }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
