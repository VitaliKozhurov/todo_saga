import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { PrivateRoutes, privateRoutes, publicRoutes } from '@/common'

const router = createBrowserRouter([
  {
    children: [{ children: privateRoutes, element: <PrivateRoutes /> }, ...publicRoutes],
    errorElement: <div>Not Found</div>,
  },
])

export const Router = () => <RouterProvider router={router} />
