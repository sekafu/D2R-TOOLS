// D2R攻略ツール ルーンデータ（修正版）

/**
 * ルーンデータ（全33種類）
 * データ出典: いのまるの秘密基地
 */
const RUNES = [
  // ランク1-11 (低ランクルーン)
  {
    id: 'el',
    name: 'エル',
    english: 'El',
    number: 1,
    level: 11,
    socketWeapon: 'ライトニング・ダメージ+1~50',
    socketArmor: '軽減される防御力+15',
    socketShield: '軽減される防御力+15',
    cubeFormula: null,
    dropLevel: 11,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common',
    tier: 'low' // 低級ルーン
  },
  {
    id: 'eld',
    name: 'エルド',
    english: 'Eld',
    number: 2,
    level: 11,
    socketWeapon: 'アンデッドに対するダメージ+75%、アタック・レイティング+50',
    socketArmor: 'スタミナ枯渇速度が15%遅くなる',
    socketShield: 'ブロック率+7%',
    cubeFormula: '3x エル → 1x エルド',
    dropLevel: 11,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'tir',
    name: 'ティア',
    english: 'Tir',
    number: 3,
    level: 13,
    socketWeapon: 'マナ・リーチ+2',
    socketArmor: 'マナ+2×キャラクターレベル',
    socketShield: 'マナ+2×キャラクターレベル',
    cubeFormula: '3x エルド → 1x ティア',
    dropLevel: 13,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'nef',
    name: 'ネフ',
    english: 'Nef',
    number: 4,
    level: 15,
    socketWeapon: 'ノックバック',
    socketArmor: '軽減される防御力+30',
    socketShield: '軽減される防御力+30',
    cubeFormula: '3x ティア → 1x ネフ',
    dropLevel: 15,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'eth',
    name: 'エス',
    english: 'Eth',
    number: 5,
    level: 17,
    socketWeapon: 'ターゲット防御力-25%',
    socketArmor: 'マナ再生速度+15%',
    socketShield: 'マナ再生速度+15%',
    cubeFormula: '3x ネフ → 1x エス',
    dropLevel: 17,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'ith',
    name: 'イス',
    english: 'Ith',
    number: 6,
    level: 19,
    socketWeapon: 'ダメージ+25%',
    socketArmor: 'ダメージ軽減-15%',
    socketShield: 'ダメージ軽減-15%',
    cubeFormula: '3x エス → 1x イス',
    dropLevel: 19,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'tal',
    name: 'タル',
    english: 'Tal',
    number: 7,
    level: 21,
    socketWeapon: '毒ダメージ+75（5秒間）',
    socketArmor: '毒抵抗+30%',
    socketShield: '毒抵抗+35%',
    cubeFormula: '3x イス → 1x タル',
    dropLevel: 21,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'ral',
    name: 'ラル',
    english: 'Ral',
    number: 8,
    level: 23,
    socketWeapon: '火炎ダメージ+5~30',
    socketArmor: '火炎抵抗+30%',
    socketShield: '火炎抵抗+35%',
    cubeFormula: '3x タル → 1x ラル',
    dropLevel: 23,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'ort',
    name: 'オルト',
    english: 'Ort',
    number: 9,
    level: 25,
    socketWeapon: 'ライトニング・ダメージ+1~50',
    socketArmor: 'ライトニング抵抗+30%',
    socketShield: 'ライトニング抵抗+35%',
    cubeFormula: '3x ラル → 1x オルト',
    dropLevel: 25,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'thul',
    name: 'スル',
    english: 'Thul',
    number: 10,
    level: 27,
    socketWeapon: '冷気ダメージ+3~14（3秒間）',
    socketArmor: '冷気抵抗+30%',
    socketShield: '冷気抵抗+35%',
    cubeFormula: '3x オルト → 1x スル',
    dropLevel: 27,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },
  {
    id: 'amn',
    name: 'アムン',
    english: 'Amn',
    number: 11,
    level: 29,
    socketWeapon: 'ライフ・リーチ+7%',
    socketArmor: 'アタッカー・テイクス・ダメージ+14',
    socketShield: 'アタッカー・テイクス・ダメージ+14',
    cubeFormula: '3x スル → 1x アムン',
    dropLevel: 29,
    sources: ['カウンテス(Act1)', 'ヘルフォージ', '通常ドロップ'],
    rarity: 'common'
  },

  // ランク12-22 (中ランクルーン)
  {
    id: 'sol',
    name: 'ソル',
    english: 'Sol',
    number: 12,
    level: 27,
    socketWeapon: 'ダメージ+25%',
    socketArmor: 'ダメージ軽減-7',
    socketShield: 'ダメージ軽減-7',
    cubeFormula: '3x アムン → 1x ソル',
    dropLevel: 27,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'shael',
    name: 'シャエル',
    english: 'Shael',
    number: 13,
    level: 29,
    socketWeapon: '攻撃速度（IAS）+20%',
    socketArmor: 'ヒットリカバリー速度（FHR）+20%',
    socketShield: 'ブロック率+20%',
    cubeFormula: '3x ソル → 1x シャエル',
    dropLevel: 29,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'dol',
    name: 'ドル',
    english: 'Dol',
    number: 14,
    level: 31,
    socketWeapon: 'ヒット・ブラインドターゲット+1',
    socketArmor: 'モンスターが逃げる+25%',
    socketShield: 'モンスターが逃げる+25%',
    cubeFormula: '3x シャエル → 1x ドル',
    dropLevel: 31,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'hel',
    name: 'ヘル',
    english: 'Hel',
    number: 15,
    level: 1,
    socketWeapon: '必要レベル-20',
    socketArmor: '必要レベル-15',
    socketShield: '必要レベル-15',
    cubeFormula: '3x ドル → 1x ヘル',
    dropLevel: 33,
    sources: ['ヘルフォージ', '通常ドロップ', 'ニーラサック'],
    rarity: 'uncommon',
    special: 'ソケット除去可能'
  },
  {
    id: 'io',
    name: 'イオ',
    english: 'Io',
    number: 16,
    level: 35,
    socketWeapon: 'エナジー+10',
    socketArmor: 'エナジー+10',
    socketShield: 'エナジー+10',
    cubeFormula: '3x ヘル → 1x イオ',
    dropLevel: 35,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'lum',
    name: 'ラム',
    english: 'Lum',
    number: 17,
    level: 37,
    socketWeapon: 'エナジー+10',
    socketArmor: 'エナジー+10',
    socketShield: 'エナジー+10',
    cubeFormula: '3x イオ → 1x ラム',
    dropLevel: 37,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'ko',
    name: 'コー',
    english: 'Ko',
    number: 18,
    level: 39,
    socketWeapon: '敏捷性+10',
    socketArmor: '敏捷性+10',
    socketShield: '敏捷性+10',
    cubeFormula: '3x ラム → 1x コー',
    dropLevel: 39,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'fal',
    name: 'ファル',
    english: 'Fal',
    number: 19,
    level: 41,
    socketWeapon: '筋力+10',
    socketArmor: '筋力+10',
    socketShield: '筋力+10',
    cubeFormula: '3x コー → 1x ファル',
    dropLevel: 41,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'uncommon'
  },
  {
    id: 'lem',
    name: 'レム',
    english: 'Lem',
    number: 20,
    level: 43,
    socketWeapon: 'ゴールド発見確率+75%',
    socketArmor: 'ゴールド発見確率+50%',
    socketShield: 'ゴールド発見確率+50%',
    cubeFormula: '3x ファル → 1x レム',
    dropLevel: 43,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'rare'
  },
  {
    id: 'pul',
    name: 'プル',
    english: 'Pul',
    number: 21,
    level: 45,
    socketWeapon: 'ダメージ+75%（対デーモン）、アタック・レイティング+100（対デーモン）',
    socketArmor: '防御力+30%',
    socketShield: '防御力+30%',
    cubeFormula: '3x レム → 1x プル',
    dropLevel: 45,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'rare'
  },
  {
    id: 'um',
    name: 'ウム',
    english: 'Um',
    number: 22,
    level: 47,
    socketWeapon: 'オープン・ウーンズ+25%',
    socketArmor: '全耐性+15',
    socketShield: '全耐性+22',
    cubeFormula: '3x プル → 1x ウム',
    dropLevel: 47,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'rare'
  },

  // ランク23-33 (高ランクルーン)
  {
    id: 'mal',
    name: 'マル',
    english: 'Mal',
    number: 23,
    level: 49,
    socketWeapon: 'モンスターが逃げる+100%',
    socketArmor: '魔法ダメージ軽減+7',
    socketShield: '魔法ダメージ軽減+7',
    cubeFormula: '2x ウム → 1x マル',
    dropLevel: 49,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'very_rare'
  },
  {
    id: 'ist',
    name: 'イスト',
    english: 'Ist',
    number: 24,
    level: 51,
    socketWeapon: '魔法アイテム発見確率+30%',
    socketArmor: '魔法アイテム発見確率+25%',
    socketShield: '魔法アイテム発見確率+25%',
    cubeFormula: '2x マル → 1x イスト',
    dropLevel: 51,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'very_rare'
  },
  {
    id: 'gul',
    name: 'グル',
    english: 'Gul',
    number: 25,
    level: 53,
    socketWeapon: 'アタック・レイティング+20%',
    socketArmor: '毒抵抗+5%',
    socketShield: '毒抵抗+5%',
    cubeFormula: '2x イスト → 1x グル',
    dropLevel: 53,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'very_rare'
  },
  {
    id: 'vex',
    name: 'ヴェックス',
    english: 'Vex',
    number: 26,
    level: 55,
    socketWeapon: '敵の火炎耐性-5%',
    socketArmor: '火炎抵抗+5%',
    socketShield: '火炎抵抗+5%',
    cubeFormula: '2x グル → 1x ヴェックス',
    dropLevel: 55,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'extremely_rare'
  },
  {
    id: 'ohm',
    name: 'オーム',
    english: 'Ohm',
    number: 27,
    level: 57,
    socketWeapon: 'ダメージ+50%',
    socketArmor: '冷気抵抗+5%',
    socketShield: '冷気抵抗+5%',
    cubeFormula: '2x ヴェックス → 1x オーム',
    dropLevel: 57,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'extremely_rare'
  },
  {
    id: 'lo',
    name: 'ロー',
    english: 'Lo',
    number: 28,
    level: 59,
    socketWeapon: 'デッドリー・ストライク+20%',
    socketArmor: 'ライトニング抵抗+5%',
    socketShield: 'ライトニング抵抗+5%',
    cubeFormula: '2x オーム → 1x ロー',
    dropLevel: 59,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'extremely_rare'
  },
  {
    id: 'sur',
    name: 'サー',
    english: 'Sur',
    number: 29,
    level: 61,
    socketWeapon: 'ヒット・ブラインドターゲット+1',
    socketArmor: 'マナ+5%',
    socketShield: 'マナ+50',
    cubeFormula: '2x ロー → 1x サー',
    dropLevel: 61,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'extremely_rare'
  },
  {
    id: 'ber',
    name: 'ベル',
    english: 'Ber',
    number: 30,
    level: 63,
    socketWeapon: 'クラッシング・ブロー+20%',
    socketArmor: 'ダメージ軽減（％）+8',
    socketShield: 'ダメージ軽減（％）+8',
    cubeFormula: '2x サー → 1x ベル',
    dropLevel: 63,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'legendary'
  },
  {
    id: 'jah',
    name: 'ジャー',
    english: 'Jah',
    number: 31,
    level: 65,
    socketWeapon: '敵の防御力無視',
    socketArmor: 'ライフ+5%',
    socketShield: 'ライフ+37',
    cubeFormula: '2x ベル → 1x ジャー',
    dropLevel: 65,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'legendary'
  },
  {
    id: 'cham',
    name: 'チャム',
    english: 'Cham',
    number: 32,
    level: 67,
    socketWeapon: 'フリーズ・ターゲット+3',
    socketArmor: '凍結しない',
    socketShield: '凍結しない',
    cubeFormula: '2x ジャー → 1x チャム',
    dropLevel: 67,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'legendary'
  },
  {
    id: 'zod',
    name: 'ゾッド',
    english: 'Zod',
    number: 33,
    level: 69,
    socketWeapon: '破壊されない',
    socketArmor: '破壊されない',
    socketShield: '破壊されない',
    cubeFormula: '2x チャム → 1x ゾッド',
    dropLevel: 69,
    sources: ['ヘルフォージ', '通常ドロップ'],
    rarity: 'legendary'
  }
];

