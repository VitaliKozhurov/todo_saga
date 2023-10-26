import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
  error: null | string
}

const initialState: InitialStateType = {
  error: null,
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setErrorAppStatus: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
})

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer
