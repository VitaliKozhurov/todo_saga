import { RootState } from '@/features'

export const tasksSelectors = (todolistId: string) => (state: RootState) => state.tasks[todolistId]
