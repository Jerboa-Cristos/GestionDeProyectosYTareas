import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const Tarea = ({ id, title, description, fecha }) => {
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

    const descripcionCorta = () => {
      if(description == null) {
        return description = 0
      } else {
        return description.length > 50 ? description.substring(0, 50) + '...' : description;
      }
    }

  return (
    <button key={id} id={id} onClick={gotoTarea} type='button'
    className="w-full bg-blueBase hover:bg-BlueBaseDark transition-all rounded-xl 
    p-4 text-left group shadow-sm border-transparent hover:border-blueDashboard">
      <h4 className="text-blueDark font-bold text-base md:text-lg text-center mb-2 
      group-hover:text-blueDashboard transition-colors">{title}</h4>
      <p className="text-BlueDarkDark text-[11px] md:text-xs leading-relaxed mb-4 line-clamp-3">
        {descripcionCorta()}
      </p>
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-2">
          <Calendar size={22} className={`text-blueDark ${tareasDeadline(fecha)}`}/>
        </div>
      </div>
    </button>
  );
}

export default Tarea;