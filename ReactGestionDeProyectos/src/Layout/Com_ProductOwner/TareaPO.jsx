import { MoreVertical } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { eliminarTarea } from '../../services/tareaService';

 //propTarea es una propiedad del Componente Tarea para identificar el id y asi asociar su nombre y descripcion
const TareaPO = ({propTarea}) => {
        const [abrirMenu, setAbriMenu] = useState(false)
        const navigate = useNavigate()
        const {id_sprint} = useParams()

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
    
        return (
            <div className="w-full bg-blueBase hover:bg-BlueBaseDark rounded-xl 
          p-4 text-left group shadow-sm border-transparent hover:border-blueDashboard">
                <div className="flex flex-row justify-between">
                    <h2 className="text-blueDark font-bold text-base md:text-lg text-center mb-2 
                group-hover:text-blueDashboard transition-colors">{propTarea.nombre}</h2>

                    <button
                    className="p-1 text-blueDark hover:bg-turquesa hover:text-white transition-all rounded"
                    onClick={(e) => {
                        e.stopPropagation()
                        setAbriMenu(!abrirMenu)
                    }}>
                        <MoreVertical size={20}/>
                    </button>

                    {abrirMenu && (
                    <div className="rounded text-left z-10 absolute right-0 mt-2 w-36 bg-white border border-BlueDarkDark">

                        <button className='rounded w-full text-left px-4 py-2 hover:bg-GreenLite'
                        onClick={(e) => {
                            e.stopPropagation()
                            setAbriMenu(false)
                            botonEditarTarea()
                        }}>
                            Editar tarea
                        </button>

                        <button 
                        className='rounded w-full text-left px-4 py-2 hover:bg-red-400 text-BlueDarkDark'
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

                <p className="text-BlueDarkDark text-[11px] md:text-xs leading-relaxed mb-4 line-clamp-3"> {propTarea.descripcion}</p>
                <div className="flex justify-between items-center pt-2">
                    <span className='text-xs font-bold px-2 py-1 bg-blueBase text-blueDark rounded'>
                        {propTarea.tipo}
                    </span>
                    <span className='text-xs text-BlueDarkDark'>
                        {propTarea.fecha_fin}
                    </span>
                </div>
            </div>
        )
    }

    export default TareaPO