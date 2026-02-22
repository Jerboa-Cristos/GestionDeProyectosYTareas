//Código
import { TareaContext } from '../../Context/TareaContext';
import { useContext, useMemo } from 'react';
//Componentes
import ColumnaTareas from '../../Components/Com_Desarrollador/ColumnaTareas';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';

function MisTareasDesarrollador() {
    const {tareas} = useContext(TareaContext);

    const tareasPorEstado = useMemo(() => {
        return {
            PorHacer: tareas.filter(tarea => tarea.estado === 'Por Hacer'),
            EnCurso: tareas.filter(tarea => tarea.estado === 'En Curso'),
            EnRevision: tareas.filter(tarea => tarea.estado === 'En Revision'),
            Finalizado: tareas.filter(tarea => tarea.estado === 'Finalizado'),
        }
    }, [tareas])

    return (
         <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaLogin='/desarrollador_login' rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-6">Mis Tareas</h1>
                    
                    <div className="grid md:grid-cols-4 gap-2">
                        <ColumnaTareas titulo='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                        <ColumnaTareas titulo='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                        <ColumnaTareas titulo='En Revisión' tipoEstado={tareasPorEstado.EnRevision}/>
                        <ColumnaTareas titulo='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                    </div>

                </main>
            </div>
        </div>  
    )
}

export default MisTareasDesarrollador;