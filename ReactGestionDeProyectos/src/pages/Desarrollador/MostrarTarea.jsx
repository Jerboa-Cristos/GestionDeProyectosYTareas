import { useState, useEffect, useContext } from "react"
import MenuTop from "../../Components/MenuTop"
import { Save } from "lucide-react"
import { showMiTarea, updateTarea } from '../../services/desarolladorService'
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';
import SeccionComentario from "../../Components/Com_Comentario/SeccionComentario";
import { useParams } from "react-router-dom"

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
                console.log(res.data);
            }).catch(err => {
                console.error('No se pudo cargar la información: ' + err)
            })
        }
        fetchTarea();
    }, [id, token])


    const botonEditarTarea = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        if (!token) return;
        updateTarea(id, {estado: estado}, token).then(res => {
            console.log('Tarea actualizado')
            alert('Tarea actualizada con exito.');
        }).catch(err=>{
            console.error('Error al hacer Update del estado de tarea: ', err)
        })
    }

    return(
    <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/desarrollador_profile'/>  
        <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 md:pb-0">
                <MenuLateralDesarrollador/>
            <main className="flex-1 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
                <div className="bg-blueDashboard p-4 md:p-8 shrink-0 rounded-b-lg">
                    <form onSubmit={botonEditarTarea} className="max-w-4xl mx-auto">
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-6 text-center md:text-left">Detalles Tarea</h1>
                        <div className="grid grid-cols-1 md:gap-4">
                            <div className="mb-4">
                                <label className="text-xs md:text-sm font-bold text-white/80 uppercase ml-1">Nombre</label>
                                <h2 className="w-full rounded-lg px-4 py-3 mt-1 bg-blueBase text-blueDark font-bold shadow-inner">{tarea.nombre}</h2>
                            </div>
                            <div className="mb-4">
                                <label className="text-xs md:text-sm font-bold text-white/80 uppercase ml-1">Descripción</label>
                                <h2 className="w-full rounded-lg px-4 py-3 mt-1 bg-blueBase text-blueDark font-bold shadow-inner">{tarea.descripcion}</h2>
                            </div>
                                <div className="mb-4 flex flex-col md:flex-row justify-between items-end md:items-center gap-2 pt-4">
                                    <div className="w-full md:w-auto">
                                        <label className="text-xs md:text-sm font-bold text-white/80 uppercase ml-1">Estado</label>
                                        <select
                                        value={estado}
                                        onChange={(e) => setEstado(e.target.value)}
                                        className="rounded-lg bg-blueBase px-4 py-2.5 w-full md:w-64 text-blueDark font-bold 
                                        focus:ring-2 focus:ring-white outline-none cursor-pointer">
                                            <option value="Por Hacer">Por Hacer</option>
                                            <option value="En Curso">En Curso</option>
                                            <option value="En Revision">En Revisión</option>
                                            <option value="Finalizado">Finalizado</option>
                                        </select>
                                    </div>
                            
                                <button type="submit"
                                    className="w-full md:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                    hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                                    <Save size={20} />
                                    Guardar cambios
                                </button>
                            </div>
                    </div>
                </form>  
                </div>
                <div className="flex-1 mt-2 overflow-y-auto md:mt-4">
                    <SeccionComentario idTarea={idTarea}/>
                </div>
            </main>
        </div> 
    </div>
    )
}


export default MostrarTarea