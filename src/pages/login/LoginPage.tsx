import { Navigate } from 'react-router-dom'

import { Login } from '@/components'
import { getLoggedInStatus, useAppSelector } from '@/features'

export const LoginPage = () => {
  const isLoggedIn = useAppSelector(getLoggedInStatus)

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return <Login />
}
