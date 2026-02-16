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
import {useState} from 'react'
import Crear_Proyecto from './pages/Product_Owner/Crear_Proyecto'
//AUTH
//Administrador
import AdministradorRegister from './pages/Auth/Administrador/AdministradorRegister';
import AdministradorLogin from './pages/Auth/Administrador/AdministradorLogin';
import AdministradorProfile from './pages/Auth/Administrador/AdministradorProfile';
import AdministradorDashboard from './pages/Auth/Administrador/AdministradorDashboard';
//Product Owner
import ProductOwnerRegister from './pages/Auth/ProductOwner/ProductOwnerRegister'
import ProductOwnerLogin from './pages/Auth/ProductOwner/ProductOwnerLogin'
import ProductOwnerProfile from './pages/Auth/ProductOwner/ProductOwnerProfile'
import ProductOwnerDashboard from './pages/Auth/ProductOwner/ProductOwnerDashboard';
//Desarrollador
import DesarrolladorRegister from './pages/Auth/Desarrollador/DesarrolladorRegister';
import DesarrolladorLogin from './pages/Auth/Desarrollador/DesarrolladorLogin';
import DesarrolladorProfile from './pages/Auth/Desarrollador/DesarrolladorProfile';
import DesarrolladorDashboard from './pages/Auth/Desarrollador/DesarrolladorDashboard';


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
        
          {/*RUTAS AUTH ADMINISTRADOR */}
          <Route path='/administrador_register' element={<AdministradorRegister/>}/>
          <Route path='/administrador_login' element={<AdministradorLogin/>}/>
          <Route path='/administrador_profile' element={<AdministradorProfile/>}/>
          <Route path='/administrador_dashboard' element={<AdministradorDashboard/>}/>
          
          {isAuthenticated && (
            <>
            <Route path='/administrador_dashboard' element={<ProductOwnerDashboard/>} />
            <Route path="/administrador_profile" element={<ProductOwnerProfile/>}/>   
            </>
          )}

          {/*RUTAS AUTH PRODUCT OWNER */}
          {/*<Route path='ruta del navegador del frontend' element={<Componente/>}/> EJEMPLO DE RUTA*/}
          <Route path='/product_owner_register' element={<ProductOwnerRegister/>}/>
          <Route path='/product_owner_login' element={<ProductOwnerLogin/>}/>
          <Route path='/product_owner_profile' element={<ProductOwnerProfile/>}/>
          <Route path='/product_owner_dashboard' element={<ProductOwnerDashboard/>}/>
          
          {isAuthenticated && (
            <>
            <Route path='/product_owner_dashboard' element={<ProductOwnerDashboard/>} />
            <Route path="/product_owner_profile" element={<ProductOwnerProfile/>}/>   
            </>
          )}

          {/*RUTAS AUTH DESARROLLADOR */}
          <Route path='/desarrollador_register' element={<DesarrolladorRegister/>}/>
          <Route path='/desarrollador_login' element={<DesarrolladorLogin/>}/>
          <Route path='/desarrollador_profile' element={<DesarrolladorProfile/>}/>
          <Route path='/desarrollador_dashboard' element={<DesarrolladorDashboard/>}/>



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
