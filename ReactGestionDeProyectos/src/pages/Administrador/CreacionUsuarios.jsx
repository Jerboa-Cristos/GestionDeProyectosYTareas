import { useNavigate } from "react-router-dom"
//AQUÍ DEBE ESTAR EL IMPORT PARA EL DOCUMENTO QUE TIENE CONEXIÓN A LA PARTE DE LOS PROYECTOS
import { guardarUsuarios } from '../../services/adminService';
import { useState } from 'react';
import { User, Mail, Briefcase, Folder, RotateCcw, Plus } from 'lucide-react';
import MenuTop from '../../Components/MenuTop';

function CreacionUsuarios() {
    const token = localStorage.getItem('token');
    const userAdm = localStorage.getItem('user');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '', 
        email: '',
        password: '',
        confirmed_password:'',
        proyecto: '',
        rol: '',
        id_administrador: userAdm.id,
        //id_proyecto: proyecto.id
    })

    //TAMBIÉN FALTA LA PARTE DE PASAR
    /*const [proyecto, setProyecto] = useState()
    useEffect(() => {
        //Aquí se deben cargar los usuarios desde el backend
        const fetchProjects = async () => {
            NOMBRE FUNCIÓN PARA PROYECTOS().then(res => {
                setProyecto(res.data);
            }).catch(err => {
                console.error("Error al cargar los proyectos:", err);
            });
        }
        fetchProjects();
    }, [])
    */


//#region CREACIÓN DEL NUEVO USUARIO
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prev => {
        const newData = {...prev, [name]: value }

        if(name ==='rol' && value === 'Administrador' || value === 'ProductOwner'){
            newData.proyecto='';
        }

        return newData
    })
}

const GuardarUsuario = async (e) => {
    e.preventDefault()
    try{
        await guardarUsuarios(formData, token)
        console.log('Usuario creado')
        navigate('/GestionUsuarios')
    }catch(err){
        console.error('Error al crear del usuario: ', err)
        alert('No se pudo crear el usuario.')
    }
}

//#endregion

    function goBack() {
        navigate('/GestionUsuarios')
    }

    return (
        <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/administrador_profile'/>
            <main className="flex-1 bg-blueBase rounded-xl shadow-lg p-10 flex flex-col relative m-4 overflow-hidden">

                <h1 className="text-3xl font-bold text-blueDark mb-12">
                    Creación de Usuario
                </h1>
            <div className="flex m-5 gap-10">

                <form onSubmit={GuardarUsuario} className="flex-1 w-full max-w-2xl flex flex-col gap-4">
          
                    <div className="relative">
                        <User className="absolute left-4 top-3 text-BlueDark" size={20} />
                        <input 
                        name='nombre'
                        value={formData.nombre}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Nombre apellidos..." 
                        className="w-full h-12 bg-white pl-12 pr-4 rounded-none shadow-sm focus:outline-none focus:ring-2 focus:ring-turquesa italic"
                        />
                    </div>

                    <div className="mt-2 flex flex-col gap-2">
                        <input 
                        name='password'
                        value={formData.password} 
                        onChange={handleChange}
                        type="password" 
                        placeholder="Contraseña..." 
                        className="w-full h-12 bg-white px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-turquesa italic text-center"
                        />
                        <input 
                        name='confirmed_password'
                        value={formData.confirmed_password}
                        onChange={handleChange}
                        type="password" 
                        placeholder="Repetir contraseña..." 
                        className="w-full h-12 bg-white px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-turquesa italic text-center"
                        />
                    </div>

                    <div className="relative mt-2">
                        <Mail className="absolute left-4 top-3 text-blueDark" size={20} />
                        <input 
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        type="email" 
                        placeholder="Correo..." 
                        className="w-full h-12 bg-white pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-turquesa italic text-center"
                        />
                    </div>

                    <div className="relative">
                        <Briefcase className="absolute left-4 top-3 text-blueDark" size={20} />
                        <select 
                        name='rol'
                        value={formData.rol}
                        onChange={handleChange}
                        className="w-full h-12 bg-white pl-12 pr-10 rounded-none shadow-sm focus:outline-none 
                        focus:ring-none italic appearance-none text-center text-gray-500">
                        <option value="">Rol...</option>
                        <option value="Desarrollador">Desarrollador</option>
                        <option value="Administrador">Admin</option>
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
                        value={formData.proyecto} //ESTO SE CAMBIARÍA POR proyecto.id
                        onChange={handleChange}
                        name='proyecto'
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
                    type="submit"
                    className="bg-blueDark text-white px-6 py-2 rounded-lg flex items-center 
                    gap-2 font-medium hover:bg-BlueDarkDark transition-colors shadow-md"
                    >
                        <Plus size={20} />
                        Crear Usuario
                    </button>

                </form>
            </div>
                <div className="mt-auto flex justify-between items-center w-full">
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