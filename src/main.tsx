import { Provider } from 'react-redux'

import { App } from '@/App'
import { store } from '@/features'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </Provider>
)
