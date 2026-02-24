import { Search, Plus, Users, UserCheck, Trash2, UserCog} from 'lucide-react';
import MenuTop from '../../Components/MenuTop';
import { mostrarUsuarios, eliminarUsuario} from '../../services/adminService';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function GestionUsuarios() {
    const token = localStorage.getItem('token');
    const [rolFilter, setRolFilter] = useState(null); // Estado para el filtro de rol
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    //Cargar los usuarios al cargar la página
    
        useEffect(() => {
            //Aquí se deben cargar los usuarios desde el backend
                const fetchUsers = async () => {
                    mostrarUsuarios(token).then(res => {
                        setUsers(res.data);
                        console.log(res.data);
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

//#region COSAS PARA PÁGINAR DATOS
    const [currentPage, setCurrentPage] = useState(1)
    const usersPerPage = 10
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length/usersPerPage))
    const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)

    useEffect(()=> {
        setCurrentPage(1)
    },[searchTerm, rolFilter])

//#endregion

//#region Función para eliminar un usuario
    const eliminarPersona = (id, rol, token) => {
        eliminarUsuario(id, rol, token).then(res => {
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
            <MenuTop rutaPerfil='/administrador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <main 
                onClick={()=> {setRolFilter(null); setSearchTerm('');}}
                className="flex-1 bg-white rounded-xl shadow-lg p-8 flex flex-col overflow-hidden m-4 
                xs:m-2">
                    <h1 className="text-3xl font-bold text-blueDark mb-6 text-left xs:text-center">
                        Gestión de usuarios
                    </h1>  
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex flex-wrap gap-3">
                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'Administrador')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 
                            py-2 rounded-lg font-medium hover:bg-BlueBaseDark transition-colors
                            "
                            >
                            <UserCog size={20}/>
                            Administrador
                            </button> 

                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'Desarrollador')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 py-2 
                            rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <Users size={20} />
                            Desarrollador
                            </button>

                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'ProductOwner')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark px-4 py-2 
                            rounded-lg font-medium hover:bg-BlueBaseDark transition-colors"
                            >
                            <UserCheck size={20} />
                            Product Owner
                            </button>
                        </div>
                        <div className="relative w-full" onClick={(e)=>e.stopPropagation()}>
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e)=>{setSearchTerm(e.target.value); setRolFilter(null);}}
                                className="w-full bg-blueBase text-blueDark pl-10 pr-4 py-2 
                                rounded-lg xs:h-12
                                placeholder-blueDark"
                            />
                            <Search className="absolute left-3 top-2.5 text-blueDark" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                       {currentUsers.map((user) => (
                            <button 
                                key={`${user.rol}-${user.id}`}
                                onClick={(e)=>{goPerfilUsuario(user.id, user.rol); e.stopPropagation()}}
                                className="w-full bg-blueBase rounded-lg h-14 xs:h-20 flex items-center 
                                justify-between px-6 hover:bg-blueBaseDark transition-all text-white"
                            >
                                <div className="flex items-center gap-4 w-1/4 xs:w-40">
                                    <span className="font-bold text-blueDark xs:text-left">{user.nombre}</span>
                                </div>
                                <span className="w-1/4 text-blueDark font-medium">{user.email}</span>
                                <span className="w-1/4 text-blueDark font-medium">{user.rol}</span>
                                <Trash2 
                                    onClick={(e)=>{eliminarPersona(user.id, user.rol, token); e.stopPropagation();}}
                                    className="text-warning hover:text-warningDark hover:scale-110 transition-all cursor-pointer xs:size-10" 
                                    size={24} 
                                />
                            </button>
                       ))}
                    </div>
                    <div className="mt-4 flex flex-row justify-between items-center w-full">
                        <button 
                        onClick={goCreacionUsuarios}
                        className="flex items-center bg-blueBase text-blueDark px-6 py-2 
                        rounded-lg font-bold hover:bg-BlueBaseDark transition-colors shadow-sm"
                        >
                        <Plus size={24} strokeWidth={3} />
                        Crear
                        </button>
                        <div className='flex gap-4'>
                            <button disabled={currentPage===1} 
                            onClick={(e)=> {setCurrentPage(prev => prev-1); e.stopPropagation()}}
                            className="flex items-center bg-blueBase text-blueDark px-6 py-2 
                            rounded-lg font-bold hover:bg-BlueBaseDark transition-colors shadow-sm">
                                Previous
                            </button>

                            <span className='text-blueDark font-bold flex items-center gap-4'>Page {currentPage} of {totalPages}</span>

                            <button disabled={currentPage===totalPages}
                            onClick={(e)=> {setCurrentPage(prev=>prev+1); e.stopPropagation()}}
                            className="flex items-center bg-blueBase text-blueDark px-6 py-2 
                            rounded-lg font-bold hover:bg-BlueBaseDark transition-colors shadow-sm">
                                Next
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default GestionUsuarios