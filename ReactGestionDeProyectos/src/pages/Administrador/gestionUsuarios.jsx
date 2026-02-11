import axios from 'axios';
import rutaApi from '../../api/rutaApi';
import React, { useEffect } from 'react';
import { Search, Plus, Trash2, Layout, Users, UserCheck, Home, User } from 'lucide-react';
import MenuTop from '../../Components/MenuTop';
import ListadoUsuarios from '../../Components/Com_Admin/ListadoUsuarios';

function handleSubmit(e){
        e.preventDefault();
        console.log("Formulario enviado");
}

//Se deben añadir funciones y se debe páginar la información

function GestionUsuarios() {
    return (
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
                <main className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col overflow-hidden m-4">
                    <h1 className="text-3xl font-bold text-[#1e3a5a] mb-6 text-left">
                        Gestión de usuarios
                    </h1>  
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap gap-3">
                           <button 
                            onClick={() => handleFilter('Proyecto')}
                            className="flex items-center gap-2 bg-[#bce6de] text-[#1e3a5a] px-4 
                            py-2 rounded-lg font-medium hover:bg-[#a9d9d0] transition-colors"
                            >
                            <Layout size={20} />
                            Proyecto
                            </button> 

                            <button 
                            onClick={() => handleFilter('Desarrollador')}
                            className="flex items-center gap-2 bg-[#bce6de] text-[#1e3a5a] px-4 py-2 rounded-lg font-medium hover:bg-[#a9d9d0] transition-colors"
                            >
                            <Users size={20} />
                            Desarrollador
                            </button>

                            <button 
                            onClick={() => handleFilter('Product Owner')}
                            className="flex items-center gap-2 bg-[#bce6de] text-[#1e3a5a] px-4 py-2 rounded-lg font-medium hover:bg-[#a9d9d0] transition-colors"
                            >
                            <UserCheck size={20} />
                            Product Owner
                            </button>
                        </div>
                        <div className="relative w-full max-w-xs">
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                className="w-full bg-[#bce6de] text-[#1e3a5a] pl-10 pr-4 py-2 
                                rounded-lg focus:outline-none focus:ring-2 focus:ring-[#43a4a8] 
                                placeholder-[#1e3a5a]/60"
                            />
                            <Search className="absolute left-3 top-2.5 text-[#1e3a5a]" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                        <ListadoUsuarios/>
                        
                        <button 
                            onClick={() => handleUserAction('header')}
                            className="w-full bg-[#b4e380] rounded-lg h-14 flex items-center justify-between px-6 hover:brightness-95 transition-all text-[#1e3a5a]"
                            >
                            <div className="flex items-center gap-4 w-1/4">
                                <div className="w-8 h-8 bg-zinc-600 rounded-full"></div>
                                <span className="font-semibold uppercase tracking-wider">Nombre</span>
                            </div>
                            <span className="w-1/4 font-medium text-[#43a4a8]">Proyecto</span>
                            <span className="w-1/4 font-medium text-[#43a4a8]">Rol</span>
                            <Trash2 
                                onClick={(e) => handleDelete(e, 'header')}
                                className="text-red-500 hover:scale-110 transition-transform cursor-pointer" 
                                size={24} 
                            />
                        </button>

                    </div>
                    <div className="mt-6 flex justify-start">
                        <button 
                        onClick={handleSubmit}
                        className="flex items-center gap-2 bg-[#bce6de] text-[#1e3a5a] px-6 py-2 
                        rounded-lg font-bold hover:bg-[#a9d9d0] transition-colors shadow-sm"
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