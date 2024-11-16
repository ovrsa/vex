// src/state/authState.ts
import { atom } from 'recoil';
import persistAtom from './persist';

export const authState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom] 
});

export const eventDataState = atom({
  key: 'eventDataState',
  default: [], 
  effects_UNSTABLE: [persistAtom] 
});