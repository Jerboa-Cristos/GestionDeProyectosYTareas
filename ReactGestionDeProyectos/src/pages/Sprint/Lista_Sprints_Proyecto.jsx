import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { MoreVertical } from "lucide-react"
import MenuTop from '../../Layout/Menu/MenuTop'
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner"
import { funcion_mostrar_proyecto } from "../../services/ruta_api_proyecto"
import { funcion_eliminar_sprint, funcion_listado_sprint} from '../../services/ruta_api_sprint'

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

    function MenuSprint({ sprint, id_proyecto}) {
        const [abrirMenu, setAbrirMenu] = useState(false)

        const abrirCerrarMenu = () => setAbrirMenu(!abrirMenu)

        const botonEliminarSprint = () => {
            const token = localStorage.getItem('token')

            if(!confirm('Seguro que quieres eliminar este sprint')) return

            funcion_eliminar_sprint(id_proyecto, sprint.id, token)
            .then(respuesta => {
                window.location.reload()
            })
            .catch(error => {
                console.log('Error al eliminar el sprint', error)
            })
        }
        
        return (
            <div>
                <button
                onClick={abrirCerrarMenu}
                className="p-1 hover:bg-turquesa hover:text-white transition-all rounded">
                    <MoreVertical size={20} className='text-white'/>
                </button>

                {abrirMenu && (
                    <div className="rounded text-left z-10 absolute right-0 mt-2 w-36 bg-white border border-BlueDarkDark">
                        <Link to={`/editar_sprint/${id_proyecto}/${sprint.id}`} 
                        className="block w-full text-left px-4 py-2 hover:bg-GreenLite"
                        >
                            Editar Sprint
                        
                        </Link>

                        <button
                        onClick={botonEliminarSprint}
                        className="w-full text-left px-4 py-2 hover:bg-red-400 text-BlueDarkDark"
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        )
    }

    return (
    <div className="h-screen bg-blueDark p-4 flex flex-col">
        <MenuTop rutaPerfil='/product_owner_profile'/>
        <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">
            <MenuProductOwner/> 
            <main className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
                <h1 className="text-3xl font-bold text-blueDark uppercase mb-6">{proyectos.nombre}</h1>
                <h2 className="text-2xl font-bold text-blueDark mb-6">Backlog</h2>

                <div className="flex justify-between items-center mt-4 mb-4">
                    <h2 className="text-xl font-bold text-blueDark mb-6">Sprints</h2>

                    <Link to={`/crear_sprint/${id_proyecto}`}
                    className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                    <p>+ Nuevo Sprint</p>
                    </Link>
                </div>

                    {
                    sprints.length === 0 
                    ? (<h3 className="text-xl font-bold text-blueDark mb-6">No hay sprints creados aún</h3>) 
                    : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {sprints.map((sprint) => (     
                            <div key={sprint.id}
                            className="relative bg-blueblue rounded-xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition w-full flex flex-col justify-center">

                                <Link to={`/tablero_kanban_product_owner/${sprint.id}`}
                                onClick={() => localStorage.setItem('sprint_activo', sprint.id)}
                                className="w-full bg-blueBase text-blueDark font-semibold px-3 py-2 rounded-md shadow hover:bg-turquesa 
                                hover:text-white transition-all text-center">
                                    <h2 className="font-bold text-xl mb-2">{sprint.nombre}</h2>
                                </Link>
                                <div className="flex flex-row justify-between mt-4">
                                    <p className="text-white text-sm">Fecha de inicio: {sprint.fecha_inicio}</p>
                                    <MenuSprint id_proyecto={id_proyecto} sprint={sprint}/>
                                </div>
                            </div>
                        ))}
                        </div>
                    
                    )}    
            </main>
        </div>
    </div>
    )
}

export default Lista_Sprints_Proyecto