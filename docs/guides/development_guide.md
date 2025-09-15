# D2R攻略ツール 開発ガイド

## 🚀 開発環境セットアップ

### 必要ツール
- **テキストエディタ**: VS Code（推奨）
- **ブラウザ**: Chrome/Firefox（開発者ツール使用）
- **バージョン管理**: Git
- **ホスティング**: GitHub Pages または Firebase

### VS Code 推奨拡張機能
```
- Live Server (ローカル開発サーバー)
- Prettier (コード整形)
- Auto Rename Tag (HTML タグ編集)
- JavaScript (ES6) code snippets
- CSS Peek (CSS定義ジャンプ)
```

## 📝 コーディング規約

### HTML
```html
<!-- セマンティックな要素を使用 -->
<main role="main">
  <section class="search-section">
    <h2>検索機能</h2>
    <!-- ... -->
  </section>
</main>

<!-- アクセシビリティを考慮 -->
<button aria-label="ルーン数を増やす" class="rune-btn">+</button>
<input type="search" aria-describedby="search-help">
```

### CSS
```css
/* BEM記法を採用 */
.runeword-card { }
.runeword-card__header { }
.runeword-card__title { }
.runeword-card--craftable { }

/* CSS Custom Properties使用 */
:root {
  --primary-color: #e94560;
  --bg-primary: #1a1a2e;
  --border-radius: 8px;
}

/* モバイルファースト */
.container {
  /* モバイル用スタイル */
}

@media (min-width: 768px) {
  .container {
    /* タブレット用スタイル */
  }
}
```

### JavaScript
```javascript
// ES6+ 構文を使用
const runewords = [];
const filterResults = (criteria) => {
  return runewords.filter(rw => matchesCriteria(rw, criteria));
};

// 関数の分離
function initializeApp() {
  loadData();
  setupEventListeners();
  renderInitialView();
}

// LocalStorage ヘルパー
const Storage = {
  save: (key, data) => localStorage.setItem(key, JSON.stringify(data)),
  load: (key) => JSON.parse(localStorage.getItem(key) || '{}'),
  remove: (key) => localStorage.removeItem(key)
};
```

## 🔧 実装順序

### 1. 基盤構築
```bash
# ディレクトリ作成
mkdir d2r-tools
cd d2r-tools
mkdir runewords shared/css shared/js shared/data

# 基本ファイル作成
touch index.html
touch shared/css/common.css
touch shared/js/utils.js
touch shared/data/runewords.js
```

### 2. ルーンワードデータ準備
```javascript
// shared/data/runewords.js
const RUNEWORDS = [
  {
    id: 'spirit',
    name: '精霊',
    english: 'Spirit',
    level: 25,
    sockets: 4,
    equipment: ['剣', '盾'],
    runes: ['タル', 'スル', 'オルト', 'アムン'],
    effects: {
      weapon: [
        '全スキルレベル+2',
        'スキル発動速度（FCR）+25~35%',
        // ...
      ],
      shield: [
        '全スキルレベル+2',
        'スキル発動速度（FCR）+25~35%',
        // ...
      ]
    },
    version: 'Ver. 1.10'
  },
  // ...
];
```

### 3. 検索機能実装
```javascript
// runewords/runewords.js
class RunewordSearcher {
  constructor(data) {
    this.runewords = data;
    this.filteredResults = data;
    this.playerRunes = this.loadPlayerRunes();
  }

  search(criteria) {
    this.filteredResults = this.runewords.filter(rw => {
      return this.matchesName(rw, criteria.name) &&
             this.matchesLevel(rw, criteria.level) &&
             this.matchesEquipment(rw, criteria.equipment) &&
             this.matchesCraftability(rw, criteria.craftable);
    });
    this.render();
  }

  // ...
}
```

## 🧪 テスト手順

### ブラウザテスト
```javascript
// コンソールでのデータ確認
console.log('Runewords loaded:', RUNEWORDS.length);
console.log('Player runes:', Storage.load('playerRunes'));

// 検索機能テスト
searcher.search({ name: 'spirit' });
console.log('Search results:', searcher.filteredResults);
```

### モバイルテスト
```
Chrome DevTools:
1. F12 → Device Toolbar
2. 各デバイスサイズで確認
3. タッチ操作のテスト
```

## 📊 パフォーマンス最適化

### 読み込み速度
```html
<!-- 重要なCSSをインライン化 -->
<style>
  /* クリティカルCSS */
  body { margin: 0; font-family: sans-serif; }
</style>

<!-- 非同期読み込み -->
<script src="runewords.js" defer></script>
```

### 検索速度
```javascript
// デバウンス処理
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 使用例
const debouncedSearch = debounce(search, 300);
searchInput.addEventListener('input', debouncedSearch);
```

## 🐛 デバッグ手順

### よくある問題
1. **LocalStorage データが保存されない**
   - ブラウザがプライベートモードかチェック
   - ストレージ容量の確認

2. **検索結果が表示されない**
   - データの読み込み確認
   - フィルター条件の確認

3. **モバイルでレイアウトが崩れる**
   - viewport meta タグの確認
   - CSS Grid/Flexbox の対応状況確認

### デバッグコード
```javascript
// 開発用デバッグ関数
function debug() {
  return {
    runewords: RUNEWORDS,
    playerRunes: Storage.load('playerRunes'),
    filteredResults: searcher?.filteredResults || [],
    version: '1.0.0'
  };
}

// コンソールで debug() を実行
```

## 🚀 デプロイ手順

### GitHub Pages
```bash
# リポジトリ作成・プッシュ
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/d2r-tools.git
git push -u origin main

# GitHub Pages 有効化
# Settings → Pages → Source: Deploy from a branch
# Branch: main → Save
```

### Firebase Hosting
```bash
# Firebase CLI インストール・設定
npm install -g firebase-tools
firebase login
firebase init hosting

# デプロイ
firebase deploy
```

## 📋 チェックリスト

### 開発環境確認（Windows）
- [ ] Git for Windows インストール済み
- [ ] Node.js インストール済み
- [ ] Firebase CLI インストール済み
- [ ] VS Code + Live Server 拡張機能設定済み
- [ ] GitHub アカウント・リポジトリ作成済み
- [ ] Firebase プロジェクト作成済み

### 公開前確認
- [ ] 全機能の動作確認（Chrome/Firefox）
- [ ] レスポンシブデザイン確認（DevTools）
- [ ] IE/Edge 互換性確認
- [ ] アクセシビリティ確認
- [ ] パフォーマンス確認（Lighthouse）
- [ ] Firebase Hosting 動作確認
- [ ] GitHub Actions 自動デプロイ確認

### 保守確認
- [ ] コードコメント充実
- [ ] README.md 更新
- [ ] ライセンス明記（MIT推奨）
- [ ] CHANGELOG.md 作成
- [ ] Firebase プロジェクト設定バックアップ