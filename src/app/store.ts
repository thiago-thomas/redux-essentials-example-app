import { configureStore } from '@reduxjs/toolkit'
import type { Action } from '@reduxjs/toolkit'

interface CounterState {
  value: number
}

function counterReducer(state: CounterState = {value: 0}, action: Action) {
  switch(action.type) {
    default: {
      return state
    }
  }
}

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

export type AppStore = typeof store //Infere ao tipo da 'store'
export type AppDispatch = typeof store.dispatch //Infere ao tipo 'AppDispatch' da loja em si
export type RootState = ReturnType<typeof store.getState> //O mesmo para o tipo 'RootState'