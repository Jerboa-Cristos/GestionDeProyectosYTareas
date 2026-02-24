import { useEffect, useState } from "react"
import { funcion_mostrar_proyecto } from "../../services/ruta_api_proyecto"
import { funcion_listado_sprint} from '../../services/ruta_api_sprint'
import { useParams, Link } from "react-router-dom"
import Menu_Izquierdo from '../Menus/Menu_Izquierdo'
import MenuTop from '../../Components/MenuTop'

function Lista_Sprints_Proyecto() {
    const [proyectos, setProyecto] = useState('')
    const [sprints, setSprint] = useState([])
    //se usa useParams porque el id viene de la URL
    const {id_proyecto} = useParams() //obtener id de la url
   
    
    
    useEffect(() => {
        localStorage.setItem("proyecto_activo", id_proyecto)
       
        const token = localStorage.getItem('token')
        funcion_mostrar_proyecto(id_proyecto, token)
        .then(res => {
            setProyecto(res.data)
             
        })
        .catch(error => console.log('Error al cargar proyecto', error))

        funcion_listado_sprint(id_proyecto, token)
        .then(res => {
            console.log('Respuesta sprint', res.data)
            setSprint(res.data)
        })
        .catch(error => console.log('Error al cargar sprint', error))
    }, [id_proyecto]) 

    

    if(!proyectos){
        return <p>Cargando sprints</p>
    }

    return (
        <>
        <MenuTop rutaPerfil='/product_owner_profile'/>

        <div className="flex">
            <div className="w-56">
            <Menu_Izquierdo/> 
            </div>

            <div className="flex-1 min-w-0 p-4">
                
                <div className="border border-BlueBaseDark rounded bg-white p-5 ml-5 mt-2.5">
                
                <h1 className="text-3xl text-BlueDarkDark font-bold mb-2">
                    {proyectos.nombre}
                </h1>


                <h2 className="text-BlueDarkDark font-semibold">PRODUCT OWNER BACKLOG</h2>
                <h2 className="text-BlueDarkDark font-semibold">BACKLOG</h2>

                

                <div className="flex justify-between items-center mt-4 mb-4">
                    <h2 className="text-xl font-bold text-BlueDarkDark">SPRINTS</h2>

                    <Link to={`/crear_sprint/${id_proyecto}`}
                    className="bg-blueBase hover:bg-blue-300 transition rounded px-4 py-2 text-BlueDarkDark font-bold shadow"
                    >
                    <p>+ Nuevo Sprint</p>
                    
                    </Link>
                </div>

                    {
                    sprints.length === 0 
                    ? (<p className="text-blueDashboard italic">No hay sprints creados aún</p>) 
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sprints.map((sprint) => (     
                            <div 
                            key={sprint.id}
                            className="bg-blueDashboard rounded p-4 text-center shadow"
                            >
                                <Link to={`/tablero_kanban_product_owner/${sprint.id}`}
                                onClick={() => localStorage.setItem('sprint_activo', sprint.id)}
                                >
                                <p className="font-bold text-lg text-white">{sprint.nombre}</p>
                                <p className="text-sm text-white">{sprint.fecha_inicio}</p>
                                
                                </Link>

                                <Link to={`/tablero_kanban_product_owner/${sprint.id}`}
                                onClick={() => localStorage.setItem('sprint_activo', sprint.id)}
                                >
                                <p className="rounded items-center w-20 p-1 bg-BlueDarkDark text-sm text-white underline mt-2">Ver tareas</p>

                                </Link>
                            </div>
                        ))}
                        </div>
                    
                    )}


                
                </div>
            </div>
        </div>
        </>
    )
}

export default Lista_Sprints_Proyecto