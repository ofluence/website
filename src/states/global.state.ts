import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Theme = 'light' | 'dark' | 'system'

export interface InitialGlobalState {
  theme: Theme
}

interface GlobalActions {
  setTheme: (_theme: Theme) => void
}

const initialGlobalState: InitialGlobalState = {
  theme: 'system',
}

interface GlobalState extends InitialGlobalState {
  actions: GlobalActions
}

export const useGlobalState = create<GlobalState>()(
  devtools(
    persist(
      immer((set) => ({
        ...initialGlobalState,
        actions: {
          setTheme: (theme) =>
            set(
              (state) => {
                state.theme = theme
              },
              false,
              'global/setTheme'
            ),
        },
      })),
      {
        name: 'global-storage',
        partialize: (state) => ({ theme: state.theme }),
      }
    ),
    {
      name: 'global-state',
      enabled: import.meta.env.DEV,
      anonymousActionType: 'global/action',
    }
  )
)

// State selectors
export const useTheme = () => useGlobalState((state) => state.theme)
export const useGlobalActions = () => useGlobalState((state) => state.actions)
