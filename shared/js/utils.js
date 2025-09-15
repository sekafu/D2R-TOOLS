// D2R攻略ツール ユーティリティ関数

/**
 * ユーティリティ関数集
 */
class Utils {
  /**
   * 文字列を安全にHTMLに挿入するためにエスケープ
   */
  static escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 配列をシャッフル
   */
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  /**
   * 配列から重複を除去
   */
  static uniqueArray(array) {
    return [...new Set(array)];
  }

  /**
   * オブジェクトの深いコピー
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    
    if (obj instanceof Array) {
      return obj.map(item => Utils.deepClone(item));
    }
    
    const cloned = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = Utils.deepClone(obj[key]);
      }
    }
    return cloned;
  }

  /**
   * 文字列の類似度を計算（レーベンシュタイン距離）
   */
  static calculateSimilarity(str1, str2) {
    const matrix = [];
    const len1 = str1.length;
    const len2 = str2.length;

    for (let i = 0; i <= len2; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= len1; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= len2; i++) {
      for (let j = 1; j <= len1; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    const maxLen = Math.max(len1, len2);
    return maxLen === 0 ? 1 : (maxLen - matrix[len2][len1]) / maxLen;
  }

  /**
   * あいまい検索（ひらがな・カタカナ・英数字対応）
   */
  static fuzzyMatch(text, searchTerm) {
    if (!text || !searchTerm) return false;
    
    const normalizeText = (str) => {
      return str
        .toLowerCase()
        .replace(/[ａ-ｚＡ-Ｚ０-９]/g, (char) => {
          return String.fromCharCode(char.charCodeAt(0) - 0xFEE0);
        })
        .replace(/[ひらがな]/g, (char) => {
          return String.fromCharCode(char.charCodeAt(0) + 0x60);
        });
    };

    const normalizedText = normalizeText(text);
    const normalizedSearch = normalizeText(searchTerm);
    
    return normalizedText.includes(normalizedSearch);
  }

  /**
   * 配列をグループ化
   */
  static groupBy(array, keyFunction) {
    return array.reduce((groups, item) => {
      const key = keyFunction(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {});
  }

  /**
   * 配列をソート（多条件対応）
   */
  static multiSort(array, sortKeys) {
    return array.sort((a, b) => {
      for (const { key, direction = 'asc' } of sortKeys) {
        let aVal = typeof key === 'function' ? key(a) : a[key];
        let bVal = typeof key === 'function' ? key(b) : b[key];
        
        // 数値として比較可能な場合は数値比較
        if (!isNaN(aVal) && !isNaN(bVal)) {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }
        
        if (aVal < bVal) return direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  /**
   * 数値をカンマ区切りでフォーマット
   */
  static formatNumber(num) {
    return new Intl.NumberFormat('ja-JP').format(num);
  }

  /**
   * 日付をフォーマット
   */
  static formatDate(date, format = 'YYYY/MM/DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');
    const second = String(d.getSeconds()).padStart(2, '0');

    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hour)
      .replace('mm', minute)
      .replace('ss', second);
  }

  /**
   * URLパラメータを取得
   */
  static getUrlParams() {
    const params = {};
    const urlParams = new URLSearchParams(window.location.search);
    for (const [key, value] of urlParams) {
      params[key] = value;
    }
    return params;
  }

  /**
   * URLパラメータを設定
   */
  static setUrlParams(params, replace = false) {
    const url = new URL(window.location);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        url.searchParams.set(key, params[key]);
      } else {
        url.searchParams.delete(key);
      }
    });

    if (replace) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }
  }

  /**
   * デバウンス関数
   */
  static debounce(func, wait) {
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

  /**
   * スロットル関数
   */
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * 要素がビューポートに表示されているかチェック
   */
  static isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * スムーススクロール
   */
  static smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * ファイルをダウンロード
   */
  static downloadFile(data, filename, type = 'application/json') {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * ファイルを読み込み
   */
  static readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  }

  /**
   * 画像を読み込み
   */
  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * 要素のアニメーション
   */
  static animateElement(element, keyframes, options = {}) {
    const defaultOptions = {
      duration: 300,
      easing: 'ease',
      fill: 'forwards'
    };
    
    const animation = element.animate(keyframes, { ...defaultOptions, ...options });
    return new Promise(resolve => {
      animation.onfinish = resolve;
    });
  }

  /**
   * フェードイン
   */
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    return Utils.animateElement(element, [
      { opacity: 0 },
      { opacity: 1 }
    ], { duration });
  }

  /**
   * フェードアウト
   */
  static fadeOut(element, duration = 300) {
    return Utils.animateElement(element, [
      { opacity: 1 },
      { opacity: 0 }
    ], { duration }).then(() => {
      element.style.display = 'none';
    });
  }

  /**
   * ランダムな文字列を生成
   */
  static generateRandomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 配列をページネーション
   */
  static paginate(array, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    
    return {
      data: array.slice(start, end),
      total: array.length,
      page: page,
      perPage: perPage,
      totalPages: Math.ceil(array.length / perPage),
      hasNext: end < array.length,
      hasPrev: page > 1
    };
  }

  /**
   * カラーコードの明度を調整
   */
  static adjustColorBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    
    return '#' + (
      0x1000000 +
      (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
  }

  /**
   * 通知を表示
   */
  static showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // スタイルを設定
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
    `;
    
    // タイプ別の色設定
    const colors = {
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FF9800',
      error: '#F44336'
    };
    notification.style.backgroundColor = colors[type] || colors.info;
    
    // アニメーションを定義（まだ存在しない場合）
    if (!document.querySelector('#notification-animations')) {
      const style = document.createElement('style');
      style.id = 'notification-animations';
      style.textContent = `
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // 自動削除
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, duration);
    
    // クリックで削除
    notification.addEventListener('click', () => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }

  /**
   * ローディング表示
   */
  static showLoading(message = '読み込み中...') {
    const existing = document.getElementById('global-loading');
    if (existing) return;
    
    const loading = document.createElement('div');
    loading.id = 'global-loading';
    loading.innerHTML = `
      <div class="loading-backdrop">
        <div class="loading-content">
          <div class="spinner spinner-large"></div>
          <div class="loading-text">${message}</div>
        </div>
      </div>
    `;
    
    loading.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10001;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
      .loading-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .loading-content {
        text-align: center;
        color: white;
      }
      .loading-text {
        margin-top: 1rem;
        font-size: 1rem;
      }
    `;
    
    if (!document.querySelector('#loading-styles')) {
      style.id = 'loading-styles';
      document.head.appendChild(style);
    }
    
    document.body.appendChild(loading);
  }

  /**
   * ローディング非表示
   */
  static hideLoading() {
    const loading = document.getElementById('global-loading');
    if (loading) {
      loading.parentNode.removeChild(loading);
    }
  }
}

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}

// グローバルに公開
window.Utils = Utils;