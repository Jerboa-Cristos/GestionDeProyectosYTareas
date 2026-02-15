import './App.css'
import { useEffect } from 'react';

//Cris
import GestionUsuarios from './pages/Administrador/GestionUsuarios';
import PerfilUsuario from './pages/Administrador/PerfilUsuario';
import CreacionUsuarios from './pages/Administrador/CreacionUsuarios';
//import Login from './pages/Login/login'; //Modificar y adaptarlo al que ya tenemos
import DashboardDesarrollador from './pages/Desarrollador/DashboardDesarrollador';
import TableroKanbanDesarrollador from './pages/Desarrollador/TableroKanbanDesarrollador';
import MisTareasDesarrollador from './pages/Desarrollador/MisTareasDesarrollador';


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

          {/*Melissa
          <Route path="/proyecto" element={<Crear_Proyecto/>}/>
          */}

          {/*RUTAS ADMINISTRADOR*/}
            <Route path="/GestionUsuarios" element={<GestionUsuarios/>}/>
            <Route path="/PerfilUsuario/:rol/:id" element={<PerfilUsuario/>}/>
            <Route path="/CreacionUsuarios" element={<CreacionUsuarios/>}/>
          
          {/*RUTAS DESARROLLADOR*/}
            <Route path="/DashboardDesarrollador" element={<DashboardDesarrollador/>}/>
            <Route path="/TableroKanbanDesarrollador" element={<TableroKanbanDesarrollador/>}/>
            <Route path="/MisTareasDesarrollador" element={<MisTareasDesarrollador/>}/>

        </Routes>
      </>
  )
}

export default App
