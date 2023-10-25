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
  initialState: initialState,
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
    deleteTask: (state, action: PayloadAction<{ todolistId: string }>) => {
      delete state[action.payload.todolistId]
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
