import { CheckSquare, User } from 'lucide-react';

const KanbanTask = ({ titulo, id }) => {

  const gotoTarea = (e) => {
    e.stopPropagation()
     if (!id) return;
    navigate(`/MostrarTarea/${id}`)
  }


  return (
    <button key={id} id={id} onClick={gotoTarea}
    className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col gap-8 group">
      <h4 className="text-blueDark font-bold text-lg text-center">
        {titulo}
      </h4>
      
      <div className="flex justify-between items-center text-blueDark">
        <div className="flex items-center gap-2">
          <CheckSquare size={20} className="fill-current text-blueDark bg-white" />
        </div>
        <User size={22} className="text-blueDark" />
      </div>
    </button>
  );
}

export default KanbanTask;