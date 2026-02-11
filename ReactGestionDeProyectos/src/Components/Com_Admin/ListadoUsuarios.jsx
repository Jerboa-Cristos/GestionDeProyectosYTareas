import React, { useEffect } from 'react';
import { Search, Plus, Trash2, Layout, Users, UserCheck } from 'lucide-react';

//key={props.id} para el button
//onClick={(e) => handleDelete(e, id)}
//Integrar imagen de perfil

const ListadoUsuarios = ({...props}) => {
    <button 
        className="w-full bg-[#43a4a8] rounded-lg h-14 flex items-center 
        justify-between px-6 hover:bg-[#3b969a] transition-all text-white"
    >
        <div className="flex items-center gap-4 w-1/4">
            <div className="w-8 h-8 bg-white rounded-full"></div>
            <span className="font-medium">Nombre</span>
        </div>
        <span className="w-1/4 text-white/90">Proyecto</span>
        <span className="w-1/4 text-white/90">Rol</span>
        <Trash2 
            className="text-[#1e3a5a] hover:text-red-700 hover:scale-110 transition-all cursor-pointer" 
            size={24} 
        />
    </button>
}

export default ListadoUsuarios