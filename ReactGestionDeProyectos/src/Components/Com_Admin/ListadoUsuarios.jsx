import { useState } from 'react';
import { mostrarDesarrolladores } from '../../services/adminService';
import { mostrarProductOwners } from '../../services/adminService';
import { eliminarDesarrollador } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';

import { Trash2 } from 'lucide-react';

//key={props.id} para el button
//onClick={(e) => handleDelete(e, id)}
//Integrar imagen de perfil

//AÑADIR LA INFORMACIÓN DE LOS USARIOS DESDE EL BACKEND. 
//AÑADIR LA FUNCIÓN DE ELIMINAR USUARIOS

function ListadoUsuarios(...props) {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([])

    mostrarDesarrolladores().then(res => {
        if(res.data.errors){
            setErrors(res.data.errors)
        } else {

        }
    })

    return(
    <button 
    key={users.id}
    onClick={navigate('/PerfilUsuario')}
        className="w-full bg-blueBase rounded-lg h-14 flex items-center 
        justify-between px-6 hover:bg-blueBaseDark transition-all text-white"
    >
        <div className="flex items-center gap-4 w-1/4">
            <span className="font-medium">{props.name}</span>
        </div>
        <span className="w-1/4 text-white/90">Proyecto</span>
        <span className="w-1/4 text-white/90">{props.rol}</span>
        <Trash2 
            onClick={eliminarDesarrollador(props.id)}
            className="text-BLueDark hover:text-warningDark hover:scale-110 transition-all cursor-pointer" 
            size={24} 
        />
    </button>
    )
}

export default ListadoUsuarios