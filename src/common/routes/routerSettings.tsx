import { Navigate, RouteObject } from 'react-router-dom'

import { TodoPage } from '@/pages'

export const privateRoutes: RouteObject[] = [
  { element: <Navigate to={'/todo'} />, path: '' },
  { element: <TodoPage />, path: '/todo' },
]

export const publicRoutes: RouteObject[] = [{ element: <h1>Login</h1>, path: '/login' }]
