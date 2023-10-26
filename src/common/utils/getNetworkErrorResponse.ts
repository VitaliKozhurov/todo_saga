import { appActions } from '@/features'
import axios, { AxiosError } from 'axios'
import { put } from 'redux-saga/effects'

export function* getNetworkErrorResponse(e: unknown) {
  const error = e as AxiosError | Error

  if (axios.isAxiosError(error)) {
    const responseError = error.message || error.response?.data.error

    yield put(appActions.setErrorAppStatus({ error: responseError }))
  } else {
    yield put(appActions.setErrorAppStatus({ error: error.message }))
  }
}
