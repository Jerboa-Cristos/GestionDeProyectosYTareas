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
        <aside className="w-64 bg-blueBase rounded-xl flex flex-col p-2">
            <nav className="flex flex-col w-full">
                <button 
                onClick={gotoPanel}
                className="w-full flex items-center gap-4 px-6 py-4 text-blueDark 
                hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                >
                    <Home size={22} className="text-blueDark group-hover:text-BlueDarkDark" />
                    <span className="text-base font-medium">Panel</span>
                </button>
                <button 
                onClick={gotoTablero}
                className="w-full flex items-center gap-4 px-6 py-4 text-blueDark
                hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                >
                    <CheckSquare2 size={22} className="text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="text-base font-medium">Tablero</span>
                </button>
                <button 
                onClick={gotoTareas}
                className="w-full flex items-center gap-4 px-6 py-4 text-blueDark
                hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                >
                    <NotebookPen size={22} className="text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="text-base font-medium">Tareas</span>
                </button>
            </nav>
        </aside>
    )
}

export default MenuLateralDesarrollador