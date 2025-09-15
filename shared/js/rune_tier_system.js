// D2R攻略ツール ルーン分類システム

/**
 * ルーンの分類定義
 */
const RUNE_TIERS = {
  low: {
    name: '低級',
    english: 'Low',
    range: [1, 11], // エル～アムン
    color: '#4CAF50', // 緑
    description: '比較的入手しやすいルーン'
  },
  mid: {
    name: '中級', 
    english: 'Mid',
    range: [12, 25], // ソル～グル
    color: '#FF9800', // オレンジ
    description: '中程度の希少性を持つルーン'
  },
  high: {
    name: '上級',
    english: 'High', 
    range: [26, 33], // ヴェックス～ゾッド
    color: '#F44336', // 赤
    description: '非常に希少で価値の高いルーン'
  }
};

/**
 * ルーン分類ユーティリティクラス
 */
class RuneTierSystem {
  /**
   * ルーン番号から分類を取得
   */
  static getRuneTier(runeNumber) {
    for (const [tier, info] of Object.entries(RUNE_TIERS)) {
      if (runeNumber >= info.range[0] && runeNumber <= info.range[1]) {
        return {
          tier: tier,
          ...info
        };
      }
    }
    return null;
  }

  /**
   * ルーン名から分類を取得
   */
  static getRuneTierByName(runeName) {
    const rune = window.RuneData?.findByName(runeName);
    if (!rune) return null;
    
    return this.getRuneTier(rune.number);
  }

  /**
   * ルーンワードの作成難易度を計算
   */
  static getRunewordDifficulty(runeword) {
    if (!runeword.runes || runeword.runes.length === 0) {
      return null;
    }

    let maxTierLevel = 0;
    let maxTier = null;
    const runeDetails = [];

    runeword.runes.forEach(runeName => {
      const rune = window.RuneData?.findByName(runeName);
      if (rune) {
        const tier = this.getRuneTier(rune.number);
        if (tier) {
          runeDetails.push({
            name: runeName,
            tier: tier.tier,
            number: rune.number
          });

          // 最も高いランクのルーンで難易度を決定
          if (rune.number > maxTierLevel) {
            maxTierLevel = rune.number;
            maxTier = tier;
          }
        }
      }
    });

    return {
      difficulty: maxTier,
      maxRuneLevel: maxTierLevel,
      runeDetails: runeDetails,
      summary: this.getDifficultySummary(runeDetails)
    };
  }

  /**
   * 難易度サマリーを生成
   */
  static getDifficultySummary(runeDetails) {
    const counts = { low: 0, mid: 0, high: 0 };
    
    runeDetails.forEach(rune => {
      counts[rune.tier]++;
    });

    return {
      low: counts.low,
      mid: counts.mid, 
      high: counts.high,
      total: runeDetails.length
    };
  }

  /**
   * 難易度バッジHTMLを生成
   */
  static createDifficultyBadge(difficulty, size = 'normal') {
    if (!difficulty || !difficulty.difficulty) {
      return '';
    }

    const tier = difficulty.difficulty;
    const sizeClass = size === 'small' ? 'badge-small' : '';
    
    return `
      <span class="difficulty-badge difficulty-${tier.tier} ${sizeClass}" 
            title="${tier.description}"
            style="background-color: ${tier.color}">
        ${tier.name}
      </span>
    `;
  }

  /**
   * ルーン構成の詳細バッジを生成
   */
  static createRuneCompositionBadges(difficulty) {
    if (!difficulty || !difficulty.summary) {
      return '';
    }

    const summary = difficulty.summary;
    const badges = [];

    if (summary.high > 0) {
      badges.push(`<span class="rune-composition-badge high" title="上級ルーン ${summary.high}個">${summary.high}H</span>`);
    }
    if (summary.mid > 0) {
      badges.push(`<span class="rune-composition-badge mid" title="中級ルーン ${summary.mid}個">${summary.mid}M</span>`);
    }
    if (summary.low > 0) {
      badges.push(`<span class="rune-composition-badge low" title="低級ルーン ${summary.low}個">${summary.low}L</span>`);
    }

    return badges.join('');
  }

  /**
   * 難易度による色分けクラスを取得
   */
  static getDifficultyColorClass(difficulty) {
    if (!difficulty || !difficulty.difficulty) {
      return 'difficulty-unknown';
    }
    return `difficulty-${difficulty.difficulty.tier}`;
  }

  /**
   * ルーンワードリストを難易度でソート
   */
  static sortByDifficulty(runewords, direction = 'asc') {
    return runewords.sort((a, b) => {
      const diffA = this.getRunewordDifficulty(a);
      const diffB = this.getRunewordDifficulty(b);
      
      const levelA = diffA ? diffA.maxRuneLevel : 0;
      const levelB = diffB ? diffB.maxRuneLevel : 0;
      
      return direction === 'asc' ? levelA - levelB : levelB - levelA;
    });
  }

  /**
   * 難易度別統計を取得
   */
  static getDifficultyStats(runewords) {
    const stats = {
      low: { count: 0, runewords: [] },
      mid: { count: 0, runewords: [] },
      high: { count: 0, runewords: [] },
      unknown: { count: 0, runewords: [] }
    };

    runewords.forEach(rw => {
      const difficulty = this.getRunewordDifficulty(rw);
      if (difficulty && difficulty.difficulty) {
        const tier = difficulty.difficulty.tier;
        stats[tier].count++;
        stats[tier].runewords.push(rw);
      } else {
        stats.unknown.count++;
        stats.unknown.runewords.push(rw);
      }
    });

    return stats;
  }

  /**
   * 難易度フィルターを適用
   */
  static filterByDifficulty(runewords, targetTier) {
    if (!targetTier || targetTier === 'all') {
      return runewords;
    }

    return runewords.filter(rw => {
      const difficulty = this.getRunewordDifficulty(rw);
      return difficulty && difficulty.difficulty && difficulty.difficulty.tier === targetTier;
    });
  }

  /**
   * プレイヤーのルーン在庫から作成可能な難易度を分析
   */
  static analyzePlayerCapability(playerRunes) {
    const analysis = {
      maxTier: null,
      availableRunes: { low: [], mid: [], high: [] },
      recommendations: []
    };

    // 所持ルーンを分類
    Object.keys(playerRunes).forEach(runeName => {
      const count = playerRunes[runeName];
      if (count > 0) {
        const tier = this.getRuneTierByName(runeName);
        if (tier) {
          analysis.availableRunes[tier.tier].push({
            name: runeName,
            count: count,
            tier: tier
          });
          
          // 最高ランクを更新
          if (!analysis.maxTier || tier.range[1] > analysis.maxTier.range[1]) {
            analysis.maxTier = tier;
          }
        }
      }
    });

    // 推奨事項を生成
    if (analysis.availableRunes.high.length > 0) {
      analysis.recommendations.push('上級ルーンワードの作成が可能です');
    } else if (analysis.availableRunes.mid.length > 0) {
      analysis.recommendations.push('中級ルーンワードから始めることをお勧めします');
    } else if (analysis.availableRunes.low.length > 0) {
      analysis.recommendations.push('低級ルーンワードで経験を積みましょう');
    } else {
      analysis.recommendations.push('ルーンを集めることから始めましょう');
    }

    return analysis;
  }
}

// グローバルに公開
window.RUNE_TIERS = RUNE_TIERS;
window.RuneTierSystem = RuneTierSystem;

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RUNE_TIERS, RuneTierSystem };
}