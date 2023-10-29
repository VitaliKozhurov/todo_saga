import { authSagaWatcher, tasksSagaWatcher, todoListsSagaWatcher } from '@/features'
import { all } from 'redux-saga/effects'

import { appSagaWatcher } from './model/appSaga'
export function* rootSaga() {
  yield all([todoListsSagaWatcher(), tasksSagaWatcher(), authSagaWatcher(), appSagaWatcher()])
}
