import { createSlice, PayloadAction, Draft } from '@reduxjs/toolkit'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

interface MenuState {
  isCollapse: boolean
  menuList: MenuItem[]
}

const menuState: MenuState = {
  isCollapse: false,
  menuList: []
}

const menuSlice = createSlice({
  name: 'menu',
  initialState: menuState,
  reducers: {
    updateCollapse(state: Draft<MenuState>, { payload }: PayloadAction<boolean>) {
      state.isCollapse = payload
    },
    updateMenuList(state: Draft<MenuState>, { payload }: PayloadAction<MenuItem[]>) {
      state.menuList = payload as Draft<MenuItem[]>
    }
  }
})

export const { updateCollapse, updateMenuList } = menuSlice.actions
export default menuSlice.reducer
