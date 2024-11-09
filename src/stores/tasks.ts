import { create } from 'zustand'

interface TaskStore {
  showCards: boolean
  toggleShowCards: () => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  showCards: true,
  toggleShowCards: () => set((state) => ({ showCards: !state.showCards }))
}))
