import { CheckSquare, User, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const KanbanTask = ({ titulo, id, fecha, desarrollador }) => {
  const navigate = useNavigate();
  
  const gotoTarea = (e) => {
    e.stopPropagation()
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
    <button key={id} id={id} onClick={gotoTarea}
    className="w-full bg-white hover:bg-blueBase rounded-xl p-2 md:p-4 shadow-sm hover:shadow-md transition-all text-left 
    flex flex-col gap-2 md:gap-4 group">
      <h4 className="text-blueDark font-bold text-base md:text-lg text-center leading-tight">
        {titulo}
      </h4>
      
      <div className="flex justify-between items-center text-blueDark mt-auto">
        <div className="flex items-center gap-2 bg-blueBase/30 p-1.5 rounded-lg" title={`Fecha límite: ${fecha}`}>
          <Calendar size={30} md:size={20} className={`text-blueDark ${tareasDeadline(fecha)}`}/>
        </div>
        <div className="flex items-center gap-2 bg-blueBase/30 p-1.5 rounded-lg" title={`Asignado: ${desarrollador}`}>
          <User size={30} md:size={20} className="text-blueDark rounded-full p-0.5"  />
        </div>
      </div>
    </button>
  );
}

export default KanbanTask;