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
import AdministradorDashboard from './pages/Auth/Administrador/AdministradorDashboard';
import AdministradorLogin from './pages/Auth/Administrador/AdministradorLogin';
import AdministradorProfile from './pages/Auth/Administrador/AdministradorProfile';
import AdministradorRegister from './pages/Auth/Administrador/AdministradorRegister';
//Product Owner
import ProductOwnerLogin from './pages/Auth/ProductOwner/ProductOwnerLogin';
import ProductOwnerRegister from './pages/Auth/ProductOwner/ProductOwnerRegister';
import ProductOwnerDashboard from './pages/Product_Owner/ProductOwnerDashboard';
import ProductOwnerProfile from './pages/Product_Owner/ProductOwnerProfile';
//Desarrollador
import DesarrolladorDashboard from './pages/Auth/Desarrollador/DesarrolladorDashboard';
import DesarrolladorLogin from './pages/Auth/Desarrollador/DesarrolladorLogin';
import DesarrolladorProfile from './pages/Auth/Desarrollador/DesarrolladorProfile';
import DesarrolladorRegister from './pages/Auth/Desarrollador/DesarrolladorRegister';


//PROYECTO
import Crear_Proyecto from './pages/Proyecto/Crear_Proyecto';
import Lista_Proyectos from './pages/Proyecto/Lista_Proyectos';
import Sprints_Proyecto from './pages/Sprint/Lista_Sprints_Proyecto'

//SPRINT
import Crear_Sprint from './pages/Sprint/Crear_Sprint'

//COMPONENTES QUE REUTILIZAREMOS
import Menu_Izquierdo from './pages/Menus/Menu_Izquierdo';

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
          <Route path='/lista_proyectos' element={<Lista_Proyectos/>}/>
          <Route path='/menu_izquierdo' element={<Menu_Izquierdo/>}/>
          
          

          {/*RUTAS AUTH DESARROLLADOR */}
          <Route path='/desarrollador_register' element={<DesarrolladorRegister/>}/>
          <Route path='/desarrollador_login' element={<DesarrolladorLogin/>}/>
          <Route path='/desarrollador_profile' element={<DesarrolladorProfile/>}/>
          <Route path='/desarrollador_dashboard' element={<DesarrolladorDashboard/>}/>

          {/*PROYECTO */}
          <Route path='/crear_proyecto' element={<Crear_Proyecto/>}/>
          <Route path='/mostrar_proyecto/:id_proyecto' element={<Sprints_Proyecto/>}/>

          {/*SPRINT */}
          <Route path='/crear_sprint/:id_proyecto' element={<Crear_Sprint/>}/>

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
