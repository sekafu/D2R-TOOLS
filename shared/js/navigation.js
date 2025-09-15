// D2R攻略ツール ナビゲーション管理

/**
 * ナビゲーション関連の機能を管理するクラス
 */
class Navigation {
  constructor() {
    this.currentPath = window.location.pathname;
    this.init();
  }

  /**
   * 初期化処理
   */
  init() {
    this.setActiveNavItem();
    this.setupMobileMenu();
    this.setupDropdowns();
    this.setupKeyboardNavigation();
  }

  /**
   * 現在のページに対応するナビゲーションアイテムをアクティブにする
   */
  setActiveNavItem() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      const href = link.getAttribute('href');
      const linkPath = this.normalizePath(href);
      const currentPath = this.normalizePath(this.currentPath);
      
      // 完全一致または親ディレクトリの場合にアクティブにする
      if (currentPath === linkPath || 
          (linkPath !== '/' && currentPath.startsWith(linkPath + '/'))) {
        link.classList.add('active');
      }
    });
  }

  /**
   * パスを正規化する（末尾のスラッシュを統一）
   */
  normalizePath(path) {
    if (!path) return '/';
    
    // 相対パスを絶対パスに変換
    if (path.startsWith('./')) {
      const currentDir = this.currentPath.split('/').slice(0, -1).join('/');
      path = currentDir + '/' + path.substring(2);
    } else if (path.startsWith('../')) {
      const pathParts = this.currentPath.split('/').slice(0, -1);
      const relativeParts = path.split('/');
      
      for (const part of relativeParts) {
        if (part === '..') {
          pathParts.pop();
        } else if (part !== '.' && part !== '') {
          pathParts.push(part);
        }
      }
      path = pathParts.join('/') || '/';
    }
    
    // 末尾のindex.htmlを除去
    path = path.replace(/\/index\.html$/, '/');
    
    // 末尾のスラッシュを統一
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    return path || '/';
  }

  /**
   * モバイルメニューのセットアップ
   */
  setupMobileMenu() {
    // モバイルメニューボタンを作成（まだヘッダーに追加されていない場合）
    const header = document.querySelector('.header-content');
    let mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenuBtn && header) {
      mobileMenuBtn = document.createElement('button');
      mobileMenuBtn.className = 'mobile-menu-btn';
      mobileMenuBtn.innerHTML = '☰';
      mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
      `;
      
      header.appendChild(mobileMenuBtn);
      
      // モバイル表示時のみ表示
      const style = document.createElement('style');
      style.textContent = `
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
          .nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-secondary);
            border-top: 1px solid var(--border);
            flex-direction: column;
            padding: 1rem;
            z-index: 1000;
          }
          .nav-links.show {
            display: flex !important;
          }
          .header {
            position: relative;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // メニューボタンのクリックイベント
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
          navLinks.classList.toggle('show');
          mobileMenuBtn.innerHTML = navLinks.classList.contains('show') ? '✕' : '☰';
        }
      });
    }

    // 画面サイズが変わった時の処理
    window.addEventListener('resize', () => {
      const navLinks = document.querySelector('.nav-links');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      
      if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove('show');
        if (mobileMenuBtn) {
          mobileMenuBtn.innerHTML = '☰';
        }
      }
    });

    // メニュー外をクリックした時の処理
    document.addEventListener('click', (e) => {
      const navLinks = document.querySelector('.nav-links');
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const header = document.querySelector('.header');
      
      if (navLinks && mobileMenuBtn && 
          !header.contains(e.target) && 
          navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        mobileMenuBtn.innerHTML = '☰';
      }
    });
  }

  /**
   * ドロップダウンメニューのセットアップ
   */
  setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (toggle && menu) {
        toggle.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          // 他のドロップダウンを閉じる
          dropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
              otherDropdown.querySelector('.dropdown-menu')?.classList.remove('show');
            }
          });
          
          // 現在のドロップダウンを切り替え
          menu.classList.toggle('show');
        });
      }
    });

    // 外側をクリックした時にドロップダウンを閉じる
    document.addEventListener('click', () => {
      dropdowns.forEach(dropdown => {
        dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
      });
    });
  }

  /**
   * キーボードナビゲーションのセットアップ
   */
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escキーでモバイルメニューやドロップダウンを閉じる
      if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        if (navLinks && navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
          if (mobileMenuBtn) {
            mobileMenuBtn.innerHTML = '☰';
            mobileMenuBtn.focus();
          }
        }
        
        // ドロップダウンも閉じる
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
          menu.classList.remove('show');
        });
      }
      
      // Alt+数字キーでの高速ナビゲーション
      if (e.altKey && e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (navLinks[index]) {
          navLinks[index].click();
        }
      }
    });

    // フォーカス管理
    const focusableElements = document.querySelectorAll('.nav-links a, .mobile-menu-btn');
    focusableElements.forEach((element, index) => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (index + 1) % focusableElements.length;
          focusableElements[nextIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (index - 1 + focusableElements.length) % focusableElements.length;
          focusableElements[prevIndex].focus();
        }
      });
    });
  }

  /**
   * ページ遷移時のアニメーション
   */
  static animatePageTransition(targetUrl) {
    return new Promise((resolve) => {
      // フェードアウトアニメーション
      document.body.style.transition = 'opacity 0.3s ease';
      document.body.style.opacity = '0';
      
      setTimeout(() => {
        window.location.href = targetUrl;
        resolve();
      }, 300);
    });
  }

  /**
   * パンくずリストを生成
   */
  static generateBreadcrumb() {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(part => part !== '');
    
    const breadcrumbData = [
      { name: 'ホーム', url: '/' }
    ];

    let currentPath = '';
    const pathNames = {
      'runewords': 'ルーンワード',
      'runes': 'ルーン',
      'items': 'アイテム',
      'builds': 'ビルド',
      'calculators': '計算機',
      'cube-recipes': 'キューブレシピ',
      'maps': 'マップ'
    };

    pathParts.forEach(part => {
      currentPath += '/' + part;
      if (pathNames[part]) {
        breadcrumbData.push({
          name: pathNames[part],
          url: currentPath + '/'
        });
      }
    });

    return breadcrumbData;
  }

  /**
   * パンくずリストを表示
   */
  static renderBreadcrumb(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const breadcrumbData = Navigation.generateBreadcrumb();
    
    if (breadcrumbData.length <= 1) {
      container.style.display = 'none';
      return;
    }

    const breadcrumbHtml = breadcrumbData.map((item, index) => {
      const isLast = index === breadcrumbData.length - 1;
      return `
        <span class="breadcrumb-item ${isLast ? 'active' : ''}">
          ${isLast ? item.name : `<a href="${item.url}">${item.name}</a>`}
        </span>
      `;
    }).join('<span class="breadcrumb-separator">›</span>');

    container.innerHTML = `<nav class="breadcrumb">${breadcrumbHtml}</nav>`;
    container.style.display = 'block';
  }
}

// ページ読み込み時に初期化
document.addEventListener('DOMContentLoaded', () => {
  window.d2rNavigation = new Navigation();
  
  // パンくずリストがある場合は表示
  Navigation.renderBreadcrumb('breadcrumb-container');
});

// パンくずリスト用のスタイルを動的に追加
if (!document.querySelector('#breadcrumb-styles')) {
  const style = document.createElement('style');
  style.id = 'breadcrumb-styles';
  style.textContent = `
    .breadcrumb {
      padding: 0.75rem 0;
      margin-bottom: 1rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
    }
    
    .breadcrumb-item a {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.3s ease;
    }
    
    .breadcrumb-item a:hover {
      color: var(--primary-color);
    }
    
    .breadcrumb-item.active {
      color: var(--text);
      font-weight: 500;
    }
    
    .breadcrumb-separator {
      margin: 0 0.5rem;
      opacity: 0.6;
    }
  `;
  document.head.appendChild(style);
}

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}