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
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <aside className="w-64 bg-blueBase rounded-xl flex flex-col p-2 shadow-inner">
                    <nav className="flex flex-col w-full">
                        <button 
                        onClick={handleSubmit}
                        className="w-full flex items-center gap-4 px-6 py-4 text-blueDark 
                        hover:bg-[#b0d8d3] hover:text-slate-900 transition-all text-left group"
                        >
                            <Home size={22} className="text-blueDark group-hover:text-slate-800" />
                            <span className="text-base font-medium">Panel</span>
                        </button>
                        <button 
                        onClick={handleSubmit}
                        className="w-full flex items-center gap-4 px-6 py-4 text-blueDark
                        hover:bg-[#b0d8d3] hover:text-slate-900 transition-all text-left group"
                        >
                            <User size={22} className="text-blueDark group-hover:text-slate-800"/>
                            <span className="text-base font-medium">Usuarios</span>
                        </button>
                    </nav>
                </aside>
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 overflow-auto flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                       <button 
                        onClick={handleSubmit}
                        className="w-full bg-[#218cba] rounded-xl h-32 flex items-center 
                        justify-between px-8 text-white hover:shadow-lg hover:bg-[#269acb] transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <Users size={100}/>
                                <span className="text-2xl font-light">Usuarios Activos</span>
                            </div>
                            <div className="text-6xl font-light">
                                Aquí debe estar la función que devuelve el número de usuarios activos
                            </div>
                        </button>
                        <button 
                        onClick={handleSubmit}
                        className="w-full bg-[#f57a7a] rounded-xl h-32 flex items-center justify-between
                        px-8 text-white relative hover:shadow-lg hover:bg-[#fa8787] transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <Users size={100} />
                                <span className="text-2xl font-light">Usuarios Inactivos</span>
                            </div>
                            <div className="text-6xl font-light">
                                 Aquí debe estar la función que devuelve el número de usuarios inactivos
                            </div>
                            <div className="absolute bottom-4 right-4 text-red-600 bg-white rounded-full p-1">
                                <AlertCircle size={20} fill="currentColor" />
                            </div>
                        </button>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default DashboardAdmin;