import { INIT_MAX_TAB_COUNT } from '@/const/const';

export default defineBackground(() => {
  browser.tabs.onCreated.addListener(async (tab) => {
    // 現在開いているウィンドウのタブを取得
    const tabs = await browser.tabs.query({ currentWindow: true });
    // タブの最大数を取得
    const result = await browser.storage.local.get('tabCount');
    const maxCount: number = parseInt(result.tabCount, 10) || INIT_MAX_TAB_COUNT;
    // タブの数が最大数を超えていたらポップアップを開く
    if (tabs.length > maxCount) {
      browser.action.openPopup();
    }
  });
});
