import KanbanPanel from '../../Components/Com_Desarrollador/KanbanPanel';
import { Droppable } from '@hello-pangea/dnd'; 

const KanbanColumn = ({titulo, estadoID, tipoEstado }) => (
    <div className="bg-turquesa p-3 md:p-4 w-full sm:w-80 md:w-68 flex flex-col gap-2 shadow-inner rounded-xl text-white 
        shrink-0 transition-all">
        <h3 className="text-white font-bold text-center text-xl md:text-2xl sticky top-0 py-2">{titulo}</h3>
        <div className='w-full'>
            <Droppable droppableId={estadoID}>
                {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3 md:gap-4 max-h-[70vh] md:max-h-[80vh] pb-4 px-1">
                    {
                    tipoEstado.map((tarea, index) => (
                        <KanbanPanel key={tarea.id} id={tarea.id} index={index} titulo={tarea.nombre} fecha={tarea.fecha_fin} desarrollador={tarea.desarrollador?.nombre}/>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </div>
    </div>
)

export default KanbanColumn;