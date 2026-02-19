import React from 'react';
import { Search } from 'lucide-react';

import KanbanPanel from '../../Components/Com_Desarrollador/KanbanPanel';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function TableroKanbanDesarrollador() {
    return(
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaLogin='/desarrollador_login' rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Tablero Kanban</h1>
                    
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



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-[#4eb1ba] rounded-2xl p-4 min-h-[600px] flex flex-col gap-4">
                            <h3 className="text-white font-bold text-sm px-2 mb-2">
                            OOOO
                            </h3>
                            <KanbanPanel title="Tareas Pendientes" code="TP-001" />
                            <KanbanPanel title="En Progreso" code="EP-002" />
                            <KanbanPanel title="En Revisión" code="ER-003" />
                            <KanbanPanel title="Completadas" code="C-004" />
                        </div>
                    </div>
                </main>
            </div>
        </div>  
    )
}

export default TableroKanbanDesarrollador