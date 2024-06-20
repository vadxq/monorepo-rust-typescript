import { createContext, useContext } from 'solid-js'
import type { Component, JSX } from 'solid-js'
import { createStore, SetStoreFunction, Store } from 'solid-js/store'

export interface GlobalState {
  theme: 'light' | 'dark' | 'system'
}

// eslint-disable-next-line no-unused-vars
const GlobalContext = createContext<{ globalState: Store<GlobalState>; setGlobalState: SetStoreFunction<GlobalState> }>()

export const GlobalProvider: Component<{
  children?: JSX.Element
}> = (props) => {
  const [globalState, setGlobalState] = createStore<GlobalState>({
    theme: 'system',
  })

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

const useGlobalContext = () => {
  const value = useContext(GlobalContext)
  if (value === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalContext.Provider')
  }
  return value
}

export const useGlobalState = () => useGlobalContext()
