import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link} from "react-router-dom";
import { funcion_eliminar_sprint } from '../../services/ruta_api_sprint'

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

    export default MenuSprint