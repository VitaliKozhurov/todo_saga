import { todoListsSagaWatcher } from '@/features'
import { all } from 'redux-saga/effects'
export function* rootSaga() {
  yield all([todoListsSagaWatcher()])
}