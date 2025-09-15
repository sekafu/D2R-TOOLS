// D2R攻略ツール ルーンワード検索・管理機能（修正版）

/**
 * ルーンワードの効果を取得（装備タイプ別）- グローバル関数
 */
function getRunewordEffects(runeword, equipmentType = 'default') {
  if (!runeword.effects) return [];
  
  console.log('Getting effects for:', runeword.name, 'equipment:', equipmentType);
  console.log('Available effects:', Object.keys(runeword.effects));
  
  // 装備タイプ別の効果がある場合
  if (runeword.effects[equipmentType]) {
    console.log('Found specific effects for:', equipmentType);
    return runeword.effects[equipmentType];
  }
  
  // 武器系のフォールバック
  if ((equipmentType.includes('武器') || equipmentType === '剣' || equipmentType === '斧' || 
       equipmentType === 'メイス' || equipmentType === 'ポールアーム' || equipmentType === '杖' || 
       equipmentType === 'フレイル') && runeword.effects.剣) {
    console.log('Using 剣 effects for weapon type:', equipmentType);
    return runeword.effects.剣;
  }
  
  // 鎧系のフォールバック
  if (equipmentType === '鎧' && runeword.effects.鎧) {
    console.log('Using 鎧 effects');
    return runeword.effects.鎧;
  }
  
  // 盾系のフォールバック
  if ((equipmentType === '盾' || equipmentType === 'パラディン盾') && runeword.effects.盾) {
    console.log('Using 盾 effects');
    return runeword.effects.盾;
  }
  
  // デフォルトの効果
  const defaultEffects = runeword.effects.default || runeword.effects[Object.keys(runeword.effects)[0]] || [];
  console.log('Using default effects:', defaultEffects.length, 'items');
  return defaultEffects;
}

/**
 * ルーンワード検索ツールのメインクラス
 */
class RunewordSearchTool {
  constructor() {
    this.filteredResults = [];
    this.currentFilter = 'all';
    this.searchCriteria = {};
    this.playerRunes = {};
    
    this.init();
  }

  /**
   * 初期化処理
   */
  init() {
    this.loadPlayerRunes();
    this.setupEventListeners();
    this.populateRuneSelects();
    this.renderRuneGrid();
    this.performInitialSearch();
  }

