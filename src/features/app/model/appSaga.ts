import { AppResponseType, getNetworkErrorResponse } from '@/common'
import { AuthApi, AuthMeResponse, appActions } from '@/features'
import { AxiosResponse } from 'axios'
import { call, put, takeEvery } from 'redux-saga/effects'

const SET_APP_INITIALIZED_STATUS = 'setInitializedAppStatus'

export const setAppInitializedStatusSagaAC = () =>
  ({
    type: SET_APP_INITIALIZED_STATUS,
  }) as const

/*type setAppInitializedStatusType = ReturnType<typeof setAppInitializedStatusSagaAC>*/
function* setInitializedAppStatusSaga() {
  try {
    const response: AxiosResponse<AppResponseType<AuthMeResponse>> = yield call(AuthApi.me)

    if (response.data.resultCode === 0) {
      yield put(appActions.setInitializedAppStatus({ isInitialized: true }))
    }
  } catch (e) {
    yield call(getNetworkErrorResponse, e)
  }
}
export function* appSagaWatcher() {
  yield takeEvery(SET_APP_INITIALIZED_STATUS, setInitializedAppStatusSaga)
}
