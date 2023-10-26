import { useEffect } from 'react'

import { appActions, appErrorSelector, useAppDispatch, useAppSelector } from '@/features'
import { TodoPage } from '@/pages'
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

  return <TodoPage />
}
