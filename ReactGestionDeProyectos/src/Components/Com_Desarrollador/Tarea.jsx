import { Calendar } from 'lucide-react';

const Tarea = ({ id, title, description, fecha }) => {

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

  const descripcionCorta = description.length > 50 ? description.substring(0, 50) + '...' : description;

  return (
    <button key={id} className="w-full bg-blueBase hover:bg-BlueBaseDark transition-colors rounded-lg p-4 text-left group">
      <h4 className="text-blueDark font-bold text-lg text-center mb-2">{title}</h4>
      <p className="text-BlueDarkDark text-xs leading-tight mb-4">
        {descripcionCorta}
      </p>
      <div className="flex justify-end items-center gap-1">
        <Calendar size={22} className={`text-blueDark ${tareasDeadline(fecha)}`}/>
      </div>
    </button>
  );
}

export default Tarea;