/**
 * ルーン名のリスト（日本語）
 */
const RUNE_NAMES = RUNES.map(rune => rune.name);

/**
 * ルーン名のリスト（英語）
 */
const RUNE_NAMES_ENGLISH = RUNES.map(rune => rune.english);

/**
 * ルーンをIDで検索
 */
function findRuneById(id) {
  return RUNES.find(rune => rune.id === id);
}

/**
 * ルーンを名前で検索（日本語・英語対応）
 */
function findRuneByName(name) {
  return RUNES.find(rune => 
    rune.name === name || 
    rune.english.toLowerCase() === name.toLowerCase()
  );
}

/**
 * ルーンを番号で検索
 */
function findRuneByNumber(number) {
  return RUNES.find(rune => rune.number === number);
}

/**
 * レアリティでルーンを絞り込み
 */
function getRunesByRarity(rarity) {
  return RUNES.filter(rune => rune.rarity === rarity);
}

/**
 * レベル範囲でルーンを絞り込み
 */
function getRunesByLevel(minLevel, maxLevel) {
  return RUNES.filter(rune => {
    const level = rune.level;
    return level >= (minLevel || 1) && level <= (maxLevel || 99);
  });
}

/**
 * ドロップレベル範囲でルーンを絞り込み
 */
function getRunesByDropLevel(minLevel, maxLevel) {
  return RUNES.filter(rune => {
    const dropLevel = rune.dropLevel;
    return dropLevel >= (minLevel || 1) && dropLevel <= (maxLevel || 99);
  });
}

