import {Home, FolderKanban, ClipboardList, ListCheck} from 'lucide-react'
import { Link } from 'react-router-dom'

function Menu_Izquierdo() {
  return (
    <>
    <aside className="w-56 h-150 bg-blue  mt-6 ml-6">
        <nav className="h-full w-full flex flex-col bg-blueBase rounded-2xl">
            <div className="">
                <ul className="m-4 menu p-0">
                    
                    <Menu_Items icono={<Home size={20}/>} texto="Panel" ruta="/product_owner_dashboard"/>
                    <hr />
                    <Menu_Items icono={<FolderKanban size={20}/>} texto="Proyectos" ruta="/lista_proyectos"/>
                    <hr />
                    <Menu_Items icono={<ListCheck size={20}/>} texto="Tablero Kanban" ruta=""/>
                    <hr />
                    <Menu_Items icono={<ClipboardList size={20}/>} texto="Mis Tareas" ruta="/mis_tareas_product_owner/${id_sprint}"/>
                    <hr />
                

                </ul>
            </div>

        </nav>
    </aside>
    </>
  );
}

export default Menu_Izquierdo

function Menu_Items ({icono, texto, ruta}) {
    return (
        <li>
            <Link to={ruta} className='flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-green-100 hover:text-indigo-600 transition-colors cursor-pointer'>
            {icono}
            <span>{texto}</span>
            </Link>
        </li>
    )
}

