import { AppResponseType, getNetworkErrorResponse } from '@/common'
import { AuthApi, LoginResponse, authActions } from '@/features'
import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

const SET_AUTH_LOGIN_STATUS = 'setAuthLoginStatus'
const SET_AUTH_LOGOUT_STATUS = 'setAuthLogoutStatus'

export const setAuthLoginStatusSagaAC = (payload: {
  email: string
  password: string
  rememberMe?: boolean
}) =>
  ({
    payload,
    type: SET_AUTH_LOGIN_STATUS,
  }) as const

export const setAuthLogoutStatusSagaAC = () => ({ type: SET_AUTH_LOGOUT_STATUS }) as const

type setAuthStatusType = ReturnType<typeof setAuthLoginStatusSagaAC>

function* loginSaga(action: setAuthStatusType) {
  const { payload } = action

  try {
    const response: AxiosResponse<AppResponseType<LoginResponse>> = yield call(
      AuthApi.login,
      payload
    )

    if (response.data.resultCode === 0) {
      yield put(authActions.setIsAuthStatus({ isAuth: true }))
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}

function* logoutSaga() {
  try {
    const response: AxiosResponse<AppResponseType> = yield call(AuthApi.logout)

    if (response.data.resultCode === 0) {
      yield put(authActions.setIsAuthStatus({ isAuth: false }))
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}

export function* authSagaWatcher() {
  yield takeEvery(SET_AUTH_LOGIN_STATUS, loginSaga)
  yield takeEvery(SET_AUTH_LOGOUT_STATUS, logoutSaga)
}
