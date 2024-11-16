import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { describe, expect, it, vi } from 'vitest';
import { GoogleMap } from '../GoogleMap';

// GoogleMap 関数のモック
vi.mock('@/hooks/useGoogleMap', () => ({
  useGoogleMap: vi.fn(() => ({
    setCenter: vi.fn(), // センターを設定する関数のモック
    addListener: vi.fn(), // リスナーを追加する関数のモック
  })),
}));

// ユーティリティ関数のモック
vi.mock('@/lib/utils', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(), // パスワードでサインインする関数のモック
      signInWithOAuth: vi.fn(), // OAuthでサインインする関数のモック
      signUp: vi.fn(), // サインアップする関数のモック
      getSession: vi.fn(), // セッションを取得する関数のモック
    },
  },
  cn: vi.fn(() => "mocked-class-name"), // cn関数のモック
}));

beforeAll(() => {
  // localStorage のモック
  global.localStorage = {
    getItem: vi.fn(), // アイテムを取得する関数のモック
    setItem: vi.fn(), // アイテムを設定する関数のモック
    removeItem: vi.fn(), // アイテムを削除する関数のモック
    clear: vi.fn(), // ストレージをクリアする関数のモック
    length: 0, // ストレージのアイテム数
    key: vi.fn(), // 指定したインデックスのキーを取得する関数のモック
  };
});

describe('GoogleMap', () => {
  it('renders without crashing', () => {
    // コンポーネントがクラッシュせずにレンダリングされることをテスト
    render(
      <RecoilRoot>
        <GoogleMap eventsData={[]} />
      </RecoilRoot>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument(); // プログレスバーがドキュメントに存在することを確認
  });

  it('displays the map', () => {
    // マップが表示されることをテスト
    render(
      <RecoilRoot>
        <GoogleMap eventsData={[]} />
      </RecoilRoot>
    );
    const mapElement = screen.getByRole('progressbar').parentElement;
    expect(mapElement).toHaveStyle({ height: '80vh', width: '100%' }); // マップのスタイルを確認
  });
});