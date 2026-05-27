import { User, Calendar } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd'; 
import { useNavigate } from 'react-router-dom';

const KanbanTask = ({ titulo, id, index, fecha, desarrollador }) => {
  const navigate = useNavigate();
  
  const gotoTarea = (e) => {
     if (!id) return;
    navigate(`/MostrarTarea/${id}`)
  }

  const tareasDeadline = (fecha) => {
      const fechaLimiteTarea = new Date(fecha)
      const fechaActual = new Date()
      const diasRestantes = Math.abs((fechaLimiteTarea - fechaActual) / 86400000)

      if(diasRestantes > 0 && diasRestantes <= 4) {
        return 'fill-warningDark'
      } else if (diasRestantes > 4 && diasRestantes < 10) {
        return 'fill-[#FFD23D]'
      } else {
        return 'fill-GreenLite'
      }
  }


  return (
    <Draggable draggableId={id.toString()} index={index}>
    {(provided) => (
      <div 
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      key={id} id={id} onClick={gotoTarea}
      className="w-full bg-white hover:bg-blueBase rounded-xl p-2 lg:p-4 shadow-sm hover:shadow-md text-left 
      flex flex-col gap-2 lg:gap-4 group">
        <h4 className="text-blueDark font-bold text-base lg:text-lg text-center leading-tight">
          {titulo}
        </h4>
        
        <div className="flex justify-between items-center text-blueDark mt-auto">
          <div className="flex items-center gap-2 bg-blueBase/30 p-1.5 rounded-lg" title={`Fecha límite: ${fecha}`}>
            <Calendar size={30} lg:size={20} className={`text-blueDark ${tareasDeadline(fecha)}`}/>
          </div>
          <div className="flex items-center gap-2 bg-blueBase/30 p-1.5 rounded-lg" title={`Asignado: ${desarrollador}`}>
            <User size={30} lg:size={20} className="text-blueDark rounded-full p-0.5"  />
          </div>
        </div>
      </div>
    )}
    </Draggable>
  );
}

export default KanbanTask;