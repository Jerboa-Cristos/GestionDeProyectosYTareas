import {Home, FolderKanban, ListCheck, NotebookPen} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

function Menu_Izquierdo() {
    const proyecto_activo = localStorage.getItem("proyecto_activo")
    const sprint_activo = localStorage.getItem("sprint_activo")

    let rutaKanban = "/lista_proyectos"

    if(sprint_activo){
        rutaKanban = `/tablero_kanban_product_owner/${sprint_activo}`
    }else if(proyecto_activo){
        rutaKanban = `/lista_sprint/${proyecto_activo}`
    }

    return (
        <>
        <aside className="fixed bottom-0 left-0 right-0 z-50 bg-blueDark lg:bg-blueBase text-white border-t lg:relative lg:w-64 lg:rounded-xl  overflow-hidden lg:pr-7">

            <nav className="flex flex-row justify-around bg-blueDark lg:bg-blueBase lg:rounded-2xl lg:flex-col lg:h-full">
                
                    <ul className="flex flex-row w-full lg:flex-col lg:ml-2 lg:mt-2 lg:mb-3 lg:gap-y-2 ">
                        
                        <Menu_Items icono={<Home size={35} className='lg:size-10'/>} texto="Panel" ruta="/product_owner_dashboard"/>
                        
                        <Menu_Items icono={<FolderKanban size={35} className='lg:size-10'/>} texto="Proyectos" ruta="/lista_proyectos"/>
                        
                        <Menu_Items icono={<NotebookPen size={35} className='lg:size-10'/>} texto="Tablero Kanban" 
                        ruta={rutaKanban}/>
                        
                       
                    

                    </ul>
                

            </nav>
        </aside>
        </>
    )
    }

export default Menu_Izquierdo

function Menu_Items ({icono, texto, ruta}) {
    return (
        <li className='w-full'>
            <Link to={ruta} className=' flex-1 lg:w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-4  lg:pl-4 lg:pb-5  lg:pt-4 text-white lg:text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark rounded-lg'>

            <span className=' lg-text-blueDark group-hover:text-BlueDarkDark'>{icono}</span>
            <span className='hidden lg:inline text-[10px] lg:text-base font-medium'>{texto}</span>
            </Link>
        </li>
    )
}

