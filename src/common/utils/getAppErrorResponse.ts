import { appActions } from '@/features'
import { put } from 'redux-saga/effects'

export function* getAppErrorResponse(error: string) {
  yield put(appActions.setErrorAppStatus({ error }))
}
