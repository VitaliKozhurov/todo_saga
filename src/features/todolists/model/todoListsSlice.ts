import { FilterValueType } from '@/common'
import { TodoListServerType } from '@/features'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TodoListType = {
  entityStatus: 'idle' | 'loading'
  filter: FilterValueType
} & TodoListServerType

const initialState: TodoListType[] = []

export const todoListsSlice = createSlice({
  initialState,
  name: 'todoLists',
  reducers: {
    createTodo: (state, action: PayloadAction<TodoListServerType>) => {
      const newTodo = action.payload

      state.unshift({ ...newTodo, entityStatus: 'idle', filter: FilterValueType.ALL })
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id !== action.payload)
    },
    fetchTodos: (_state, action: PayloadAction<TodoListServerType[]>) => {
      return action.payload.map(todo => ({
        ...todo,
        entityStatus: 'idle',
        filter: FilterValueType.ALL,
      }))
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        todolistId: string
        updateData: { filter?: FilterValueType; title?: string }
      }>
    ) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)

      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload.updateData }
      }
    },
  },
})

export const todoListReducer = todoListsSlice.reducer
export const todoListActions = todoListsSlice.actions
