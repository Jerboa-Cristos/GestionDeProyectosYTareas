import { useEffect, useState } from "react"
import { funcion_mostrar_proyecto } from "../../services/ruta_api_proyecto"
import { funcion_mostrar_sprint} from '../../services/ruta_api_sprint'
import { useParams, Link } from "react-router-dom"
import Menu_Izquierdo from '../Menus/Menu_Izquierdo'
import MenuTop from '../../Components/MenuTop'

function Sprints_Proyecto() {
    const [proyectos, setProyecto] = useState('')
    const [sprints, setSprint] = useState([])
    //se usa useParams porque el id viene de la URL
    const {id_proyecto} = useParams() //obtener id de la url
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        funcion_mostrar_proyecto(id_proyecto, token)
        .then(res => {
            setProyecto(res.data)
             
        })
        .catch(error => console.log('Error al cargar proyecto', error))

        funcion_mostrar_sprint(id_proyecto, token)
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
        <MenuTop/>
        <div className="flex">
            <Menu_Izquierdo/> 
            <div className="">
                <div className="border border-BlueBaseDark rounded bg-white ml-3 pl-3 w-100">
                <h1 
                className="text-3xl text-BlueDarkDark font-bold">
                    {proyectos.nombre}
                </h1>
                <h2 className="text-BlueDarkDark font-semibold">PRODUCT OWNER BACKLOG</h2>
                <h2 className="text-BlueDarkDark font-semibold">BACKLOG</h2>
                <h2>SPRINTS</h2>
                    {
                    sprints.length === 0 
                    ? (<p>No hay sprints</p>) 
                    : sprints.map((sprint) => (
                        <div 
                        key={sprint.id}
                        className="border border-BlueBaseDark m-4 p-3 w-100 flex justify-end"
                        >
                            
                            <p>{sprint.nombre}</p>
                            <p>{sprint.fecha_inicio}</p>
                            
                        </div>
                        
                    ))
                    }
                </div>

                <div className="border border-GreenLite roudend w-30 h-auto">
                    <Link to={`/crear_sprint/${id_proyecto}`}>
                    <p>+ Nuevo Sprint</p>
                    
                    </Link>
                </div>
            </div>
                
            
            
            </div>

        
        </>
    )


}

export default Sprints_Proyecto