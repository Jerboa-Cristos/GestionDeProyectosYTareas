import { User, Mail, Briefcase, Folder, RotateCcw, Edit3, Trash2, LockIcon } from 'lucide-react';
import {useParams, useNavigate} from 'react-router-dom';
import {eliminarUsuario, showUsuarios, updateUsuarios, mostrarProyectos} from '../../services/adminService';
import { useEffect, useState } from 'react';
import MenuTop from '../../Components/MenuTop';

function PerfilUsuario() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {rol, id} = useParams();
    const [loading, setLoading] = useState(true);
    const [proyectos, setProyecto] = useState()
    const [formData, setFormData] = useState({
        nombre: '', 
        email: '',
        oldEmail: '',
        password: '',
        password_confirmation:'',
        rol: '',
        oldRol:'',
        proyecto: ''
    })

    useEffect(() => {
        //Cargamos la información del usuario solo
        const cargarTodo = async () => {
            if (!token) return;
            try{
                const [resUser, resProyectos] = await Promise.all([
                showUsuarios(rol, id, token),
                mostrarProyectos(token),
                ]);

                setProyecto(resProyectos.data),
                setFormData({
                    ...formData,
                    nombre: resUser.data.nombre || '',
                    email: resUser.data.email || '',
                    oldEmail: resUser.data.email || '',
                    rol: rol,
                    oldRol: rol,
                    proyecto: resUser.data.id_proyecto || '' // Aquí ya existen los proyectos
                })
            } catch(err) {
                console.error('No se pudo cargar los datos por: ' , err)
            } finally {
                setLoading(false);
            }
        }
        cargarTodo()
     }, [rol, id, token])

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
        <MenuTop rutaPerfil='/administrador_profile'/>
        <main className='flex-1 flex flex-col items-center justify-center bg-blueBase rounded-xl shadow-lg p-6 md:p-10 overflow-hidden'>

        <div className='flex flex-col py-10 w-full max-w-lg lg:max-w-2xl items-center'>
            <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-8 md:mb-12 text-center">
                Perfil del usuario: <span className="block md:inline">{formData.nombre} - {rol}</span>
            </h1>

            <form onSubmit={UpdateUsuario} className="w-full flex flex-col gap-4">
                
                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <User className="text-blueDark shrink-0" size={22} />
                    <input 
                        value={formData.nombre}
                        onChange={handleChange}
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="bg-transparent w-full focus:outline-none text-blueDark text-center font-medium text-lg" 
                        placeholder="Nombre del usuario">
                            
                    </input>
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <Mail className="text-blueDark shrink-0" size={22} />
                    <input 
                        value={formData.email}
                        onChange={handleChange}
                        type="text" 
                        id="email" 
                        name="email" 
                        className="bg-transparent w-full focus:outline-none text-blueDark text-center font-medium text-lg" 
                        placeholder="Email del usuario">
                            
                    </input>
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <LockIcon className="text-blueDark shrink-0" size={22} />
                    <input 
                    name='password'
                    value={formData.password} 
                    onChange={handleChange}
                    type="password" 
                    placeholder="Contraseña nueva..." 
                    className="w-full bg-transparent focus:outline-none italic text-center"
                    />
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <LockIcon className="text-blueDark shrink-0" size={22} />
                    <input 
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    type="password" 
                    placeholder="Repetir contraseña nueva..." 
                    className="w-full bg-transparent focus:outline-none italic text-center"
                    />
                </div>

                <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <Briefcase className="text-blueDark shrink-0" size={22} />
                    <select 
                    name='rol'
                    value={formData.rol}
                    onChange={handleChange}
                    className="w-full bg-transparent appearance-none text-center text-blueDark font-medium text-lg focus:outline-none">
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
                    <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                        <Folder className="absolute left-4 top-3 text-blueDark" size={20} />
                        <select 
                        value={formData.proyecto}
                        onChange={handleChange}
                        name='proyecto'
                        className="w-full h-12 bg-white pl-12 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-turquesa italic appearance-none text-center text-gray-500">
                            {proyectos && proyectos.map((proyecto) => (
                                <option key={proyecto.id} value={proyecto.id}>{proyecto.nombre}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-3 pointer-events-none text-blueDark">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>
                )}

                <button 
                type='submit'
                className="bg-blueDashboard text-white mt-4 px-8 py-3 rounded-lg flex items-center justify-center gap-2 
                font-medium hover:bg-blueblue transition-all shadow-md active:scale-95">
                <Edit3 size={20} />
                Guardar cambios
                </button>

            </form>
        </div>


        <div className="mt-8 flex flex-row justify-between items-center w-full max-w-2xl">

            <button 
            onClick={(e)=>{volverAtras(); e.stopPropagation()}}
            className="text-blueDark hover:scale-110 transition-transform p-2"
            title="Volver atrás">
            <RotateCcw size={40} strokeWidth={2.5} />
            </button>

            <button 
                onClick={(e)=>{eliminarPersona(id, rol, token); e.stopPropagation();}}
                className="bg-warningDark text-white p-3 rounded-full hover:bg-warning transition-colors shadow-md hover:scale-105"
                title="Eliminar perfil">
                <Trash2 size={24} />
            </button>
        </div>
        </main>
    </div>
    )
}

export default PerfilUsuario