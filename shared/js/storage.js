// D2R攻略ツール LocalStorage管理

/**
 * LocalStorage管理クラス
 */
class Storage {
  constructor() {
    this.prefix = 'd2r-tools-';
    this.version = '1.0.0';
    this.migrations = [];
    
    this.init();
  }

  /**
   * 初期化処理
   */
  init() {
    this.checkVersion();
    this.runMigrations();
  }

  /**
   * バージョンチェック
   */
  checkVersion() {
    const storedVersion = this.get('version');
    if (storedVersion !== this.version) {
      console.log(`Storage version updated: ${storedVersion} → ${this.version}`);
      this.set('version', this.version);
    }
  }

  /**
   * マイグレーション実行
   */
  runMigrations() {
    const lastMigration = this.get('lastMigration', 0);
    
    this.migrations.forEach((migration, index) => {
      if (index >= lastMigration) {
        try {
          migration();
          this.set('lastMigration', index + 1);
          console.log(`Migration ${index + 1} completed`);
        } catch (error) {
          console.error(`Migration ${index + 1} failed:`, error);
        }
      }
    });
  }

  /**
   * キーにプレフィックスを付加
   */
  getKey(key) {
    return this.prefix + key;
  }

  /**
   * データを保存
   */
  set(key, value) {
    try {
      const data = {
        value: value,
        timestamp: Date.now(),
        type: typeof value
      };
      localStorage.setItem(this.getKey(key), JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Storage.set error:', error);
      return false;
    }
  }

  /**
   * データを取得
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) {
        return defaultValue;
      }

      const data = JSON.parse(item);
      return data.value !== undefined ? data.value : defaultValue;
    } catch (error) {
      console.error('Storage.get error:', error);
      return defaultValue;
    }
  }

  /**
   * データを削除
   */
  remove(key) {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error('Storage.remove error:', error);
      return false;
    }
  }

