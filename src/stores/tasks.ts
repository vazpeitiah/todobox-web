import { TaskStatus } from '@utils/enum'
import { create } from 'zustand'

interface TaskStore {
  showCards: boolean
  toggleShowCards: () => void
  status: TaskStatus
  setStatus: (status: TaskStatus) => void
}

export const useTaskStore = create<TaskStore>((set) => ({
  showCards: true,
  toggleShowCards: () => set((state) => ({ showCards: !state.showCards })),
  status: TaskStatus.Pending,
  setStatus: (status) => set({ status })
}))
