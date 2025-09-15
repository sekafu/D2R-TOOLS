# D2R攻略ツール 開発・デプロイワークフロー

## 🚀 全体の流れ概要

```
Windows PC (VS Code)
    ↓ git push
GitHub Repository
    ↓ 自動デプロイ
GitHub Pages (テスト環境)
    ↓ 自動デプロイ  
Firebase Hosting (本番環境)
```

---

## 📁 Step 1: 初期セットアップ（一回のみ）

### 1-1. Windows環境準備
```bash
# 1. Git for Windows インストール
# https://git-scm.com/download/win からダウンロード

# 2. Node.js インストール  
# https://nodejs.org/ja/download/ からLTS版ダウンロード

# 3. Git設定（Git Bashまたはコマンドプロンプト）
git config --global user.name "あなたの名前"
git config --global user.email "your.email@example.com"

# 4. Firebase CLI インストール
npm install -g firebase-tools
```

### 1-2. GitHubリポジトリ作成
```bash
# ブラウザでGitHub.comにアクセス
# 1. 右上の「+」→「New repository」
# 2. Repository name: d2r-tools  
# 3. Public にチェック
# 4. 「Create repository」ボタン
```

### 1-3. Firebaseプロジェクト作成
```bash
# ブラウザでhttps://console.firebase.google.com/にアクセス
# 1. 「プロジェクトを追加」
# 2. プロジェクト名: d2r-tools
# 3. Google Analytics: 有効にしない（任意）
# 4. 「プロジェクトを作成」

# Firebase CLIでログイン
firebase login
# ブラウザが開くのでGoogleアカウントでログイン
```

---

## 💻 Step 2: ローカル開発環境構築

### 2-1. プロジェクトフォルダ作成
```bash
# コマンドプロンプトまたはPowerShell
mkdir d2r-tools
cd d2r-tools

# Git初期化
git init
```

### 2-2. VS Code でプロジェクト開く
```bash
# VS Code起動
code .

# または手動でVS Codeを起動してフォルダを開く
```

### 2-3. 基本ファイル作成
```
d2r-tools/
├── index.html
├── README.md
├── .gitignore
└── runewords/
    ├── index.html
    ├── runewords.css
    └── runewords.js
```

### 2-4. .gitignore 作成
```bash
# .gitignore の内容
node_modules/
.firebase/
firebase-debug.log
.env
.DS_Store
Thumbs.db
```

---

## 📤 Step 3: GitHubへのアップロード

### 3-1. 初回アップロード
```bash
# Git Bash または コマンドプロンプト
cd d2r-tools

# ファイルをステージング
git add .

# コミット
git commit -m "Initial commit: Basic project structure"

# リモートリポジトリ追加（GitHubリポジトリのURL）
git remote add origin https://github.com/あなたのユーザー名/d2r-tools.git

# プッシュ
git push -u origin main
```

### 3-2. GitHub Pages 有効化
```bash
# ブラウザでGitHubリポジトリにアクセス
# https://github.com/あなたのユーザー名/d2r-tools

# 1. 「Settings」タブ
# 2. 左メニュー「Pages」
# 3. Source: "Deploy from a branch"
# 4. Branch: "main" / Folder: "/ (root)"
# 5. 「Save」ボタン

# 数分後にアクセス可能
# https://あなたのユーザー名.github.io/d2r-tools/
```

### 3-3. 日常的な更新作業
```bash
# ファイル編集後...

# 変更内容確認
git status
git diff

# ステージング
git add .
# または特定ファイルのみ
git add runewords/runewords.js

# コミット
git commit -m "Feature: Add rune inventory management"

# プッシュ
git push origin main

# → GitHub Pagesに自動反映（1-2分後）
```

---

## 🔥 Step 4: Firebase Hosting設定

### 4-1. Firebase初期化
```bash
# プロジェクトフォルダで実行
cd d2r-tools

firebase init hosting

# 設定内容:
# ? What do you want to use as your public directory? ./
# ? Configure as a single-page app (rewrite all urls to /index.html)? No  
# ? Set up automatic builds and deploys with GitHub? Yes
# ? For which GitHub repository would you like to set up a GitHub workflow? あなたのユーザー名/d2r-tools
```

### 4-2. 手動デプロイ
```bash
# 初回デプロイ
firebase deploy

# 成功すると表示される
# ✔ Deploy complete!
# Project Console: https://console.firebase.google.com/project/d2r-tools-xxxxx/overview
# Hosting URL: https://d2r-tools-xxxxx.web.app
```

---

## ⚙️ Step 5: 自動デプロイ設定

### 5-1. GitHub Secrets設定
```bash
# Firebase Service Account キー取得
firebase init hosting:github

# または手動で設定:
# 1. GitHub リポジトリ → Settings → Secrets and variables → Actions
# 2. "New repository secret"
# 3. Name: FIREBASE_SERVICE_ACCOUNT_D2R_TOOLS_XXXXX
# 4. Value: Firebase Service Account JSON（firebase initで生成される）
```

### 5-2. 自動生成されるワークフロー確認
```yaml
# .github/workflows/firebase-hosting-merge.yml（自動生成）
name: Deploy to Firebase Hosting on merge
'on':
  push:
    branches:
      - main
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT_D2R_TOOLS_XXXXX }}'
          channelId: live
          projectId: d2r-tools-xxxxx
```

---

## 🔄 Step 6: 日常的な開発フロー

### 6-1. ローカル開発
```bash
# VS Code でLive Server起動
# 1. index.html を右クリック
# 2. "Open with Live Server"
# 3. http://127.0.0.1:5500/ で確認

# または Firebase ローカルサーバー
firebase serve
# http://localhost:5000 で確認
```

### 6-2. テスト・公開サイクル
```bash
# 1. ローカルで開発・テスト
# Live Server で http://127.0.0.1:5500/

# 2. GitHubにプッシュ（テスト環境）
git add .
git commit -m "Feature: Add new search functionality"
git push origin main

# 3. GitHub Pages で動作確認（1-2分後）
# https://あなたのユーザー名.github.io/d2r-tools/

# 4. Firebase Hosting に自動デプロイ（2-3分後）
# https://d2r-tools-xxxxx.web.app/

# 5. 本番サイトで最終確認
```

---

## 🛠️ トラブルシューティング

### Git関連
```bash
# プッシュできない場合
git pull origin main
git push origin main

# コミット取り消し
git reset --soft HEAD~1

# ファイル名変更追跡
git mv oldname.html newname.html
```

### Firebase関連
```bash
# ログイン確認
firebase login:list

# プロジェクト確認
firebase projects:list

# デプロイ履歴確認
firebase hosting:releases:list
```

### Windows特有の問題
```bash
# 改行コード設定
git config --global core.autocrlf true

# パス区切り文字（JavaScriptでは / を使用）
// 正: './runewords/data.js'
// 誤: '.\\runewords\\data.js'
```

---

## 📊 開発サイクル例

```
月曜日: 新機能開発開始
├── VS Code Live Server でローカル開発
├── git commit で小刻みに保存
└── 夕方に git push でGitHub Pages確認

火曜日-木曜日: 機能改善・バグ修正
├── 毎日 git push でテスト環境更新
└── GitHub Pages で動作確認

金曜日: リリース準備
├── 最終テスト
├── git push で自動デプロイ
└── Firebase Hosting で本番確認
```

この流れで開発すれば、安全かつ効率的にサイトを運営できます！