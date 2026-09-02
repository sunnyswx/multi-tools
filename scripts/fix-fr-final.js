// Fix French syntax error
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';
let content = fs.readFileSync(path, 'utf8');

// Fix double escape in French text-to-speech
content = content.replace(/using l\\\\'API Web Speech/g, "using l'API Web Speech");

fs.writeFileSync(path, content);
console.log('Fixed French syntax error');
