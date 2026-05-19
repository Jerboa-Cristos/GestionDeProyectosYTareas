import './App.css';

//Cris
import { Suspense, lazy } from 'react'; //Carga de forma perezosa los componentes, para mejorar el rendimiento
//Para importar páginas con lazy: const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
import Loading from './Components/Loading'; //Componente de carga para mostrar mientras se cargan todo tipo de cosas

import { Toaster } from 'react-hot-toast'; //Biblioteca para hacer notificaciones tipo toast
import { TareaProvider } from './Context/TareaContext'; //CONTEXTO DE TAREAS PARA CADA USUARIO
//Administrador
const CreacionUsuarios = lazy(() => import('./pages/Administrador/CreacionUsuarios'));
const GestionUsuarios = lazy(() => import('./pages/Administrador/GestionUsuarios'));
const PerfilUsuario = lazy(() => import('./pages/Administrador/PerfilUsuario'));
//Desarrollador
const DashboardDesarrollador = lazy(() => import('./pages/Desarrollador/DashboardDesarrollador'));
const MisTareasDesarrollador = lazy(() => import('./pages/Desarrollador/MisTareasDesarrollador'));
const TableroKanbanDesarrollador = lazy(() => import('./pages/Desarrollador/TableroKanbanDesarrollador'));
const MostrarTarea = lazy(() => import('./pages/Desarrollador/MostrarTarea'));


//melissa
import { Route, Routes, useLocation } from 'react-router-dom';
//AUTH
import Login from './pages/Auth/Login';
//Administrador
const AdministradorProfile = lazy(() => import('./pages/Auth/Administrador/AdministradorProfile'));
import AdministradorRegister from './pages/Auth/Administrador/AdministradorRegister';
//Product Owner
const ProductOwnerDashboard = lazy(() => import('./pages/Product_Owner/ProductOwnerDashboard'));
const ProductOwnerProfile = lazy(() => import('./pages/Product_Owner/ProductOwnerProfile'));
//Desarrollador
const DesarrolladorProfile = lazy(() => import('./pages/Auth/Desarrollador/DesarrolladorProfile'));

//PROYECTO
const Crear_Proyecto = lazy(() => import('./pages/Proyecto/Crear_Proyecto'));
const Lista_Proyectos = lazy(() => import('./pages/Proyecto/Lista_Proyectos'));
const Lista_Sprints_Proyecto = lazy(() => import('./pages/Sprint/Lista_Sprints_Proyecto'));
const Editar_Proyecto = lazy(() => import('./pages/Proyecto/Editar_Proyecto'));

//SPRINT
const Crear_Sprint = lazy(() => import('./pages/Sprint/Crear_Sprint'));

//TAREA
const Crear_Tarea = lazy(() => import('./pages/Tarea/Crear_Tarea'));

//COMPONENTES QUE REUTILIZAREMOS
import Menu_Izquierdo from './pages/Menus/Menu_Izquierdo';
const Tablero_Kanban_Product_Owner = lazy(() => import('./pages/Product_Owner/Tablero_Kanban_Product_Owner'));
const Editar_Tarea = lazy(() => import('./pages/Tarea/Editar_Tarea'));
const Lista_Sprints = lazy(() => import('./pages/Sprint/Lista_Sprints'));
const Editar_Sprint = lazy(() => import('./pages/Sprint/Editar_Sprint'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <>
        <Toaster position='bottom-right' reverseOrder={false}/>
        <Routes>
          <Route path='/login' element={<Login/>}/>

          {/*RUTAS AUTH ADMINISTRADOR */}
          <Route path='/' element={<AdministradorRegister/>}/>
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

          <Route path='/tablero_kanban_product_owner/:id_sprint' element={<Tablero_Kanban_Product_Owner/>}/>

          {/*PROYECTO */}
          <Route path='/crear_proyecto' element={<Crear_Proyecto/>}/>
          <Route path='/mostrar_proyecto/:id_proyecto' element={<Lista_Sprints_Proyecto/>}/>
          <Route path='/editar_proyecto/:id_proyecto' element={<Editar_Proyecto/>}/>

          {/*SPRINT */}
          <Route path='/crear_sprint/:id_proyecto' element={<Crear_Sprint/>}/>
          <Route path='/lista_sprint/:id_proyecto' element={<Lista_Sprints/>}/>
          <Route path='editar_sprint/:id_proyecto/:id_sprint' element={<Editar_Sprint/>}/>

          {/*TAREA */}
          <Route path='/crear_tarea/:id_sprint' element={<Crear_Tarea/>}/>
          <Route path='/editar_tarea/:id_sprint/:id_tarea' element={<Editar_Tarea/>}/>


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
              <Route path="/MostrarTarea/:id" element={<MostrarTarea/>}/>
            </Routes>
          </TareaProvider>
      </>
    </Suspense>
  )
}

export default App
