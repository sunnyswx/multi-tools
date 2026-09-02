#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix French text-to-speech - use double quotes for the outer string
content = content.replace(
  "      'text-to-speech': { name: 'Texte vers Parole', desc: 'Convertissez du texte en parole utilisant l'API Web Speech' }",
  "      'text-to-speech': { name: 'Texte vers Parole', desc: \"Convertissez du texte en parole utilisant l'API Web Speech\" }"
);

fs.writeFileSync(path, content);
console.log('Fixed French syntax - using double quotes');
