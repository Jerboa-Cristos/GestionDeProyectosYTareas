import { CheckSquare, User } from 'lucide-react';

const KanbanTask = ({ titulo, id }) => {

  const gotoTarea = (e) => {
    e.stopPropagation()
     if (!id) return;
    navigate(`/MostrarTarea/${id}`)
  }


  return (
    <button key={id} id={id} onClick={gotoTarea}
    className="w-full bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md active:scale-[0.98] transition-all text-left 
    flex flex-col gap-4 md:gap-8 group border-l-4 border-transparent hover:border-blueDark">
      <h4 className="text-blueDark font-bold text-base md:text-lg text-center leading-tight">
        {titulo}
      </h4>
      
      <div className="flex justify-between items-center text-blueDark mt-auto">
        <div className="flex items-center gap-2 bg-blueBase/30 p-1.5 rounded-lg">
          <CheckSquare size={30} md:size={22} className="text-blueDark" />
        </div>
        <User size={35} md:size={22} className="text-blueDark rounded-full p-0.5"  />
      </div>
    </button>
  );
}

export default KanbanTask;