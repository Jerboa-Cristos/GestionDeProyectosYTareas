import { useEffect, useState } from "react"
import { Save } from "lucide-react"
import MenuTop from "../../Layout/Menu/MenuTop"
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner"
import { useParams, useNavigate } from "react-router-dom"
import { actualizarProyecto, mostrarProyecto } from "../../services/ruta_api_proyecto"

function Editar_Proyecto (){
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    
    const { id_proyecto } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        mostrarProyecto(id_proyecto, token)
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

        actualizarProyecto(id_proyecto, data, token)
        .then(respuesta => {
            console.log('Proyecto actualizado', respuesta.data)
            navigate(`/mostrar_proyecto/${id_proyecto}`)
        })
        .catch(error => {
            console.log('Error al editar proyecto', error)
        })
    }


    return(
    <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/product_owner_profile'/>  
        <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
            <MenuProductOwner/>
            <main className='flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 overflow-y-auto flex flex-col gap-6'>
                <div className="flex-1 bg-blueDashboard rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <form className="max-w-2xl mx-auto grid grid-cols-1 gap-4" onSubmit={botonEditarProyecto}>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-6 text-center lg:text-left">Editar Proyecto</h1>
                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Nombre</label>
                            <input
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                type="text" 
                                className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"
                                required
                                placeholder="Escribe el nombre del proyecto"/>
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Descripción</label>
                            <textarea
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)} 
                                className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"
                                placeholder="Escribe la descripción del proyecto"/>
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Fecha de finalización</label>
                            <input 
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                type="date" 
                                className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
                        </div>

                        <div className="flex justify-end">
                            <button
                                className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                    hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                                <Save size={20} />
                                Guardar cambios
                            </button>
                        </div>
                    </form>   
                </div>
            </main>
        </div>      
    </div>
    )
}

export default Editar_Proyecto
