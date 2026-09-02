#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix Japanese image-resizer translation
content = content.replace(
  /      'image-resizer': \{ name: '画像リサイズツール', desc: 'カスタムサイズで画像をリサイズ' \},\n      'color-picker': \{ name: 'カラーピッカー', desc: '色を選択してHEX、RGB、HSL値を取得' \},\n      'gradient-generator': \{ name: 'グラデーションジェネレーター', desc: '美しいCSSグラデーションをオンラインで作成' \},\n      'shadow-generator': \{ name: 'シャドウジェネレーター', desc: 'box-shadowとtext-shadowのCSSコードを作成' \},\n      'box-model': \{ name: 'CSSボックスモデル', desc: 'CSSのマージン、パディング、ボーダー、コンテンツを可視化' \},/,
  `      'image-resizer': { name: '画像リサイズツール', desc: 'カスタムサイズで画像をリサイズ' },
      'color-picker': { name: 'カラーピッカー', desc: '色を選択してHEX、RGB、HSL値を取得' },
      'gradient-generator': { name: 'グラデーションジェネレーター', desc: '美しいCSSグラデーションをオンラインで作成' },
      'shadow-generator': { name: 'シャドウジェネレーター', desc: 'box-shadowとtext-shadowのCSSコードを作成' },
      'box-model': { name: 'CSSボックスモデル', desc: 'CSSのマージン、パディング、ボーダー、コンテンツを可視化' },`
);

// Fix Korean image-resizer translation
content = content.replace(
  /      'image-resizer': \{ name: '이미지 리사이즈', desc: '맞춤 크기로 이미지 크기 조정' \},\n      'color-picker': \{ name: '색상 선택기', desc: '색상을 선택하고 HEX, RGB, HSL 값을 얻으세요' \},\n      'gradient-generator': \{ name: '그라데이션 생성기', desc: '아름다운 CSS 그라데이션을 온라인으로 만들기' \},\n      'shadow-generator': \{ name: '쉐도우 생성기', desc: 'box-shadow 및 text-shadow CSS 코드 만들기' \},\n      'box-model': \{ name: 'CSS 박스 모델', desc: 'CSS 마진, 패딩, 테두리 및 콘텐츠를 시각화' \},/,
  `      'image-resizer': { name: '이미지 리사이즈', desc: '맞춤 크기로 이미지 크기 조정' },
      'color-picker': { name: '색상 선택기', desc: '색상을 선택하고 HEX, RGB, HSL 값을 얻으세요' },
      'gradient-generator': { name: '그라데이션 생성기', desc: '아름다운 CSS 그라데이션을 온라인으로 만들기' },
      'shadow-generator': { name: '쉐도우 생성기', desc: 'box-shadow 및 text-shadow CSS 코드 만들기' },
      'box-model': { name: 'CSS 박스 모델', desc: 'CSS 마진, 패딩, 테두리 및 콘텐츠를 시각화' },`
);

fs.writeFileSync(path, content);
console.log('Fixed image-resizer translations');