  /**
   * すべてのデータを削除
   */
  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Storage.clear error:', error);
      return false;
    }
  }

  /**
   * データの存在チェック
   */
  has(key) {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  /**
   * 全データのキー一覧を取得
   */
  getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key.replace(this.prefix, ''));
      }
    }
    return keys;
  }

  /**
   * 全データを取得
   */
  getAll() {
    const data = {};
    this.getAllKeys().forEach(key => {
      data[key] = this.get(key);
    });
    return data;
  }

  /**
   * データサイズを取得（概算）
   */
  getSize() {
    let total = 0;
    this.getAllKeys().forEach(key => {
      const item = localStorage.getItem(this.getKey(key));
      if (item) {
        total += item.length;
      }
    });
    return total;
  }

  /**
   * データを圧縮して保存
   */
  setCompressed(key, value) {
    try {
      const jsonString = JSON.stringify(value);
      const compressed = this.compress(jsonString);
      return this.set(key + '_compressed', compressed);
    } catch (error) {
      console.error('Storage.setCompressed error:', error);
      return false;
    }
  }

  /**
   * 圧縮されたデータを取得
   */
  getCompressed(key, defaultValue = null) {
    try {
      const compressed = this.get(key + '_compressed');
      if (compressed === null) {
        return defaultValue;
      }
      const decompressed = this.decompress(compressed);
      return JSON.parse(decompressed);
    } catch (error) {
      console.error('Storage.getCompressed error:', error);
      return defaultValue;
    }
  }

  /**
   * 簡易圧縮（LZ文字列圧縮）
   */
  compress(str) {
    const dict = {};
    const data = str.split('');
    const result = [];
    let dictSize = 256;
    let w = '';

    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      const wc = w + c;
      
      if (dict[wc]) {
        w = wc;
      } else {
        result.push(dict[w] || w.charCodeAt(0));
        dict[wc] = dictSize++;
        w = c;
      }
    }
    
    if (w) {
      result.push(dict[w] || w.charCodeAt(0));
    }
    
    return result;
  }

  /**
   * 簡易展開
   */
  decompress(data) {
    const dict = {};
    let dictSize = 256;
    let w = String.fromCharCode(data[0]);
    let result = w;

    for (let i = 1; i < data.length; i++) {
      const k = data[i];
      let entry;
      
      if (dict[k]) {
        entry = dict[k];
      } else if (k === dictSize) {
        entry = w + w.charAt(0);
      } else {
        entry = String.fromCharCode(k);
      }
      
      result += entry;
      dict[dictSize++] = w + entry.charAt(0);
      w = entry;
    }
    
    return result;
  }

  /**
   * 有効期限付きデータの保存
   */
  setWithExpiration(key, value, expirationMinutes) {
    const expirationTime = Date.now() + (expirationMinutes * 60 * 1000);
    const dataWithExpiration = {
      value: value,
      expiration: expirationTime
    };
    return this.set(key, dataWithExpiration);
  }

  /**
   * 有効期限付きデータの取得
   */
  getWithExpiration(key, defaultValue = null) {
    const data = this.get(key);
    if (data === null) {
      return defaultValue;
    }

    if (data.expiration && Date.now() > data.expiration) {
      this.remove(key);
      return defaultValue;
    }

    return data.value !== undefined ? data.value : defaultValue;
  }

  /**
   * 期限切れデータのクリーンアップ
   */
  cleanupExpiredData() {
    const keys = this.getAllKeys();
    let cleanedCount = 0;

    keys.forEach(key => {
      const data = this.get(key);
      if (data && data.expiration && Date.now() > data.expiration) {
        this.remove(key);
        cleanedCount++;
      }
    });

    return cleanedCount;
  }

  /**
   * データのエクスポート
   */
  export() {
    const exportData = {
      version: this.version,
      timestamp: Date.now(),
      data: this.getAll()
    };
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * データのインポート
   */
  import(jsonString) {
    try {
      const importData = JSON.parse(jsonString);
      
      if (!importData.data) {
        throw new Error('Invalid import data format');
      }

      // バックアップを作成
      const backup = this.export();
      
      try {
        Object.keys(importData.data).forEach(key => {
          this.set(key, importData.data[key]);
        });
        
        console.log('Data imported successfully');
        return { success: true, backup: backup };
      } catch (error) {
        console.error('Import failed, restoring backup');
        this.importFromBackup(backup);
        throw error;
      }
    } catch (error) {
      console.error('Storage.import error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * バックアップからの復元
   */
  importFromBackup(backupString) {
    try {
      const backupData = JSON.parse(backupString);
      this.clear();
      Object.keys(backupData.data).forEach(key => {
        this.set(key, backupData.data[key]);
      });
      return true;
    } catch (error) {
      console.error('Storage.importFromBackup error:', error);
      return false;
    }
  }

  /**
   * ストレージ容量チェック
   */
  checkQuota() {
    try {
      const testKey = this.getKey('quota-test');
      const testData = 'x'.repeat(1024); // 1KB
      let size = 0;
      
      while (true) {
        try {
          localStorage.setItem(testKey, testData.repeat(size));
          localStorage.removeItem(testKey);
          size++;
        } catch (e) {
          break;
        }
      }
      
      return {
        available: (size - 1) * 1024, // bytes
        used: this.getSize(),
        total: size * 1024
      };
    } catch (error) {
      console.error('Storage.checkQuota error:', error);
      return null;
    }
  }
}

/**
 * ルーン管理専用のStorageクラス
 */
class RuneStorage extends Storage {
  constructor() {
    super();
    this.runesKey = 'player-runes';
    this.settingsKey = 'rune-settings';
  }

  /**
   * ルーン在庫を取得
   */
  getRunes() {
    return this.get(this.runesKey, {});
  }

  /**
   * ルーン在庫を保存
   */
  setRunes(runes) {
    return this.set(this.runesKey, runes);
  }

  /**
   * 特定のルーンの個数を取得
   */
  getRuneCount(runeName) {
    const runes = this.getRunes();
    return runes[runeName] || 0;
  }

  /**
   * 特定のルーンの個数を設定
   */
  setRuneCount(runeName, count) {
    const runes = this.getRunes();
    runes[runeName] = Math.max(0, count);
    return this.setRunes(runes);
  }

  /**
   * ルーンの個数を変更
   */
  changeRuneCount(runeName, delta) {
    const currentCount = this.getRuneCount(runeName);
    const newCount = Math.max(0, currentCount + delta);
    return this.setRuneCount(runeName, newCount);
  }

  /**
   * すべてのルーンをリセット
   */
  resetAllRunes() {
    return this.setRunes({});
  }

  /**
   * ルーン設定を取得
   */
  getSettings() {
    return this.get(this.settingsKey, {
      autoSave: true,
      showNotifications: true,
      compactView: false
    });
  }

  /**
   * ルーン設定を保存
   */
  setSettings(settings) {
    return this.set(this.settingsKey, settings);
  }

  /**
   * 特定の設定値を取得
   */
  getSetting(key, defaultValue = null) {
    const settings = this.getSettings();
    return settings[key] !== undefined ? settings[key] : defaultValue;
  }

  /**
   * 特定の設定値を保存
   */
  setSetting(key, value) {
    const settings = this.getSettings();
    settings[key] = value;
    return this.setSettings(settings);
  }
}

// グローバルインスタンス作成
window.storage = new Storage();
window.runeStorage = new RuneStorage();

// エクスポート（モジュール対応）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Storage, RuneStorage };
}