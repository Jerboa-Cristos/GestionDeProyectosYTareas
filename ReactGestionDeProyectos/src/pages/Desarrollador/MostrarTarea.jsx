import { useState, useEffect, useContext } from "react"
import MenuTop from "../../Components/MenuTop"
import { Save } from "lucide-react"
import { showMiTarea, updateTarea } from '../../services/desarolladorService'
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';
import SeccionComentario from "../../Components/Com_Comentario/SeccionComentario";
import { useParams } from "react-router-dom"
import { toast } from 'react-hot-toast'

function MostrarTarea (){
    const token = localStorage.getItem('token');
    const [tarea, setTarea] = useState({})
    const [estado, setEstado] = useState('')
    const {id} = useParams()
    const idTarea = Number(id);

    useEffect(() => {
        const fetchTarea = async () => {
            if (!token) return;
            showMiTarea(id, token).then(res => {
                setTarea(res.data);
                setEstado(res.data.estado);
                toast.success('Tarea cargada correctamente');
                console.log(res.data);
            }).catch(err => {
                console.error('No se pudo cargar la información: ' + err)
                toast.error('Error al cargar la tarea');
            })
        }
        fetchTarea();
    }, [id, token])


    const botonEditarTarea = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token) return;

        toast.promise(updateTarea(id, {estado: estado}, token),
            {
                pending: 'Actualizando tarea...',
                success: 'Tarea actualizada correctamente',
                error: 'Error al actualizar la tarea'
            }).then(res => {
                console.log('Tarea actualizada')
            }).catch(err=>{
                console.error('Error al hacer Update del estado de tarea: ', err)
            })
    }

    return(
    <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/desarrollador_profile'/>  
        <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
                <MenuLateralDesarrollador/>
            <main className="bg-blueDashboard flex-1 rounded-xl shadow-lg flex flex-col overflow-hidden">
                <div className="p-4 lg:p-8">
                    <form onSubmit={botonEditarTarea} className="max-w-4xl mx-auto">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-6 text-center lg:text-left">Detalles Tarea</h1>
                        <div className="grid grid-cols-1 lg:gap-4">
                            <div>
                            <p className="text-xs lg:text-sm font-bold text-white/80 uppercase ml-1"><strong>Sprint: {tarea.sprint?.nombre}</strong></p>
                            <p className="text-xs lg:text-sm font-bold text-white/80 uppercase ml-1" title={tarea.desarrollador?.email}>
                                Asignado a: {tarea.desarrollador?.nombre}
                            </p>
                            </div>
                            <div className="mb-2">
                                <p className="text-xs lg:text-sm font-bold text-white/80 uppercase ml-1">Nombre</p>
                                <h2 className="w-full rounded-lg px-4 py-3 mt-1 bg-blueBase text-blueDark font-bold shadow-inner">{tarea.nombre}</h2>
                            </div>
                            <div className="mb-2">
                                <p className="text-xs lg:text-sm font-bold text-white/80 uppercase ml-1">Descripción</p>
                                <h2 className="w-full rounded-lg px-4 py-3 mt-1 bg-blueBase text-blueDark font-bold shadow-inner">{tarea.descripcion}</h2>
                            </div>
                            <div className="mb-2 flex flex-col lg:flex-row justify-between items-end lg:items-center gap-2 pt-2">
                                <div className="w-full lg:w-auto">
                                    <p className="text-xs lg:text-sm font-bold text-white/80 uppercase ml-1">Estado</p>
                                    <select
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    className="rounded-lg bg-blueBase px-4 py-2.5 w-full lg:w-64 text-blueDark font-bold 
                                    focus:ring-2 focus:ring-white outline-none cursor-pointer">
                                        <option value="Por Hacer">Por Hacer</option>
                                        <option value="En Curso">En Curso</option>
                                        <option value="En Revision">En Revisión</option>
                                        <option value="Finalizado">Finalizado</option>
                                    </select>
                                </div>
                                <button type="submit"
                                    className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                    hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                                    <Save size={20} />
                                    Guardar cambios
                                </button>
                            </div>
                        </div>
                    </form>  
                </div>
                <div className="px-4 lg:px-8 m-4 lg:m-4 overflow-y-auto">
                    <SeccionComentario idTarea={idTarea}/>
                </div>
            </main>
        </div> 
    </div>
    )
}


export default MostrarTarea