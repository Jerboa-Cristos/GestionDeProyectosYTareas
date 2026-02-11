import axios from 'axios';
import rutaApi from '../api/rutaApi';
import React, { useEffect } from 'react';
import { User, Mail, Briefcase, Folder, RotateCcw, Edit3, Trash2 } from 'lucide-react';
import MenuTop from '../Components/MenuTop';

function handleSubmit(e){
        e.preventDefault();
        console.log("Formulario enviado");
}

function PerfilUsuario() {
    return (
    <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
        <MenuTop/>
        <main className="flex-1 bg-[#bce6de] rounded-xl shadow-lg p-10 flex flex-col relative m-4 overflow-hidden">

        <h1 className="text-3xl font-bold text-[#1e3a5a] mb-12">
            Perfil
        </h1>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
            

            <div className="shrink-0">
            <div className="w-48 h-48 bg-white rounded-full overflow-hidden border-4 border-white shadow-md flex items-center justify-center">

                <img 
                src="https://via.placeholder.com/200" 
                alt="Avatar de usuario" 
                className="w-full h-full object-cover"
                />
            </div>
            </div>


            <div className="flex-1 w-full max-w-2xl flex flex-col gap-3">
            

            <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                <User className="text-[#1e3a5a]" size={22} />
                <span className="text-[#1e3a5a] text-lg font-medium">Carlos Martinez</span>
            </div>


            <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                <Mail className="text-[#1e3a5a]" size={22} />
                <span className="text-[#1e3a5a] text-lg font-medium">carlos.mart@gmailexemple.com</span>
            </div>


            <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                <Briefcase className="text-[#1e3a5a]" size={22} />
                <span className="text-[#1e3a5a] text-lg font-medium">Desarrollador</span>
            </div>


            <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                <Folder className="text-[#1e3a5a]" size={22} />
                <span className="text-[#1e3a5a] text-lg font-medium">MedClin</span>
            </div>

            </div>
        </div>


        <div className="mt-auto flex justify-between items-center w-full">
            

            <button 

            className="text-[#1e3a5a] hover:scale-110 transition-transform p-2"
            title="Volver atrás"
            >
            <RotateCcw size={40} strokeWidth={2.5} />
            </button>

            <div className="flex gap-4">

            <button 

                className="bg-[#218cba] text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium hover:bg-[#1a749c] transition-colors shadow-md"
            >
                <Edit3 size={20} />
                Editar
            </button>


            <button 

                className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition-colors shadow-md hover:scale-105"
                title="Eliminar perfil"
            >
                <Trash2 size={24} />
            </button>
            </div>
        </div>
        </main>
    </div>
    )
}

export default PerfilUsuario