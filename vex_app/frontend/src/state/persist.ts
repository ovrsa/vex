// Recoil Persist
// 状態管理ライブラリRecoilの状態を永続化するためのライブラリ

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', 
  storage: localStorage, 
})

export default persistAtom