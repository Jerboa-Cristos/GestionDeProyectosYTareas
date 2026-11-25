import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { eliminarTarea } from '../../services/tareaService';

function MenuThreeDot({propTarea}) {
    const [abrirMenu, setAbriMenu] = useState(false)
    const navigate = useNavigate()
    const {id_sprint} = useParams()

    const abrirCerrarMenu = () => setAbriMenu(!abrirMenu)

    const botonEditarTarea = () => {
        navigate(`/editar_tarea/${id_sprint}/${propTarea.id}`)
    }

    const eliminar = () => {
        const token = localStorage.getItem('token')
        console.log('Eliminar tarea: ', propTarea.id )

        if(!confirm('Seguro que quieres eliminar este sprint')) return 
        
        eliminarTarea(id_sprint, propTarea.id, token)
        .then(respuesta => {
            console.log('Se ha eliminado la tarea', respuesta.data)
            setTareas(tareasActuales => tareasActuales.filter(tarea => tarea.id !== propTarea.id))
        })
        .catch(error => {
            console.log('No se ha podido eliminar la tarea', error)
        })}
    
    return(
        <div>
            <button
                className="p-1 hover:bg-turquesa hover:text-white transition-all rounded"
                onClick={abrirCerrarMenu}>
                    <MoreVertical size={20} className="text-white"/>
                </button>

                {abrirMenu && (
                <div className="rounded text-left z-10 absolute right-0 mt-2 w-36 bg-white border border-BlueDarkDark">

                    <button className="rounded block w-full text-left px-4 py-2 hover:bg-GreenLite"
                    onClick={(e) => {
                        e.stopPropagation()
                        setAbriMenu(false)
                        botonEditarTarea()
                    }}>
                        Editar tarea
                    </button>

                    <button 
                    className="rounded w-full text-left px-4 py-2 hover:bg-red-400 text-BlueDarkDark"
                    onClick={(e) => {
                        e.stopPropagation()
                        setAbriMenu(false)
                        eliminar()
                    }}>
                        Eliminar tarea
                    </button>
                </div>
                )}
        </div>
    )
}

export default MenuThreeDot