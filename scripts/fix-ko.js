#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix Korean translations - add missing tools
content = content.replace(
  /      'color-picker': \{ name: '색상 선택기', desc: '색상을 선택하고 HEX, RGB, HSL 값을 얻으세요' \},\n      'json-formatter': \{ name: 'JSON 포매터', desc: 'JSON 데이터를 즉시 포맷팅' \},\n      'word-counter': \{ name: '워드 카운터', desc: '단어 수, 문자 수, 단락을 실시간으로 카운트' \},/,
  `      'color-picker': { name: '색상 선택기', desc: '색상을 선택하고 HEX, RGB, HSL 값을 얻으세요' },
      'gradient-generator': { name: '그라데이션 생성기', desc: '아름다운 CSS 그라데이션을 온라인으로 만들기' },
      'shadow-generator': { name: '쉐도우 생성기', desc: 'box-shadow 및 text-shadow CSS 코드 만들기' },
      'box-model': { name: 'CSS 박스 모델', desc: 'CSS 마진, 패딩, 테두리 및 콘텐츠를 시각화' },
      'json-formatter': { name: 'JSON 포매터', desc: 'JSON 데이터를 즉시 포맷팅' },
      'json-validator': { name: 'JSON 검증기', desc: 'JSON 구문을 검증하고 오류를 확인' },
      'xml-formatter': { name: 'XML 포매터', desc: 'XML 데이터를 온라인으로 포맷팅' },
      'markdown-editor': { name: '마크다운 편집기', desc: '실시간 미리보기로 마크다운 편집' },
      'lorem-ipsum': { name: '로렘 입숨 생성기', desc: '디자인용 플레이스홀더 텍스트 생성' },
      'word-counter': { name: '워드 카운터', desc: '단어 수, 문자 수, 단락을 실시간으로 카운트' },
      'text-compressor': { name: '텍스트 압축기', desc: 'Deflate 알고리즘으로 텍스트 압축' },
      'base64': { name: 'Base64 인코더/디코더', desc: 'Base64 문자열을 온라인으로 인코딩 및 디코딩' },
      'url-encoder': { name: 'URL 인코더', desc: 'URL 구성 요소를 온라인으로 인코딩 및 디코딩' },
      'hash-generator': { name: '해시 생성기', desc: 'MD5, SHA-1, SHA-256, SHA-512 해시 생성' },
      'password-generator': { name: '비밀번호 생성기', desc: '강력하고 안전한 비밀번호를 온라인으로 생성' },
      'password-strength': { name: '비밀번호 강도 체크', desc: '비밀번호 강도와 보안 수준을 확인' },
      'regex-tester': { name: '정규식 테스트기', desc: '실시간 매칭으로 정규식 테스트' },
      'cron-generator': { name: '크론 생성기', desc: '스케줄링을 위한 크론 표현식 생성' },
      'uuid-generator': { name: 'UUID 생성기', desc: '고유한 UUID를 즉시 생성' },
      'qr-generator': { name: 'QR 코드 생성기', desc: '텍스트, URL, WiFi용 QR 코드 생성' },
      'csv-to-json': { name: 'CSV to JSON', desc: 'CSV 데이터를 즉시 JSON 형식으로 변환' },
      'unit-converter': { name: '단위 변환기', desc: '서로 다른 측정 단위 간 변환' },
      'timezone-converter': { name: '시간대 변환기', desc: '서로 다른 시간대 간 시간 변환' },
      'time-format': { name: '시간 포맷', desc: '날짜/시간 문자열 포맷팅 및 변환' },
      'age-calculator': { name: '나이 계산기', desc: '생년월일에서 정확한 나이 계산' },
      'bmi-calculator': { name: 'BMI 계산기', desc: '체질량 지수를 온라인으로 계산' },
      'mortgage-calculator': { name: '주택담보대출 계산기', desc: '월 주택담보대출 상환액 계산' },
      'percentage-calculator': { name: '비율 계산기', desc: '비율을 쉽게 온라인으로 계산' },
      'online-calculator': { name: '온라인 계산기', desc: '일상 수학용 기본 계산기' },
      'color-contrast-checker': { name: '색상 대비 체크기', desc: '접근성을 위한 색상 대비 확인' },
      'countdown-timer': { name: '카운트다운 타이머', desc: '온라인으로 카운트다운 타이머 만들기' },
      'pomodoro-timer': { name: '포모도로 타이머', desc: '포모도로 기법으로 시간 관리' },
      'random-generator': { name: '무작위 생성기', desc: '무작위 숫자, 문자열, 비밀번호 생성' },
      'pdf-converter': { name: 'PDF 변환기', desc: '이미지를 온라인으로 PDF로 변환' },
      'readability-score': { name: '가독성 점수', desc: '텍스트 가독성 및 이해 수준 확인' },
      'seo-analyzer': { name: 'SEO 분석기', desc: '웹 페이지의 기본 SEO 요인 분석' },`
);

fs.writeFileSync(path, content);
console.log('Fixed Korean translations');
