import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Save } from "lucide-react"
import MenuTop from "../../Layout/Menu/MenuTop"
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner"
import Loading from '../../Layout/Loading';
import { actualizarTarea, mostrarTarea , indexDesarrolladores } from "../../services/tareaService"
import SeccionComentario from "../../Layout/Com_Comentario/SeccionComentario"

function Editar_Tarea (){
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [tipo, setTipo] = useState('')
    const [estado, setEstado] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [idDesarrollador, setIdDesarrollador] = useState('')
    const [desarrolladores, setDesarrolladores] = useState([])

    const {id_sprint, id_tarea } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
         if (!token) return;
        
        const fetchData = async () => {
        setLoading(true);
        mostrarTarea(id_sprint, id_tarea, token)
        .then(respuesta => {
            const tarea = respuesta.data
            setNombre(tarea.nombre)
            setDescripcion(tarea.descripcion)
            setTipo(tarea.tipo)
            setEstado(tarea.estado)
            setIdDesarrollador(tarea.desarrollador)

        }).catch(error => console.log('Error al cargar la tarea', error))


        indexDesarrolladores(token)
            .then(respuesta => {
                setDesarrolladores(respuesta.data)
                console.log('Cargando desarrolador', respuesta.data)
            }).catch(error => {
                console.log('Error al mostrar desarrolladores', error.respuesta.data)
            })        .finally(() => {
            setLoading(false);
        })}
        fetchData()
    }, [id_sprint, id_tarea])


    const botonEditarTarea = (e) => {
        e.preventDefault()
        const data = {
            nombre, descripcion, tipo, estado, id_desarrollador: idDesarrollador
        }
        actualizarTarea(id_sprint, id_tarea, data, token)
        .then(respuesta => {
            console.log('se ha actualizado la tarea', respuesta.data)
            navigate(`/tablero_kanban_product_owner/${id_sprint}`)
        })
        .catch(error => {
            console.log('Error al editar tarea', error)
        })
    }

    if (loading) return <Loading />

    return(
        <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>  
            <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
            <MenuProductOwner/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <div className="flex-1 bg-blueDashboard rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <form onSubmit={botonEditarTarea} className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-4 text-center lg:text-left">Editar Tarea</h1>
                        
                        <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Nombre</label>
                        <input
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type="text" 
                        className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"
                        required
                        placeholder="Escribe el nombre de la tarea aquí" 
                        />

                        <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Descripción</label>
                        <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} 
                        name="descripcion" 
                        placeholder="Escribe la descripcion"
                        className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">                        
                        </textarea>

                    <div className="grid grid-cols-2 gap-2">
                        <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Tipo</label>
                        <select  
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                            <option value="Backend">Backend</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Diseño">Diseño</option>
                            <option value="Despliegue">Despliegue</option>
                            <option value="Testing">Testing</option>
                        </select>

                        <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Estado</label>
                        <select  
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                            <option value="Por Hacer">Por Hacer</option>
                            <option value="En Curso">En Curso</option>
                            <option value="En Revision">En Revisión</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>

                        <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Asignar a un desarrollador</label>
                        <select
                        value={idDesarrollador}
                        onChange={(e) => setIdDesarrollador(e.target.value)}
                        required
                        className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                            <option value={idDesarrollador}>{idDesarrollador.nombre}</option>
                            {desarrolladores.map(desarrollador => (
                                <option key={desarrollador.id} value={desarrollador.id}>
                                    {desarrollador.nombre}
                                </option>
                            ))}
                        </select>

                        <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Fecha limite</label>
                        <input 
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        type="date" 
                        name="fecha_fin"  
                        className="rounded-md w-full mt-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
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
                <div className="px-4 lg:px-8 m-4 lg:m-4 overflow-y-auto">
                    <SeccionComentario idTarea={id_tarea}/>
                </div>  
                </div> 
            </main>
        </div>
    </div>
    )
}


export default Editar_Tarea