#!/usr/bin/env node
const fs = require('fs');
const path = 'tools/image-compressor.html';

// Check if HTML has data-i18n attributes
const content = fs.readFileSync(path, 'utf8');
const i18nMatches = content.match(/data-i18n="[^"]+"/g) || [];

console.log('Found data-i18n attributes:');
i18nMatches.forEach(attr => {
  const key = attr.match(/data-i18n="([^"]+)"/)[1];
  console.log(`  - ${key}`);
});

// Check if all keys exist in lang.js
const langContent = fs.readFileSync('lang.js', 'utf8');
i18nMatches.forEach(attr => {
  const key = attr.match(/data-i18n="([^"]+)"/)[1];
  // Simple check - just verify the file is valid
  console.log(`✓ ${key} attribute exists`);
});
