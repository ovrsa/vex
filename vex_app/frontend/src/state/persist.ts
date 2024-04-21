// src/state/persist.ts
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'recoil-persist', // このキーでローカルストレージに保存されます
  storage: localStorage, // 使用するストレージの種類を指定
})

export default persistAtom