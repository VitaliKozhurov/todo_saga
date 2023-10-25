import { AppResponseType } from '@/common'
import {
  CreateTodoType,
  TodoListApi,
  TodoListServerType,
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
  } catch (e) {
    console.log(e)
    /*yield put(getUserErrorAction(error))*/
  }
}

function* createTodoListSaga(action: CreateTodoType): SagaIterator {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType<TodoListServerType>> = yield call(
      TodoListApi.createTodoList,
      payload
    )

    if (response.data.resultCode === 0) {
      yield put(todoListActions.createTodo(response.data.data))
    }
  } catch (e) {
    console.log(e)
  }
}

export function* todoListsSagaWatcher() {
  yield takeEvery(todoListsSagaActions.FETCH_TODOS, fetchTodoListsSaga)
  yield takeEvery(todoListsSagaActions.CREATE_TODO, createTodoListSaga)
}
