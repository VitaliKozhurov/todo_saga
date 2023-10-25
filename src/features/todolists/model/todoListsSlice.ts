import { TodoListServerType } from '@/features'
import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit'

type TodoListType = {
  entityStatus: 'idle' | 'loading'
  filter: FilterValueType
} & TodoListServerType

enum FilterValueType {
  ACTIVE = 'active',
  ALL = 'all',
  COMPLETED = 'completed',
}
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
    fetchTodos: (_state, action: PayloadAction<TodoListServerType[]>) => {
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

const FETCH_TODOS = 'fetchTodos'
const CREATE_TODO = 'createTodo'
const UPDATE_TODO = 'updateTodo'
const DELETE_TODO = 'deleteTodo'

export const fetchTodosSagaAC = () =>
  ({
    type: 'fetchTodos',
  }) as const
export const createTodoSagaAC = (payload: { title: string }) =>
  ({
    payload,
    type: 'createTodo',
  }) as const

export const todoListsSagaActions = { CREATE_TODO, DELETE_TODO, FETCH_TODOS, UPDATE_TODO }

export const updateTodoSagaAC = createAction(UPDATE_TODO)
export const deleteTodoSagaAC = createAction(DELETE_TODO)

export type CreateTodoType = ReturnType<typeof createTodoSagaAC>
