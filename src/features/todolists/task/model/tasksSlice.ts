import { TodoListServerType } from '@/features'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { TaskApiType, TaskUpdateType } from '../api/taskApi'

type TaskType = TaskApiType & {
  entityStatus: 'idle' | 'loading'
}
type InitialState = {
  [key: string]: TaskType[]
}

const initialState = {} as InitialState

const tasksSlice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher<PayloadAction<TodoListServerType[]>>(
        action => {
          return action.type.endsWith('todoLists/fetchTodos')
        },
        (state, action) => {
          action.payload.map(todo => (state[todo.id] = []))
        }
      )
      .addMatcher<PayloadAction<TodoListServerType>>(
        action => {
          return action.type.endsWith('todoLists/createTodo')
        },
        (state, action) => {
          state[action.payload.id] = []
        }
      )
      .addMatcher<PayloadAction<string>>(
        action => {
          return action.type.endsWith('todoLists/deleteTodo')
        },
        (state, action) => {
          delete state[action.payload]
        }
      )
  },
  initialState,
  name: 'tasks',
  reducers: {
    createTask: (state, action: PayloadAction<{ task: TaskApiType; todolistId: string }>) => {
      state[action.payload.todolistId] = [
        {
          ...action.payload.task,
          entityStatus: 'idle',
        },
        ...state[action.payload.todolistId],
      ]
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      state[action.payload.todolistId] = state[action.payload.todolistId].filter(
        task => task.id !== action.payload.taskId
      )
    },
    getTasks: (state, action: PayloadAction<{ tasks: TaskApiType[]; todolistId: string }>) => {
      state[action.payload.todolistId] = action.payload.tasks.map(todo => ({
        ...todo,
        entityStatus: 'idle',
      }))
    },
    updateTask: (
      state,
      action: PayloadAction<{
        taskId: string
        todolistId: string
        updatedTaskModel: Partial<TaskUpdateType>
      }>
    ) => {
      const tasks = state[action.payload.todolistId]
      const taskIndex = tasks.findIndex(task => task.id === action.payload.taskId)

      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...action.payload.updatedTaskModel }
      }
    },
  },
})

export const tasksReducer = tasksSlice.reducer
export const tasksActions = tasksSlice.actions
