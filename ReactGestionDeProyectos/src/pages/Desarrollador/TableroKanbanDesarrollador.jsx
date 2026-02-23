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

    const filteredTareas = tareas.filter((tarea) => {
        const fullName = tarea.nombre.toLowerCase().includes(searchTerm.toLowerCase()); 
        return fullName;
    })

    const tareasPorEstado = useMemo(() => {
    return {
        PorHacer: tareas.filter(tarea => tarea.estado === 'Por Hacer'),
        EnCurso: tareas.filter(tarea => tarea.estado === 'En Curso'),
        EnRevision: tareas.filter(tarea => tarea.estado === 'En Revision'),
        Finalizado: tareas.filter(tarea => tarea.estado === 'Finalizado'),
    }
    }, [tareas])


    return(
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaLogin='/desarrollador_login' rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Tablero Kanban</h1>
                    
                    {/* Barra de búsqueda */}
                    <div className="mb-8">
                         <div className="relative w-full" onClick={(e)=>e.stopPropagation()}>
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e)=>setSearchTerm(e.target.value)}
                                className="w-full bg-blueBase text-blueDark pl-10 pr-4 py-2 
                                rounded-lg xs:h-12
                                placeholder-blueDark"
                            />
                            <Search className="absolute left-3 top-2.5 text-blueDark" size={20} />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-2">
                        <KanbanColumn titulo='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                        <KanbanColumn titulo='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                        <KanbanColumn titulo='En Revisión' tipoEstado={tareasPorEstado.EnRevision}/>
                        <KanbanColumn titulo='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                    </div>
                </main>
            </div>
        </div>  
    )
}

export default TableroKanbanDesarrollador