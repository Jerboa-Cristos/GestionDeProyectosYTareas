import './App.css'
import { useEffect } from 'react';



//Cris
//import DashboardAdmin from './pages/Admin/DashboardAdmin';
//import GestionUsuarios from './pages/Admin/GestionUsuarios';
//import PerfilUsuario from './pages/Admin/PerfilUsuario';
//import CreacionUsuarios from './pages/Admin/CreacionUsuarios';
//import Login from './pages/Login/login'; //Modificar y adaptarlo al que ya tenemos

//<Route path="/base" element={<><div className="bg-blueDark h-screen w-screen"></div><Base /></>}/>

//melissa
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Auth/Dashboard'
import Profile from './pages/Auth/Profile'
import {useState} from 'react'
import Crear_Proyecto from './pages/Product_Owner/Crear_Proyecto'


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
          {/*<Route path='/' element={<Navigate to='/register' />} />*/}

          {/*<Route path='ruta' element={<Componente/>}/> EJEMPLO DE RUTA*/}
          <Route path="/register" element={<Register/>} />
          <Route path='/register_product_owner' element={<Register/>}/>
          <Route path='/login' element={<Login/>} /> 
          
          {isAuthenticated && (
            <>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>}/>   
            </>
          )}

          <Route path="/proyecto" element={<Crear_Proyecto/>}/>

        
           {/**CRIS
            
            <Route path="/DashboardAdmin" element={<DashboardAdmin/>}/>
            <Route path="/GestionUsuarios" element={<GestionUsuarios/>}/>
            <Route path="/PerfilUsuario" element={<PerfilUsuario/>}/>
            <Route path="/CreacionUsuarios" element={<CreacionUsuarios/>}/>
            
            */} 

        </Routes>
      </>
  )
}

export default App
