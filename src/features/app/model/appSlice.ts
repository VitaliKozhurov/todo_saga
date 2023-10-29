import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialStateType = {
  error: null | string
  isInitialized: boolean
}

const initialState: InitialStateType = {
  error: null,
  isInitialized: false,
}

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setErrorAppStatus: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
    setInitializedAppStatus: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer
