//Código
import { TareaContext } from '../../Context/TareaContext';
import { useContext, useMemo } from 'react';
//Componentes
import ColumnaTareas from '../../Components/Com_Desarrollador/ColumnaTareas';
import MenuTop from '../../Components/MenuTop';
import MenuLateralDesarrollador from '../../Components/Com_Desarrollador/MenuLateralDesarrollador';
import Loading from '../../Components/Loading';

function MisTareasDesarrollador() {
    const user = JSON.parse(localStorage.getItem('user'))
    const {tareas, loading} = useContext(TareaContext);

    const miTareas = tareas.filter(tarea => tarea.id_desarrollador === user.id)

    const tareasPorEstado = useMemo(() => {
        return {
            PorHacer: miTareas.filter(tarea => tarea.estado === 'Por Hacer'),
            EnCurso: miTareas.filter(tarea => tarea.estado === 'En Curso'),
            EnRevision: miTareas.filter(tarea => tarea.estado === 'En Revision'),
            Finalizado: miTareas.filter(tarea => tarea.estado === 'Finalizado'),
        }
    }, [tareas])

    if (loading) return <Loading />

    return (
         <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/desarrollador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 md:pb-0">
                <MenuLateralDesarrollador/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-8 overflow-y-auto flex flex-col gap-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-2 md:mb-6 text-center md:text-left">Mis Tareas</h1>
                    
                    <div className="flex-1 overflow-x-auto md:overflow-x-visible pb-4">
                        <div className="flex flex-col md:grid md:grid-cols-4 gap-4 min-w-full">
                            <ColumnaTareas titulo='Por Hacer' tipoEstado={tareasPorEstado.PorHacer}/>
                            <ColumnaTareas titulo='En Curso' tipoEstado={tareasPorEstado.EnCurso}/>
                            <ColumnaTareas titulo='En Revisión' tipoEstado={tareasPorEstado.EnRevision}/>
                            <ColumnaTareas titulo='Finalizado' tipoEstado={tareasPorEstado.Finalizado}/>
                        </div>
                    </div>

                </main>
            </div>
        </div>  
    )
}

export default MisTareasDesarrollador;