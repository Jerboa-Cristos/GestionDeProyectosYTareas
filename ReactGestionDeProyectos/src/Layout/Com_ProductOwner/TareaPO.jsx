import MenuThreeDot from './MenuThreeDot';
import { Draggable } from '@hello-pangea/dnd'; 

 //propTarea es una propiedad del Componente Tarea para identificar el id y asi asociar su nombre y descripcion
const TareaPO = ({id, index, propTarea}) => {
    
        return (
            <Draggable draggableId={id.toString()} index={index}>
    {(provided) => (
            <div 
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                key={id} id={id}
             className="w-full bg-blueBase hover:bg-BlueBaseDark rounded-xl p-2 lg:p-4 shadow-sm hover:shadow-md text-left 
      flex flex-col gap-2 lg:gap-4 group">
                <div className="flex justify-between items-center pt-2">
                    <h4 className="text-blueDark font-bold text-base lg:text-lg text-center leading-tight 
                group-hover:text-blueDashboard transition-colors">{propTarea.nombre}</h4>
                <MenuThreeDot propTarea={propTarea}/>
                </div>

                <p className="text-BlueDarkDark text-[11px] md:text-xs leading-relaxed mb-4 line-clamp-3"> {propTarea.descripcion}</p>
                <div className="flex justify-between items-center pt-2">
                    <p className='text-xs font-bold px-2 py-1 bg-blueBase text-blueDark rounded'>
                        {propTarea.tipo}
                    </p>
                    <p className='text-blueDark text-[11px] md:text-xs'>
                        {propTarea.fecha_fin}
                    </p>
                </div>
            </div>)}
        </Draggable>
        )
    }

    export default TareaPO