#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// 修复 getLanguage 函数，确保读取 localStorage
const oldGetLang = `// Get current language
function getLanguage() {
  return localStorage.getItem('multi-tools-lang') || 'en';
}`;

const newGetLang = `// Get current language
function getLanguage() {
  const stored = localStorage.getItem('multi-tools-lang');
  console.log('[Lang] localStorage:', stored);
  return stored || 'en';
}`;

content = content.replace(oldGetLang, newGetLang);

// 修复 initLanguage 函数，添加调试日志
const oldInitLang = `// Initialize language
function initLanguage() {
  const lang = getLanguage();
  applyLanguage(lang);
}`;

const newInitLang = `// Initialize language
function initLanguage() {
  const lang = getLanguage();
  console.log('[Lang] initLanguage called, lang:', lang);
  applyLanguage(lang);
  console.log('[Lang] applyLanguage completed');
}`;

content = content.replace(oldInitLang, newInitLang);

fs.writeFileSync(path, content);
console.log('修复 lang.js 添加调试日志');
