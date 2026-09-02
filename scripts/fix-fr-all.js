#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix all French syntax errors - replace apostrophe with escaped version
content = content.replace(/'image-compressor-page': \{ name: 'Compresseur d'Images', desc: 'Compressez des images en ligne gratuitement' \},/g, "'image-compressor-page': { name: 'Compresseur d\\'Images', desc: 'Compressez des images en ligne gratuitement' },");
content = content.replace(/'color-picker': \{ name: 'Sélecteur de Couleurs', desc: 'Sélectionnez des couleurs et obtenez les valeurs HEX, RGB, HSL' \},/g, "'color-picker': { name: 'Sélecteur de Couleurs', desc: 'Sélectionnez des couleurs et obtenez les valeurs HEX, RGB, HSL' },");
content = content.replace(/'json-formatter': \{ name: 'Formateur JSON', desc: 'Formatez des données JSON instantanément' \},/g, "'json-formatter': { name: 'Formateur JSON', desc: 'Formatez des données JSON instantanément' },");
content = content.replace(/'word-counter': \{ name: 'Compteur de Mots', desc: 'Comptez les mots, caractères et paragraphes en temps réel' \},/g, "'word-counter': { name: 'Compteur de Mots', desc: 'Comptez les mots, caractères et paragraphes en temps réel' },");
content = content.replace(/'base64-image-converter': \{ name: 'Convertisseur d'Images Base64', desc: 'Convertissez des images en format URL de données Base64' \},/g, "'base64-image-converter': { name: 'Convertisseur d\\'Images Base64', desc: 'Convertissez des images en format URL de données Base64' },");

fs.writeFileSync(path, content);
console.log('Fixed all French syntax errors');
