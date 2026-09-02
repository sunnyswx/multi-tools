// Fix French syntax error
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(path, 'utf8');

// Fix double escape
content = content.replace(/Convertisseur d\\\\'Images Base64/g, "Convertisseur d'Images Base64");
content = content.replace(/Encodeur d\\\\'Entités HTML/g, "Encodeur d'Entités HTML");

fs.writeFileSync(path, content);
console.log('Fixed French syntax error');
