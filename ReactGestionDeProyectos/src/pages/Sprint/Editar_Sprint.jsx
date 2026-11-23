import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Save } from "lucide-react"
import MenuTop from "../../Layout/Menu/MenuTop"
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner"
import Loading from '../../Layout/Loading';
import { actualizarSprint, mostrarSprint } from "../../services/sprintService"
import { toast } from 'react-hot-toast'

function Editar_Sprint (){
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState('')
    const [meta_sprint, setMetaSprint] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const {id_proyecto, id_sprint} = useParams()
    
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return;
        
        const fetchTareas = async () => {
        setLoading(true);
        mostrarSprint(id_proyecto, id_sprint, token)
        .then(respuesta => {
            const sprint = respuesta.data
            setNombre(sprint.nombre)
            setMetaSprint(sprint.meta_sprint)
            setFechaInicio(sprint.fecha_inicio?.split('')[0] || '')
            setFechaFin(sprint.fecha_fin?.split('')[0] || '')
            toast.success('Sprint cargado con éxito')
        })
        .catch(error => {
            console.log('Error al cargar el sprint', error)
            toast.error('Error al cargar el sprint')
        }).finally(() => {
            setLoading(false);
        })}
        fetchTareas()
    }, [id_proyecto, id_sprint])


    const botonEditarSprint = (e) => {
        e.preventDefault()
        const data = {
            nombre, meta_sprint, fecha_inicio: fechaInicio, fecha_fin: fechaFin
        }

        toast.promise(actualizarSprint(id_proyecto, id_sprint , data, token), {
            loading: 'Actualizando sprint...',
            success: 'Sprint actualizado con éxito.',
            error: 'No se pudo actualizar el sprint.'
        }).then(() => {
            navigate(`/mostrar_proyecto/${id_proyecto}`)
        })
        .catch(error => {
            console.log('Error al editar sprint', error)
        })
    }

    if (loading) return <Loading />

    return(
        <div className='h-screen bg-blueDark p-4 flex flex-col'>
            <MenuTop rutaPerfil='/product_owner_profile'/>  
            <div className="flex flex-1 gap-4 overflow-hidden flex-col md:flex-row">
                <MenuProductOwner/>
            <main className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto pb-24">
                <div className="flex-1 bg-blueDashboard rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <form onSubmit={botonEditarSprint} className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-6 text-center lg:text-left">Editar Sprint</h1>
                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Nombre</label>
                            <input
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}
                            type="text" 
                            className="w-full rounded px-3 py-2 mt-1 bg-blueBase border border-BlueBaseDark"
                            required
                            placeholder="Título del sprint"/>
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Meta del Sprint</label>
                            <textarea
                            value={meta_sprint}
                            onChange={(e) => setMetaSprint(e.target.value)} 
                            name="meta_sprint" 
                            placeholder="Escribe la meta del sprint"
                            className=" w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase">
                            </textarea>
                        </div>
                        <div className="mb-2 flex flex-col lg:flex-row justify-between items-left lg:items-center gap-4 pt-2">
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Fecha Inicio</label>
                            <input 
                            value={fechaInicio}
                            onChange={(e) => setFechaInicio(e.target.value)}
                            type="date" 
                            name="fecha_inicio"  
                            className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>

                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Fecha de finalización</label>
                            <input 
                            value={fechaFin}
                            onChange={(e) => setFechaFin(e.target.value)}
                            type="date" 
                            name="fecha_fin"  
                            className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                            className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                    hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                            <Save size={20}/>
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

export default Editar_Sprint