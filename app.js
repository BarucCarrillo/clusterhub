import React from 'react'
import RootLayout from './app/_layout'
import { GlobalProvider } from './context/GlobalProvider'



const App = () => {
  return (
    <GlobalProvider>
      <RootLayout />
    </GlobalProvider>
  )
}

export default App