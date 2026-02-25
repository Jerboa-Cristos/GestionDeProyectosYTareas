import KanbanPanel from '../../Components/Com_Desarrollador/KanbanPanel';

const KanbanColumn = ({titulo, tipoEstado}) => (
    <div className="bg-turquesa rounded-2xl p-3 md:p-4 w-full md:min-w-75 lg:min-w-87.5 flex flex-col gap-4 shadow-inner">
        <h3 className="text-white font-bold text-center text-xl md:text-2xl sticky top-0 py-2">{titulo}</h3>
        <div>
            <div className="flex flex-col gap-3 md:gap-4 overflow-y-auto max-h-[70vh] md:max-h-none pb-4 px-1">
                {
                tipoEstado.map((tarea) => (
                    <KanbanPanel key={tarea.id} id={tarea.id} titulo={tarea.nombre}/>
                )) 
                }
            </div>
        </div>
    </div>
)

export default KanbanColumn;