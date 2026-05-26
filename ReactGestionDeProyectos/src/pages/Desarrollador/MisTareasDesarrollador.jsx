//Código
import { TareaContext } from '../../Context/TareaContext';
import { useContext, useMemo } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { toast } from 'react-hot-toast'
import { updateTarea } from '../../services/desarolladorService';
//Componentes
import ColumnaTareas from '../../Components/Com_Desarrollador/ColumnaTareas';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';
import Loading from '../../Components/Loading';

function MisTareasDesarrollador() {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const {tareas, setTareas, loading} = useContext(TareaContext);

    const miTareas = tareas.filter(tarea => tarea.id_desarrollador === user.id)

    const tareasPorEstado = useMemo(() => {
        return {
            PorHacer: miTareas.filter(tarea => tarea.estado === 'Por Hacer'),
            EnCurso: miTareas.filter(tarea => tarea.estado === 'En Curso'),
            EnRevision: miTareas.filter(tarea => tarea.estado === 'En Revision'),
            Finalizado: miTareas.filter(tarea => tarea.estado === 'Finalizado'),
        }
    }, [miTareas])

    const onDragEnd = (result) => {
        console.log(result)
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
                error: 'Error al actualizar la tarea'
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
    };

    if (loading) return <Loading />

    return (
         <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 h-full pb-20 md:pb-0">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-8 flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-6 text-center md:text-left">Mis Tareas</h1>
                    
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="flex-1 pb-4">
                            <div className="flex flex-col md:grid md:grid-cols-4 gap-4 min-w-full">
                                <ColumnaTareas titulo='Por Hacer' estadoID='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                                <ColumnaTareas titulo='En Curso' estadoID='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                                <ColumnaTareas titulo='En Revisión' estadoID='En Revision' tipoEstado={tareasPorEstado.EnRevision}/>
                                <ColumnaTareas titulo='Finalizado' estadoID='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                            </div>
                        </div>
                    </DragDropContext>

                </main>
            </div>
        </div>  
    )
}

export default MisTareasDesarrollador;