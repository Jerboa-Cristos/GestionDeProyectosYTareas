import { User, Mail, Briefcase, Folder, RotateCcw, Edit3, LockIcon, Eye, EyeClosed } from 'lucide-react';
import {useParams, useNavigate} from 'react-router-dom';
import { showUsuarios, updateUsuarios, mostrarProyectos} from '../../services/adminService';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AlertDeleteUser } from '../../Components/Com_Administrador/AlertDeleteUser';
import MenuTop from '../../Components/MenuTop';
import Loading from '../../Components/Loading';

function PerfilUsuario() {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const {rol, id} = useParams();
    const [loading, setLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([])
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

            if(update) {
                setUpdate(false);
                return;
            }

            try{
                setLoading(true);
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
                toast.error('No se pudieron cargar los datos del usuario.')
            } finally {
                setLoading(false);
            }
        }
        cargarTodo()
     }, [rol, id, token])

//#region Función para hacer UPDATE del usuario
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => {
        const newData = {...prev, [name]: value.trim() }

        if(name ==='rol' && (value === 'Administrador' || value === 'ProductOwner')){
            newData.proyecto='';
        }

        return newData
    })
}

const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
}

const UpdateUsuario = (e) => {
    e.preventDefault()

    const validationErrors = []

    if(formData.rol === '') {
        validationErrors.push('Seleccione un rol para actualizar el usuario.')
    }

    if(formData.email === '' || formData.nombre === '') {
        validationErrors.push('Rellene todos los campos para actualizar el usuario.')
    }

    if(formData.password.trim() !== formData.password_confirmation.trim()) {
        validationErrors.push('Las contraseñas no coinciden.')
    }

    if(!formData.nombre.toLocaleLowerCase().match(/^[\p{L}.\-\s]+$/gu)) {
        validationErrors.push('El nombre no puede contener números o caracteres especiales.')
    }

    if(formData.nombre.toLocaleLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        validationErrors.push('El nombre no puede tener formato de correo electrónico.')
    }

    if(!formData.email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        validationErrors.push('El correo debe tener el siguiente formato: example@domain.com')
    }

    if(validationErrors.length > 0) {
        setErrors(validationErrors)
        return;
    }

    setErrors([])

    const currRol = formData.rol;
    const currEmail = formData.email;

    updateUsuarios(formData, currRol, id, token).then(res => {
        console.log('Usuario actualizado')
        toast.success('Usuario actualizado con éxito.');

        setUpdate(true);

        setFormData(prevFormData => ({
            ...prevFormData,
            oldRol: currRol,
            oldEmail: currEmail,
            password: '',
            password_confirmation: ''
        }));

        navigate(`/PerfilUsuario/${currRol}/${id}`, { replace: true });


    }).catch(err=>{
        console.error('Error al hacer Update del usuario: ', err)
        setErrors(err)
        toast.error('No se pudo actualizar el usuario.');
    })
}
//#endregion

//#region Función para volver al listado de antes
const volverAtras = () => {
    navigate('/GestionUsuarios');
}
//#endregion

//Si está cargando los datos, mostramos el componente de Loading
if (loading) return <Loading />

    return (
    <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/administrador_profile'/>
        <main className='flex-1 flex flex-col items-center justify-center bg-blueBase rounded-xl shadow-lg p-6 md:p-10 overflow-hidden'>

        <div className='flex flex-col py-10 w-full max-w-lg lg:max-w-2xl items-center'>
            <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-8 md:mb-12 text-center">
                Perfil del usuario: <span className="block md:inline">{formData.nombre} - {rol}</span>
            </h1>

            <form onSubmit={UpdateUsuario} className="w-full flex flex-col gap-4" noValidate>

                {
                    errors.length > 0 && 
                    <div className="mb-6 p-3 md:p-4 bg-red-50 ring-2 border-red-500 text-red-700 rounded-lg shadow-sm w-full max-w-2xl mx-auto animate-fade-in">
                        <ul className="list-disc pl-7 space-y-1 text-xs md:text-sm font-medium">
                            {errors.map((error, index) => 
                            <li key={index} className="leading-tight">{error}</li>
                            )}
                            
                        </ul>
                    </div>
                }
                
                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <User className="text-blueDark shrink-0" size={22} />
                    <input 
                        value={formData.nombre}
                        onChange={handleChange}
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="bg-transparent w-full focus:outline-none text-blueDark text-center font-medium text-lg" 
                        placeholder="Nombre del usuario. Máximo 100 caracteres.">
                            
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
                        placeholder="Correo del usuario">
                            
                    </input>
                </div>

                <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <LockIcon className="text-blueDark shrink-0" size={22} />
                    <input 
                    name='password'
                    value={formData.password} 
                    onChange={handleChange}
                    type={showpassword ? 'text' : 'password'}
                    placeholder="Contraseña nueva..." 
                    className="w-full bg-transparent focus:outline-none italic text-center"
                    />
                    <button type="button" onClick={toggleShowPassword} className="absolute right-4 top-3 text-blueDark">
                            {showpassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                    <LockIcon className="text-blueDark shrink-0" size={22} />
                    <input 
                    name='password_confirmation'
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    type={showpassword ? 'text' : 'password'}
                    placeholder="Confirmar contraseña nueva..." 
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
                        <option value="">Rol del usuario</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="ProductOwner">Propietario del Producto</option>
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
                            <option value="">Proyecto asignado</option>
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

            <AlertDeleteUser id={id} rol={rol} token={token} onUserDeleted={volverAtras} />
        </div>
        </main>
    </div>
    )
}

export default PerfilUsuario