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
                        alert('Error al cargar a los usuarios.')
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
        <div className="min-h-screen bg-blueDark p-2 md:p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/administrador_profile'/>
            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                <main 
                onClick={()=> {setRolFilter(null); setSearchTerm('');}}
                className="flex-1 bg-white rounded-xl shadow-lg p-4 md:p-8 flex flex-col overflow-hidden m-2 md:m-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-6 text-center md:text-left">
                        Gestión de usuarios
                    </h1>  
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 md:px-10">
                        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'Administrador')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark p-3 md:px-4 md:py-2 rounded-lg 
                            font-medium hover:bg-blueBaseDark transition-colors">
                            <UserCog size={20}/>
                            <span className="hidden md:inline">Administrador</span>
                            </button> 

                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'Desarrollador')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark p-3 md:px-4 md:py-2 rounded-lg 
                            font-medium hover:bg-blueBaseDark transition-colors">
                            <Users size={20} />
                            <span className="hidden md:inline">Desarrollador</span>
                            </button>

                            <button 
                            onClick={(e)=>filtrarPorRol(e, 'ProductOwner')}
                            className="flex items-center gap-2 bg-blueBase text-blueDark p-3 md:px-4 md:py-2 rounded-lg 
                            font-medium hover:bg-blueBaseDark transition-colors">
                            <UserCheck size={20} />
                            <span className="hidden md:inline">Product Owner</span>
                            </button>
                        </div>
                        <div className="relative w-full max-w-md" onClick={(e)=>e.stopPropagation()}>
                            <input 
                                type="text"
                                placeholder="Buscar..."
                                value={searchTerm}
                                onChange={(e)=>{setSearchTerm(e.target.value); setRolFilter(null);}}
                                className="w-full bg-blueBase text-blueDark pl-10 pr-4 py-2 rounded-lg h-12 placeholder-blueDark
                                 focus:outline-none focus:ring-2 focus:ring-blueDark"
                            />
                            <Search className="absolute left-3 top-3.5 text-blueDark" size={20} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2 overflow-y-auto md:px-10">
                       {currentUsers.map((user) => (
                            <button 
                                key={`${user.rol}-${user.id}`}
                                onClick={(e)=>{goPerfilUsuario(user.id, user.rol); e.stopPropagation()}}
                                className="w-full bg-blueBase rounded-lg min-h-16 flex items-center justify-between px-4 
                                md:px-6 hover:bg-blueBaseDark transition-all">
                                <div className="flex items-center gap-4 w-1/3 md:w-40">
                                    <span className="font-bold text-blueDark text-sm md:text-base truncate">{user.nombre}</span>
                                </div>
                                <span className="hidden md:block w-1/4 text-blueDark font-medium truncate">{user.email}</span>
                                <span className="w-1/3 md:w-1/4 text-blueDark font-medium text-sm md:text-base text-center">{user.rol}</span>
                                <div className="w-1/6 flex justify-end">
                                <Trash2 
                                    onClick={(e)=>{eliminarPersona(user.id, user.rol, token); e.stopPropagation();}}
                                    className="text-warning hover:text-warningDark hover:scale-125 transition-all cursor-pointer" 
                                    size={24} />
                                </div>
                            </button>
                       ))}
                    </div>
                    <div className="mt-6 flex flex-col md:flex-row gap-4 justify-between items-center w-full md:px-10">
                        <button 
                        onClick={goCreacionUsuarios}
                        className="w-full md:w-auto flex justify-center items-center gap-2 bg-blueBase text-blueDark 
                        px-6 py-2 rounded-lg font-bold hover:bg-blueBaseDark shadow-sm">
                        <Plus size={24} strokeWidth={3} />
                        <span>Crear</span>
                        </button>
                        <div className='flex items-center gap-2 md:gap-4'>
                            <button disabled={currentPage===1} 
                            onClick={(e)=> {setCurrentPage(prev => prev-1); e.stopPropagation()}}
                            className="bg-blueBase text-blueDark px-3 py-2 rounded-lg font-bold 
                            hover:bg-blueBaseDark disabled:opacity-50">
                                Previous
                            </button>

                            <span className='text-blueDark font-bold text-sm whitespace-nowrap'>Page {currentPage} of {totalPages}</span>

                            <button disabled={currentPage===totalPages}
                            onClick={(e)=> {setCurrentPage(prev=>prev+1); e.stopPropagation()}}
                            className="bg-blueBase text-blueDark px-3 py-2 rounded-lg font-bold hover:bg-blueBaseDark disabled:opacity-50">
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