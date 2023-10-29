import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { App } from '@/App'

import { PrivateRoutes } from './PrivateRoutes'
import { privateRoutes, publicRoutes } from './routerSettings'

const router = createBrowserRouter([
  {
    children: [{ children: privateRoutes, element: <PrivateRoutes /> }, ...publicRoutes],
    element: <App />,
    errorElement: <div>Not Found</div>,
  },
])

export const Router = () => <RouterProvider router={router} />
