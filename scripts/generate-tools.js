#!/usr/bin/env node
// Generate all tool pages from template

const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'tools');
const templatePath = path.join(__dirname, '..', 'tools', 'image-compressor.html');

// Tool data
const tools = [
    { id: 'image-compressor', icon: '🖼️', name: 'Image Compressor' },
    { id: 'image-converter', icon: '🔄', name: 'Image Converter' },
    { id: 'image-resizer', icon: '📐', name: 'Image Resizer' },
    { id: 'color-picker', icon: '🎨', name: 'Color Picker' },
    { id: 'gradient-generator', icon: '🌈', name: 'Gradient Generator' },
    { id: 'shadow-generator', icon: '💫', name: 'Shadow Generator' },
    { id: 'box-model', icon: '📦', name: 'CSS Box Model' },
    { id: 'json-formatter', icon: '📋', name: 'JSON Formatter' },
    { id: 'json-validator', icon: '✅', name: 'JSON Validator' },
    { id: 'xml-formatter', icon: '📄', name: 'XML Formatter' },
    { id: 'markdown-editor', icon: '📝', name: 'Markdown Editor' },
    { id: 'lorem-ipsum', icon: '📃', name: 'Lorem Ipsum Generator' },
    { id: 'word-counter', icon: '🔢', name: 'Word Counter' },
    { id: 'text-compressor', icon: '📉', name: 'Text Compressor' },
    { id: 'base64', icon: '🔐', name: 'Base64 Encoder/Decoder' },
    { id: 'url-encoder', icon: '🔗', name: 'URL Encoder' },
    { id: 'hash-generator', icon: '🔒', name: 'Hash Generator' },
    { id: 'password-generator', icon: '🔑', name: 'Password Generator' },
    { id: 'password-strength', icon: '🛡️', name: 'Password Strength' },
    { id: 'regex-tester', icon: '🔍', name: 'Regex Tester' },
    { id: 'cron-generator', icon: '⏰', name: 'Cron Generator' },
    { id: 'uuid-generator', icon: '🆔', name: 'UUID Generator' },
    { id: 'qr-generator', icon: '📱', name: 'QR Code Generator' },
    { id: 'csv-to-json', icon: '📊', name: 'CSV to JSON' },
    { id: 'unit-converter', icon: '📏', name: 'Unit Converter' },
    { id: 'timezone-converter', icon: '🌍', name: 'Timezone Converter' },
    { id: 'time-format', icon: '🕐', name: 'Time Format' },
    { id: 'age-calculator', icon: '🎂', name: 'Age Calculator' },
    { id: 'bmi-calculator', icon: '⚖️', name: 'BMI Calculator' },
    { id: 'mortgage-calculator', icon: '🏠', name: 'Mortgage Calculator' },
    { id: 'percentage-calculator', icon: '💯', name: 'Percentage Calculator' },
    { id: 'online-calculator', icon: '🧮', name: 'Online Calculator' },
    { id: 'color-contrast-checker', icon: '👁️', name: 'Color Contrast Checker' },
    { id: 'countdown-timer', icon: '⏱️', name: 'Countdown Timer' },
    { id: 'pomodoro-timer', icon: '🍅', name: 'Pomodoro Timer' },
    { id: 'random-generator', icon: '🎲', name: 'Random Generator' },
    { id: 'pdf-converter', icon: '📕', name: 'PDF Converter' },
    { id: 'readability-score', icon: '📖', name: 'Readability Score' },
    { id: 'seo-analyzer', icon: '🔎', name: 'SEO Analyzer' }
];

// Read template
let template = fs.readFileSync(templatePath, 'utf8');

// Generate each tool page
tools.forEach(tool => {
    if (tool.id === 'image-compressor') return; // Skip template itself
    
    let content = template;
    
    // Replace tool title
    content = content.replace(/Image Compressor/g, tool.name);
    content = content.replace(/image-compressor/g, tool.id);
    
    // Replace icon
    content = content.replace(/🖼️/g, tool.icon);
    
    // Write file
    const filePath = path.join(toolsDir, `${tool.id}.html`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Created ${tool.id}.html`);
});

console.log('\n✅ Generated all tool pages!');
