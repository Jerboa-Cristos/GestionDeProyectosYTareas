import KanbanPanel from '../../Components/Com_Desarrollador/KanbanPanel';

const KanbanColumn = ({titulo, tipoEstado}) => (
    <div className="bg-turquesa p-3 md:p-4 w-full sm:w-80 md:w-68 flex flex-col gap-2 shadow-inner rounded-xl text-white 
        shrink-0 transition-all">
        <h3 className="text-white font-bold text-center text-xl md:text-2xl sticky top-0 py-2">{titulo}</h3>
        <div className='w-full'>
            <div className="flex flex-col gap-3 md:gap-4 overflow-y-auto max-h-[70vh] md:max-h-[80vh] pb-4 px-1">
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