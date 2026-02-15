import { Search, Plus, Users, UserCheck, Trash2, UserCog} from 'lucide-react';
import MenuTop from '../../Components/MenuTop';
import MenuLateralAdmin from '../../Components/Com_Admin/MenuLateralAdmin';
import { mostrarUsuarios, eliminarUsuario} from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

//Se deben añadir funciones y se debe páginar la información

function GestionUsuarios() {
    const [rolFilter, setRolFilter] = useState(null); // Estado para el filtro de rol
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    //Cargar los usuarios al cargar la página
    useEffect(() => {
        //Aquí se deben cargar los usuarios desde el backend
        const fetchUsers = async () => {
            mostrarUsuarios().then(res => {
                setUsers(res.data);
            }).catch(err => {
                console.error("Error al cargar los usuarios:", err);
            });
        }
        fetchUsers();
    }, [])

//#region Funciones para navegar a otras páginas
    const goCreacionUsuarios = () => {
        navigate('/CreacionUsuarios')
    }
    const goPerfilUsuario = (id, rol) => {
        console.log('redirigiendo al perfil')
        navigate(`/PerfilUsuario/${rol}/${id}`)
    }
//#endregion

//#region Funciones para filtrar por rol
    const filteredUsers = users.filter((user) => {
        const fullName = user.nombre.toLowerCase().includes(searchTerm.toLowerCase()); 
        const matchesRol = rolFilter ? user.rol === rolFilter : true;
        return fullName && matchesRol;
    })

    const filtrarPorRol = (e, rol) => {
        e.preventDefault();
        e.stopPropagation();

        if(rolFilter === rol){
            setRolFilter(null);
        }else{
            setRolFilter(rol);
            setSearchTerm('');
        }
    }
//#endregion

//#region Función para eliminar un usuario
    const eliminarPersona = (id, rol) => {
        eliminarUsuario(id, rol).then(res => {
            console.log('Usuario eliminado con éxito');
            // Actualizar la lista de usuarios después de eliminar uno
            setUsers(users.filter(user => user.id !== id || user.rol !== rol));
        }).catch(err => {
            console.error("Error al eliminar el usuario:", err);
        });
    }
//#endregion

    return (
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <MenuLateralAdmin/>
                <main 
                onClick={()=> {setRolFilter(null); setSearchTerm('');}}
                className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col overflow-hidden m-4">
                    <h1 className="text-3xl font-bold text-blueDark mb-6 text-left">
                        Gestión de usuarios
                    </h1>  
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap gap-3">
                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'Administrador')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 
                            py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <UserCog size={20} />
                            Administrador
                            </button> 

                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'Desarrollador')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <Users size={20} />
                            Desarrollador
                            </button>

                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'ProductOwner')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <UserCheck size={20} />
                            Product Owner
                            </button>
                        </div>
                        <div className="relative w-full max-w-xs" onClick={(e)=>e.stopPropagation()}>
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e)=>{setSearchTerm(e.target.value); setRolFilter(null);}}
                                className="w-full bg-blueBase text-blueDark pl-10 pr-4 py-2 
                                rounded-lg
                                placeholder-blueDark"
                            />
                            <Search className="absolute left-3 top-2.5 text-blueDark" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                       {filteredUsers.map((user) => (
                            <button 
                                key={`${user.rol}-${user.id}`}
                                onClick={(e)=>{goPerfilUsuario(user.id, user.rol); e.stopPropagation()}}
                                className="w-full bg-blueBase rounded-lg h-14 flex items-center 
                                justify-between px-6 hover:bg-blueBaseDark transition-all text-white"
                            >
                                <div className="flex items-center gap-4 w-1/4">
                                    <span className="font-bold text-blueDark">{user.nombre}</span>
                                </div>
                                <span className="w-1/4 text-blueDark font-medium">{user.email}</span>
                                <span className="w-1/4 text-blueDark font-medium">{user.rol}</span>
                                <Trash2 
                                    onClick={(e)=>{eliminarPersona(user.id, user.rol); e.stopPropagation();}}
                                    className="text-warning hover:text-warningDark hover:scale-110 transition-all cursor-pointer" 
                                    size={24} 
                                />
                            </button>
                       ))}

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