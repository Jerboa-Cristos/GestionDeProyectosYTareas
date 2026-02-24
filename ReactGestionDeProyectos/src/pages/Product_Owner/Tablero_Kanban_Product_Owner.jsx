import { Search } from 'lucide-react';

import KanbanPanel from '../../Components/Com_Desarrollador/KanbanPanel';
import MenuTop from '../../Components/MenuTop';
import Menu_Izquierdo from '../Menus/Menu_Izquierdo';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { funcion_listado_tareas_product_owner } from '../../services/ruta_api_tarea';

function Tablero_Kanban_Product_Owner() {
    


    //LO QUE VOY A AÑADIR DE AQUI
    const [tareas, setTareas] = useState([])
    const {id_sprint} = useParams()
    const [estado, setEstado] = useState('')

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

    const porHacer = tareas.filter(tarea => tarea.estado === 'Por Hacer')
    const enCurso = tareas.filter(tarea => tarea.estado === 'En Curso')
    const enRevision = tareas.filter(tarea => tarea.estado === 'En Revision')
    const finalizada = tareas.filter(tarea => tarea.estado === 'Finalizada')

    //propTarea es una propiedad del Componente Tarea para ?
    const Tarea = ({propTarea}) => {
        return (
            <div className='bg-BlueBaseDark rounded-l pb-4 m-5 shadow-md border border-gray-300 hover:shadow-lg transition cursor-pointer text-justify pl-2'>
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
        )
    }


    //HASTA AQUI
    
    

    return(
        <>
    
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">

                <Menu_Izquierdo />

                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Tablero Kanban</h1>

                    <div className="flex justify-between items-center mt-4 mb-4">
                    <h2 className="text-xl font-bold text-BlueDarkDark">SPRINTS</h2>

                    <Link
                    to={`/crear_tarea/${id_sprint}`}
                    className="bg-blueBase hover:bg-blue-300 transition rounded px-4 py-2 text-BlueDarkDark font-bold shadow"
                    >
                    <p>+ Nuevo Tarea</p>
                    
                    </Link>
                    </div>
                    
                    {/* Barra de búsqueda */}
                    <div className="mb-8">
                        <div className="relative w-64 max-w-xs">
                            <input 
                                type="text"
                                placeholder="Buscar..."
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
                    className="bg-blueBase hover:bg-blue-300 transition rounded px-4 py-2 text-BlueDarkDark font-bold shadow"
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