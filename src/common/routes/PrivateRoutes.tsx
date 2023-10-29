import { Navigate, Outlet } from 'react-router-dom'

import { getLoggedInStatus, useAppSelector } from '@/features'

export const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector(getLoggedInStatus)

  debugger

  return isLoggedIn ? <Outlet /> : <Navigate to={'login'} />
}
