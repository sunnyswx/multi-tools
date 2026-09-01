#!/usr/bin/env node
// Manual fix for specific problematic patterns

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
    
    // Fix titles with trailing dash
    content = content.replace(/<title>([^<]*) - \|/g, '<title>$1');
    content = content.replace(/<title>([^<]*) - /g, '<title>$1');
    
    // Fix content attributes with Chinese punctuation
    content = content.replace(/content="[^"]*[\u4e00-\u9fff][^"]*"/g, 'content=""');
    content = content.replace(/content="[^"]*，[^"]*"/g, 'content=""');
    content = content.replace(/content="[^"]*。[^"]*"/g, 'content=""');
    
    // Fix og:locale
    content = content.replace(/og:locale" content="zh_CN"/g, 'og:locale" content="en_US"');
    
    // Write back
    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        fixedCount++;
        console.log(`✓ ${filename}`);
    }
});

console.log(`\n✅ Fixed ${fixedCount} files`);
