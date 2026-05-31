//Código
import { Search } from 'lucide-react';
import { useContext, useMemo, useState, useEffect } from 'react';
import { TareaContext } from '../../Context/TareaContext';
import { DragDropContext } from '@hello-pangea/dnd'; 
import { updateTarea } from '../../services/desarolladorService';
import { toast } from 'react-hot-toast'
//Componentes
import KanbanColumn from '../../Components/Com_Desarrollador/KanbanColumn';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';
import Loading from '../../Components/Loading';

function TableroKanbanDesarrollador() {
    const {tareas, setTareas, loading} = useContext(TareaContext)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedSprint, setSelectedSprint] = useState('')
    const token = localStorage.getItem('token')

    //Variables para Sprints
    //Filtramos por sprints y eliminamos nulls (aunque es imposible)
    const sprints = tareas.map(t => t.sprint).filter(s => s !== null)
    //Con Map filtramos sprints unicos.
    const sprintsUnicos = [...new Map(sprints.map(s => [s.id, s])).values()]
    //Sacamos las tareas del sprint elegido
    const tareasDeSprint = tareas.filter(t => t.sprint?.id === selectedSprint)
    //Seleccionamos el sprint más reciente, con la fecha de inicio más cercana a la actualidad.
    //Primero hacemos protección para el caso de que sprintsUnicos está vacio
    //Reduce comprueba cada sprint, dejando el que tiene fecha_inicio más grande o reciente.
    const ultSprint = sprintsUnicos.length > 0 ? sprintsUnicos.reduce((ultimo, actual) => {
    return new Date(actual.fecha_inicio) > new Date(ultimo.fecha_inicio)
        ? actual
        : ultimo;
    }): null;
    //Si no hay Sprint seleccionado, seleccionamos el último sprint default
    useEffect(() => {
    if (ultSprint && !selectedSprint) {
        setSelectedSprint(ultSprint.id);
    }}, [ultSprint]);

    //Filtrar tarea según el nombre (porque no vemos nada más)
    const filteredTareas = tareasDeSprint.filter((tarea) => {
        const fullName = tarea.nombre.toLowerCase().includes(searchTerm.toLowerCase());
        return fullName;
    })

    //Filtrado por estado de Sprint
    const tareasPorEstado = useMemo(() => {
    return {
        PorHacer: filteredTareas.filter(tarea => tarea.estado === 'Por Hacer'),
        EnCurso: filteredTareas.filter(tarea => tarea.estado === 'En Curso'),
        EnRevision: filteredTareas.filter(tarea => tarea.estado === 'En Revision'),
        Finalizado: filteredTareas.filter(tarea => tarea.estado === 'Finalizado'),
    }
    }, [filteredTareas])

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
    
            //Aquí se debería llamar a la función para actualizar el estado de la tarea en el backend
            toast.promise(updateTarea(tareaId, {estado: NewEstado}, token),
                {
                    pending: 'Actualizando tarea...',
                    success: 'Tarea actualizada correctamente',
                    error: 'Error al actualizar la tarea. O la tarea está asignada a otra persona.'
                }).then(res => {
                    console.log('Tarea actualizada')
                }).catch(err=>{
                    console.error('Error al hacer Update del estado de tarea: ', err)
                    //Si la petición falla, revertimos el cambio visual
                    setTareas(prev =>
                    prev.map(tarea =>
                        tarea.id === tareaId
                            ? { ...tarea, estado: source.droppableId }
                            : tarea));
                })
    }

    //Muestra pantalla de Loading cuando se están cargando las tareas.
    if (loading) return <Loading />

    return(
         <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 h-full pb-20 lg:pb-0">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-6 text-center md:text-left">Tablero Kanban</h1>
                    <h2 className="text-xl md:text-2xl font-bold text-blueDark text-center md:text-left"><strong>Proyecto:</strong> {tareasDeSprint[0]?.sprint?.proyecto?.nombre} - <strong>Sprint:</strong> {tareasDeSprint[0]?.sprint?.nombre}</h2>
                    {/* Barra de búsqueda y filtro por sprint */}
                    <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
                        <div className="relative flex-1 max-w-md" onClick={(e)=>e.stopPropagation()}>
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e)=>setSearchTerm(e.target.value)}
                                className="w-full bg-blueBase text-blueDark pl-10 pr-4 h-12 rounded-xl focus:ring-2
                                 focus:ring-turquesa outline-none transition-all placeholder-blueDark/60"
                            />
                            <Search className="absolute left-3 top-3.5 text-blueDark" size={20} />
                        </div>
                        <div className="relative flex-1 max-w-md" onClick={(e)=>e.stopPropagation()}>
                            <select 
                            value={selectedSprint}
                            name='sprint'
                            onChange={(e) => setSelectedSprint(Number(e.target.value))}
                            className="w-full bg-blueBase text-blueDark pl-2 pr-4 h-12 rounded-xl focus:ring-2
                                 focus:ring-turquesa outline-none transition-all">
                                {sprintsUnicos.map((sprint) => (
                                    <option key={sprint.id} value={sprint.id}>{sprint.nombre}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex-1 pb-4">
                                <div className="flex flex-col md:grid md:grid-cols-4 gap-4 min-w-full">
                                <KanbanColumn titulo='Por Hacer' estadoID='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                                <KanbanColumn titulo='En Curso' estadoID='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                                <KanbanColumn titulo='En Revisión' estadoID='En Revision' tipoEstado={tareasPorEstado.EnRevision}/>
                                <KanbanColumn titulo='Finalizado' estadoID='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                            </div>
                        </div>
                    </DragDropContext>
                </main>
            </div>
        </div>  
    )
}

export default TableroKanbanDesarrollador