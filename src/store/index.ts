import { configureStore } from '@reduxjs/toolkit'
import systemReducer from './system/index'
import menuReducer from './menu/index'

const store = configureStore({
  reducer: {
    system: systemReducer,
    menu: menuReducer
  }
})

export type RoutState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
