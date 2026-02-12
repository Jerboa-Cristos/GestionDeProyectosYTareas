import { AlertCircle, FileText, Calendar } from 'lucide-react';

const TaskCard = ({ title, description, priorityColor, calendarColor }) => {
  return (
    <button className="w-full bg-blueBase hover:bg-BlueBaseDark transition-colors rounded-lg p-4 text-left group">
      <h4 className="text-blueDark font-bold text-lg text-center mb-2">{title}</h4>
      <p className="text-BlueDarkDark text-xs leading-tight mb-4">
        {description}
      </p>
      
      {/* Iconos de estado en la parte inferior derecha */}
      <div className="flex justify-end items-center gap-1">
        <AlertCircle size={18} className={`${priorityColor} fill-current`} />
        <FileText size={18} className="text-blueDark fill-current" />
        <Calendar size={18} className={`${calendarColor} fill-current`} />
      </div>
    </button>
  );
}

export default TaskCard;