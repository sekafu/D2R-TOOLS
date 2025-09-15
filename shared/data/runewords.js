// D2R攻略ツール ルーンワードデータ（修正版）

/**
 * ルーンワードデータ
 * データ出典: いのまるの秘密基地 (https://innomaroom.hatenablog.com/entry/diablo2resurrected-guide-runewords)
 */
const RUNEWORDS = [
  // Phase 1: 基本的なルーンワード
  {
    id: 'spirit',
    name: '精霊',
    english: 'Spirit',
    level: 25,
    sockets: 4,
    equipment: ['剣', '盾'],
    runes: ['タル', 'スル', 'オルト', 'アムン'],
    effects: {
      剣: [
        '全スキルレベル+2',
        'スキル発動速度（FCR）+25~35%',
        'ヒットリカバリー速度（FHR）+55%',
        'マナ+89~112',
        '冷気ダメージ+3~8',
        'ライトニング・ボルト（レベル1、60回使用可能）',
        '生命力+22',
        '魔法アイテム発見確率+10~20%'
      ],
      盾: [
        '全スキルレベル+2',
        'スキル発動速度（FCR）+25~35%',
        'ヒットリカバリー速度（FHR）+55%',
        'マナ+89~112',
        '冷気ダメージ+3~8',
        '生命力+22',
        '魔法アイテム発見確率+10~20%',
        '盾ブロック率+22%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'insight',
    name: '洞察',
    english: 'Insight',
    level: 27,
    sockets: 4,
    equipment: ['ポールアーム', '杖'],
    runes: ['ラル', 'ティア', 'タル', 'ソル'],
    effects: {
      default: [
        'レベル12~17 メディテーション・オーラ（装備時発動）',
        'スキル発動速度（FCR）+35%',
        'クリティカル・ストライク+200~260%',
        '攻撃速度（IAS）+23%',
        '全耐性+5~25',
        '敵の物理ダメージ軽減-7',
        'マナ増加+8~16',
        'レベル14 クリティカル・ストライク（69回使用可能）'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'enigma',
    name: '謎',
    english: 'Enigma',
    level: 65,
    sockets: 3,
    equipment: ['鎧'],
    runes: ['ジャー', 'イス', 'ベル'],
    effects: {
      default: [
        'テレポート（レベル1、無制限使用可能）',
        '全スキルレベル+2',
        '筋力+0.75×キャラクターレベル',
        'ライフ+500~750',
        'マナ+500~750',
        '全耐性+5',
        'ダメージ軽減（％）+8',
        '魔法ダメージ軽減+14',
        '魔法アイテム発見確率+50~100%',
        '移動速度+45%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'stealth',
    name: '隠密',
    english: 'Stealth',
    level: 17,
    sockets: 2,
    equipment: ['鎧'],
    runes: ['タル', 'エス'],
    effects: {
      default: [
        '魔法ダメージ軽減+3',
        '移動速度+25%',
        '攻撃速度（IAS）+25%',
        'スキル発動速度（FCR）+25%',
        'ヒットリカバリー速度（FHR）+25%',
        '毒抵抗+30%',
        '再生能力+10'
      ]
    },
    version: 'Ver. 1.09',
    ladder: false
  },
  {
    id: 'leaf',
    name: '葉',
    english: 'Leaf',
    level: 19,
    sockets: 2,
    equipment: ['杖'],
    runes: ['ティア', 'ラル'],
    effects: {
      default: [
        '火炎スキル+3（ソーサレス専用）',
        'ファイア・ボルト（レベル14、60回使用可能）',
        'ファイアーボール（レベル18、60回使用可能）',
        'ファイア・ボルト+3',
        'インフェルノ+3',
        'ウォームス+3',
        '火炎抵抗+33%',
        '冷気抵抗+2',
        '防御力+2~6'
      ]
    },
    version: 'Ver. 1.09',
    ladder: false
  },
  {
    id: 'ancients_pledge',
    name: '古代の誓い',
    english: "Ancient's Pledge",
    level: 21,
    sockets: 3,
    equipment: ['盾'],
    runes: ['ラル', 'オルト', 'タル'],
    effects: {
      default: [
        '火炎抵抗+43%',
        '冷気抵抗+48%',
        'ライトニング抵抗+48%',
        '毒抵抗+48%',
        '防御力+50~80',
        '魔法ダメージ軽減+10'
      ]
    },
    version: 'Ver. 1.09',
    ladder: false
  },
  {
    id: 'smoke',
    name: '煙',
    english: 'Smoke',
    level: 37,
    sockets: 2,
    equipment: ['鎧'],
    runes: ['ネフ', 'ラム'],
    effects: {
      default: [
        '全耐性+50',
        '防御力+20%',
        '防御力+280~420',
        'ダメージ軽減-1',
        'レベル6 ウィークン（18回使用可能）',
        'エナジー+10',
        '魔法アイテム発見確率+10%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'lore',
    name: '伝承',
    english: 'Lore',
    level: 27,
    sockets: 2,
    equipment: ['兜'],
    runes: ['オルト', 'ソル'],
    effects: {
      default: [
        '全スキルレベル+1',
        'ライフ+30',
        'マナ+30',
        '敵の物理ダメージ軽減-2',
        'ライトニング抵抗+30%',
        '魔法ダメージ軽減+7'
      ]
    },
    version: 'Ver. 1.09',
    ladder: false
  },
  {
    id: 'peace',
    name: '平和',
    english: 'Peace',
    level: 29,
    sockets: 3,
    equipment: ['鎧'],
    runes: ['シャエル', 'スル', 'アムン'],
    effects: {
      default: [
        'アマゾンスキル+4（アマゾン専用）',
        'レベル15 ヴァルキリー（5%の確率で攻撃を受けた時に発動）',
        'レベル5 クリティカル・ストライク（2%の確率で攻撃時に発動）',
        '攻撃速度（IAS）+2×キャラクターレベル（最大200%）',
        '冷気ダメージ+3~14',
        '魔法ダメージ軽減+2~6'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'rhyme',
    name: '韻',
    english: 'Rhyme',
    level: 29,
    sockets: 2,
    equipment: ['盾'],
    runes: ['シャエル', 'エス'],
    effects: {
      default: [
        '盾ブロック率+20%',
        '盾ブロック時に40%の確率でレベル1 スロー・ミサイル発動',
        '全耐性+25',
        '再生能力+7',
        'マナ再生速度+15%',
        '不死身（モンスターが逃げる）',
        '魔法ダメージ軽減+4'
      ]
    },
    version: 'Ver. 1.09',
    ladder: false
  },

  // Phase 2: 中級ルーンワード
  {
    id: 'treachery',
    name: '裏切り',
    english: 'Treachery',
    level: 43,
    sockets: 3,
    equipment: ['鎧'],
    runes: ['シャエル', 'スル', 'レム'],
    effects: {
      default: [
        '攻撃速度（IAS）+45%',
        'レベル15 フェード（5%の確率で攻撃を受けた時に発動）',
        'レベル13 ヴェノム（9%の確率で攻撃時に発動）',
        '冷気抵抗+30%',
        '魔法ダメージ軽減+5'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'duress',
    name: '強迫',
    english: 'Duress',
    level: 47,
    sockets: 3,
    equipment: ['鎧'],
    runes: ['シャエル', 'ウム', 'スル'],
    effects: {
      default: [
        'ダメージ+40%',
        '防御力+10~20%',
        'レベル15 オープン・ウーンズ（33%の確率で攻撃時に発動）',
        'レベル1 スロー・ターゲット（25%の確率で攻撃時に発動）',
        '冷気ダメージ+37~133',
        '火炎ダメージ+15~85',
        'ライトニング・ダメージ+1~50',
        '冷気抵抗+45%',
        '火炎抵抗+15%',
        'ライトニング抵抗+15%',
        '物理ダメージ軽減+15%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'lionheart',
    name: '獅子心',
    english: 'Lionheart',
    level: 41,
    sockets: 3,
    equipment: ['鎧'],
    runes: ['ヘル', 'ラム', 'ファル'],
    effects: {
      default: [
        'ダメージ+20%',
        '生命力+25',
        '筋力+10',
        '敏捷性+15',
        'エナジー+15',
        '全耐性+30',
        '必要筋力-15%'
      ]
    },
    version: 'Ver. 1.09',
    ladder: false
  },
  {
    id: 'prudence',
    name: '慎重',
    english: 'Prudence',
    level: 49,
    sockets: 2,
    equipment: ['鎧'],
    runes: ['マル', 'ティア'],
    effects: {
      default: [
        'ダメージ+25%',
        '防御力+140~170',
        '全耐性+25~35',
        'ダメージ軽減（％）+3',
        '魔法ダメージ軽減+17',
        'ライフ+2×キャラクターレベル',
        'マナ+1×キャラクターレベル',
        '必要筋力-25%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'stone',
    name: '石',
    english: 'Stone',
    level: 47,
    sockets: 4,
    equipment: ['鎧'],
    runes: ['シャエル', 'ウム', 'プル', 'ラム'],
    effects: {
      default: [
        'ダメージ+60%',
        '防御力+250~290',
        'レベル16 モレックの呪い（7%の確率で攻撃時に発動）',
        'レベル16 ボーン・アーマー（装備時発動）',
        'レベル15 ボーン・プリズン（5%の確率で攻撃を受けた時に発動）',
        '筋力+15',
        '生命力+31',
        '全耐性+15',
        '魔法ダメージ軽減+11'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },

  // Phase 3: 上級ルーンワード
  {
    id: 'infinity',
    name: '無限',
    english: 'Infinity',
    level: 63,
    sockets: 4,
    equipment: ['ポールアーム'],
    runes: ['ベル', 'マル', 'ベル', 'イスト'],
    effects: {
      default: [
        'ダメージ+50~260%',
        'レベル12 コンヴィクション・オーラ（装備時発動）',
        'レベル21 チェイン・ライトニング（30%の確率で攻撃時に発動）',
        '攻撃速度（IAS）+40%',
        'レベル18 サイクロン・アーマー（5%の確率で攻撃を受けた時に発動）',
        'ライトニング抵抗+30%',
        'ライフ+20',
        'マナ+20'
      ]
    },
    version: 'Ver. 1.11',
    ladder: true
  },
  {
    id: 'chains_of_honor',
    name: '名誉の鎖',
    english: 'Chains of Honor',
    level: 63,
    sockets: 4,
    equipment: ['鎧'],
    runes: ['ドル', 'ウム', 'ベル', 'イスト'],
    effects: {
      default: [
        '全スキルレベル+2',
        'ダメージ軽減（％）+8',
        'ライフ+70',
        '筋力+20',
        '全耐性+65',
        'ダメージ軽減-8',
        '魔法ダメージ軽減+25%',
        'レベル60 ライフ・タップ（25回使用可能）',
        'レベル18 ボーン・スピア（71回使用可能）'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'fortitude',
    name: '不屈',
    english: 'Fortitude',
    level: 59,
    sockets: 4,
    equipment: ['武器', '鎧'],
    runes: ['エル', 'ソル', 'ドル', 'ロー'],
    effects: {
      武器: [
        'ダメージ+20%',
        'レベル15 チルド・アーマー（装備時発動）',
        'ライフ+300',
        '筋力+25',
        '敏捷性+15',
        '全耐性+25~30',
        'ダメージ軽減-3',
        'ダメージ軽減（％）+12',
        'ライフ+1.5×キャラクターレベル'
      ],
      鎧: [
        'ダメージ+20%',
        'レベル15 チルド・アーマー（装備時発動）',
        'ライフ+300',
        '筋力+25',
        '敏捷性+15',
        '全耐性+25~30',
        'ダメージ軽減-3',
        'ダメージ軽減（％）+12',
        'ライフ+1.5×キャラクターレベル'
      ]
    },
    version: 'Ver. 1.11',
    ladder: true
  },
  {
    id: 'grief',
    name: '悲嘆',
    english: 'Grief',
    level: 59,
    sockets: 5,
    equipment: ['剣', '斧'],
    runes: ['エス', 'ティア', 'ロー', 'マル', 'ラル'],
    effects: {
      default: [
        '攻撃時に+340~400ダメージ',
        'ダメージ+35%',
        'レベル15 ヴェノム（20%の確率で攻撃時に発動）',
        '攻撃速度（IAS）+30~40%',
        'レベル17 ハート・オブ・ウルヴァリン（5%の確率で攻撃時に発動）',
        'ライフ+10',
        '全耐性+5',
        '必要Lv-20',
        'ゴールド発見確率+25%',
        '敵の防御力を無視+25%'
      ]
    },
    version: 'Ver. 1.11',
    ladder: true
  },
  {
    id: 'call_to_arms',
    name: '武器への呼び声',
    english: 'Call to Arms',
    level: 57,
    sockets: 5,
    equipment: ['武器'],
    runes: ['アムン', 'ラル', 'マル', 'イスト', 'オーム'],
    effects: {
      default: [
        '全スキルレベル+1',
        'ダメージ+40%',
        'レベル1~6 バトル・オーダー（装備時発動）',
        'レベル1~6 バトル・コマンド（装備時発動）',
        'レベル2~6 アイテム・フラッグ（装備時発動）',
        'ライフ+200~300',
        'マナ+50',
        '魔法ダメージ軽減+5',
        '必要筋力-50%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },

  // Phase 4: 武器系ルーンワード
  {
    id: 'heart_of_the_oak',
    name: '樫の心',
    english: 'Heart of the Oak',
    level: 55,
    sockets: 4,
    equipment: ['杖', 'フレイル'],
    runes: ['コー', 'ヴェックス', 'プル', 'スル'],
    effects: {
      default: [
        '全スキルレベル+3',
        'スキル発動速度（FCR）+40%',
        'ライフ+75',
        'マナ+15',
        '全耐性+30~40',
        'レベル4 オーク・セージ（25回使用可能）',
        'レベル14 レイヴン（60回使用可能）',
        'ダメージ+75~100',
        'アタック・レイティング+10',
        'ダメージ軽減-7',
        'マナ増加+15%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'death',
    name: '死',
    english: 'Death',
    level: 55,
    sockets: 5,
    equipment: ['剣', '斧'],
    runes: ['ヘル', 'エル', 'ヴェックス', 'オーム', 'ゾッド'],
    effects: {
      default: [
        'ダメージ+100%',
        'レベル44 チェイン・ライトニング（25%の確率で攻撃時に発動）',
        'レベル18 ボーン・スピア（20%の確率で攻撃時に発動）',
        'レベル12 ライフ・タップ（6%の確率で攻撃時に発動）',
        'ライフ+50',
        '全耐性+50',
        '攻撃速度（IAS）+25%',
        'デッドリー・ストライク+50%',
        'クラッシング・ブロー+50%'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'oath',
    name: '誓い',
    english: 'Oath',
    level: 59,
    sockets: 4,
    equipment: ['剣', '斧', 'メイス'],
    runes: ['シャエル', 'プル', 'マル', 'ラム'],
    effects: {
      default: [
        'ダメージ+30%',
        'レベル16 ハート・オブ・ウルヴァリン（20%の確率で攻撃時に発動）',
        'レベル17 アイアン・ゴーレム（14%の確率で攻撃時に発動）',
        'レベル18 ボーン・スピア（35%の確率で攻撃時に発動）',
        '攻撃速度（IAS）+50%',
        'ライフ+210~340',
        '敵の防御力を無視+10~15%',
        'マジック・アブソーブ+10~15',
        'マナ+1×キャラクターレベル'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },

  // Phase 5: 盾系ルーンワード
  {
    id: 'exile',
    name: '追放',
    english: 'Exile',
    level: 57,
    sockets: 4,
    equipment: ['パラディン盾'],
    runes: ['ヴェックス', 'オーム', 'イスト', 'ドル'],
    effects: {
      default: [
        '防御力+15%',
        'レベル13~16 ディファイアンス・オーラ（装備時発動）',
        'レベル5 ライフ・タップ（4%の確率で攻撃を受けた時に発動）',
        '攻撃速度（IAS）+30%',
        'ライフ+25%',
        'コールド・ダメージ+5~9',
        'フリーズ・ターゲット+4',
        '毒抵抗+25%',
        'ライフ・リープ+7%',
        '修理費0',
        '盾ブロック率+5%'
      ]
    },
    version: 'Ver. 1.11',
    ladder: true
  },
  {
    id: 'sanctuary',
    name: '聖域',
    english: 'Sanctuary',
    level: 49,
    sockets: 3,
    equipment: ['盾'],
    runes: ['コー', 'コー', 'マル'],
    effects: {
      default: [
        '防御力+20%',
        'レベル12 スロー・ミサイル（装備時発動）',
        'レベル15 ターン・アンデッド（20%の確率で攻撃を受けた時に発動）',
        '攻撃速度（IAS）+20%',
        '盾ブロック率+20%',
        'ダメージ軽減（％）+7',
        'マジック・ダメージ軽減+5',
        '魔法ダメージ軽減+7',
        '全耐性+20',
        'マナ+14'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },

  // Phase 6: ヘルム系ルーンワード
  {
    id: 'delirium',
    name: '錯乱',
    english: 'Delirium',
    level: 51,
    sockets: 3,
    equipment: ['兜'],
    runes: ['レム', 'イスト', 'イオ'],
    effects: {
      default: [
        '全スキルレベル+2',
        'レベル17 アトラクト（11%の確率で攻撃を受けた時に発動）',
        'レベル14 テラー（5%の確率で攻撃を受けた時に発動）',
        'レベル13 ディム・ヴィジョン（3%の確率で攻撃を受けた時に発動）',
        'レベル50 デリリアム（1%の確率で攻撃を受けた時に発動）',
        'ライフ+261',
        'ダメージ軽減（％）+10',
        'マジック・ダメージ軽減+25%',
        'レベル17 コンフューズ（60回使用可能）'
      ]
    },
    version: 'Ver. 1.10',
    ladder: false
  },
  {
    id: 'dream',
    name: '夢',
    english: 'Dream',
    level: 65,
    sockets: 3,
    equipment: ['兜', '盾'],
    runes: ['イオ', 'ジャー', 'プル'],
    effects: {
      兜: [
        'レベル15 ホーリー・ショック・オーラ（装備時発動）',
        'ダメージ+10~20%',
        'ライトニング・ダメージ+0.375×キャラクターレベル',
        'マナ増加+13~28%',
        '全耐性+5~20',
        'レベル18 ボーン・スピア（12回使用可能）',
        'ライフ+50'
      ],
      盾: [
        'レベル15 ホーリー・ショック・オーラ（装備時発動）',
        'ダメージ+10~20%',
        'ライトニング・ダメージ+0.375×キャラクターレベル',
        'マナ増加+13~28%',
        '全耐性+5~20',
        'レベル18 ボーン・スピア（12回使用可能）',
        'ライフ+50'
      ]
    },
    version: 'Ver. 1.11',
    ladder: true
  }
];

/**
 * ルーンワードをIDで検索
 */
function findRunewordById(id) {
  return RUNEWORDS.find(rw => rw.id === id);
}

/**
 * ルーンワードを名前で検索（部分一致、あいまい検索対応）
 */
function findRunewordByName(name) {
  if (!name) return [];
  
  const searchTerm = name.toLowerCase();
  
  return RUNEWORDS.filter(rw => {
    return rw.name.toLowerCase().includes(searchTerm) ||
           rw.english.toLowerCase().includes(searchTerm);
  });
}

/**
 * 特定のルーンを含むルーンワードを検索
 */
function findRunewordsByRune(runeName) {
  if (!runeName) return [];
  
  return RUNEWORDS.filter(rw => {
    return rw.runes.includes(runeName);
  });
}

/**
 * 装備タイプでルーンワードを絞り込み
 */
function findRunewordsByEquipment(equipmentType) {
  if (!equipmentType) return RUNEWORDS;
  
  return RUNEWORDS.filter(rw => {
    return rw.equipment.some(eq => eq.includes(equipmentType));
  });
}

/**
 * レベル範囲でルーンワードを絞り込み
 */
function findRunewordsByLevel(minLevel, maxLevel) {
  return RUNEWORDS.filter(rw => {
    const level = rw.level;
    const min = minLevel || 1;
    const max = maxLevel || 99;
    return level >= min && level <= max;
  });
}

/**
 * ソケット数でルーンワードを絞り込み
 */
function findRunewordsBySockets(sockets) {
  if (!sockets) return RUNEWORDS;
  
  return RUNEWORDS.filter(rw => rw.sockets === parseInt(sockets));
}

/**
 * 複合検索
 */
function searchRunewords(criteria) {
  let results = RUNEWORDS;
  
  // 名前検索
  if (criteria.name) {
    const nameResults = findRunewordByName(criteria.name);
    results = results.filter(rw => nameResults.includes(rw));
  }
  
  // ルーン検索
  if (criteria.rune) {
    results = results.filter(rw => rw.runes.includes(criteria.rune));
  }
  
  // 装備タイプ
  if (criteria.equipment) {
    results = results.filter(rw => 
      rw.equipment.some(eq => eq.includes(criteria.equipment))
    );
  }
  
  // ソケット数
  if (criteria.sockets) {
    results = results.filter(rw => rw.sockets === parseInt(criteria.sockets));
  }
  
  // レベル範囲
  if (criteria.minLevel) {
    results = results.filter(rw => rw.level >= parseInt(criteria.minLevel));
  }
  if (criteria.maxLevel) {
    results = results.filter(rw => rw.level <= parseInt(criteria.maxLevel));
  }
  
  // ラダー限定
  if (criteria.ladderOnly !== undefined) {
    results = results.filter(rw => rw.ladder === criteria.ladderOnly);
  }
  
  return results;
}

/**
 * ルーンワードの効果を取得（装備タイプ別）
 */
function getRunewordEffects(runeword, equipmentType = 'default') {
  if (!runeword.effects) return [];
  
  // 装備タイプ別の効果がある場合
  if (runeword.effects[equipmentType]) {
    return runeword.effects[equipmentType];
  }
  
  // 武器系のフォールバック
  if ((equipmentType.includes('武器') || equipmentType === '剣' || equipmentType === '斧' || 
       equipmentType === 'メイス' || equipmentType === 'ポールアーム' || equipmentType === '杖' || 
       equipmentType === 'フレイル') && runeword.effects.剣) {
    return runeword.effects.剣;
  }
  
  // 鎧系のフォールバック
  if (equipmentType === '鎧' && runeword.effects.鎧) {
    return runeword.effects.鎧;
  }
  
  // 盾系のフォールバック
  if ((equipmentType === '盾' || equipmentType === 'パラディン盾') && runeword.effects.盾) {
    return runeword.effects.盾;
  }
  
  // デフォルトの効果
  return runeword.effects.default || runeword.effects[Object.keys(runeword.effects)[0]] || [];
}

/**
 * ルーンワードの統計情報を取得
 */
function getRunewordStats() {
  const stats = {
    total: RUNEWORDS.length,
    byVersion: {},
    byLevel: {
      low: 0,    // 1-30
      mid: 0,    // 31-60
      high: 0    // 61+
    },
    bySockets: {},
    byEquipment: {},
    ladderOnly: 0
  };
  
  RUNEWORDS.forEach(rw => {
    // バージョン別
    if (!stats.byVersion[rw.version]) {
      stats.byVersion[rw.version] = 0;
    }
    stats.byVersion[rw.version]++;
    
    // レベル別
    if (rw.level <= 30) {
      stats.byLevel.low++;
    } else if (rw.level <= 60) {
      stats.byLevel.mid++;
    } else {
      stats.byLevel.high++;
    }
    
    // ソケット数別
    if (!stats.bySockets[rw.sockets]) {
      stats.bySockets[rw.sockets] = 0;
    }
    stats.bySockets[rw.sockets]++;
    
    // 装備タイプ別
    rw.equipment.forEach(eq => {
      if (!stats.byEquipment[eq]) {
        stats.byEquipment[eq] = 0;
      }
      stats.byEquipment[eq]++;
    });
    
    // ラダー限定
    if (rw.ladder) {
      stats.ladderOnly++;
    }
  });
  
  return stats;
}

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RUNEWORDS,
    findRunewordById,
    findRunewordByName,
    findRunewordsByRune,
    findRunewordsByEquipment,
    findRunewordsByLevel,
    findRunewordsBySockets,
    searchRunewords,
    getRunewordEffects,
    getRunewordStats
  };
}

// グローバルに公開
window.RUNEWORDS = RUNEWORDS;
window.RunewordSearch = {
  findById: findRunewordById,
  findByName: findRunewordByName,
  findByRune: findRunewordsByRune,
  findByEquipment: findRunewordsByEquipment,
  findByLevel: findRunewordsByLevel,
  findBySockets: findRunewordsBySockets,
  search: searchRunewords,
  getEffects: getRunewordEffects,
  getStats: getRunewordStats
};