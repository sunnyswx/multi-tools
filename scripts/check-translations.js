#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Check the structure of translations
console.log('Checking translations structure...');

// Find where image-compressor-name is defined
const lines = content.split('\n');
lines.forEach((line, i) => {
    if (line.includes('image-compressor-name')) {
        console.log(`Line ${i+1}: ${line.trim()}`);
    }
});