/**
 * ソース（ドロップ場所）でルーンを絞り込み
 */
function getRunesBySource(source) {
  return RUNES.filter(rune => 
    rune.sources.some(s => s.includes(source))
  );
}

/**
 * キューブレシピが存在するルーンを取得
 */
function getRunesWithCubeFormula() {
  return RUNES.filter(rune => rune.cubeFormula !== null);
}

/**
 * 特定のルーンから作成可能なルーンを取得
 */
function getRunesFromRune(runeName) {
  return RUNES.filter(rune => 
    rune.cubeFormula && rune.cubeFormula.includes(runeName)
  );
}

/**
 * ルーンの価値を計算（相対的な希少度）
 */
function getRuneValue(runeName) {
  const rune = findRuneByName(runeName);
  if (!rune) return 0;
  
  const rarityValues = {
    'common': 1,
    'uncommon': 5,
    'rare': 20,
    'very_rare': 100,
    'extremely_rare': 500,
    'legendary': 2000
  };
  
  return rarityValues[rune.rarity] || 0;
}

/**
 * ルーンの合成チェーン（どのルーンから合成可能か）
 */
function getRuneCraftingChain(runeName) {
  const rune = findRuneByName(runeName);
  if (!rune || !rune.cubeFormula) return [];
  
  const chain = [];
  let currentRune = rune;
  
  while (currentRune && currentRune.cubeFormula) {
    const formula = currentRune.cubeFormula;
    const match = formula.match(/(\d+)x\s*(\w+)/);
    
    if (match) {
      const [, count, sourceRuneName] = match;
      const sourceRune = findRuneByName(sourceRuneName);
      
      if (sourceRune) {
        chain.unshift({
          rune: sourceRune,
          count: parseInt(count),
          formula: formula
        });
        currentRune = sourceRune;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  
  return chain;
}

/**
 * ルーンの効果を装備タイプ別に取得
 */
function getRuneEffect(runeName, equipmentType) {
  const rune = findRuneByName(runeName);
  if (!rune) return '';
  
  switch (equipmentType) {
    case '武器':
    case 'weapon':
      return rune.socketWeapon;
    case '鎧':
    case 'armor':
      return rune.socketArmor;
    case '盾':
    case 'shield':
      return rune.socketShield;
    default:
      return rune.socketWeapon; // デフォルトは武器効果
  }
}

/**
 * ルーンの統計情報を取得
 */
function getRuneStats() {
  const stats = {
    total: RUNES.length,
    byRarity: {},
    byLevel: {
      low: 0,    // 1-30
      mid: 0,    // 31-60
      high: 0    // 61+
    },
    averageDropLevel: 0,
    maxLevel: 0,
    minLevel: 99
  };
  
  let totalDropLevel = 0;
  
  RUNES.forEach(rune => {
    // レアリティ別
    if (!stats.byRarity[rune.rarity]) {
      stats.byRarity[rune.rarity] = 0;
    }
    stats.byRarity[rune.rarity]++;
    
    // レベル別
    if (rune.level <= 30) {
      stats.byLevel.low++;
    } else if (rune.level <= 60) {
      stats.byLevel.mid++;
    } else {
      stats.byLevel.high++;
    }
    
    // ドロップレベル統計
    totalDropLevel += rune.dropLevel;
    stats.maxLevel = Math.max(stats.maxLevel, rune.dropLevel);
    stats.minLevel = Math.min(stats.minLevel, rune.dropLevel);
  });
  
  stats.averageDropLevel = totalDropLevel / RUNES.length;
  
  return stats;
}

/**
 * ルーンの検索
 */
function searchRunes(criteria) {
  let results = RUNES;
  
  // 名前検索
  if (criteria.name) {
    const searchTerm = criteria.name.toLowerCase();
    results = results.filter(rune => 
      rune.name.toLowerCase().includes(searchTerm) ||
      rune.english.toLowerCase().includes(searchTerm)
    );
  }
  
  // レアリティ
  if (criteria.rarity) {
    results = results.filter(rune => rune.rarity === criteria.rarity);
  }
  
  // レベル範囲
  if (criteria.minLevel) {
    results = results.filter(rune => rune.level >= criteria.minLevel);
  }
  if (criteria.maxLevel) {
    results = results.filter(rune => rune.level <= criteria.maxLevel);
  }
  
  // ドロップレベル範囲
  if (criteria.minDropLevel) {
    results = results.filter(rune => rune.dropLevel >= criteria.minDropLevel);
  }
  if (criteria.maxDropLevel) {
    results = results.filter(rune => rune.dropLevel <= criteria.maxDropLevel);
  }
  
  // ソース
  if (criteria.source) {
    results = results.filter(rune => 
      rune.sources.some(source => source.includes(criteria.source))
    );
  }
  
  // キューブレシピの有無
  if (criteria.hasCubeFormula !== undefined) {
    results = results.filter(rune => 
      criteria.hasCubeFormula ? rune.cubeFormula !== null : rune.cubeFormula === null
    );
  }
  
  return results;
}

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RUNES,
    RUNE_NAMES,
    RUNE_NAMES_ENGLISH,
    findRuneById,
    findRuneByName,
    findRuneByNumber,
    getRunesByRarity,
    getRunesByLevel,
    getRunesByDropLevel,
    getRunesBySource,
    getRunesWithCubeFormula,
    getRunesFromRune,
    getRuneValue,
    getRuneCraftingChain,
    getRuneEffect,
    getRuneStats,
    searchRunes
  };
}

// グローバルに公開
window.RUNES = RUNES;
window.RUNE_NAMES = RUNE_NAMES;
window.RUNE_NAMES_ENGLISH = RUNE_NAMES_ENGLISH;
window.RuneData = {
  findById: findRuneById,
  findByName: findRuneByName,
  findByNumber: findRuneByNumber,
  getByRarity: getRunesByRarity,
  getByLevel: getRunesByLevel,
  getByDropLevel: getRunesByDropLevel,
  getBySource: getRunesBySource,
  getWithCubeFormula: getRunesWithCubeFormula,
  getFromRune: getRunesFromRune,
  getValue: getRuneValue,
  getCraftingChain: getRuneCraftingChain,
  getEffect: getRuneEffect,
  getStats: getRuneStats,
  search: searchRunes
};