  /**
   * イベントリスナーの設定
   */
  setupEventListeners() {
    // 検索フォームのイベント
    const searchInputs = document.querySelectorAll('#searchName, #searchRune, #searchEquipment, #searchSockets, #searchMinLevel, #searchMaxLevel');
    searchInputs.forEach(input => {
      input.addEventListener('input', Utils.debounce(() => this.searchRunewords(), 300));
      input.addEventListener('change', () => this.searchRunewords());
    });

    // Enterキーでの検索
    document.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && e.target.matches('.form-control')) {
        this.searchRunewords();
      }
    });

    // ウィンドウリサイズ時の調整
    window.addEventListener('resize', Utils.throttle(() => {
      this.adjustLayout();
    }, 250));

    // ページ離脱時の自動保存
    window.addEventListener('beforeunload', () => {
      this.savePlayerRunes();
    });
  }

  /**
   * ルーン選択肢の追加
   */
  populateRuneSelects() {
    const runeSelect = document.getElementById('searchRune');
    if (!runeSelect) return;

    // 既存のオプションをクリア（「すべて」以外）
    while (runeSelect.children.length > 1) {
      runeSelect.removeChild(runeSelect.lastChild);
    }

    // ルーンを番号順でソートして追加
    const sortedRunes = [...RUNES].sort((a, b) => a.number - b.number);
    
    sortedRunes.forEach(rune => {
      const option = document.createElement('option');
      option.value = rune.name;
      option.textContent = `${rune.name} (${rune.english})`;
      runeSelect.appendChild(option);
    });
  }

  /**
   * プレイヤーのルーン在庫を読み込み
   */
  loadPlayerRunes() {
    this.playerRunes = window.runeStorage.getRunes();
    
    // 新しいルーンが追加された場合の初期化
    RUNE_NAMES.forEach(runeName => {
      if (this.playerRunes[runeName] === undefined) {
        this.playerRunes[runeName] = 0;
      }
    });
  }

  /**
   * プレイヤーのルーン在庫を保存
   */
  savePlayerRunes() {
    return window.runeStorage.setRunes(this.playerRunes);
  }

  /**
   * ルーン管理グリッドの表示
   */
  renderRuneGrid() {
    const grid = document.getElementById('runeGrid');
    if (!grid) return;

    grid.innerHTML = '';

    // ルーンを番号順でソート
    const sortedRunes = [...RUNES].sort((a, b) => a.number - b.number);

    sortedRunes.forEach(rune => {
      const count = this.playerRunes[rune.name] || 0;
      
      const runeItem = document.createElement('div');
      runeItem.className = 'rune-item';
      runeItem.innerHTML = `
        <div class="rune-info">
          <div class="rune-name" title="${rune.english}">${rune.name}</div>
          <div class="rune-number">#${rune.number}</div>
        </div>
        <div class="rune-controls">
          <button class="btn btn-danger btn-small" onclick="runewordTool.changeRuneCount('${rune.name}', -1)" aria-label="${rune.name}を1個減らす">-</button>
          <span class="rune-count ${count > 0 ? 'has-runes' : ''}">${count}</span>
          <button class="btn btn-primary btn-small" onclick="runewordTool.changeRuneCount('${rune.name}', 1)" aria-label="${rune.name}を1個増やす">+</button>
        </div>
      `;
      
      // ツールチップの追加
      runeItem.title = `${rune.name} (${rune.english}) - レベル${rune.level}`;
      
      grid.appendChild(runeItem);
    });
  }

  /**
   * ルーン個数を変更
   */
  changeRuneCount(runeName, delta) {
    const currentCount = this.playerRunes[runeName] || 0;
    const newCount = Math.max(0, currentCount + delta);
    
    this.playerRunes[runeName] = newCount;
    this.savePlayerRunes();
    this.renderRuneGrid();
    this.updateResults(); // 結果を即座に更新
    
    // フィードバック
    if (window.runeStorage.getSetting('showNotifications', true)) {
      const message = delta > 0 
        ? `${runeName} +${delta} (合計: ${newCount})`
        : `${runeName} ${delta} (合計: ${newCount})`;
      Utils.showNotification(message, 'info', 1000);
    }
  }

  /**
   * すべてのルーンをリセット
   */
  resetRunes() {
    if (!confirm('すべてのルーン所持数を0にリセットしますか？')) {
      return;
    }

    RUNE_NAMES.forEach(runeName => {
      this.playerRunes[runeName] = 0;
    });
    
    this.savePlayerRunes();
    this.renderRuneGrid();
    this.updateResults();
    
    Utils.showNotification('ルーン在庫をリセットしました', 'success');
  }

  /**
   * ルーンデータをエクスポート
   */
  exportRunes() {
    try {
      const exportData = {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        playerRunes: this.playerRunes,
        settings: window.runeStorage.getSettings()
      };
      
      const jsonString = JSON.stringify(exportData, null, 2);
      const filename = `d2r-runes-backup-${Utils.formatDate(new Date(), 'YYYY-MM-DD')}.json`;
      
      Utils.downloadFile(jsonString, filename, 'application/json');
      Utils.showNotification('ルーンデータをエクスポートしました', 'success');
    } catch (error) {
      console.error('Export failed:', error);
      Utils.showNotification('エクスポートに失敗しました', 'error');
    }
  }

  /**
   * ルーンデータをインポート
   */
  async importRunes(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const jsonString = await Utils.readFile(file);
      const importData = JSON.parse(jsonString);
      
      if (!importData.playerRunes) {
        throw new Error('無効なファイル形式です');
      }

      // バックアップを作成
      const backup = { ...this.playerRunes };
      
      try {
        // データをインポート
        this.playerRunes = { ...importData.playerRunes };
        
        // 新しいルーンが追加された場合の対応
        RUNE_NAMES.forEach(runeName => {
          if (this.playerRunes[runeName] === undefined) {
            this.playerRunes[runeName] = 0;
          }
        });
        
        this.savePlayerRunes();
        this.renderRuneGrid();
        this.updateResults();
        
        Utils.showNotification('ルーンデータをインポートしました', 'success');
      } catch (error) {
        // エラー時はバックアップを復元
        this.playerRunes = backup;
        throw error;
      }
    } catch (error) {
      console.error('Import failed:', error);
      Utils.showNotification('インポートに失敗しました: ' + error.message, 'error');
    }
    
    // ファイル入力をリセット
    event.target.value = '';
  }

  /**
   * 検索条件を取得
   */
  getSearchCriteria() {
    return {
      name: document.getElementById('searchName')?.value || '',
      rune: document.getElementById('searchRune')?.value || '',
      equipment: document.getElementById('searchEquipment')?.value || '',
      sockets: document.getElementById('searchSockets')?.value || '',
      minLevel: parseInt(document.getElementById('searchMinLevel')?.value) || null,
      maxLevel: parseInt(document.getElementById('searchMaxLevel')?.value) || null
    };
  }

  /**
   * ルーンワード検索を実行
   */
  searchRunewords() {
    this.searchCriteria = this.getSearchCriteria();
    
    // URL パラメータを更新（履歴管理）
    const params = {};
    Object.keys(this.searchCriteria).forEach(key => {
      if (this.searchCriteria[key]) {
        params[key] = this.searchCriteria[key];
      }
    });
    Utils.setUrlParams(params, true);
    
    // 検索実行
    this.filteredResults = window.RunewordSearch.search(this.searchCriteria);
    
    this.updateResults();
  }

  /**
   * 検索をリセット
   */
  resetSearch() {
    // フォームをクリア
    document.getElementById('searchName').value = '';
    document.getElementById('searchRune').value = '';
    document.getElementById('searchEquipment').value = '';
    document.getElementById('searchSockets').value = '';
    document.getElementById('searchMinLevel').value = '';
    document.getElementById('searchMaxLevel').value = '';
    
    // URL パラメータをクリア
    Utils.setUrlParams({}, true);
    
    // 検索を実行
    this.searchRunewords();
  }

  /**
   * フィルターを設定
   */
  setFilter(filter) {
    this.currentFilter = filter;
    
    // フィルターボタンの状態を更新
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    this.updateResults();
  }

  /**
   * 作成可能性を判定
   */
  getCraftabilityStatus(runeword) {
    const requiredRunes = runeword.runes;
    let missingCount = 0;
    let missingRunes = [];

    for (const requiredRune of requiredRunes) {
      const owned = this.playerRunes[requiredRune] || 0;
      if (owned === 0) {
        missingCount++;
        missingRunes.push(requiredRune);
      }
    }

    if (missingCount === 0) {
      return {
        status: 'craftable',
        message: '✅ 作成可能！',
        missingRunes: []
      };
    } else if (missingCount <= 2) {
      return {
        status: 'almost',
        message: `⚠️ あと${missingRunes.join('、')}で作成可能`,
        missingRunes: missingRunes
      };
    } else if (missingCount === requiredRunes.length) {
      return {
        status: 'impossible',
        message: '❌ 必要なルーンを所持していません',
        missingRunes: missingRunes
      };
    } else {
      return {
        status: 'partial',
        message: '🔶 一部のルーンを所持',
        missingRunes: missingRunes
      };
    }
  }

  /**
   * 結果表示を更新
   */
  updateResults() {
    const container = document.getElementById('runewordResults');
    const countElement = document.getElementById('resultsCount');
    
    if (!container || !countElement) return;

    // フィルター適用
    let displayResults = this.filteredResults;
    if (this.currentFilter !== 'all') {
      displayResults = this.filteredResults.filter(rw => {
        const craftability = this.getCraftabilityStatus(rw);
        return craftability.status === this.currentFilter;
      });
    }

    // 結果数を表示
    countElement.textContent = `${displayResults.length}件のルーンワードが見つかりました`;

    // 結果が0件の場合
    if (displayResults.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">検索結果が見つかりません</div>
          <div class="empty-state-description">
            検索条件を変更するか、フィルターをリセットしてお試しください。
          </div>
        </div>
      `;
      return;
    }

    // 結果をソート（作成可能性 → レベル順）
    const sortedResults = Utils.multiSort(displayResults, [
      { 
        key: (rw) => {
          const status = this.getCraftabilityStatus(rw).status;
          const order = { 'craftable': 0, 'almost': 1, 'partial': 2, 'impossible': 3 };
          return order[status] || 4;
        }, 
        direction: 'asc' 
      },
      { key: 'level', direction: 'asc' },
      { key: 'name', direction: 'asc' }
    ]);

    // 結果を表示
    container.innerHTML = '';
    sortedResults.forEach((runeword, index) => {
      const card = this.createRunewordCard(runeword);
      container.appendChild(card);
      
      // アニメーション効果
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }

  /**
   * ルーンワードカードを作成
   */
  createRunewordCard(runeword) {
    const craftability = this.getCraftabilityStatus(runeword);
    
    const card = document.createElement('div');
    card.className = `runeword-card ${craftability.status}`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease';

    // 装備タイプの表示
    const equipmentText = runeword.equipment.join('、');
    
    // ルーンバッジの生成
    const runeBadges = runeword.runes.map(runeName => {
      const owned = this.playerRunes[runeName] || 0;
      const hasRune = owned > 0;
      return `
        <span class="rune-badge ${hasRune ? 'owned' : 'missing'}" title="${runeName}: ${owned}個所持">
          ${runeName} ${hasRune ? '✅' : '❌'}
        </span>
      `;
    }).join('');

    // 効果の取得（検索条件の装備タイプに基づく）
    let effectEquipmentType = runeword.equipment[0]; // デフォルトは最初の装備タイプ
    
    // 検索条件で装備タイプが指定されている場合、それを使用
    if (this.searchCriteria.equipment) {
      // 指定された装備タイプがルーンワードの対応装備に含まれるかチェック
      const matchingEquipment = runeword.equipment.find(eq => 
        eq.includes(this.searchCriteria.equipment) || 
        this.searchCriteria.equipment.includes(eq)
      );
      if (matchingEquipment) {
        effectEquipmentType = matchingEquipment;
      }
    }
    
    console.log('Card for:', runeword.name, 'using equipment type:', effectEquipmentType);
    const effects = getRunewordEffects(runeword, effectEquipmentType);
    const displayEffects = effects.slice(0, 3);
    const remainingCount = effects.length - 3;
    
    const effectsHtml = effects.length > 0 ? `
      <div class="runeword-effects">
        <div class="effects-title">主な効果 (${effectEquipmentType}):</div>
        <div class="effects-list">
          <ul>
            ${displayEffects.map(effect => `<li>${Utils.escapeHtml(effect)}</li>`).join('')}
            ${remainingCount > 0 ? `<li><span class="more-effects-link" data-runeword-id="${runeword.id}">📋 他 ${remainingCount} 個の効果を見る</span></li>` : ''}
          </ul>
        </div>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="runeword-header">
        <div class="runeword-name-group">
          <div class="runeword-name">${Utils.escapeHtml(runeword.name)}</div>
          <div class="runeword-english">${Utils.escapeHtml(runeword.english)}</div>
        </div>
        <div class="runeword-level">Lv.${runeword.level}</div>
      </div>
      
      <div class="runeword-info">
        <div class="info-row">
          <span class="info-label">装備タイプ</span>
          <span class="info-value">${Utils.escapeHtml(equipmentText)}</span>
        </div>
        <div class="info-row">
          <span class="info-label">ソケット数</span>
          <span class="info-value">${runeword.sockets}</span>
        </div>
        <div class="info-row">
          <span class="info-label">バージョン</span>
          <span class="info-value">${Utils.escapeHtml(runeword.version)}</span>
        </div>
        ${runeword.ladder ? '<div class="info-row"><span class="info-label">ラダー</span><span class="info-value badge badge-warning">ラダー限定</span></div>' : ''}
      </div>
      
      <div class="runes-required">
        ${runeBadges}
      </div>
      
      ${effectsHtml}
      
      <div class="status-message ${craftability.status}">
        ${craftability.message}
      </div>
    `;

    // 詳細モーダルのクリックイベント
    card.addEventListener('click', (e) => {
      if (e.target.classList.contains('more-effects-link')) {
        e.stopPropagation();
        const runewordId = e.target.getAttribute('data-runeword-id');
        console.log('Modal link clicked for:', runewordId);
        this.showRunewordDetails(runewordId);
      }
    });

    return card;
  }

  /**
   * ルーンワード詳細を表示（モーダル）
   */
  showRunewordDetails(runewordId) {
    console.log('Showing details for runeword ID:', runewordId);
    const runeword = window.RunewordSearch.findById(runewordId);
    if (!runeword) {
      console.error('Runeword not found:', runewordId);
      return;
    }

    const craftability = this.getCraftabilityStatus(runeword);
    
    // モーダルを作成
    const modal = this.createModal(runeword, craftability);
    document.body.appendChild(modal);
    
    // Escapeキーでモーダルを閉じる
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modal);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // フェードイン
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  }

  /**
   * モーダルの作成
   */
  createModal(runeword, craftability) {
    const modal = document.createElement('div');
    modal.className = 'runeword-modal';
    modal.onclick = (e) => {
      if (e.target === modal) this.closeModal(modal);
    };

    // 装備タイプ別効果を取得
    const equipmentEffects = runeword.equipment.map(equipment => {
      const effects = getRunewordEffects(runeword, equipment);
      return {
        equipment: equipment,
        effects: effects
      };
    });

    // ルーンの詳細情報
    const runeDetails = runeword.runes.map(runeName => {
      const rune = window.RuneData.findByName(runeName);
      const owned = this.playerRunes[runeName] || 0;
      return {
        name: runeName,
        english: rune ? rune.english : '',
        level: rune ? rune.level : 0,
        owned: owned,
        hasRune: owned > 0
      };
    });

    modal.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h2 class="modal-title">${Utils.escapeHtml(runeword.name)} (${Utils.escapeHtml(runeword.english)})</h2>
          <button class="modal-close" onclick="runewordTool.closeModal(this.closest('.runeword-modal'))">&times;</button>
        </div>
        <div class="modal-body">
          <div class="runeword-overview">
            <div class="overview-grid">
              <div class="overview-item">
                <label>必要レベル</label>
                <span class="value">Lv.${runeword.level}</span>
              </div>
              <div class="overview-item">
                <label>ソケット数</label>
                <span class="value">${runeword.sockets}</span>
              </div>
              <div class="overview-item">
                <label>装備タイプ</label>
                <span class="value">${runeword.equipment.join('、')}</span>
              </div>
              <div class="overview-item">
                <label>バージョン</label>
                <span class="value">${Utils.escapeHtml(runeword.version)}</span>
              </div>
              ${runeword.ladder ? '<div class="overview-item"><label>ラダー</label><span class="value badge badge-warning">ラダー限定</span></div>' : ''}
            </div>
            <div class="status-display ${craftability.status}">
              ${craftability.message}
            </div>
          </div>

          <div class="required-runes-section">
            <h3>必要ルーン</h3>
            <div class="runes-detail-grid">
              ${runeDetails.map(rune => `
                <div class="rune-detail-item ${rune.hasRune ? 'owned' : 'missing'}">
                  <div class="rune-detail-name">${rune.name} (${rune.english})</div>
                  <div class="rune-detail-info">
                    <span class="rune-level">Lv.${rune.level}</span>
                    <span class="rune-owned">所持: ${rune.owned}個</span>
                    <span class="rune-status">${rune.hasRune ? '✅' : '❌'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="effects-section">
            <h3>効果詳細</h3>
            ${equipmentEffects.map(eq => `
              <div class="equipment-effects">
                <h4>${eq.equipment}装備時</h4>
                <ul class="effects-detail-list">
                  ${eq.effects.map(effect => `<li>${Utils.escapeHtml(effect)}</li>`).join('')}
                </ul>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    return modal;
  }

  /**
   * モーダルを閉じる
   */
  closeModal(modal) {
    modal.classList.add('closing');
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  /**
   * 初期検索の実行
   */
  performInitialSearch() {
    // URL パラメータから検索条件を復元
    const urlParams = Utils.getUrlParams();
    
    if (urlParams.name) document.getElementById('searchName').value = urlParams.name;
    if (urlParams.rune) document.getElementById('searchRune').value = urlParams.rune;
    if (urlParams.equipment) document.getElementById('searchEquipment').value = urlParams.equipment;
    if (urlParams.sockets) document.getElementById('searchSockets').value = urlParams.sockets;
    if (urlParams.minLevel) document.getElementById('searchMinLevel').value = urlParams.minLevel;
    if (urlParams.maxLevel) document.getElementById('searchMaxLevel').value = urlParams.maxLevel;
    
    this.searchRunewords();
  }

  /**
   * レイアウト調整
   */
  adjustLayout() {
    // レスポンシブ対応やレイアウト調整
    const container = document.querySelector('.container');
    if (container && window.innerWidth < 768) {
      // モバイル表示時の調整
      container.classList.add('mobile-layout');
    } else {
      container.classList.remove('mobile-layout');
    }
  }
}

// グローバル関数（HTML から呼び出されるため）
function searchRunewords() {
  if (window.runewordTool) {
    window.runewordTool.searchRunewords();
  }
}

function resetSearch() {
  if (window.runewordTool) {
    window.runewordTool.resetSearch();
  }
}

function setFilter(filter) {
  if (window.runewordTool) {
    window.runewordTool.setFilter(filter);
  }
}

function resetRunes() {
  if (window.runewordTool) {
    window.runewordTool.resetRunes();
  }
}

function exportRunes() {
  if (window.runewordTool) {
    window.runewordTool.exportRunes();
  }
}

function importRunes(event) {
  if (window.runewordTool) {
    window.runewordTool.importRunes(event);
  }
}

function showRunewordDetails(runewordId) {
  if (window.runewordTool) {
    window.runewordTool.showRunewordDetails(runewordId);
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  // データが読み込まれるまで待機
  if (typeof RUNEWORDS === 'undefined' || typeof RUNES === 'undefined') {
    console.error('Required data not loaded');
    Utils.showNotification('データの読み込みに失敗しました', 'error');
    return;
  }

  // ツールを初期化
  window.runewordTool = new RunewordSearchTool();
  
  // 成功メッセージ
  setTimeout(() => {
    Utils.showNotification('ルーンワード検索ツールを読み込みました', 'success', 2000);
  }, 500);
});

// サービスワーカー登録（オフライン対応）
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful');
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed');
      });
  });
}

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RunewordSearchTool;
}