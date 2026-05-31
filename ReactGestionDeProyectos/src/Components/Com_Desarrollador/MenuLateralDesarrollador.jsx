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
        lg:relative lg:w-64 lg:bg-blueBase lg:text-blueDark lg:rounded-xl lg:flex lg:flex-col lg:p-2 lg:border-none">
            <nav className="flex flex-row lg:flex-col w-full justify-around lg:justify-start">
                <button 
                onClick={gotoPanel}
                className="flex-1 lg:w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-2 py-3 lg:px-6 lg:py-4 
            text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark lg:hover:bg-BlueBaseDark transition-all text-center lg:text-left group rounded-lg">
                    <Home size={35} className="lg:size-10 text-white lg:text-blueDark group-hover:text-BlueDarkDark" />
                    <span className="hidden lg:inline text-[10px] text-white lg:text-blueDark lg:text-base font-medium">Panel</span>
                </button>
                <button 
                onClick={gotoTablero}
                className="flex-1 lg:w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-2 py-3 lg:px-6 lg:py-4 
            text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark lg:hover:bg-BlueBaseDark transition-all text-center lg:text-left group rounded-lg">
                    <CheckSquare2 size={35} className="lg:size-10 text-white lg:text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="hidden lg:inline text-[10px] text-white lg:text-blueDark lg:text-base font-medium">Tablero Kanban</span>
                </button>
                <button 
                onClick={gotoTareas}
                className="flex-1 lg:w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-2 py-3 lg:px-6 lg:py-4 
            text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark lg:hover:bg-BlueBaseDark transition-all text-center lg:text-left group rounded-lg">
                    <NotebookPen size={35} className="lg:size-10 text-white lg:text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="hidden lg:inline text-[10px] text-white lg:text-blueDark lg:text-base font-medium">Mis Tareas</span>
                </button>
            </nav>
        </aside>
    )
}

export default MenuLateralDesarrollador