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
    builder.addMatcher(
      action => {
        return action.type.endsWith('todoLists/fetchTodos')
      },
      (state, action) => {
        console.log(state)
        console.log(action)
      }
    )
  },
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
const FETCH_TASKS = 'fetchTasks'
const CREATE_TASK = 'createTask'
const UPDATE_TASK = 'updateTask'
const DELETE_TASK = 'deleteTask'

export const tasksSagaActions = { CREATE_TASK, DELETE_TASK, FETCH_TASKS, UPDATE_TASK }
export const fetchTasksSagaAC = (payload: { todolistId: string }) =>
  ({
    payload,
    type: FETCH_TASKS,
  }) as const

export const createTaskSagaAC = (payload: { title: string; todolistId: string }) =>
  ({
    payload,
    type: CREATE_TASK,
  }) as const
export const updateTaskSagaAC = (payload: {
  taskId: string
  taskUpdate: TaskUpdateType
  todolistId: string
}) =>
  ({
    payload,
    type: UPDATE_TASK,
  }) as const
export const deleteTaskSagaAC = (payload: { taskId: string; todolistId: string }) =>
  ({
    payload,
    type: DELETE_TASK,
  }) as const

export type FetchTaskType = ReturnType<typeof fetchTasksSagaAC>
export type CreateTaskType = ReturnType<typeof createTaskSagaAC>
export type UpdateTaskType = ReturnType<typeof updateTaskSagaAC>
export type DeleteTaskType = ReturnType<typeof deleteTaskSagaAC>
