//Código
import { Search } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import { TareaContext } from '../../Context/TareaContext';
//Componentes
import KanbanColumn from '../../Components/Com_Desarrollador/KanbanColumn';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function TableroKanbanDesarrollador() {
    const {tareas} = useContext(TareaContext);
    const [searchTerm, setSearchTerm] = useState('');
    console.log(tareas)
    const ultSprint = Math.max(...tareas.map(t=> t.sprint?.id || 0))
    console.log(tareas.sprint?.id)

    const tareasDeUltSprint = tareas.filter(t=> t.sprint?.id === ultSprint)

    const filteredTareas = tareasDeUltSprint.filter((tarea) => {
        const fullName = tarea.nombre.toLowerCase().includes(searchTerm.toLowerCase()); 
        return fullName;
    })

    const tareasPorEstado = useMemo(() => {
    return {
        PorHacer: filteredTareas.filter(tarea => tarea.estado === 'Por Hacer'),
        EnCurso: filteredTareas.filter(tarea => tarea.estado === 'En Curso'),
        EnRevision: filteredTareas.filter(tarea => tarea.estado === 'En Revision'),
        Finalizado: filteredTareas.filter(tarea => tarea.estado === 'Finalizado'),
    }
    }, [tareasDeUltSprint])


    return(
         <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 md:pb-0">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-8 overflow-y-auto flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-6 text-center md:text-left">Tablero Kanban</h1>
                    <h2 className="text-xl md:text-2xl font-bold text-blueDark text-center md:text-left"><strong>Proyecto:</strong> {tareasDeUltSprint[0]?.sprint?.proyecto?.nombre} - <strong>Sprint:</strong> {tareasDeUltSprint[0]?.sprint?.nombre}</h2>
                    {/* Barra de búsqueda */}
                    <div className="flex justify-center md:justify-start">
                         <div className="relative w-full max-w-md" onClick={(e)=>e.stopPropagation()}>
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
                    </div>
                    <div className="flex-1 overflow-x-auto md:overflow-x-visible pb-4">
                        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 min-w-full">
                        <KanbanColumn titulo='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                        <KanbanColumn titulo='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                        <KanbanColumn titulo='En Revisión' tipoEstado={tareasPorEstado.EnRevision}/>
                        <KanbanColumn titulo='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                        </div>
                    </div>
                </main>
            </div>
        </div>  
    )
}

export default TableroKanbanDesarrollador