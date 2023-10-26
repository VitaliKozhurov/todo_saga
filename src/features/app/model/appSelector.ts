import { RootState } from '@/features'

export const appErrorSelector = (state: RootState) => state.app.error
