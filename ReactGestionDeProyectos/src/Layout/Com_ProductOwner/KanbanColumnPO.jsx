import TareaPO from './TareaPO';
import { Droppable } from '@hello-pangea/dnd';

const KanbanColumnPO = ({titulo, estadoID, tipoEstado }) => (
    <div className="bg-turquesa p-3 lg:p-4 w-full flex flex-col gap-2 shadow-inner rounded-xl text-white">
        <h3 className="text-white font-bold text-center text-xl lg:text-2xl sticky py-2">{titulo}</h3>
        <div className='w-full'>
            <Droppable droppableId={estadoID}>
                {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col gap-3 lg:gap-4 pb-4 px-1">
                    {
                    tipoEstado.map((tarea, index) => (
                        <TareaPO key={tarea.id} id={tarea.id} index={index} propTarea={tarea}/>
                    ))}
                    {provided.placeholder}
                </div>
                )}
            </Droppable>
        </div>
    </div>
)

export default KanbanColumnPO;