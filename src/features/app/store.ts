import { tasksReducer, todoListReducer } from '@/features'
import { authReducer } from '@features/auth/model'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { appReducer } from './model/appSlice'
import { rootSaga } from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  middleware: getDefaultMiddleware => [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
  reducer: {
    app: appReducer,
    auth: authReducer,
    tasks: tasksReducer,
    todoList: todoListReducer,
  },
})

sagaMiddleware.run(rootSaga)
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
