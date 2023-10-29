import { RootState } from '@/features'

export const appErrorSelector = (state: RootState) => state.app.error
export const getInitializedStatus = (state: RootState) => state.app.isInitialized
