import { useNavigate } from "react-router-dom"
//AQUÍ DEBE ESTAR EL IMPORT PARA EL DOCUMENTO QUE TIENE CONEXIÓN A LA PARTE DE LOS PROYECTOS
import { guardarUsuarios, mostrarProyectos } from '../../services/adminService';
import { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Folder, RotateCcw, Plus, LockIcon, Eye, EyeClosed } from 'lucide-react';
import { toast } from 'react-hot-toast'
import MenuTop from '../../Components/MenuTop';
import Loading from '../../Components/Loading';

function CreacionUsuarios() {
    const token = localStorage.getItem('token');
    const userAdm = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([])
    const [showpassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '', 
        email: '',
        password: '',
        confirmed_password:'',
        proyecto: '',
        rol: '',
        id_administrador: userAdm.id,
    })

    //TAMBIÉN FALTA LA PARTE DE PASAR
    const [proyectos, setProyecto] = useState()
    useEffect(() => {
        if (!token) return;
        //Aquí se deben cargar los usuarios desde el backend
        const fetchProjects = async () => {
            setLoading(true);
            mostrarProyectos(token).then(res => {
                setProyecto(res.data);
            }).catch(err => {
                console.error("Error al cargar los proyectos:", err);
                toast.error('No se pudieron cargar los proyectos: ', err)
            }).finally(() => {
                setLoading(false);
            })
        }
        fetchProjects();
    }, [])


//#region CREACIÓN DEL NUEVO USUARIO
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

const GuardarUsuario = async (e) => {
    e.preventDefault()
    console.log('Datos del formulario: ', formData)

    const validationErrors = []

    if(formData.rol === '') {
        validationErrors.push('Seleccione un rol para crear el usuario.')
    }

    if(formData.email === '' || formData.nombre === '') {
        validationErrors.push('Rellene todos los campos para crear el usuario.')
    }

    if(formData.password.trim() !== formData.confirmed_password.trim()) {
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

    toast.promise(guardarUsuarios(formData, token), {
        loading: 'Creando usuario...',
        success: 'Usuario creado con éxito.',
        error: 'No se pudo crear el usuario.'
    }).then(() => {
        navigate('/GestionUsuarios')
    }).catch(err => {
        setErrors(err)
        console.error('Error al crear del usuario: ', err)
    })
}

//#endregion

    function goBack() {
        navigate('/GestionUsuarios')
    }

    //Si está cargando los datos, mostramos el componente de Loading
    if (loading) return <Loading />

    return (
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/administrador_profile'/>
            <main className='flex-1 flex flex-col items-center justify-center bg-blueBase rounded-xl shadow-lg p-6 md:p-10 overflow-hidden'>
                <div className='flex flex-col py-10 w-full max-w-lg lg:max-w-2xl items-center'>
                <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-8 md:mb-12 text-center">
                    <span className="block md:inline">Creación de usuario</span>
                </h1>
                <form onSubmit={GuardarUsuario} className="w-full flex flex-col gap-4">

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
                        <User className="text-blueDark shrink-0" size={20} />
                        <input 
                        name='nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Nombre apellidos. Máximo 100 caracteres." 
                        className="w-full bg-transparent focus:outline-none text-center italic"
                        />
                    </div>

                    <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                        <LockIcon className="text-blueDark shrink-0" size={20} />
                        <input 
                        name='password'
                        value={formData.password} 
                        onChange={handleChange}
                        type={showpassword ? 'text' : 'password'} 
                        placeholder="Contraseña" 
                        className="w-full bg-transparent focus:outline-none text-center italic"
                        />
                        <button type="button" onClick={toggleShowPassword} className="absolute right-4 top-3 text-blueDark">
                            {showpassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                        <LockIcon className="text-blueDark shrink-0" size={20} />
                        <input 
                        name='confirmed_password'
                        value={formData.confirmed_password}
                        onChange={handleChange}
                        type={showpassword ? 'text' : 'password'} 
                        placeholder="Confirmar contraseña" 
                        className="w-full bg-transparent focus:outline-none text-center italic"
                        />
                    </div>

                    <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                        <Mail className="text-blueDark shrink-0" size={20} />
                        <input 
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="Correo" 
                        className="w-full bg-transparent focus:outline-none text-center italic"
                        />
                    </div>

                    <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                        <Briefcase className="text-blueDark shrink-0" size={20} />
                        <select 
                        name='rol'
                        value={formData.rol}
                        onChange={handleChange}
                        className="w-full bg-transparent appearance-none focus:outline-none italic text-center text-gray-500">
                        <option value="">Rol del usuario</option>
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="Administrador">Administrador</option>
                        <option value="ProductOwner">Propietario del Producto</option>
                        </select>
                        <div className="absolute right-4 top-3 pointer-events-none text-blueDark">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>

                    {formData.rol == 'Desarrollador' && (
                    <div className="relative bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                        <Folder className="text-blueDark shrink-0" size={20} />
                        <select 
                        value={formData.proyecto}
                        onChange={handleChange}
                        name='proyecto'
                        className="w-full bg-transparent appearance-none focus:outline-none italic text-center text-gray-500">
                            <option value="">Proyecto asignado</option>
                            {proyectos.map((proyecto) => (
                                <option key={proyecto.id} value={proyecto.id}>
                                    {proyecto.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-3 pointer-events-none text-blueDark">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                        </div>
                    </div>
                    )}

                    <button 
                    type="submit"
                    className="bg-blueDashboard text-white mt-4 px-8 py-3 rounded-lg flex items-center justify-center gap-2 
                font-medium hover:bg-blueblue transition-all shadow-md active:scale-95"
                    >
                        <Plus size={20} />
                        Crear Usuario
                    </button>

                </form>
                </div>
                <div className="mt-8 flex flex-row justify-between items-center w-full max-w-2xl">
                    <button 
                        onClick={goBack}
                        className="text-blueDark hover:scale-110 transition-transform p-2"
                        title="Volver atrás"
                        >
                        <RotateCcw size={40} strokeWidth={2.5} />
                    </button>
                </div>
            </main>
        </div>
    )
}

export default CreacionUsuarios;