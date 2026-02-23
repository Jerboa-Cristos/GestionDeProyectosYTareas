import './App.css';

//Cris
import { TareaProvider } from './Context/TareaContext'; //CONTEXTO DE TAREAS PARA CADA USUARIO

import CreacionUsuarios from './pages/Administrador/CreacionUsuarios';
import GestionUsuarios from './pages/Administrador/GestionUsuarios';
import PerfilUsuario from './pages/Administrador/PerfilUsuario';
//import Login from './pages/Login/login'; //Modificar y adaptarlo al que ya tenemos
import DashboardDesarrollador from './pages/Desarrollador/DashboardDesarrollador';
import MisTareasDesarrollador from './pages/Desarrollador/MisTareasDesarrollador';
import TableroKanbanDesarrollador from './pages/Desarrollador/TableroKanbanDesarrollador';


//melissa
import { Route, Routes, useLocation } from 'react-router-dom';
//AUTH
import Login from './pages/Auth/Login';
//Administrador
import AdministradorProfile from './pages/Auth/Administrador/AdministradorProfile';
import AdministradorRegister from './pages/Auth/Administrador/AdministradorRegister';
//Product Owner
import ProductOwnerDashboard from './pages/Product_Owner/ProductOwnerDashboard';
import ProductOwnerProfile from './pages/Product_Owner/ProductOwnerProfile';
//Desarrollador
import DesarrolladorProfile from './pages/Auth/Desarrollador/DesarrolladorProfile';

//PROYECTO
import Crear_Proyecto from './pages/Proyecto/Crear_Proyecto';
import Lista_Proyectos from './pages/Proyecto/Lista_Proyectos';
import Sprints_Proyecto from './pages/Sprint/Lista_Sprints_Proyecto'

//SPRINT
import Crear_Sprint from './pages/Sprint/Crear_Sprint'

//TAREA
import Crear_Tarea from './pages/Tarea/Crear_Tarea';

//COMPONENTES QUE REUTILIZAREMOS
import Menu_Izquierdo from './pages/Menus/Menu_Izquierdo';
import Mis_Tareas_Product_Owner from './pages/Product_Owner/Mis_Tareas_Product_Owner';
import Tablero_Kanban_Product_Owner from './pages/Product_Owner/Tablero_Kanban_Product_Owner';
import Editar_Tarea from './pages/Tarea/Editar_Tarea';

function App() {
  return (
    
      <>
        <Routes>
          <Route path='/' element={<Login/>}/>

          {/*RUTAS AUTH ADMINISTRADOR */}
          <Route path='/administrador_register' element={<AdministradorRegister/>}/>
          <Route path="/administrador_profile" element={<AdministradorProfile/>}/>   
          <Route path="/GestionUsuarios" element={<GestionUsuarios/>}/>
          <Route path="/PerfilUsuario/:rol/:id" element={<PerfilUsuario/>}/>
          <Route path="/CreacionUsuarios" element={<CreacionUsuarios/>}/>


          {/*RUTAS AUTH PRODUCT OWNER */}
          {/*<Route path='ruta del navegador del frontend' element={<Componente/>}/> EJEMPLO DE RUTA*/}
          <Route path='/product_owner_profile' element={<ProductOwnerProfile/>}/>
          <Route path='/product_owner_dashboard' element={<ProductOwnerDashboard/>}/>
          <Route path='/lista_proyectos' element={<Lista_Proyectos/>}/>
          <Route path='/menu_izquierdo' element={<Menu_Izquierdo/>}/>
          <Route path='/mis_tareas_product_owner/:id_sprint' element={<Mis_Tareas_Product_Owner/>}/>
          <Route path='/tablero_kanban_product_owner/:id_sprint' element={<Tablero_Kanban_Product_Owner/>}/>

          {/*PROYECTO */}
          <Route path='/crear_proyecto' element={<Crear_Proyecto/>}/>
          <Route path='/mostrar_proyecto/:id_proyecto' element={<Sprints_Proyecto/>}/>

          {/*SPRINT */}
          <Route path='/crear_sprint/:id_proyecto' element={<Crear_Sprint/>}/>

          {/*TAREA */}
          <Route path='/crear_tarea/:id_sprint' element={<Crear_Tarea/>}/>
          <Route path='/editar_tarea' element={<Editar_Tarea/>}/>


          {/*RUTAS AUTH DESARROLLADOR */}
          <Route path='/desarrollador_profile' element={<DesarrolladorProfile/>}/>
          {/*AQUÍ PONGO EL CONTEXT DE TAREA PARA NO TENER QUE DECLARARLO CADA VEZ */}
        </Routes>

        
          <TareaProvider>
            {/*RUTAS DESARROLLADOR*/}
            <Routes>
              <Route path="/DashboardDesarrollador" element={<DashboardDesarrollador/>}/>
              <Route path="/TableroKanbanDesarrollador" element={<TableroKanbanDesarrollador/>}/>
              <Route path="/MisTareasDesarrollador" element={<MisTareasDesarrollador/>}/>
            </Routes>
          </TareaProvider>
      </>
  )
}

export default App
