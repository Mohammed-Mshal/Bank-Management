import { Account } from '@prisma/client'
import { create } from 'zustand'
type Store = {
  asideStatusCollapse: boolean
  collapseAside: () => void
  unCollapseAside: () => void
  accounts:[Account]|[]
  setAccounts:(newAccounts:[Account]|[])=>void
}
export const useStore = create<Store>((set) => ({
  asideStatusCollapse: true,
  collapseAside: () => set(() => ({ asideStatusCollapse:true })),
  unCollapseAside: () => set(() => ({ asideStatusCollapse:false })),
  accounts:[],
  setAccounts: (newAccounts) => set(() => ({ accounts:newAccounts })),
}))
