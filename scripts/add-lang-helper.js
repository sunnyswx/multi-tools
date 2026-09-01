#!/usr/bin/env node
// Add language helper scripts to all tool pages

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'tools');

const files = fs.readdirSync(toolsDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(toolsDir, f));

console.log(`Found ${files.length} HTML files\n`);

let fixedCount = 0;

files.forEach(filepath => {
    const filename = path.basename(filepath);
    let content = fs.readFileSync(filepath, 'utf8');
    const original = content;
    
    // Check if already has lang-helper
    if (!content.includes('lang-helper.js')) {
        // Add after GA4 script
        const ga4Pattern = /<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=G-L7GQFYBWB6"><\/script>[\s\S]*?<\/script>/;
        const match = content.match(ga4Pattern);
        
        if (match) {
            const insertionPoint = match.index + match[0].length;
            content = content.slice(0, insertionPoint) + 
                      '\n    <script src="tool-translations.js"></script>\n' +
                      '    <script src="lang-helper.js"></script>' + 
                      content.slice(insertionPoint);
            fixedCount++;
            console.log(`✓ Added to ${filename}`);
        }
    }
    
    // Write back if changed
    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
    }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
