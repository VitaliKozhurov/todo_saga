import { App } from '@/App'
import { ChakraProvider } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
)
