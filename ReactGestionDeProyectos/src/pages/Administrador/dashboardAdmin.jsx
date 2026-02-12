import axios from 'axios';
import rutaApi from '../../api/rutaApi';
import React, { useEffect } from 'react';
import { Home, User, Users, AlertCircle} from 'lucide-react';
import MenuTop from '../../Components/MenuTop';

    function handleSubmit(e){
        e.preventDefault();
        console.log("Formulario enviado");
    }

function DashboardAdmin() {
axios.get(rutaApi()+'/dashboard')

    return(
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>
        
        {/*Menu Lateral*/}
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <aside className="w-64 bg-blueBase rounded-xl flex flex-col p-2">
                    <nav className="flex flex-col w-full">
                        <button 
                        onClick={handleSubmit}
                        className="w-full flex items-center gap-4 px-6 py-4 text-blueDark 
                        hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                        >
                            <Home size={22} className="text-blueDark group-hover:text-BlueDarkDark" />
                            <span className="text-base font-medium">Panel</span>
                        </button>
                        <button 
                        onClick={handleSubmit}
                        className="w-full flex items-center gap-4 px-6 py-4 text-blueDark
                        hover:bg-BlueBaseDark hover:text-BlueDarkDark transition-all text-left group"
                        >
                            <User size={22} className="text-blueDark group-hover:text-BlueDarkDark"/>
                            <span className="text-base font-medium">Usuarios</span>
                        </button>
                    </nav>
                </aside>
        {/*Espacio del Dashboard*/}
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <h1 className="text-3xl font-bold text-blueDark mb-5">
                        Dashboard
                    </h1>
                    <div className="flex flex-col gap-4">
                       <button 
                        onClick={handleSubmit}
                        className="w-full bg-blueDashboard rounded-xl h-62 flex items-center 
                        justify-between px-8 text-white hover:shadow-lg hover:bg-blueblue transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <Users size={100}/>
                                <span className="text-4xl font-light">Usuarios Activos</span>
                            </div>
                            <div className="text-6xl font-light">
                                Aquí debe estar la función que devuelve el número de usuarios activos
                            </div>
                        </button>
                        <button 
                        onClick={handleSubmit}
                        className="w-full bg-warning rounded-xl h-62 flex items-center justify-between
                        px-8 text-white relative hover:shadow-lg hover:bg-warningDark transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <Users size={100} />
                                <span className="text-4xl font-light">Usuarios Inactivos</span>
                            </div>
                            <div className="text-6xl font-light">
                                 Aquí debe estar la función que devuelve el número de usuarios inactivos
                            </div>
                            <div className="absolute bottom-4 right-4 text-red-600 bg-white rounded-full p-1">
                                <AlertCircle size={40} />
                            </div>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardAdmin;