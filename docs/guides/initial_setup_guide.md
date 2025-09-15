# D2R攻略ツール 初回セットアップガイド（Windows）

## 🎯 **セットアップの種類別作業**

### **Phase 1: 手動インストール（ブラウザ＋インストーラー）**
- Git for Windows、Node.js、VS Code のインストール
- GitHub、Firebaseアカウント作成

### **Phase 2: VS Code内での作業**
- プロジェクトフォルダ作成
- ファイル構造の配置
- 統合ターミナルでのコマンド実行

### **Phase 3: 自動化可能部分（オプション）**
- バッチファイルでの一括設定

---

## 📋 **Phase 1: 必要ツールの手動インストール**

### 1-1. ブラウザでダウンロード・インストール
```
□ Git for Windows
  https://git-scm.com/download/win
  → git-2.xx.x-64-bit.exe をダウンロード・実行

□ Node.js LTS
  https://nodejs.org/ja/download/
  → node-v18.xx.x-x64.msi をダウンロード・実行

□ VS Code（未インストールの場合）
  https://code.visualstudio.com/
  → VSCodeUserSetup-x64-1.xx.x.exe をダウンロード・実行
```

### 1-2. アカウント作成（ブラウザ）
```
□ GitHub アカウント
  https://github.com/ → Sign up

□ Firebase（Googleアカウント使用）
  https://firebase.google.com/ → Get started
```

---

## 💻 **Phase 2: VS Code内での作業**

### 2-1. VS Code起動・拡張機能インストール
```
1. VS Code を起動
2. 拡張機能タブ（Ctrl+Shift+X）
3. 以下を検索してインストール：
   □ Live Server
   □ GitLens
   □ Prettier - Code formatter
   □ Japanese Language Pack（日本語化）
```

### 2-2. プロジェクトフォルダ作成
```
1. 「ファイル」→「フォルダーを開く」
2. 適当な場所（例：C:\Users\あなたの名前\Documents\）
3. 「新しいフォルダー」→「d2r-tools」
4. 「フォルダーの選択」
```

### 2-3. 統合ターミナル起動
```
1. VS Code内で「表示」→「ターミナル」（またはCtrl+`）
2. ターミナルが下部に表示される
3. PowerShell または Command Prompt が起動
```

### 2-4. ターミナルでの初期設定
```bash
# Git設定
git config --global user.name "あなたの名前"
git config --global user.email "your.email@example.com"

# Firebase CLI インストール
npm install -g firebase-tools

# 動作確認
git --version
node --version
firebase --version
```

### 2-5. プロジェクト初期化
```bash
# Git初期化
git init

# 基本ファイル作成（VS Code内で）
# File → New File で以下を作成：
```

---

## 📁 **Phase 2-6: ファイル配置（VS Code内）**

### ファイル作成手順
```
VS Code左側のエクスプローラーで右クリック
→「新しいファイル」または「新しいフォルダー」

作成するファイル・フォルダ：
□ index.html
□ README.md  
□ .gitignore
□ runewords/ （フォルダ）
  └── index.html
  └── runewords.css
  └── runewords.js
□ shared/ （フォルダ）
  └── css/
  └── js/
  └── data/
```

### .gitignore の内容（コピペ）
```gitignore
# Dependencies
node_modules/

# Firebase
.firebase/
firebase-debug.log
.firebaserc

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Logs
*.log
npm-debug.log*
```

### README.md の初期内容（コピペ）
```markdown
# D2R攻略ツール

Diablo 2 Resurrected の包括的な攻略ツールサイト

## 機能
- ルーンワード検索・管理
- ルーン在庫管理
- 作成可能性判定

## URL
- テスト環境: https://あなたのユーザー名.github.io/d2r-tools/
- 本番環境: https://d2r-tools-xxxxx.web.app/

## 技術スタック
- HTML5, CSS3, JavaScript
- Firebase Hosting
- GitHub Pages
```

---

## 🚀 **Phase 3: 自動化バッチファイル（オプション）**

### setup.bat （高度なユーザー向け）
```batch
@echo off
echo D2R攻略ツール セットアップ開始...

REM Git設定確認
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo Git設定が必要です
    set /p username="Git ユーザー名を入力: "
    set /p email="Git メールアドレスを入力: "
    git config --global user.name "%username%"
    git config --global user.email "%email%"
)

REM Firebase CLI インストール確認
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Firebase CLI をインストールしています...
    npm install -g firebase-tools
)

REM プロジェクト初期化
if not exist .git (
    echo Git リポジトリを初期化しています...
    git init
)

echo セットアップ完了！
echo 次は VS Code でファイルを作成してください
pause
```

---

## 🔄 **実際の作業フロー**

### **推奨フロー（初心者向け）**
```
1. 必要ツールを手動インストール（30分）
   ↓
2. VS Code でプロジェクト作成（15分）
   ↓  
3. VS Code統合ターミナルでコマンド実行（15分）
   ↓
4. ファイル配置・編集（15分）
```

### **VS Code中心の作業例**
```
□ ツールインストール → 手動（1回のみ）
□ プロジェクト作成 → VS Code File メニュー
□ Git設定 → VS Code統合ターミナル
□ ファイル作成 → VS Code エクスプローラー
□ コード編集 → VS Code エディター
□ Git操作 → VS Code統合ターミナル or GitLens
□ プレビュー → VS Code Live Server
```

## ✅ **セットアップ完了チェック**

### VS Code で以下が動作すればOK
```bash
# 統合ターミナルで実行
git --version        # Git バージョンが表示される
node --version       # Node.js バージョンが表示される  
firebase --version   # Firebase CLI バージョンが表示される

# ファイル構成確認
ls -la              # または dir（ファイル一覧表示）
```

### Live Server テスト
```
1. index.html を作成
2. 右クリック → "Open with Live Server"
3. ブラウザで http://127.0.0.1:5500/ が開く
```

## 💡 **つまり...**

**メインの作業はVS Code内**で完結し、必要なツールの**初回インストールのみ手動**です。

バッチファイルは上級者向けのオプションで、**VS Code + 統合ターミナル**で十分管理できます！

次は実際にコード作成を始めますか？