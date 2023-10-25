import { AppResponseType } from '@/common'
import {
  CreateTaskType,
  DeleteTaskType,
  FetchTaskType,
  TaskApi,
  TaskApiType,
  TasksResponseType,
  UpdateTaskType,
  tasksActions,
  tasksSagaActions,
} from '@/features'
import { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

function* fetchTasksSaga(action: FetchTaskType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<TasksResponseType> = yield call(
      TaskApi.getTasks,
      payload.todolistId
    )

    if (!response.data.error) {
      put(tasksActions.getTasks({ tasks: response.data.items, todolistId: payload.todolistId }))
    }
  } catch (e) {
    console.log(e)
  }
}
function* createTaskSaga(action: CreateTaskType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType<TaskApiType>> = yield call(
      TaskApi.createTask,
      payload
    )

    if (response.data.resultCode === 0) {
      put(tasksActions.createTask({ task: response.data.data, todolistId: payload.todolistId }))
    }
  } catch (e) {
    console.log(e)
  }
}

function* updateTaskSaga(action: UpdateTaskType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType<TaskApiType>> = yield call(
      TaskApi.updateTask,
      payload
    )

    if (response.data.resultCode === 0) {
      put(
        tasksActions.updateTask({
          taskId: payload.taskId,
          todolistId: payload.todolistId,
          updatedTaskModel: response.data.data,
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
      put(tasksActions.deleteTask({ taskId: payload.taskId, todolistId: payload.todolistId }))
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
