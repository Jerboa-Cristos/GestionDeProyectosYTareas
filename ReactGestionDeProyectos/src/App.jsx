import './App.css'

import axios from 'axios';
import React, { useEffect } from 'react';

//Cris
import DashboardAdmin from './pages/Administrador/dashboardAdmin';
import GestionUsuarios from './pages/Administrador/gestionUsuarios';
import PerfilUsuario from './pages/PerfilUsuario';
import CreacionUsuarios from './pages/Administrador/CreacionUsuarios';
import LoginVisual from './pages/Login/login'; //Modificar y adaptarlo al que ya tenemos


//<Route path="/base" element={<><div className="bg-blueDark h-screen w-screen"></div><Base /></>}/>

//melissa
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Auth/Dashboard'
import Profile from './pages/Auth/Profile'
import {useState} from 'react'

function rutaApi(){
   return 'http://localhost';
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated")
    setIsAuthenticated(auth === "true")
  }, [location])

// <Route path="/" element={<Login/>}/> LOGIN NUESTRO

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
          

            <Route path="/DashboardAdmin" element={<DashboardAdmin/>}/>
            <Route path="/GestionUsuarios" element={<GestionUsuarios/>}/>
            <Route path="/PerfilUsuario" element={<PerfilUsuario/>}/>
            <Route path="/CreacionUsuarios" element={<CreacionUsuarios/>}/>
            <Route path="/LoginVisual" element={<LoginVisual/>}/>
        </Routes>
      </>
  )
}

export default App
