// src/state/authState.ts
import { atom, RecoilState } from 'recoil';
import persistAtom from './persist';

export const authState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom] 
});

// User型の定義が必要です
interface User {
  // ユーザー情報の型定義
}

export const userItemState: RecoilState<User> = atom({
  key: 'userItemState',
  default: {}, 
  effects_UNSTABLE: [persistAtom] 
});