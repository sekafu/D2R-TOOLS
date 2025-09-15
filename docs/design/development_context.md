# D2R攻略ツール 開発コンテキスト（補足情報）

## 📊 プロジェクト背景

### **データソース**
- **URL**: https://innomaroom.hatenablog.com/entry/diablo2resurrected-guide-runewords
- **内容**: D2R攻略：ルーン＆ルーンワードの解説と効果まとめ（パッチ2.6対応）
- **データ**: 全ルーンワード情報（名前、レベル、ルーン、効果、装備タイプ等）

### **開発環境**
- **OS**: Windows 10/11
- **エディタ**: VS Code + Live Server
- **デプロイ**: Firebase Hosting（本番） + GitHub Pages（テスト）
- **バージョン管理**: Git + GitHub

## 🎯 **優先実装機能**

### **Phase 1: ルーンワード検索ツール**
1. **基本検索機能**
   - ルーン名検索（「ヴェックス」「Vex」対応）
   - 装備タイプ絞り込み
   - ソケット数絞り込み
   - レベル範囲絞り込み

2. **ルーン管理機能**
   - LocalStorageでルーン個数管理
   - +/- ボタンで個数調整
   - 作成可能性判定（色分け表示）

3. **絞り込み機能**
   - 作成可能のみ表示
   - あと少しで作成可能
   - 効果キーワード検索

## 📋 **実装のサンプルデータ**

### **ルーンワードデータ例**
```javascript
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
        'ヒットリカバリー速度（FHR）+55%',
        // ...
      ],
      shield: [
        '全スキルレベル+2',
        'スキル発動速度（FCR）+25~35%',
        'ヒットリカバリー速度（FHR）+55%',
        // ...
      ]
    },
    version: 'Ver. 1.10'
  }
  // ... 他のルーンワード
];
```

### **ルーン管理データ例**
```javascript
const DEFAULT_RUNES = {
  'エル': 0, 'エルド': 0, 'ティア': 0, 'ネフ': 0,
  'エス': 0, 'イス': 0, 'タル': 0, 'ラル': 0,
  'オルト': 0, 'スル': 0, 'アムン': 0, 'ソル': 0,
  // ... 全33種類のルーン
};
```

## 🎨 **デザイン方針**

### **カラーパレット**
```css
:root {
  --primary-color: #e94560;      /* Diablo レッド */
  --bg-primary: #1a1a2e;         /* ダークブルー */
  --bg-secondary: #16213e;       /* セカンダリ */
  --accent: #0f4c75;             /* アクセント */
  --text: #ffffff;               /* テキスト */
  --border: rgba(233, 69, 96, 0.3); /* ボーダー */
}
```

### **作成可能性の色分け**
```css
.runeword-card--craftable { border-color: #4CAF50; } /* 緑: 作成可能 */
.runeword-card--almost { border-color: #FF9800; }    /* 橙: あと少し */
.runeword-card--impossible { border-color: #F44336; } /* 赤: 作成不可 */
.runeword-card--partial { border-color: #9E9E9E; }   /* 灰: 部分所持 */
```

## 🔍 **検索機能の実装方針**

### **検索処理**
```javascript
function searchRunewords(criteria) {
  return RUNEWORDS.filter(rw => {
    // 名前検索
    if (criteria.name && !matchesName(rw, criteria.name)) return false;
    
    // ルーン検索
    if (criteria.rune && !rw.runes.includes(criteria.rune)) return false;
    
    // 装備タイプ
    if (criteria.equipment && !rw.equipment.includes(criteria.equipment)) return false;
    
    // レベル範囲
    if (criteria.minLevel && rw.level < criteria.minLevel) return false;
    if (criteria.maxLevel && rw.level > criteria.maxLevel) return false;
    
    // 作成可能性
    if (criteria.craftability) {
      const status = getCraftabilityStatus(rw, playerRunes);
      if (status !== criteria.craftability) return false;
    }
    
    return true;
  });
}
```

## 📱 **レスポンシブ対応**

### **ブレイクポイント**
```css
/* Mobile First */
.container { max-width: 100%; }

@media (min-width: 768px) {
  .search-container { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .results { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1200px) {
  .results { grid-template-columns: repeat(3, 1fr); }
}
```

## 🚀 **開発開始時のステップ**

1. **基本ファイル作成**
   - index.html（基本構造）
   - runewords/index.html（メイン機能）
   - shared/css/common.css（共通スタイル）

2. **データ準備**
   - 元サイトからルーンワードデータ抽出
   - JavaScript形式で整理

3. **検索機能実装**
   - 基本検索UI
   - フィルタリング処理
   - 結果表示

4. **ルーン管理実装**
   - LocalStorage保存・読み込み
   - UI（+/-ボタン）
   - 作成可能性判定

## 💡 **重要な設計判断**

1. **純粋なHTML/CSS/JavaScript**（フレームワーク不使用）
2. **モバイルファースト**のレスポンシブデザイン
3. **LocalStorage**によるクライアントサイドデータ管理
4. **Firebase Hosting**での高速配信
5. **段階的な機能追加**（MVP → 拡張）