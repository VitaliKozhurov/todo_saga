import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = { isLoggedIn: false }

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setIsAuthStatus: (state, action: PayloadAction<{ isAuth: boolean }>) => {
      state.isLoggedIn = action.payload.isAuth
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
