import { useEffect, useState } from "react"
import MenuTop from "../../Components/MenuTop"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"
import { Save } from "lucide-react"
import { useParams, useNavigate } from "react-router-dom"
import { funcion_actualizar_proyecto, funcion_mostrar_proyecto } from "../../services/ruta_api_proyecto"

function Editar_Proyecto (){
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    
    const { id_proyecto } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        funcion_mostrar_proyecto(id_proyecto, token)
        .then(respuesta => {
            const proyecto = respuesta.data
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaFin(proyecto.fecha_fin?.split('T')[0] || '')
        })
        .catch(error => console.log('Error al cargar el proyecto', error))
    }, [id_proyecto])


    const botonEditarProyecto = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        const data = {
            nombre,
            descripcion,
            fecha_fin: fechaFin
        }

        funcion_actualizar_proyecto(id_proyecto, data, token)
        .then(respuesta => {
            console.log('Proyecto actualizado', respuesta.data)
            navigate(`/mostrar_proyecto/${id_proyecto}`)
        })
        .catch(error => {
            console.log('Error al editar proyecto', error)
        })
    }


    return(
        <>
        <div className="h-screen bg-blueDark p-4 flex flex-col">

        <MenuTop rutaPerfil='/product_owner_profile'/>  
        <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">
            <div className="md:h-full md:flex">
            <Menu_Izquierdo/>

            </div>

            <div className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
                
                    <form onSubmit={botonEditarProyecto}>
                        <div className="bg-blueDashboard rounded-lg p-6">
                            <h2 className="font-bold text-white mb-4 text-[1.2em]">Editar Proyecto</h2>
                            
                            <label className="font-semibold text-white mt-4 block">Nombre</label>
                            <input
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                type="text" 
                                className="w-full rounded px-3 py-2 mt-1 bg-blueBase border border-BlueBaseDark"
                                required
                                placeholder="Escribe el nombre del proyecto" 
                            />

                            <label className="font-semibold text-white mt-4 block">Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)} 
                                className="w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase"
                                placeholder="Escribe la descripción del proyecto"
                            />

                            <label className="font-semibold text-white mt-4 block">Fecha de finalización</label>
                            <input 
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                type="date" 
                                className="rounded-lg px-4 py-2 bg-blueBase mt-1 text-blueDark"
                            />

                            <div className="flex justify-end">
                                <button
                                    className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2"
                                >
                                    <Save size={23} />
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </form>   
                
            </div>
        </div>      
        </div>
        </>
    )
}

export default Editar_Proyecto
