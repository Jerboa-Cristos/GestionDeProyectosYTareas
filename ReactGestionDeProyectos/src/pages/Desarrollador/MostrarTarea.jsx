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
    <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/desarrollador_profile'/>  
        <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
            <main className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col gap-2">
                <div className="bg-blueDashboard rounded-lg p-4 h-auto">
                    <form onSubmit={botonEditarTarea}>
                        <h1 className="text-3xl font-bold text-white mb-6">Detalles Tarea</h1>
                        
                        <label className="font-semibold text-white mt-4 block">Nombre</label>
                        <h2 className="w-full rounded-lg px-3 py-2 mt-1 bg-blueBase text-blueDark font-medium">{tarea.nombre}</h2>

                        <label className="font-semibold text-white mt-4 block">Descripción</label>
                        <h2 className=" w-full rounded-lg px-3 py-2 mt-1 h-24 bg-blueBase text-blueDark font-medium">{tarea.descripcion}</h2>

                        <div className="mt-auto flex flex-row justify-between items-center w-full">
                            <div>
                                <label className="font-semibold text-white mt-4 block">Estado</label>
                                <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                                className="rounded-lg bg-blueBase px-3 py-2 w-60 mt-1 text-BlueDarkDark font-medium">
                                    <option value="Por Hacer">Por Hacer</option>
                                    <option value="En Curso">En Curso</option>
                                    <option value="En Revision">En Revisión</option>
                                    <option value="Finalizado">Finalizado</option>
                                </select>
                            </div>
                        
                            <button type="submit"
                                className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2">
                                <Save size={23} />
                                Guardar cambios
                            </button>
                        </div>
                    </form>  
                </div>
                <div className="flex-1 overflow-hidden">
                    <SeccionComentario idTarea={idTarea}/>
                </div>
            </main>
        </div> 
    </div>
    )
}


export default MostrarTarea