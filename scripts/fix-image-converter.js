#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/tools/image-converter.html';

let content = fs.readFileSync(path, 'utf8');

// 1. 添加工具标题和描述的多语言支持
content = content.replace(
  '<h1>🖼️ Image Converter</h1>\n                <p>Convert images between formats</p>',
  '<h1 data-i18n="tools.image-converter.name">🖼️ Image Converter</h1>\n                <p data-i18n="tools.image-converter.desc">Convert images between formats</p>'
);

// 2. 添加格式选择标签的多语言支持
content = content.replace(
  '<label>Convert to:</label>',
  '<label data-i18n="converter.format_label">Convert to:</label>'
);

// 3. 添加按钮的多语言支持
content = content.replace(
  '<button class="btn btn-primary" onclick="convert()">Convert</button>',
  '<button class="btn btn-primary" id="convertBtn" data-i18n="converter.convert">Convert</button>'
);

content = content.replace(
  '<button class="btn btn-primary" onclick="download()">Download</button>',
  '<button class="btn btn-primary" id="downloadBtn" data-i18n="converter.download">Download</button>'
);

// 4. 添加按钮点击事件绑定
content = content.replace(
  '        if (typeof gtag !== \'undefined\') {\n            gtag(\'event\', \'tool_open\', { tool: \'image-converter\' });\n        }',
  `        // 绑定按钮点击事件
        document.getElementById('convertBtn').addEventListener('click', convert);
        document.getElementById('downloadBtn').addEventListener('click', download);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'tool_open', { tool: 'image-converter' });
        }`
);

fs.writeFileSync(path, content);
console.log('✅ 已完善 image-converter.html');
