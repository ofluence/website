import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export type Theme = 'light' | 'dark' | 'system'

interface InitialGlobalState {
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

// SSR-safe storage: returns a no-op implementation when window is undefined
// (during SSR/SSG), and localStorage when running in the browser.
const ssrSafeStorage = createJSONStorage(() => {
  if (typeof window === 'undefined') {
    return {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    }
  }
  return localStorage
})

const useGlobalState = create<GlobalState>()(
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
        storage: ssrSafeStorage,
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
