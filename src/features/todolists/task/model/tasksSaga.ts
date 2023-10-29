import { AppResponseType } from '@/common'
import { TaskApi, TaskApiType, TaskUpdateType, TasksResponseType, tasksActions } from '@/features'
import { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

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
  task: TaskApiType
  taskUpdate: Partial<TaskUpdateType>
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
export function* fetchTasksSaga(action: FetchTaskType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<TasksResponseType> = yield call(
      TaskApi.getTasks,
      payload.todolistId
    )

    if (!response.data.error) {
      yield put(
        tasksActions.getTasks({ tasks: response.data.items, todolistId: payload.todolistId })
      )
    }
  } catch (e) {
    console.log(e)
  }
}
function* createTaskSaga(action: CreateTaskType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType<{ item: TaskApiType }>> = yield call(
      TaskApi.createTask,
      payload
    )

    if (response.data.resultCode === 0) {
      yield put(
        tasksActions.createTask({ task: response.data.data.item, todolistId: payload.todolistId })
      )
    }
  } catch (e) {
    console.log(e)
  }
}

function* updateTaskSaga(action: UpdateTaskType): SagaIterator {
  const {
    payload: { task, taskUpdate },
  } = action

  try {
    const { addedDate, id, order, todoListId, ...restTaskData } = task
    const taskFoUpdate = {
      ...restTaskData,
      ...taskUpdate,
    }
    const response: AxiosResponse<AppResponseType<TaskApiType>> = yield call(TaskApi.updateTask, {
      taskId: id,
      taskUpdate: taskFoUpdate,
      todolistId: todoListId,
    })

    if (response.data.resultCode === 0) {
      yield put(
        tasksActions.updateTask({
          taskId: id,
          todolistId: todoListId,
          updatedTaskModel: taskUpdate,
        })
      )
    }
  } catch (e) {
    console.log(e)
  }
}
function* deleteTaskSaga(action: DeleteTaskType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType> = yield call(TaskApi.deleteTask, payload)

    if (response.data.resultCode === 0) {
      yield put(tasksActions.deleteTask({ taskId: payload.taskId, todolistId: payload.todolistId }))
    }
  } catch (e) {
    console.log(e)
  }
}
export function* tasksSagaWatcher() {
  yield takeEvery(tasksSagaActions.FETCH_TASKS, fetchTasksSaga)
  yield takeEvery(tasksSagaActions.CREATE_TASK, createTaskSaga)
  yield takeEvery(tasksSagaActions.UPDATE_TASK, updateTaskSaga)
  yield takeEvery(tasksSagaActions.DELETE_TASK, deleteTaskSaga)
}
