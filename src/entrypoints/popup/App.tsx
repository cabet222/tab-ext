import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NumberPicker } from '@/components/ui/number-picker';
import { INIT_MAX_TAB_COUNT } from '@/const/const';

interface TabInfo {
  id: number;
  title: string;
  faviconUrl: string;
  isCurrent: boolean;
}

function App() {
  const [tabs, setTabs] = useState<TabInfo[]>([]);
  const [count, setCount] = useState<number>(3);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // タブ情報を更新
        await updateTabs();
        // タブの最大数を取得
        const result = await browser.storage.local.get('tabCount');
        const maxCount: number = parseInt(result.tabCount, 10) || INIT_MAX_TAB_COUNT;
        // タブの最大数をセット
        setCount(maxCount);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : '予期せぬエラーが発生しました'
        );
        console.error('Error:', error);
      } finally {

        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * タブを削除
   * @param id 削除するタブのID
   */
  const handleCloseTab = async (id: number) => {
    // タブを削除
    await browser.tabs.remove(id);
    // タブ情報を更新
    updateTabs();
  };

  /**
   * タブ情報を更新
   */
  const updateTabs = async () => {
    // 現在開いているウィンドウのタブを取得
    const tabs = await browser.tabs.query({ currentWindow: true });
    // 現在開いているタブを取得
    const currentTab = await browser.tabs.getCurrent();
    // タブ情報をセット
    setTabs(
      tabs.map((tab) => ({
        id: tab.id ?? 0,
        title: tab.title ?? '',
        faviconUrl: tab.favIconUrl ?? '',
        isCurrent: tab.id === currentTab?.id,
      }))
    );
  };

  /**
   * タブの最大数を変更
   * @param newValue 変更後のタブの最大数
   */
  const handleCountChange = async (newValue: number) => {
    // タブの最大数をセット
    setCount(newValue);
    // タブの最大数を保存
    await browser.storage.local.set({ tabCount: newValue });
  };

  return (
    <>
      <div className="p-4 w-[400px]">
        <div className="mb-2">
          <h2 className="text-lg font-bold">Tab Manager</h2>
          <NumberPicker
            value={count}
            onChange={handleCountChange}
            min={0}
            max={10}
            step={1}
          />
        </div>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        {loading && (
          <div className="mb-4 p-2 bg-gray-100 text-gray-700 rounded">
            読み込み中...
          </div>
        )}
        <ul className="space-y-1 max-h-[400px] overflow-y-scroll">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <img
                src={tab.faviconUrl || 'default-favicon.png'}
                alt=""
                className="w-4 h-4"
              />
              <span className="flex-1 truncate text-sm">{tab.title}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCloseTab(tab.id)}
                className="h-4 px-2"
              >
                ✕
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
