# D2R攻略ツール サイト構成・ファイル構造

## 📁 ディレクトリ構成

```
d2r-tools/
├── index.html                    # トップページ/ダッシュボード
├── README.md                     # プロジェクト説明
├── LICENSE                       # ライセンス
├── 
├── runewords/                    # ルーンワード検索・管理
│   ├── index.html
│   ├── runewords.css
│   ├── runewords.js
│   └── README.md
├── 
├── runes/                        # ルーン詳細・入手方法
│   ├── index.html
│   ├── runes.css
│   ├── runes.js
│   └── README.md
├── 
├── items/                        # アイテム検索
│   ├── index.html
│   ├── items.css
│   ├── items.js
│   └── README.md
├── 
├── builds/                       # ビルドガイド
│   ├── index.html
│   ├── builds.css
│   ├── builds.js
│   └── README.md
├── 
├── calculators/                  # 各種計算機
│   ├── index.html
│   ├── damage/
│   │   ├── index.html
│   │   ├── damage.css
│   │   └── damage.js
│   ├── experience/
│   │   ├── index.html
│   │   ├── exp.css
│   │   └── exp.js
│   └── README.md
├── 
├── cube-recipes/                 # ホラドリックキューブ
│   ├── index.html
│   ├── cube.css
│   ├── cube.js
│   └── README.md
├── 
├── maps/                         # マップ・レベリング情報
│   ├── index.html
│   ├── maps.css
│   ├── maps.js
│   └── README.md
├── 
├── shared/                       # 共通リソース
│   ├── css/
│   │   ├── common.css           # 共通スタイル
│   │   ├── variables.css        # CSS変数
│   │   └── components.css       # 再利用可能コンポーネント
│   ├── js/
│   │   ├── navigation.js        # ナビゲーション
│   │   ├── utils.js            # ユーティリティ関数
│   │   └── storage.js          # LocalStorage管理
│   ├── data/
│   │   ├── runewords.js        # ルーンワードデータ
│   │   ├── runes.js            # ルーンデータ
│   │   ├── items.js            # アイテムデータ
│   │   ├── builds.js           # ビルドデータ
│   │   └── cube-recipes.js     # キューブレシピ
│   └── images/
│       ├── icons/              # アイコン
│       ├── runes/              # ルーン画像
│       └── items/              # アイテム画像
└── 
└── docs/                        # プロジェクト文書
    ├── project-overview.md      # プロジェクト概要
    ├── technical-specs.md       # 技術仕様
    ├── site-structure.md        # サイト構成
    └── development-guide.md     # 開発ガイド
```

## 🏗️ 各セクション詳細

### 1. ルーンワード検索・管理 (`/runewords/`)
**最優先開発対象**
- ルーンワード検索・絞り込み
- ルーン在庫管理
- 作成可能性判定

### 2. ルーン詳細 (`/runes/`)
- 各ルーンの詳細情報
- ドロップ場所・確率
- キューブでの合成方法

### 3. アイテム検索 (`/items/`)
- ユニーク・セット・レアアイテム検索
- アイテム比較機能
- ベースアイテム情報

### 4. ビルドガイド (`/builds/`)
- クラス別おすすめビルド
- レベリング順序
- 装備推奨

### 5. 計算機 (`/calculators/`)
- **ダメージ計算機**: DPS・実効ダメージ
- **経験値計算機**: レベリング効率
- **MF効率計算機**: アイテム発見率

### 6. キューブレシピ (`/cube-recipes/`)
- ホラドリックキューブレシピ検索
- アイテム → レシピ逆引き
- 効率的な素材使用法

### 7. マップ情報 (`/maps/`)
- レベリング推奨エリア
- MFランエリア情報
- ボス攻略情報

## 🔗 ナビゲーション構成

### メインナビゲーション
```
🏠 ホーム
🔮 ルーンワード
💎 ルーン
⚔️ アイテム
🛡️ ビルド
🧮 計算機
📦 キューブ
🗺️ マップ
```

### ブレッドクラム例
```
ホーム > ルーンワード > 検索結果
ホーム > 計算機 > ダメージ計算
```

## 📱 レスポンシブ対応

### ブレイクポイント
```css
/* Mobile First */
Base: 320px~     (スマートフォン)
SM:   576px~     (大画面スマートフォン)
MD:   768px~     (タブレット)
LG:   992px~     (小画面PC)
XL:   1200px~    (大画面PC)
XXL:  1400px~    (超大画面)
```

### レイアウト調整
- **モバイル**: 1カラム、ハンバーガーメニュー
- **タブレット**: 2カラム、サイドメニュー
- **デスクトップ**: 3カラム、フルメニュー

## 🚀 デプロイメント（Firebase Hosting + GitHub Pages）

### **デュアル展開戦略**
```
開発環境: VS Code Live Server (Windows)
    ↓
テスト環境: GitHub Pages
    ↓
本番環境: Firebase Hosting
```

### **Firebase Hosting設定**
```json
// firebase.json
{
  "hosting": {
    "public": "./",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**",
      "docs/**",
      "README.md"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

### **GitHub Actions 自動デプロイ**
```yaml
# .github/workflows/firebase-deploy.yml
name: Deploy to Firebase Hosting
on:
  push:
    branches: [ main ]
    
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Firebase Hosting
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          projectId: d2r-tools
```

### **Windows開発環境URL**
```
ローカル開発: http://127.0.0.1:5500/
GitHub Pages: https://username.github.io/d2r-tools/
Firebase Preview: http://localhost:5000/
Firebase Production: https://d2r-tools.web.app/
```

## 📋 開発優先順位

### Phase 1: 基盤構築
1. 共通CSS・JavaScript
2. ナビゲーション
3. トップページ

### Phase 2: コア機能
1. ルーンワード検索ツール ⭐
2. ルーン管理機能 ⭐
3. LocalStorage実装 ⭐

### Phase 3: 拡張機能
1. ルーン詳細ページ
2. 計算機機能
3. その他ツール

### Phase 4: 高度な機能
1. ビルドガイド
2. マップ情報
3. API連携