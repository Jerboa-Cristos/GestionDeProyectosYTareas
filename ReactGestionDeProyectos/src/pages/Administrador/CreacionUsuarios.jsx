import axios from 'axios';
import rutaApi from '../../api/rutaApi';
import React, { useEffect , useRef} from 'react';
import { User, Mail, Lock, Briefcase, Folder, RotateCcw, Upload, Plus } from 'lucide-react';
import MenuTop from '../../Components/MenuTop';

//Para input de la imagen
//ref={fileInputRef} 
//onChange={handleFileChange} 

function CreacionUsuarios() {
    return (
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>
            <main className="flex-1 bg-[#bce6de] rounded-xl shadow-lg p-10 flex flex-col relative m-4 overflow-hidden">

                <h1 className="text-3xl font-bold text-[#1e3a5a] mb-12">
                    Creación de Usuario
                </h1>

                <div className="shrink-0 flex flex-col items-center gap-4">
                    <button 
                        className="w-48 h-48 bg-white rounded-full border-4 border-white 
                        shadow-md flex items-center justify-center overflow-hidden hover:bg-gray-50 
                        transition-colors group relative"
                    >
                        <User size={80} className="text-gray-300 group-hover:text-gray-400" />
                        
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload className="text-[#1e3a5a]" size={32} />
                        </div>
                    </button>
                    
                    <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                    />
                    <span className="text-[#1e3a5a] text-sm font-semibold">Subir foto</span>
                </div>
                <form className="flex-1 w-full max-w-2xl flex flex-col gap-4">
          
                    <div className="relative">
                        <User className="absolute left-4 top-3 text-[#1e3a5a]" size={20} />
                        <input 
                        type="text" 
                        placeholder="Nombre apellidos..." 
                        className="w-full h-12 bg-white pl-12 pr-4 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a4a8] italic"
                        />
                    </div>

                    <div className="mt-2 flex flex-col gap-2">
                        <input 
                        type="password" 
                        placeholder="Contraseña..." 
                        className="w-full h-12 bg-white px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a4a8] italic text-center"
                        />
                        <input 
                        type="password" 
                        placeholder="Repetir contraseña..." 
                        className="w-full h-12 bg-white px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a4a8] italic text-center"
                        />
                    </div>

                    <div className="relative mt-2">
                        <Mail className="absolute left-4 top-3 text-[#1e3a5a]" size={20} />
                        <input 
                        type="email" 
                        placeholder="Correo..." 
                        className="w-full h-12 bg-white pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a4a8] italic text-center"
                        />
                    </div>

                    <div className="relative mt-4">
                        <Folder className="absolute left-4 top-3 text-[#1e3a5a]" size={20} />
                        <select className="w-full h-12 bg-white pl-12 pr-10 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a4a8] italic appearance-none text-center text-gray-500">
                        <option value="">Proyecto</option>
                        <option value="medclin">MedClin</option>
                        <option value="beta">Proyecto Beta</option>
                        </select>
                        <div className="absolute right-4 top-3 pointer-events-none text-[#1e3a5a]">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>

                    <div className="relative">
                        <Briefcase className="absolute left-4 top-3 text-[#1e3a5a]" size={20} />
                        <select className="w-full h-12 bg-white pl-12 pr-10 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-[#43a4a8] italic appearance-none text-center text-gray-500">
                        <option value="">Rol...</option>
                        <option value="admin">Admin</option>
                        <option value="dev">Desarrollador</option>
                        <option value="po">Product Owner</option>
                        </select>
                        <div className="absolute right-4 top-3 pointer-events-none text-[#1e3a5a]">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>
                </form>
                <div className="mt-auto flex justify-between items-center w-full">
                    <button 
                        className="text-[#1e3a5a] hover:scale-110 transition-transform p-2"
                        title="Volver atrás"
                        >
                        <RotateCcw size={40} strokeWidth={2.5} />
                    </button>
                    <button 
                        className="bg-[#218cba] text-white px-6 py-2 rounded-lg flex items-center 
                        gap-2 font-medium hover:bg-[#1a749c] transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        Crear Usuario
                    </button>
                </div>
            </main>
        </div>
    )
}

export default CreacionUsuarios;