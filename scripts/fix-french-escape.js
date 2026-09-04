#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复法语中的撇号转义问题
content = content.replace("'back_to_home': 'Retour à l'accueil'", "'back_to_home': 'Retour à l\\'accueil'");

fs.writeFileSync(path, content);
console.log('✅ 已修复法语转义问题');
