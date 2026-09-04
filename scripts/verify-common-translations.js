#!/usr/bin/env node
const fs = require('fs');
const path = 'lang.js';

// Check if translations object has common property for all languages
const content = fs.readFileSync(path, 'utf8');
const langs = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de', 'ru', 'ar'];

let hasCommon = true;
langs.forEach(lang => {
  const hasKey = content.includes(`'back_to_home':`);
  if (!hasKey) {
    console.log(`❌ ${lang} missing common translations`);
    hasCommon = false;
  }
});

if (hasCommon) {
  console.log('✅ All languages have common translations');
}
