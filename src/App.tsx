import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '@/components'
import { appActions, appErrorSelector, useAppDispatch, useAppSelector } from '@/features'
import { useToast } from '@chakra-ui/react'

export const App = () => {
  const toast = useToast()
  const appError = useAppSelector(appErrorSelector)
  const dispatch = useAppDispatch()

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

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
