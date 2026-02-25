import MenuTop from "../../../Components/MenuTop"
import { User, Mail, Briefcase, RotateCcw, LockIcon, Edit3 } from 'lucide-react';
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { funcion_administrador_profile } from "../../../services/authService"

function AdministradorProfile () {
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)

    const [nombre, setName] = useState(user.nombre)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [confirmed_password, setConfirmed_password] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        setErrors([])
        
        funcion_administrador_profile({nombre: nombre, email: email, password: password, confirmed_password: confirmed_password}, user.token)
        .then(res => {
            console.log(res.data)
            localStorage.setItem("user", JSON.stringify({
                ...user,
                nombre: res.data.nombre,
                email: res.data.email
            }))
            navigate('/GestionUsuarios')
        }).catch(err => {
            setErrors(err)
            window.alert('Error al cambiar los datos.')
        })
    }

    //#region Función para volver al listado de antes
const volverAtras = () => {
        navigate('/GestionUsuarios');
}
//#endregion

    return (
        <>
          <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop rutaPerfil='/administrador_profile'/>

            <main className='flex-1 flex flex-col items-center justify-center bg-blueBase rounded-xl shadow-lg p-6 md:p-10 overflow-hidden'>
                <div className='flex flex-col py-10 w-full max-w-lg lg:max-w-2xl items-center'>
                <h1 className="text-2xl md:text-3xl font-bold text-blueDark mb-8 md:mb-12 text-center">
                    <span className="block md:inline">Profile</span>
                </h1>

                <form onSubmit={submit} className="w-full flex flex-col gap-4" method="post">

                    {
                    errors.length > 0 && 
                    <div className="mb-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm w-full max-w-2xl mx-auto animate-fade-in">
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
                            value={nombre}
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            className="bg-transparent w-full focus:outline-none text-blueDark text-center font-medium text-lg"
                            placeholder="Enter your name"/>
                        </div>

                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                            <Mail className="text-blueDark shrink-0" size={22} />
                            <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email" 
                            type="email"
                            name="email" 
                            className="bg-transparent w-full focus:outline-none text-blueDark text-center font-medium text-lg"
                            placeholder="Enter your email"/>
                        </div>
                       
                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                            <LockIcon className="text-blueDark shrink-0" size={22} />
                            <input
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            name="password" 
                            autoComplete="password"
                            className="w-full bg-transparent focus:outline-none italic text-center"
                            placeholder="Enter your password"/>
                        </div>

                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                            <LockIcon className="text-blueDark shrink-0" size={22} />
                            <input 
                            value={confirmed_password}
                            onChange={(e) => setConfirmed_password(e.target.value)}
                            type="password" 
                            id="confirmed_password" 
                            name="confirmed_password"
                            autoComplete="confirmed_password" 
                            className="w-full bg-transparent focus:outline-none italic text-center" 
                            placeholder="Enter to Confirm your password"/>
                        </div>

                            <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm w-full">
                                <Briefcase className="text-blueDark shrink-0" size={22}/>
                                <p className="bg-transparent w-full text-blueDark text-center font-medium text-lg" >Administrador</p>
                            </div>
                    
                        <button type="submit" 
                        className="bg-blueDashboard text-white mt-4 px-8 py-3 rounded-lg flex items-center justify-center gap-2 
                        font-medium hover:bg-blueblue transition-all shadow-md active:scale-95">
                            <Edit3 size={20} />
                            Guardar cambios
                        </button>
                    </form>
                </div>
                    <div className="mt-8 flex flex-row justify-between items-center w-full max-w-2xl">
                        <button 
                        onClick={(e)=>{volverAtras(); e.stopPropagation}}
                        className="text-blueDark hover:scale-110 transition-transform p-2"
                        title="Volver atrás"
                        >
                        <RotateCcw size={40} strokeWidth={2.5} />
                        </button>
                    </div>
            </main>
          </div>
        </>

        
    )
}


export default AdministradorProfile