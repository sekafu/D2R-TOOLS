// D2R攻略ツール トップページ機能

/**
 * トップページの機能を管理するクラス
 */
class HomePage {
  constructor() {
    this.animationDelay = 100;
    this.statsUpdateInterval = null;
    
    this.init();
  }

  /**
   * 初期化処理
   */
  init() {
    this.setupAnimations();
    this.updateStats();
    this.setupToolCardInteractions();
    this.setupKeyboardShortcuts();
    this.checkDataAvailability();
  }

  /**
   * アニメーション設定
   */
  setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.tool-card, .feature-card, .news-item').forEach(el => {
      observer.observe(el);
    });

    // Hero stats counter animation
    this.animateStatsCounters();
  }

  /**
   * 統計カウンターのアニメーション
   */
  animateStatsCounters() {
    const counters = document.querySelectorAll('.hero-stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.textContent.replace(/\D/g, ''));
      const duration = 2000; // 2秒
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        // フォーマットして表示
        if (target >= 1000) {
          counter.textContent = Math.floor(current).toLocaleString() + '+';
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  /**
   * 統計情報の更新
   */
  updateStats() {
    try {
      // ルーンワード数を更新
      const runewordCountEl = document.getElementById('runewordCount');
      if (runewordCountEl && typeof RUNEWORDS !== 'undefined') {
        runewordCountEl.textContent = RUNEWORDS.length + '+';
      }

      // ルーン数を更新
      const runeCountEl = document.getElementById('runeCount');
      if (runeCountEl && typeof RUNES !== 'undefined') {
        runeCountEl.textContent = RUNES.length;
      }

      // 利用者数（模擬的な数値）
      const userCountEl = document.getElementById('userCount');
      if (userCountEl) {
        const baseUsers = 1000;
        const additionalUsers = Math.floor(Math.random() * 500);
        userCountEl.textContent = (baseUsers + additionalUsers).toLocaleString() + '+';
      }
    } catch (error) {
      console.error('Stats update failed:', error);
    }
  }

  /**
   * ツールカードのインタラクション設定
   */
  setupToolCardInteractions() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
      // ホバー効果の強化
      card.addEventListener('mouseenter', () => {
        this.highlightRelatedCards(card);
      });

      card.addEventListener('mouseleave', () => {
        this.resetCardHighlights();
      });

      // キーボードナビゲーション
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });

      // クリック時のフィードバック
      card.addEventListener('click', (e) => {
        this.handleToolCardClick(card, e);
      });
    });
  }

  /**
   * 関連カードのハイライト
   */
  highlightRelatedCards(activeCard) {
    const allCards = document.querySelectorAll('.tool-card');
    
    allCards.forEach(card => {
      if (card !== activeCard) {
        card.style.opacity = '0.7';
        card.style.transform = 'scale(0.98)';
      }
    });
  }

  /**
   * カードハイライトのリセット
   */
  resetCardHighlights() {
    const allCards = document.querySelectorAll('.tool-card');
    
    allCards.forEach(card => {
      card.style.opacity = '';
      card.style.transform = '';
    });
  }

  /**
   * ツールカードクリック時の処理
   */
  handleToolCardClick(card, event) {
    const href = card.getAttribute('href');
    
    if (!href) return;

    // 利用不可能なツールの場合
    const status = card.querySelector('.tool-status .badge');
    if (status && (status.textContent.includes('開発中') || status.textContent.includes('計画中'))) {
      event.preventDefault();
      
      const toolName = card.querySelector('.tool-title').textContent;
      Utils.showNotification(`${toolName}は現在開発中です`, 'info', 3000);
      return;
    }

    // ページ遷移アニメーション
    if (!event.ctrlKey && !event.metaKey) { // Ctrl/Cmd+クリックでない場合
      event.preventDefault();
      this.animatePageTransition(href);
    }
  }

  /**
   * ページ遷移アニメーション
   */
  async animatePageTransition(url) {
    try {
      // フェードアウト
      await Utils.animateElement(document.body, [
        { opacity: 1 },
        { opacity: 0.8 }
      ], { duration: 200 });

      // ページ遷移
      window.location.href = url;
    } catch (error) {
      console.error('Page transition failed:', error);
      window.location.href = url;
    }
  }

  /**
   * キーボードショートカットの設定
   */
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Alt + 数字キーでツールへの高速アクセス
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        const toolCards = document.querySelectorAll('.tool-card');
        
        if (toolCards[index]) {
          toolCards[index].click();
        }
      }

      // '/' キーで検索フォーカス（将来の検索機能用）
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      }

      // Escキーでフォーカス解除
      if (e.key === 'Escape') {
        document.activeElement.blur();
      }
    });
  }

  /**
   * データ可用性チェック
   */
  checkDataAvailability() {
    const dataStatus = {
      runewords: typeof RUNEWORDS !== 'undefined' && RUNEWORDS.length > 0,
      runes: typeof RUNES !== 'undefined' && RUNES.length > 0
    };

    // データが利用できない場合の警告
    if (!dataStatus.runewords || !dataStatus.runes) {
      setTimeout(() => {
        Utils.showNotification('一部のデータが読み込まれていません', 'warning', 5000);
      }, 1000);
    }

    // デバッグ情報
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('Data availability:', dataStatus);
    }
  }

  /**
   * ニュース項目のクリック追跡
   */
  trackNewsClick(newsTitle) {
    // 将来の分析機能用
    console.log('News clicked:', newsTitle);
  }

  /**
   * ツール使用状況の追跡
   */
  trackToolUsage(toolName) {
    // ローカルストレージに使用統計を保存
    try {
      const stats = JSON.parse(localStorage.getItem('d2r-tools-usage') || '{}');
      stats[toolName] = (stats[toolName] || 0) + 1;
      stats.lastUsed = new Date().toISOString();
      
      localStorage.setItem('d2r-tools-usage', JSON.stringify(stats));
    } catch (error) {
      console.error('Usage tracking failed:', error);
    }
  }

  /**
   * お知らせの管理
   */
  setupNotificationSystem() {
    // 新機能のお知らせなどを管理
    const lastVisit = localStorage.getItem('d2r-tools-last-visit');
    const currentTime = new Date().toISOString();
    
    if (!lastVisit) {
      // 初回訪問
      setTimeout(() => {
        Utils.showNotification('D2R攻略ツールへようこそ！', 'info', 4000);
      }, 2000);
    }
    
    localStorage.setItem('d2r-tools-last-visit', currentTime);
  }

  /**
   * パフォーマンス監視
   */
  setupPerformanceMonitoring() {
    // ページ読み込み時間の計測
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
      
      // 長い読み込み時間の場合は警告
      if (loadTime > 3000) {
        setTimeout(() => {
          Utils.showNotification('読み込みが遅い場合は、ブラウザのキャッシュをクリアしてみてください', 'info', 5000);
        }, 1000);
      }
    });
  }

  /**
   * テーマ切り替え（将来の機能）
   */
  setupThemeToggle() {
    // ダークモード/ライトモードの切り替え
    const savedTheme = localStorage.getItem('d2r-tools-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  /**
   * ユーザー設定の初期化
   */
  initializeUserSettings() {
    const defaultSettings = {
      theme: 'dark',
      animations: true,
      notifications: true,
      autoSave: true,
      compactMode: false
    };

    const userSettings = JSON.parse(localStorage.getItem('d2r-tools-settings') || '{}');
    const settings = { ...defaultSettings, ...userSettings };
    
    localStorage.setItem('d2r-tools-settings', JSON.stringify(settings));
    
    // 設定を適用
    if (!settings.animations) {
      document.body.classList.add('no-animations');
    }
  }
}

/**
 * ページ読み込み完了時の処理
 */
document.addEventListener('DOMContentLoaded', () => {
  // ホームページクラスを初期化
  window.homePage = new HomePage();
  
  // サービスワーカーの登録（PWA対応）
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(registration => {
        console.log('ServiceWorker registered');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed');
      });
  }
});

/**
 * ツールカードクリック時のグローバル関数
 */
function trackToolClick(toolName, url) {
  if (window.homePage) {
    window.homePage.trackToolUsage(toolName);
  }
  
  // 実際の機能があるかチェック
  if (url.includes('runewords')) {
    // ルーンワードツールは利用可能
    return true;
  } else {
    // その他のツールは開発中
    Utils.showNotification(`${toolName}は現在開発中です`, 'info');
    return false;
  }
}

/**
 * ニュースクリック時のグローバル関数
 */
function trackNewsClick(title) {
  if (window.homePage) {
    window.homePage.trackNewsClick(title);
  }
}

// エラーハンドリング
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  
  // ユーザーフレンドリーなエラーメッセージ
  if (event.error.message.includes('RUNEWORDS') || event.error.message.includes('RUNES')) {
    Utils.showNotification('データファイルの読み込みに失敗しました。ページを再読み込みしてください。', 'error', 8000);
  }
});

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  event.preventDefault();
});

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HomePage;
}