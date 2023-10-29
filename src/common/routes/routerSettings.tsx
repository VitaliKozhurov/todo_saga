import { Navigate, RouteObject } from 'react-router-dom'

import { LoginPage, TodoPage } from '@/pages'

export const privateRoutes: RouteObject[] = [
  { element: <Navigate to={'/todo'} />, path: '' },
  { element: <TodoPage />, path: '/todo' },
]

export const publicRoutes: RouteObject[] = [{ element: <LoginPage />, path: '/login' }]
