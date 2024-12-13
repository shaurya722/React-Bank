import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Acc from './components/Acc'
import Login from './components/Login'
import Register from './components/Register'
import Deposit from '../src/components/Deposit'
import Transactions from '../src/components/Transactions'
import {Route,Routes} from 'react-router-dom'


function App() {

  return (
  <>

  <Routes>
    <Route  path='/login' element={<Login/>}/>
    <Route  path='/' element={<Register/>}/>
    <Route  path='/accounts' element={<Acc/>}/>
    <Route  path='/deposit' element={<Deposit/>}/>
    <Route  path='/transactions' element={<Transactions/>}/>

  </Routes>


  {/* <Acc/>
  <Login/>
  <br />
  <br />
  <Register/>
  </> */}
  </>
  )
}

export default App
