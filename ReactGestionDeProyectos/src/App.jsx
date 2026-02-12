import './App.css'
import { useEffect } from 'react';



//Cris
//import DashboardAdmin from './pages/Administrador/DashboardAdmin';
//import GestionUsuarios from './pages/Administrador/GestionUsuarios';
//import PerfilUsuario from './pages/Administrador/PerfilUsuario';
//import CreacionUsuarios from './pages/Administrador/CreacionUsuarios';
//import Login from './pages/Login/login'; //Modificar y adaptarlo al que ya tenemos
import DashboardDesarrollador from './pages/Desarrollador/DashboardDesarrollador';
import TableroKanbanDesarrollador from './pages/Desarrollador/TableroKanbanDesarrollador';
import MisTareasDesarrollador from './pages/Desarrollador/MisTareasDesarrollador';

//<Route path="/base" element={<><div className="bg-blueDark h-screen w-screen"></div><Base /></>}/>


//melissa
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Auth/Dashboard'
import Profile from './pages/Auth/Profile'
import {useState} from 'react'



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
          <Route path="/register" element={<Register/>} />
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
          

          <Route path="/DashboardDesarrollador" element={<DashboardDesarrollador/>}/>
          <Route path="/TableroKanbanDesarrollador" element={<TableroKanbanDesarrollador/>}/>
          <Route path="/MisTareasDesarrollador" element={<MisTareasDesarrollador/>}/>
        
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
