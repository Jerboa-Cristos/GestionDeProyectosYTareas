import { useEffect } from 'react';
import './App.css';

//Cris
import CreacionUsuarios from './pages/Administrador/CreacionUsuarios';
import GestionUsuarios from './pages/Administrador/GestionUsuarios';
import PerfilUsuario from './pages/Administrador/PerfilUsuario';
//import Login from './pages/Login/login'; //Modificar y adaptarlo al que ya tenemos
import DashboardDesarrollador from './pages/Desarrollador/DashboardDesarrollador';
import MisTareasDesarrollador from './pages/Desarrollador/MisTareasDesarrollador';
import TableroKanbanDesarrollador from './pages/Desarrollador/TableroKanbanDesarrollador';


//melissa
import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
//AUTH
//Administrador
import AdministradorLogin from './pages/Auth/Administrador/AdministradorLogin';
import AdministradorProfile from './pages/Auth/Administrador/AdministradorProfile';
import AdministradorRegister from './pages/Auth/Administrador/AdministradorRegister';
//Product Owner
import ProductOwnerLogin from './pages/Auth/ProductOwner/ProductOwnerLogin';
import ProductOwnerRegister from './pages/Auth/ProductOwner/ProductOwnerRegister';
import ProductOwnerDashboard from './pages/Product_Owner/ProductOwnerDashboard';
import ProductOwnerProfile from './pages/Product_Owner/ProductOwnerProfile';
//Desarrollador
import DesarrolladorLogin from './pages/Auth/Desarrollador/DesarrolladorLogin';
import DesarrolladorProfile from './pages/Auth/Desarrollador/DesarrolladorProfile';

//PROYECTO
import Crear_Proyecto from './pages/Product_Owner/Crear_Proyecto';
import Lista_Proyectos from './pages/Product_Owner/Lista_Proyectos'




//COMPONENTES QUE REUTILIZAREMOS
import Menu_Izquierdo from './pages/Product_Owner/Menu_Izquierdo';

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
          {isAuthenticated && (
            <>
            <Route path="/administrador_profile" element={<AdministradorProfile/>}/>   
            <Route path="/GestionUsuarios" element={<GestionUsuarios/>}/>
            <Route path="/PerfilUsuario/:rol/:id" element={<PerfilUsuario/>}/>
            <Route path="/CreacionUsuarios" element={<CreacionUsuarios/>}/>
            </>
          )}

          {/*RUTAS AUTH PRODUCT OWNER */}
          {/*<Route path='ruta del navegador del frontend' element={<Componente/>}/> EJEMPLO DE RUTA*/}
          <Route path='/product_owner_register' element={<ProductOwnerRegister/>}/>
          <Route path='/product_owner_login' element={<ProductOwnerLogin/>}/>
          <Route path='/product_owner_profile' element={<ProductOwnerProfile/>}/>
          <Route path='/product_owner_dashboard' element={<ProductOwnerDashboard/>}/>
          <Route path='/lista_proyectos' element={<Lista_Proyectos/>}/>
          <Route path='/menu_izquierdo' element={<Menu_Izquierdo/>}/>
          
          {isAuthenticated && (
            <>
            <Route path='/product_owner_dashboard' element={<ProductOwnerDashboard/>} />
            <Route path="/product_owner_profile" element={<ProductOwnerProfile/>}/>   
            </>
          )}

          {/*RUTAS AUTH DESARROLLADOR */}
          <Route path='/desarrollador_login' element={<DesarrolladorLogin/>}/>
          <Route path='/desarrollador_profile' element={<DesarrolladorProfile/>}/>

          {/*PROYECTO */}
          <Route path='/crear_proyecto' element={<Crear_Proyecto/>}/>

          
          {/*RUTAS DESARROLLADOR*/}
            <Route path="/DashboardDesarrollador" element={<DashboardDesarrollador/>}/>
            <Route path="/TableroKanbanDesarrollador" element={<TableroKanbanDesarrollador/>}/>
            <Route path="/MisTareasDesarrollador" element={<MisTareasDesarrollador/>}/>

        </Routes>
      </>
  )
}

export default App
