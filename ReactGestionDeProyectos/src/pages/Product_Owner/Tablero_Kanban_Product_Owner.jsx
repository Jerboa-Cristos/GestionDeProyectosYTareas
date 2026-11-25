import { Search } from 'lucide-react';
import MenuTop from '../../Layout/Menu/MenuTop';
import MenuProductOwner from '../../Layout/Com_ProductOwner/MenuProductOwner';
import Loading from '../../Layout/Loading';
import KanbanColumnPO from '../../Layout/Com_ProductOwner/KanbanColumnPO';
import { DragDropContext } from '@hello-pangea/dnd'; 
import { toast } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
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
            toast.success('Tareas cargadas correctamente')
        }).catch(error => {
            console.log('Error al cargar tareas', error)
            toast.error('Error al cargar tareas')
        }).finally(() => {
            setLoading(false);
        })}
        fetchTareas()
    }, [id_sprint])

    const tareasFiltradas = tareas.filter(tarea => 
        tarea.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        tarea.descripcion.toLowerCase().includes(busqueda.toLowerCase)
    )
    const tareasPorEstado = useMemo(() => {
        return {
        PorHacer: tareasFiltradas.filter(tarea => tarea.estado === 'Por Hacer'),
        EnCurso: tareasFiltradas.filter(tarea => tarea.estado === 'En Curso'),
        EnRevision: tareasFiltradas.filter(tarea => tarea.estado === 'En Revision'),
        Finalizado: tareasFiltradas.filter(tarea => tarea.estado === 'Finalizado')
        }
    }, [tareasFiltradas])

    //Funcionamiento del Drag and Drop
    const onDragEnd = (result) => {
        if (!token) return;
        //Al arrastrar una tarjeta, nos devuelve un resultado. Del resultado extraemos de donde viene, a donde va y el ID de lo que va.
        const { source, destination, draggableId } = result;
        if (!destination) return; // Si no hay destino, lo devolvemos al origen
        if (source.droppableId === destination.droppableId && source.index === destination.index) return; //Si lo agarramos, pero no lo movemos, se queda igual
        // Variables
        const NewEstado = destination.droppableId; //El estado nuevo
        const tareaId = parseInt(draggableId); //ID de la tarea que acabamos de mover

        //Optimistic UI, actualizamos visualmente el estado, mientras se hace la petición al back.
        setTareas(prev =>
        prev.map(tarea =>
            tarea.id === tareaId
                ? { ...tarea, estado: NewEstado }
                : tarea));


        const dataTarea = tareas.find((tarea) => tarea.id === tareaId);
        const datosActualizados = {
            nombre: dataTarea.nombre,
            tipo: dataTarea.tipo,
            estado: NewEstado,
            descripcion: dataTarea.descripcion,
            fecha_fin: dataTarea.fecha_fin,
            id_sprint: dataTarea.id_sprint,
            id_desarrollador: dataTarea.id_desarrollador
        }
        
        toast.promise(actualizarTarea(dataTarea.id_sprint, dataTarea.id, datosActualizados, token),{
            loading: 'Editando tarea...',
            success: 'Tarea editada con éxito.',
            error: 'No se pudo editar la tarea.'
         }).then(() => {
            navigate(`/tablero_kanban_product_owner/${id_sprint}`)
        })
        .catch(error => {
            console.log('Error al editar tarea', error)
        })
    }

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
            .then(() => {
                toast.success('Tarea actualizada correctamente')
            })
            .catch(error => {
                console.log('Error actualizando la tarea', tarea.id, error)
                toast.error('Error al actualizar la tarea')
            })}
        )

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
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-4 text-center md:text-left">Tablero Kanban</h1>
                    <h2 className="text-xl md:text-2xl font-bold text-blueDark text-center md:text-left">Nombre del proyecto: {nombreProyecto}</h2>
                    <h3 className="text-xl md:text-2xl font-bold text-blueDark text-center md:text-left">Nombre del Sprint: {nombreSprint}</h3>

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
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div>
                            <div className="flex flex-col md:grid md:grid-cols-4 gap-4 min-w-full">
                                <KanbanColumnPO titulo='Por Hacer' estadoID='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                                <KanbanColumnPO titulo='En Curso' estadoID='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                                <KanbanColumnPO titulo='En Revisión' estadoID='En Revision' tipoEstado={tareasPorEstado.EnRevision}/>
                                <KanbanColumnPO titulo='Finalizado' estadoID='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                            </div>
                        </div>
                    </DragDropContext>     

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