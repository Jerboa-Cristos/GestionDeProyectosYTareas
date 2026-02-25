import { Search } from 'lucide-react';

import MenuTop from '../../Components/MenuTop';
import Menu_Izquierdo from '../Menus/Menu_Izquierdo';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { funcion_actualizar_tarea, funcion_eliminar_tarea, funcion_listado_tareas_product_owner } from '../../services/ruta_api_tarea';
import { MoreVertical } from 'lucide-react';

function Tablero_Kanban_Product_Owner() {
    
    const [tareas, setTareas] = useState([])
    const {id_sprint} = useParams()
    const [busqueda, setBusqueda] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        funcion_listado_tareas_product_owner(token)
        .then(respuesta => {
            console.log('Mostrandos listado de tareas', respuesta.data)

            const todasLasTareas = respuesta.data

            const sprintIds = [... new Set(todasLasTareas.map(tarea => tarea.id_sprint))]

            let sprintSeleccionado = id_sprint

            if(!sprintSeleccionado){
                sprintSeleccionado = sprintIds[sprintIds.length - 1]
            }

            console.log('Sprint usado en Kanban', sprintSeleccionado)

            const tareasDelSprint = todasLasTareas.filter(tarea => tarea.id_sprint == sprintSeleccionado)

            console.log('Tareas del sprint en Kanban', tareasDelSprint)

            console.log('IDS de sprint de todas las tareas', todasLasTareas.map(t => t.id_sprint))

            setTareas(tareasDelSprint)
        })
        .catch(error => {
            console.log('Error al cargar tareas', error)
        })
    }, [id_sprint])

    const tareasFiltradas = tareas.filter(tarea => 
        tarea.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase)
    )

    const porHacer = tareasFiltradas.filter(tarea => tarea.estado === 'Por Hacer')
    const enCurso = tareasFiltradas.filter(tarea => tarea.estado === 'En Curso')
    const enRevision = tareasFiltradas.filter(tarea => tarea.estado === 'En Revision')
    const finalizada = tareasFiltradas.filter(tarea => tarea.estado === 'Finalizado')

    //propTarea es una propiedad del Componente Tarea para identificar el id y asi asociar su nombre y descripcion
    const Tarea = ({propTarea}) => {
        const [abrirMenu, setAbriMenu] = useState(false)
        const navigate = useNavigate()
        const {id_sprint} = useParams()

        const botonEditarTarea = () => {
            navigate(`/editar_tarea/${id_sprint}/${propTarea.id}`)
        }

        const eliminarTarea = () => {
            const token = localStorage.getItem('token')
            console.log('Eliminar tarea: ', propTarea.id )

            if(!confirm('Seguro que quieres eliminar este sprint')) return 
            
            funcion_eliminar_tarea(id_sprint, propTarea.id, token)
            .then(respuesta => {
                console.log('Se ha eliminado la tarea', respuesta.data)
                setTareas(tareasActuales => tareasActuales.filter(tarea => tarea.id !== propTarea.id))
            })
            .catch(error => {
                console.log('No se ha podido eliminar la tarea', error)
            })

        }
    
        return (
            <>
            <div className='relative bg-BlueBaseDark rounded-l pb-4 m-5 shadow-md border border-gray-300 hover:shadow-lg transition cursor-pointer text-justify pl-2'>

            <button
            className='absolute top-2 right-2 p-1 hover:bg-white rounded'
            onClick={(e) => {
                e.stopPropagation()
                setAbriMenu(!abrirMenu)
            }}
            >
                <MoreVertical size={20} className='text-white'/>
            </button>

            {abrirMenu && (
                <div className='absolute top-10 right-2 bg-white text-blueDark shadow-lg rounded-md border w-36 z-20'>

                    <button className='w-full text-left px-4 py-2 hover:bg-GreenLite'
                    onClick={(e) => {
                        e.stopPropagation()
                        setAbriMenu(false)
                        botonEditarTarea()
                    }}
                    >
                        Editar tarea
                    </button>

                    <button 
                    className='w-full text-left px-4 py-2 hover:bg-red-400 text-BlueDarkDark'
                    onClick={(e) => {
                        e.stopPropagation()
                        setAbriMenu(false)
                        eliminarTarea()
                    }}
                    >
                        Eliminar tarea
                    </button>
                </div>

            )}

                <h2 className='font-semibold text-white text-lg'>{propTarea.nombre}</h2>
                <p className=' text-white mt-2 text-sm'> {propTarea.descripcion}</p>

                <div className='mt-3 flex justify-between items-center'>
                    <span className='text-xs font-bold px-2 py-1 bg-blueBase text-blueDark rounded'>

                        {propTarea.tipo}
                    </span>

                    <span className='text-xs text-BlueDarkDark'>
                        {propTarea.fecha_fin}
                    </span>
                </div>
            </div>
            </>
        )
    }

    const completarSprint = () => {
        const token = localStorage.getItem('token')

        tareas.forEach(tarea => {
            const datosActualizados = {
                nombre: tarea.nombre,
                tipo: tarea.tipo,
                estado: 'Finalizado',
                descripcion: tarea.descripcion,
                fecha_fin: tarea.fecha_fin,
                id_sprint: tarea.id_sprint,
                id_desarrollador: tarea.id_desarrollador
            }
            funcion_actualizar_tarea(id_sprint, tarea.id, datosActualizados, token)
            .then(respuesta => {
                console.log('Tarea actualizada', tarea.id)
            })
            .catch(error => console.log('Error actualizando la tarea', tarea.id, error))
        })


        const tareasActualizadasFrontend = tareas.map(tarea => {
            return {
                id: tarea.id,
                nombre: tarea.nombre,
                tipo: tarea.tipo,
                estado: 'Finalizado',
                descripcion: tarea.descripcion,
                fecha_fin: tarea.fecha_fin,
                id_sprint: tarea.id_sprint,
                id_desarrollador: tarea.id_desarrollador
            }
        })

        setTareas(tareasActualizadasFrontend)

        console.log('Sprint completado', id_sprint)
    }

    

    
    return(
        <>
    
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">

                <Menu_Izquierdo />

                <main className="mt-6 flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Tablero Kanban</h1>

                    <div className="flex justify-between items-center mt-4 mb-4">
                    <h2 className="text-xl font-bold text-BlueDarkDark">SPRINTS</h2>

                    <button 
                    className='text-BlueDarkDark font-bold shadow bg-blueBase hover:bg-GreenLite transition  rounded px-4 py-2'
                    onClick={completarSprint}
                    >
                        Completar Sprint
                    </button>
                    </div>
                    
                    {/* Barra de búsqueda */}
                    <div className="mb-8">
                        <div className="relative w-64 max-w-xs">
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="w-full bg-blueblue text-blueDark pl-10 pr-4 py-2 
                                rounded-lg
                                placeholder-white"
                            />
                            <Search className="absolute left-3 top-2.5 text-white" size={20} />
                        </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div className='border border-BlueDarkDark rounded-2xl p-4 '>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>POR HACER</h1>
                            <div className=''>
                                {porHacer.map(tarea => 
                                    
                                    <Tarea key={tarea.id} propTarea={tarea} />
                                )}
                            </div>
                        </div>

                        <div className='border border-BlueDarkDark rounded-2xl p-4'>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>EN CURSO</h1>
                            <div>
                                {enCurso.map(tarea => 
                                    <Tarea key={tarea.id} propTarea={tarea}/>
                                )}
                            </div>
                        </div>

                        <div className='border border-BlueDarkDark rounded-2xl p-4'>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>EN REVISIÓN</h1>
                            <div>
                                {enRevision.map(tarea => 
                                <Tarea key={tarea.id} propTarea={{tarea}}/>

                                )}
                            </div>
                        </div>

                        <div className='border border-BlueDarkDark rounded-2xl p-4'>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>FINALIZADA</h1>
                            <div>
                                {finalizada.map(tarea => 
                                    <Tarea key={tarea.id} propTarea={tarea}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 mb-4">

                    <Link to={`/crear_tarea/${id_sprint}`}
                    className="bg-blueBase hover:bg-GreenLite transition rounded px-4 py-2 text-BlueDarkDark font-bold shadow"
                    >
                    <p>+ Nueva Tarea</p>
                    
                    </Link>
                    </div>
            
                </main>
            </div>
        </div>  
        </>
    )
}
export default Tablero_Kanban_Product_Owner