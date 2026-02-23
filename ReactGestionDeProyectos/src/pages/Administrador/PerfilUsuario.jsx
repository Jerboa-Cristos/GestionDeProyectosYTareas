import { User, Mail, Briefcase, Folder, RotateCcw, Edit3, Trash2, LockIcon } from 'lucide-react';
import {useParams, useNavigate} from 'react-router-dom';
import {eliminarUsuario, showUsuarios, updateUsuarios} from '../../services/adminService';
import { useEffect, useState } from 'react';
import MenuTop from '../../Components/MenuTop';

function PerfilUsuario() {
    const userAdmin = JSON.parse(localStorage.getItem('user'))
    const token = userAdmin?.token
    const navigate = useNavigate();
    const {rol, id} = useParams();
    const [formData, setFormData] = useState({
        nombre: '', 
        email: '',
        oldEmail: '',
        password: '',
        password_confirmation:'',
        rol: '',
        oldRol:'',
        id_proyecto: ''
    })

    useEffect(() => {
        //Cargamos la información del usuario solo
        const fetchUser = async () => {
            showUsuarios(rol, id, token).then(res => {
                setFormData({
                    ...formData,
                    nombre: res.data.nombre || '',
                    email: res.data.email || '',
                    oldEmail: res.data.email || '',
                    oldRol: rol,
                    rol: rol,
                    id_proyecto: res.data.id_proyecto || ''
                })
                console.log('Datos: ', res.data)
            }).catch(err => {
                console.error("Error al cargar los usuarios:", err);
            });
        }
        fetchUser();
     }, [rol, id])

//#region Función para hacer UPDATE del usuario
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
        ...formData,
        [name]: value
    })
}

const UpdateUsuario = (e) => {
    e.preventDefault()
    updateUsuarios(formData, formData.rol, id, token).then(res => {
        console.log('Usuario actualizado')
        alert('Usuario Actualizado con exito.');
    }).catch(err=>{
        console.error('Error al hacer Update del usuario: ', err)
    })
}
//#endregion

//#region Función para volver al listado de antes
const volverAtras = () => {
    navigate('/GestionUsuarios');
}
//#endregion

//#region Función para eliminar un usuario
    const eliminarPersona = async (id, rol, token) => {
        try {
            await eliminarUsuario(id, rol, token)
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
        <MenuTop rutaLogin='/administrador_login' rutaPerfil='/administrador_profile'/>
        <main className="flex-1 bg-blueBase rounded-xl shadow-lg p-10 flex flex-col gap-10 relative m-4 overflow-hidden">

        <div className='flex flex-col'>
            <h1 className="text-3xl font-bold text-blueDark mb-12">
                Perfil del usuario: {formData.nombre} - {rol}
            </h1>

            <form onSubmit={UpdateUsuario} className="flex-1 w-full max-w-3xl flex flex-col gap-3">
                
                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <User className="text-blueDark" size={22} />
                    <input 
                        value={formData.nombre}
                        onChange={handleChange}
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="bg-white h-12 w-full flex px-4 gap-4 focus:outline-none focus:ring-none
                        text-blueDark text-center font-medium text-lg" 
                        placeholder="Nombre del usuario">
                            
                    </input>
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <Mail className="text-blueDark" size={22} />
                    <input 
                        value={formData.email}
                        onChange={handleChange}
                        type="text" 
                        id="email" 
                        name="email" 
                        className="bg-white h-12 w-full flex px-4 gap-4 focus:outline-none focus:ring-none
                        text-blueDark text-center font-medium text-lg" 
                        placeholder="Email del usuario">
                            
                    </input>
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <LockIcon className="text-blueDark" size={22} />
                    <input 
                    name='password'
                    value={formData.password} 
                    onChange={handleChange}
                    type="password" 
                    placeholder="Contraseña nueva..." 
                    className="w-full h-12 bg-white px-4 focus:outline-none focus:ring-none italic text-center"
                    />
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <LockIcon className="text-blueDark" size={22} />
                    <input 
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    type="password" 
                    placeholder="Repetir contraseña nueva..." 
                    className="w-full h-12 bg-white px-4 focus:outline-none focus:ring-none italic text-center"
                    />
                </div>

                <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                    <Briefcase className="text-blueDark" size={22} />
                    <select 
                    name='rol'
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full h-12 bg-white pl-12 pr-10 rounded-none focus:outline-none focus:ring-none
                        appearance-none text-center text-blueDark font-medium text-lg">
                        <option value="">Rol...</option>
                        <option value="Administrador">Admin</option>
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="ProductOwner">Product Owner</option>
                    </select>
                    <div className="absolute right-4 top-3 pointer-events-none text-blueDark">
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                    </div>
                </div>



                {formData.rol == 'Desarrollador' && (
                    <div className="relative">
                        <Folder className="absolute left-4 top-3 text-blueDark" size={20} />
                        <select 
                        value={formData.proyecto}
                        onChange={handleChange}
                        name='id_proyecto'
                        className="w-full h-12 bg-white pl-12 pr-10 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-turquesa italic appearance-none text-center text-gray-500">
                        <option value="">Elegir proyecto</option>
                        <option value="1">Proyecto N1</option>
                        </select>
                        <div className="absolute right-4 top-3 pointer-events-none text-blueDark">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>
                )}

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
                onClick={(e)=>{eliminarPersona(id, rol, token); e.stopPropagation();}}
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