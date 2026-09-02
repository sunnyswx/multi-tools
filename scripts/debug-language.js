#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix: Ensure applyLanguage properly updates all data-i18n elements
// The issue is that applyLanguage only updates elements with exact key match
// We need to ensure the function is called correctly

// Add a debug log to help diagnose the issue
content = content.replace(
  `function applyLanguage(lang) {
  const t = translations[lang] || translations.en;`,
  `function applyLanguage(lang) {
  const t = translations[lang] || translations.en;
  console.log('applyLanguage called with:', lang, 'keys:', Object.keys(t));`
);

content = content.replace(
  `  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });`,
  `  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    console.log('Checking data-i18n key:', key, 'exists:', !!t[key], 'value:', t[key]);
    if (t[key]) {
      el.textContent = t[key];
      console.log('Updated element with key:', key);
    }
  });`
);

fs.writeFileSync(path, content);
console.log('Added debug logging to applyLanguage');
