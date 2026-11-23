import { Search } from 'lucide-react';
import MenuTop from '../../Layout/Menu/MenuTop';
import MenuProductOwner from '../../Layout/Com_ProductOwner/MenuProductOwner';
import TareaPO from '../../Layout/Com_ProductOwner/TareaPO';
import Loading from '../../Layout/Loading';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { actualizarTarea, listadoTareasProductOwner } from '../../services/tareaService';

function Tablero_Kanban_Product_Owner() {
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token')
    const [tareas, setTareas] = useState([])
    const {id_sprint} = useParams()
    const [busqueda, setBusqueda] = useState('')
    const [nombreProyecto, setNombreProyecto] = useState('')
    const [nombreSprint, setNombreSprint] = useState('')
    useEffect(() => {
        if (!token) return;
        
        const fetchTareas = async () => {
        setLoading(true);
        listadoTareasProductOwner(token)
        .then(respuesta => {
            const todasLasTareas = respuesta.data
            const sprintIds = [... new Set(todasLasTareas.map(tarea => tarea.id_sprint))]
            let sprintSeleccionado = id_sprint
            if(!sprintSeleccionado){
                sprintSeleccionado = sprintIds[sprintIds.length - 1]
            }
            const tareasDelSprint = todasLasTareas.filter(tarea => tarea.id_sprint == sprintSeleccionado)
            if(tareasDelSprint.length > 0){
                setNombreProyecto(tareasDelSprint[0].sprint.proyecto.nombre)
                setNombreSprint(tareasDelSprint[0].sprint.nombre)
            }
            setTareas(tareasDelSprint)
        }).catch(error => {
            console.log('Error al cargar tareas', error)
        }).finally(() => {
            setLoading(false);
        })}
        fetchTareas()
    }, [id_sprint])

    const tareasFiltradas = tareas.filter(tarea => 
        tarea.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase)
    )

    const porHacer = tareasFiltradas.filter(tarea => tarea.estado === 'Por Hacer')
    const enCurso = tareasFiltradas.filter(tarea => tarea.estado === 'En Curso')
    const enRevision = tareasFiltradas.filter(tarea => tarea.estado === 'En Revision')
    const finalizada = tareasFiltradas.filter(tarea => tarea.estado === 'Finalizado')

    const completarSprint = () => {
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
            actualizarTarea(id_sprint, tarea.id, datosActualizados, token)
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
    }

    if (loading) return <Loading />

    return(    
         <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/product_owner_profile'/>
            <div className="flex flex-1 gap-4 h-full pb-20 lg:pb-0">
                <MenuProductOwner/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 flex flex-col gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-4 text-center md:text-left">Tablero Kanban</h1>
                    <div className='mb-4'>
                        <h2 className="text-xl md:text-2xl font-bold text-blueDark text-center md:text-left">Nombre del proyecto: {nombreProyecto}</h2>
                        <h3 className="text-xl md:text-2xl font-bold text-blueDark text-center md:text-left">Nombre del Sprint: {nombreSprint}</h3>
                    </div>

                        {/* Barra de búsqueda */}
                        <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
                            <div className="relative w-full lg:w-auto max-w-xs">
                                <input 
                                    type="text"
                                    placeholder="Buscar tarea..."
                                    value={busqueda}
                                    onChange={(e) => setBusqueda(e.target.value)}
                                    className="w-full bg-blueblue text-blueDark pl-10 pr-4 py-2 
                                    rounded-lg
                                    placeholder-white"
                                />
                                <Search className="absolute left-3 top-2.5 text-white" size={20} />
                            </div>
                            
                            <button 
                            className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                        hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            onClick={completarSprint}>
                            Completar Sprint
                            </button>
                        </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                        <div className='border border-BlueDarkDark rounded-2xl p-4 '>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>POR HACER</h1>
                            <div className=''>
                                {porHacer.map(tarea => 
                                    <TareaPO key={tarea.id} propTarea={tarea} />
                                )}
                            </div>
                        </div>

                        <div className='border border-BlueDarkDark rounded-2xl p-4'>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>EN CURSO</h1>
                            <div>
                                {enCurso.map(tarea => 
                                    <TareaPO key={tarea.id} propTarea={tarea}/>
                                )}
                            </div>
                        </div>

                        <div className='border border-BlueDarkDark rounded-2xl p-4'>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>EN REVISIÓN</h1>
                            <div>
                                {enRevision.map(tarea => 
                                <TareaPO key={tarea.id} propTarea={{tarea}}/>

                                )}
                            </div>
                        </div>

                        <div className='border border-BlueDarkDark rounded-2xl p-4'>
                            <h1 className='text-center font-bold text-white mb-4 bg-blueDashboard py-2 rounded'>FINALIZADA</h1>
                            <div>
                                {finalizada.map(tarea => 
                                    <TareaPO key={tarea.id} propTarea={tarea}/>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center mt-4 mb-4">
                        <Link to={`/crear_tarea/${id_sprint}`}
                        className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">
                        <p>Crear Tarea</p>
                        </Link>
                    </div>
            
                </main>
            </div>
        </div>  
    )
}
export default Tablero_Kanban_Product_Owner