import KanbanPanel from '../../Components/Com_Desarrollador/KanbanPanel';

const KanbanColumn = ({titulo, tipoEstado}) => (
    <div className="bg-turquesa rounded-2xl p-4 min-h-[600px] flex flex-col gap-4">
        <h3 className="text-white font-bold text-center text-2xl">{titulo}</h3>
        <div>
            <div className="flex flex-col gap-4">
                {
                tipoEstado.map((tarea) => (
                    <KanbanPanel key={tarea.id} titulo={tarea.nombre}/>
                )) 
                }
            </div>
        </div>
    </div>
)

export default KanbanColumn;