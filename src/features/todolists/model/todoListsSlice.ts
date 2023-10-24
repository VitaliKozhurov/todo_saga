import { TodoListServerType } from '@/features'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TodoListType = {
  entityStatus: 'idle' | 'loading'
  filter: FilterValueType
} & TodoListServerType

const initialState: TodoListType[] = []

export const todoListsSlice = createSlice({
  initialState,
  name: 'todoLists',
  reducers: {
    createTodo: (state, action: PayloadAction<TodoListServerType>) => {
      state.unshift({ ...action.payload, entityStatus: 'idle', filter: FilterValueType.ALL })
    },
    deleteTodo: (state, action: PayloadAction<{ todolistId: string }>) => {
      return state.filter(todo => todo.id !== action.payload.todolistId)
    },
    setTodos: (_state, action: PayloadAction<TodoListServerType[]>) => {
      return action.payload.map(todo => ({
        ...todo,
        entityStatus: 'idle',
        filter: FilterValueType.ALL,
      }))
    },
    updateTodo: (state, action: PayloadAction<{ title: string; todolistId: string }>) => {
      const index = state.findIndex(todo => todo.id === action.payload.todolistId)

      if (index !== -1) {
        state[index].title = action.payload.title
      }
    },
  },
})

export const todoListReducer = todoListsSlice.reducer
export const todoListActions = todoListsSlice.actions

enum FilterValueType {
  ACTIVE = 'active',
  ALL = 'all',
  COMPLETED = 'completed',
}
