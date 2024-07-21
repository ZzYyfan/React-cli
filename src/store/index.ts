import { configureStore } from '@reduxjs/toolkit'
import systemReducer from './system/index'

const store = configureStore({
  reducer: {
    system: systemReducer
  }
})

export type RoutState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
