#!/usr/bin/env node
// Safe fix - only remove Chinese characters, preserve everything else

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
    
    // Only remove Chinese characters
    content = content.replace(/[\u4e00-\u9fff]/g, '');
    
    // Fix language
    content = content.replace(/lang="zh-CN"/g, 'lang="en"');
    content = content.replace(/lang="zh_CN"/g, 'lang="en"');
    
    // Fix og:locale
    content = content.replace(/og:locale" content="zh_CN"/g, 'og:locale" content="en_US"');
    
    // Clean up extra spaces
    content = content.replace(/\s{2,}/g, ' ');
    
    // Write back
    if (content !== original) {
        fs.writeFileSync(filepath, content, 'utf8');
        fixedCount++;
        console.log(`✓ ${filename}`);
    }
});

console.log(`\n✅ Fixed ${fixedCount} files`);

// Verify
let clean = true;
files.forEach(filepath => {
    const content = fs.readFileSync(filepath, 'utf8');
    if (/[一-鿿]/.test(content) || /lang="zh/.test(content)) {
        console.log(`✗ ${path.basename(filepath)} still has issues`);
        clean = false;
    }
});

if (clean) {
    console.log('✅ All files are clean!');
}
