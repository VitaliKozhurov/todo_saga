import { Provider } from 'react-redux'

import { Router } from '@/common'
import { store } from '@/features'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </Provider>
)
