import { AppResponseType, getAppErrorResponse, getNetworkErrorResponse } from '@/common'
import {
  CreateTodoType,
  DeleteTodoType,
  TaskApiType,
  TodoListApi,
  TodoListServerType,
  UpdateTodoType,
  fetchTasksSaga,
  fetchTasksSagaAC,
  todoListActions,
  todoListsSagaActions,
} from '@/features'
import { AxiosResponse } from 'axios'
import { SagaIterator } from 'redux-saga'
import { call, put, takeEvery } from 'redux-saga/effects'

function* fetchTodoListsSaga(): SagaIterator {
  try {
    const response: AxiosResponse<TodoListServerType[]> = yield call(TodoListApi.getTodoLists)

    yield put(todoListActions.fetchTodos(response.data))

    for (const todo of response.data) {
      yield call(fetchTasksSaga, fetchTasksSagaAC({ todolistId: todo.id }))
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}

function* createTodoListSaga(action: CreateTodoType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType<{ item: TodoListServerType }>> = yield call(
      TodoListApi.createTodoList,
      payload
    )

    if (response.data.resultCode === 0) {
      yield put(todoListActions.createTodo(response.data.data.item))
    } else {
      yield call(getAppErrorResponse, response.data.messages[0])
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}

function* updateTodoListSaga(action: UpdateTodoType): SagaIterator {
  const { payload } = action
  const data = { todolistId: payload.todolistId, ...payload.updateData }

  try {
    const response: AxiosResponse<AppResponseType<TaskApiType>> = yield call(
      TodoListApi.updateTodoListTitle,
      data
    )

    if (response.data.resultCode === 0) {
      yield put(todoListActions.updateTodo(payload))
    } else {
      yield call(getAppErrorResponse, response.data.messages[0])
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}

function* deleteTodoListSaga(action: DeleteTodoType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType> = yield call(
      TodoListApi.deleteTodoList,
      payload.todolistId
    )

    if (response.data.resultCode === 0) {
      yield put(todoListActions.deleteTodo(payload.todolistId))
    } else {
      yield call(getAppErrorResponse, response.data.messages[0])
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}

export function* todoListsSagaWatcher() {
  yield takeEvery(todoListsSagaActions.FETCH_TODOS, fetchTodoListsSaga)
  yield takeEvery(todoListsSagaActions.CREATE_TODO, createTodoListSaga)
  yield takeEvery(todoListsSagaActions.UPDATE_TODO, updateTodoListSaga)
  yield takeEvery(todoListsSagaActions.DELETE_TODO, deleteTodoListSaga)
}
