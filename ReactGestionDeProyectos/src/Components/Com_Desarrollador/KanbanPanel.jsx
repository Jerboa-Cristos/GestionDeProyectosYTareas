import { CheckSquare, User } from 'lucide-react';

const KanbanTask = ({ title, code }) => {
  return (
    <button className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left flex flex-col gap-8 group">
      <h4 className="text-[#1a8fb1] font-semibold text-lg leading-tight">
        {title}
      </h4>
      
      <div className="flex justify-between items-center text-[#1a8fb1]">
        <div className="flex items-center gap-2">
          <CheckSquare size={20} className="fill-current text-[#1a8fb1] bg-white" />
          <span className="text-sm font-bold">{code}</span>
        </div>
        <User size={20} className="text-[#1a8fb1]" />
      </div>
    </button>
  );
}

export default KanbanTask;