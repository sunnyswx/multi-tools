#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix French syntax error - replace the broken line with proper double quotes
content = content.replace(
  /'image-compressor': \{ name: 'Compresseur d'Images', desc: "Compressez des images PNG, JPG, WebP gratuitement" \},/,
  "'image-compressor': { name: \"Compresseur d'Images\", desc: 'Compressez des images PNG, JPG, WebP gratuitement' },"
);

content = content.replace(
  /'color-picker': \{ name: 'Sélecteur de Couleurs', desc: "Sélectionnez des couleurs et obtenez les valeurs HEX, RGB, HSL" \},/,
  "'color-picker': { name: \"Sélecteur de Couleurs\", desc: 'Sélectionnez des couleurs et obtenez les valeurs HEX, RGB, HSL' },"
);

content = content.replace(
  /'json-formatter': \{ name: 'Formateur JSON', desc: 'Formatez des données JSON instantanément' \},/,
  "'json-formatter': { name: 'Formateur JSON', desc: 'Formatez des données JSON instantanément' },"
);

fs.writeFileSync(path, content);
console.log('Fixed French syntax errors');
