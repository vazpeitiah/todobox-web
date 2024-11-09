import { create } from 'zustand'

interface DrawerStore {
  open: boolean
  toggle: () => void
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open }))
}))
