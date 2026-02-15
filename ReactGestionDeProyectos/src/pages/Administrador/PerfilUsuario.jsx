import { User, Mail, Briefcase, Folder, RotateCcw, Edit3, Trash2 } from 'lucide-react';
import {useParams, useNavigate} from 'react-router-dom';
import {eliminarUsuario, showUsuarios, updateUsuarios} from '../../services/adminService';
import { useEffect, useState } from 'react';
import MenuTop from '../../Components/MenuTop';

function PerfilUsuario() {
    const navigate = useNavigate();
    const {rol, id} = useParams();
    const [user, setUser] = useState([]);
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState(user.password)
    const [confirmed_password, setConfirmed_password] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        //Cargamos la información del usuario solo
        const fetchUser = async () => {
            showUsuarios(rol, id).then(res => {
                setUser(res.data);
                console.log('Datos: ', res.data)
            }).catch(err => {
                console.error("Error al cargar los usuarios:", err);
            });
        }
        fetchUser();
     }, [rol, id])

//#region Función para hacer UPDATE del usuario
const UpdateUsuario = (e) => {
    e.preventDefault()
    console.log('UPDATE DE USUARIO')
}
//#endregion

//#region Función para volver al listado de antes
const volverAtras = () => {
    navigate('/GestionUsuarios');
}
//#endregion

//#region Función para eliminar un usuario
    const eliminarPersona = async (id, rol) => {
        try {
            await eliminarUsuario(id, rol)
            console.log('Usuario eliminado con éxito');
            navigate('/GestionUsuarios', { replace: true });
        }catch(err) {
            console.error("Error al eliminar el usuario:", err);
            alert('No se pudo eliminar el usuario.')
        }
    }
//#endregion

    return (
    <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
        <MenuTop/>
        <main className="flex-1 bg-blueBase rounded-xl shadow-lg p-10 flex flex-col gap-10 relative m-4 overflow-hidden">

        <div className='flex flex-col'>
            <h1 className="text-3xl font-bold text-blueDark mb-12">
                Perfil del usuario: {user.nombre} - {rol}
            </h1>

            <form onSubmit={UpdateUsuario} className="flex-1 w-full max-w-3xl flex flex-col gap-3">
                
                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <User className="text-blueDark" size={22} />
                    <span className="text-blueDark text-lg font-medium">{user.nombre}</span>
                </div>


                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <Mail className="text-blueDark" size={22} />
                    <span className="text-blueDark text-lg font-medium">{user.email}</span>
                </div>


                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <Briefcase className="text-blueDark" size={22} />
                    <span className="text-blueDark text-lg font-medium">{rol}</span>
                </div>


                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <Folder className="text-blueDark" size={22} />
                    <span className="text-blueDark text-lg font-medium"></span>
                </div>

                <button 
                type='submit'
                className="bg-blueDashboard text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium 
                hover:bg-blueblue transition-colors shadow-md"
                >
                <Edit3 size={20} />
                Guardar cambios
                </button>

            </form>
        </div>


        <div className="mt-auto flex flex-row justify-between items-center w-full">

            <button 
            onClick={(e)=>{volverAtras(); e.stopPropagation}}
            className="text-blueDark hover:scale-110 transition-transform p-2"
            title="Volver atrás"
            >
            <RotateCcw size={40} strokeWidth={2.5} />
            </button>


            <div className="flex gap-4">

            <button 
                onClick={(e)=>{eliminarPersona(id, rol); e.stopPropagation();}}
                className="bg-warningDark text-white p-3 rounded-full hover:bg-warning transition-colors 
                shadow-md hover:scale-105"
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