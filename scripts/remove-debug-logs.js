#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Remove debug logs from applyLanguage
content = content.replace(
  `function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  console.log('applyLanguage called with:', lang, 'keys:', Object.keys(t));`,
  `function applyLanguage(lang) {
  const t = translations[lang] || translations.en;`
);

content = content.replace(
  `  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    console.log('Checking data-i18n key:', key, 'exists:', !!t[key], 'value:', t[key]);
    if (t[key]) {
      el.textContent = t[key];
      console.log('Updated element with key:', key);
    }
  });`,
  `  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });`
);

fs.writeFileSync(path, content);
console.log('Removed debug logs from applyLanguage');
