import { RootState } from '@/features'

export const getLoggedInStatus = (state: RootState) => state.auth.isLoggedIn
