import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SystemState {
  loading: boolean
}
const initialState: SystemState = {
  loading: false
}
const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    }
  }
})
export const { updateLoading } = systemSlice.actions
export default systemSlice.reducer
