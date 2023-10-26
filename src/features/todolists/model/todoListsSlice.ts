import { TodoListServerType } from '@/features'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type TodoListType = {
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
    type: FETCH_TODOS,
  }) as const
export const createTodoSagaAC = (payload: { title: string }) =>
  ({
    payload,
    type: CREATE_TODO,
  }) as const
export const updateTodoSagaAC = (payload: { title: string; todolistId: string }) =>
  ({
    payload,
    type: UPDATE_TODO,
  }) as const
export const deleteTodoSagaAC = (payload: { todolistId: string }) =>
  ({
    payload,
    type: DELETE_TODO,
  }) as const

export const todoListsSagaActions = { CREATE_TODO, DELETE_TODO, FETCH_TODOS, UPDATE_TODO }

export type CreateTodoType = ReturnType<typeof createTodoSagaAC>
export type UpdateTodoType = ReturnType<typeof updateTodoSagaAC>
export type DeleteTodoType = ReturnType<typeof deleteTodoSagaAC>
