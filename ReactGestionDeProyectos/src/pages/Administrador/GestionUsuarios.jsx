import { Search, Plus, Layout, Users, UserCheck, Home, User } from 'lucide-react';
import MenuTop from '../../Components/MenuTop';
import MenuLateralAdmin from '../../Components/Com_Admin/MenuLateralAdmin';
import ListadoUsuarios from '../../Components/Com_Admin/ListadoUsuarios';

import { useNavigate } from 'react-router-dom';

//Se deben añadir funciones y se debe páginar la información

function GestionUsuarios() {

    const navigate = useNavigate();

    const goCreacionUsuarios = () => {
        navigate('/CreacionUsuarios')
    }

    return (
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralAdmin/>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col overflow-hidden m-4">
                    <h1 className="text-3xl font-bold text-blueDark mb-6 text-left">
                        Gestión de usuarios
                    </h1>  
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap gap-3">
                           <button 
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 
                            py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <Layout size={20} />
                            Proyecto
                            </button> 

                            <button 
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <Users size={20} />
                            Desarrollador
                            </button>

                            <button 
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <UserCheck size={20} />
                            Product Owner
                            </button>
                        </div>
                        <div className="relative w-full max-w-xs">
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                className="w-full bg-blueBase text-blueDark pl-10 pr-4 py-2 
                                rounded-lg
                                placeholder-blueDark"
                            />
                            <Search className="absolute left-3 top-2.5 text-blueDark" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                        <ListadoUsuarios/>

                    </div>
                    <div className="mt-6 flex justify-start">
                        <button 
                        onClick={goCreacionUsuarios}
                        className="flex items-center gap-2 bg-blueBase text-blueDark px-6 py-2 
                        rounded-lg font-bold hover:bg-BlueBaseDark transition-colors shadow-sm"
                        >
                        <Plus size={24} strokeWidth={3} />
                        Crear
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default GestionUsuarios