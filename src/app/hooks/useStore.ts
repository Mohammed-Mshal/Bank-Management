import { create } from 'zustand'
type Store = {
  asideStatusCollapse: boolean
  collapseAside: () => void
  unCollapseAside: () => void
}
export const useStore = create<Store>((set) => ({
  asideStatusCollapse: true,
  collapseAside: () => set(() => ({ asideStatusCollapse:true })),
  unCollapseAside: () => set(() => ({ asideStatusCollapse:false })),
}))
