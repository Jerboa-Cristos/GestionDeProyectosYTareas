import './App.css'

import axios from 'axios';
import React, { useEffect } from 'react';

import Base from './Components/Base';

//melissa
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Auth/Dashboard'
import Profile from './pages/Auth/Profile'
import {useState} from 'react'

function rutaApi(){
   return 'http://localhost:8000';
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(auth === "true")
  }, [location])

  return (
    

    

      <>
        <Routes>
          <Route path='/' element={<Navigate to='/register' />} />
          <Route path="/register" element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          {isAuthenticated && (
            <>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>}/>
            
            </>
          )}

          <Route path="/base" element={<><div className="bg-blueDark h-screen w-screen"></div><Base /></>}/>
          
        </Routes>
      </>
  )
}

export default App
