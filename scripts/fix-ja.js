#!/usr/bin/env node
const fs = require('fs');
const path = 'C:/Users/s/Documents/functional-website/multi-tools/lang.js';

let content = fs.readFileSync(path, 'utf8');

// Fix Japanese translations - add missing tools
content = content.replace(
  /      'color-picker': \{ name: 'カラーピッカー', desc: '色を選択してHEX、RGB、HSL値を取得' \},\n      'json-formatter': \{ name: 'JSONフォーマッター', desc: 'JSONデータをすぐにフォーマット' \},\n      'word-counter': \{ name: 'ワードカウンター', desc: '単語数、文字数、段落数をリアルタイムでカウント' \},/,
  `      'color-picker': { name: 'カラーピッカー', desc: '色を選択してHEX、RGB、HSL値を取得' },
      'gradient-generator': { name: 'グラデーションジェネレーター', desc: '美しいCSSグラデーションをオンラインで作成' },
      'shadow-generator': { name: 'シャドウジェネレーター', desc: 'box-shadowとtext-shadowのCSSコードを作成' },
      'box-model': { name: 'CSSボックスモデル', desc: 'CSSのマージン、パディング、ボーダー、コンテンツを可視化' },
      'json-formatter': { name: 'JSONフォーマッター', desc: 'JSONデータをすぐにフォーマット' },
      'json-validator': { name: 'JSONバリデーター', desc: 'JSON構文を検証してエラーを確認' },
      'xml-formatter': { name: 'XMLフォーマッター', desc: 'XMLデータをオンラインでフォーマット' },
      'markdown-editor': { name: 'Markdownエディター', desc: 'ライブプレビューでMarkdownを編集' },
      'lorem-ipsum': { name: 'LoremIpsumジェネレーター', desc: 'デザイン用のプレースホルダーテキストを生成' },
      'word-counter': { name: 'ワードカウンター', desc: '単語数、文字数、段落数をリアルタイムでカウント' },
      'text-compressor': { name: 'テキスト圧縮ツール', desc: 'Deflateアルゴリズムでテキストを圧縮' },
      'base64': { name: 'Base64エンコーダー/デコーダー', desc: 'Base64文字列をオンラインでエンコードおよびデコード' },
      'url-encoder': { name: 'URLエンコーダー', desc: 'URLコンポーネントをオンラインでエンコードおよびデコード' },
      'hash-generator': { name: 'ハッシュジェネレーター', desc: 'MD5、SHA-1、SHA-256、SHA-512ハッシュを生成' },
      'password-generator': { name: 'パスワードジェネレーター', desc: '強力な安全なパスワードをオンラインで生成' },
      'password-strength': { name: 'パスワード強度チェック', desc: 'パスワードの強度とセキュリティレベルをチェック' },
      'regex-tester': { name: 'Regexテスター', desc: 'リアルタイムマッチングで正規表現をテスト' },
      'cron-generator': { name: 'Cronジェネレーター', desc: 'スケジュール用のCron式を生成' },
      'uuid-generator': { name: 'UUIDジェネレーター', desc: '一意のUUIDをすぐに生成' },
      'qr-generator': { name: 'QRコードジェネレーター', desc: 'テキスト、URL、WiFi用のQRコードを生成' },
      'csv-to-json': { name: 'CSVtoJSON', desc: 'CSVデータをすぐにJSON形式に変換' },
      'unit-converter': { name: '単位変換ツール', desc: '異なる測定単位間で変換' },
      'timezone-converter': { name: 'タイムゾーン変換ツール', desc: '異なるタイムゾーン間で時間を変換' },
      'time-format': { name: '時間フォーマット', desc: '日付/時刻文字列をフォーマットおよび変換' },
      'age-calculator': { name: '年齢計算ツール', desc: '生年月日から正確な年齢を計算' },
      'bmi-calculator': { name: 'BMI計算ツール', desc: '身体質量指数をオンラインで計算' },
      'mortgage-calculator': { name: '住宅ローン計算ツール', desc: '毎月の住宅ローン返済額を計算' },
      'percentage-calculator': { name: '割合計算ツール', desc: '割合を簡単にオンラインで計算' },
      'online-calculator': { name: 'オンライン電卓', desc: '日常の数学用の基本電卓' },
      'color-contrast-checker': { name: 'カラーコントラストチェッカー', desc: 'アクセシビリティのためにカラーコントラストをチェック' },
      'countdown-timer': { name: 'カウントダウンタイマー', desc: 'オンラインでカウントダウンタイマーを作成' },
      'pomodoro-timer': { name: 'ポモドーロタイマー', desc: 'ポモドーロテクニックでタイムマネジメント' },
      'random-generator': { name: 'ランダムジェネレーター', desc: 'ランダムな数字、文字列、パスワードを生成' },
      'pdf-converter': { name: 'PDF変換ツール', desc: '画像をオンラインでPDFに変換' },
      'readability-score': { name: '読みやすさスコア', desc: 'テキストの読みやすさと理解レベルをチェック' },
      'seo-analyzer': { name: 'SEO分析ツール', desc: 'ウェブページの基本的なSEO要因を分析' },`
);

fs.writeFileSync(path, content);
console.log('Fixed Japanese translations');
