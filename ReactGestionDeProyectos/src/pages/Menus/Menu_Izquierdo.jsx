import {Home, FolderKanban, ListCheck, NotebookPen} from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { createRoutesFromElements, Link, useParams } from 'react-router-dom'

function Menu_Izquierdo() {
    const proyecto_activo = localStorage.getItem("proyecto_activo")
    const sprint_activo = localStorage.getItem("sprint_activo")
    const [esMovil, setEsMovil] = useState(false)
    

    useEffect(() => {
        const cambioTamaño = () => {
            const anchuraActual = window.innerWidth
            setEsMovil(anchuraActual < 768) 
        }

        window.addEventListener('resize', cambioTamaño)
        cambioTamaño()

        return () => window.removeEventListener('resize', cambioTamaño)
    }, [])

    let rutaKanban = "/lista_proyectos"

    if(sprint_activo){
        rutaKanban = `/tablero_kanban_product_owner/${sprint_activo}`
    }else if(proyecto_activo){
        rutaKanban = `/lista_sprint/${proyecto_activo}`
    }

    console.log('anchura', window.innerWidth, 'esmovil', esMovil )

    return (
        <>
        {/**MENU MOVIL */}
        {esMovil && <aside className="fixed bottom-0 left-0 right-0 z-9999 bg-blueDark text-white h-16">

            <nav className="h-full">
                
                <ul className='flex justify-around items-center h-full list-none'>
                <Menu_Items icono={<Home size={35} className='size-9 md:size-10'/>} texto="Panel" ruta="/product_owner_dashboard"/>
                
                <Menu_Items icono={<FolderKanban size={35} className='size-9 md:size-10'/>} texto="Proyectos" ruta="/lista_proyectos"/>
                
                <Menu_Items icono={<NotebookPen size={35} className='size-9 md:size-10'/>} texto="Tablero Kanban" 
                ruta={rutaKanban}/>

                </ul>         

            </nav>
        </aside>} 
        

        {/**MENU escritorio */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:bg-blueBase md:h-screen md:rounded-xl ">

            <nav className="flex flex-col gap-3">
                
                  <ul className='list-none flex flex-col gap-3'>

                    <Menu_Items icono={<Home size={35} className='size-9 md:size-10'/>} texto="Panel" ruta="/product_owner_dashboard"/>
                    
                    <Menu_Items icono={<FolderKanban size={35} className='size-9 md:size-10'/>} texto="Proyectos" ruta="/lista_proyectos"/>
                    
                    <Menu_Items icono={<NotebookPen size={35} className='size-9 md:size-10'/>} texto="Tablero Kanban" 
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
        <li className='flex-1 md:w-full h-full md:h-auto'>
            <Link to={ruta} className='w-full h-full flex flex-col items-center justify-center gap-1 md:justify-start md:flex-row transition-all py-3 pb-4 md:gap-4  md:pl-4 ,md:pb-5  md:pt-4 text-white md:text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark rounded-lg md:items-start  '>

            <span className=' md:text-blueDark group-hover:text-BlueDarkDark'>{icono}</span>
            <span className='hidden md:inline text-sm md:text-base font-medium'>{texto}</span>
            </Link>
        </li>
    )
}

