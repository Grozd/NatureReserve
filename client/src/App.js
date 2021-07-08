import React, {createContext} from 'react'
import Router from './router'

export const Context = createContext('')

function App() {
  console.log('App');
  
  return (
    <Context.Provider>
      <Router/>
    </Context.Provider>
  )
}

export default App
