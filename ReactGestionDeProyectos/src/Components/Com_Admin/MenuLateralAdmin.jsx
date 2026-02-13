import { Home, User} from 'lucide-react';

const MenuLateralAdmin = () => {

    return (
        <aside className="w-64 bg-blueBase rounded-xl flex flex-col p-2">
            <nav className="flex flex-col w-full">
                <button 
                className="w-full flex items-center gap-4 px-6 py-4 text-blueDark 
                hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                >
                    <Home size={22} className="text-blueDark group-hover:text-BlueDarkDark" />
                    <span className="text-base font-medium">Panel</span>
                </button>
                <button 
                className="w-full flex items-center gap-4 px-6 py-4 text-blueDark
                hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                >
                    <User size={22} className="text-blueDark group-hover:text-BlueDarkDark"/>
                    <span className="text-base font-medium">Usuarios</span>
                </button>
            </nav>
        </aside>
    )
}

export default MenuLateralAdmin