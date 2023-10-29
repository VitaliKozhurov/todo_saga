import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components'
import {
  appActions,
  appErrorSelector,
  getInitializedStatus,
  setAppInitializedStatusSagaAC,
  useAppDispatch,
  useAppSelector,
} from '@/features'
import { useToast } from '@chakra-ui/react'

export const App = () => {
  const toast = useToast()
  const appError = useAppSelector(appErrorSelector)
  const isInitialized = useAppSelector(getInitializedStatus)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setAppInitializedStatusSagaAC())
  }, [])
  useEffect(() => {
    appError &&
      toast({
        description: appError,
        duration: 5000,
        isClosable: true,
        onCloseComplete: () => dispatch(appActions.setErrorAppStatus({ error: null })),
        position: 'top',
        status: 'error',
        title: 'Application Error',
      })
  }, [appError, dispatch, toast])
  if (!isInitialized) {
    return <h1>Loading......</h1>
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
