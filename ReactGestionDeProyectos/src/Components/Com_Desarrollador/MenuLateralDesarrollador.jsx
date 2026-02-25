import { useNavigate } from 'react-router-dom';

import { Home, CheckSquare2, NotebookPen} from 'lucide-react';

const MenuLateralDesarrollador = () => {
    const navigate = useNavigate();

    function gotoPanel(){
        navigate('/DashboardDesarrollador')
    }

     function gotoTablero(){
        navigate('/TableroKanbanDesarrollador')
    }

     function gotoTareas(){
        navigate('/MisTareasDesarrollador')
    }

    return (
        <aside className="
        fixed bottom-0 left-0 right-0 z-50 bg-blueDark text-white border-t border-blueDark p-1
        md:relative md:w-64 md:h-full md:bg-blueBase md:text-blueDark md:rounded-xl md:flex md:flex-col md:p-2 md:border-none">
            <nav className="flex flex-row md:flex-col w-full justify-around md:justify-start">
                <button 
                onClick={gotoPanel}
                className="flex-1 md:w-full flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 md:px-6 md:py-4 
            text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark md:hover:bg-BlueBaseDark transition-all text-center md:text-left group rounded-lg">
                    <Home size={35} className="md:size-10 text-white md:text-blueDark group-hover:text-BlueDarkDark" />
                    <span className="hidden md:inline text-[10px] text-white md:text-blueDark md:text-base font-medium">Panel</span>
                </button>
                <button 
                onClick={gotoTablero}
                className="flex-1 md:w-full flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 md:px-6 md:py-4 
            text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark md:hover:bg-BlueBaseDark transition-all text-center md:text-left group rounded-lg">
                    <CheckSquare2 size={35} className="md:size-10 text-white md:text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="hidden md:inline text-[10px] text-white md:text-blueDark md:text-base font-medium">Tablero</span>
                </button>
                <button 
                onClick={gotoTareas}
                className="flex-1 md:w-full flex flex-col md:flex-row items-center gap-1 md:gap-4 px-2 py-3 md:px-6 md:py-4 
            text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark md:hover:bg-BlueBaseDark transition-all text-center md:text-left group rounded-lg">
                    <NotebookPen size={35} className="md:size-10 text-white md:text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="hidden md:inline text-[10px] text-white md:text-blueDark md:text-base font-medium">Tareas</span>
                </button>
            </nav>
        </aside>
    )
}

export default MenuLateralDesarrollador