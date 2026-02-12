import { Trash2 } from 'lucide-react';

//key={props.id} para el button
//onClick={(e) => handleDelete(e, id)}
//Integrar imagen de perfil

const ListadoUsuarios = () => {
    <button 
        className="w-full bg-blueBase rounded-lg h-14 flex items-center 
        justify-between px-6 hover:bg-blueBaseDark transition-all text-white"
    >
        <div className="flex items-center gap-4 w-1/4">
            <div className="w-8 h-8 bg-white rounded-full"></div>
            <span className="font-medium">Nombre</span>
        </div>
        <span className="w-1/4 text-white/90">Proyecto</span>
        <span className="w-1/4 text-white/90">Rol</span>
        <Trash2 
            className="text-BLueDark hover:text-warningDark hover:scale-110 transition-all cursor-pointer" 
            size={24} 
        />
    </button>
}

export default ListadoUsuarios