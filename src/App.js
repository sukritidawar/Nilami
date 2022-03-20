import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routess from './Routess'
import Header from './header/Header'

const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routess/>
      </BrowserRouter>
    </>
  )
}

export default App;
