import MenuTop from "../../../Components/MenuTop"
import { User, Mail, Briefcase, Folder, RotateCcw, Trash2, LockIcon, Edit3 } from 'lucide-react';
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
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                console.log(res.data)
                localStorage.setItem("user", JSON.stringify({
                    ...user,
                    nombre: res.data.nombre,
                    email: res.data.email
                }))
                
                
                navigate('/GestionUsuarios')
            }
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
            <MenuTop rol={'Administrador'}/>

            <main className="flex-1 bg-blueBase rounded-xl shadow-lg p-10 flex flex-col relative m-4 overflow-hidden">
                <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>

                <form onSubmit={submit} className="space-y-6 mt-4 max-w-md mx-auto rounded-lg p-3" method="post">

                    {
                    errors.length > 0 && <div className="mb-4 p-3 bg-red-100 border border-warning text-warningDark rounded">
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {errors.map((error, index) => 
                            <li key={index}>{error}</li>
                            )}
                            
                        </ul>
                    </div>
                    }


                    <div className="grid gap-2">
                        
                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                            <User className="text-blueDark" size={22} />
                            <input 
                            value={nombre}
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            id="nombre" 
                            name="nombre" 
                            className="bg-white h-12 w-full flex px-4 gap-4 focus:outline-none focus:ring-none
                            text-blueDark text-center font-medium text-lg" 
                            placeholder="Enter your name"/>
                        </div>

                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                            <Mail className="text-blueDark" size={22} />
                            <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="email" 
                            type="email"
                            name="email" 
                            className="bg-white h-12 w-full flex px-4 gap-4 focus:outline-none focus:ring-none
                            text-blueDark text-center font-medium text-lg" 
                            placeholder="Enter your email"/>
                        </div>
                       
                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                            <LockIcon className="text-blueDark" size={22} />
                            <input
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            id="password" 
                            name="password" 
                            autoComplete="password"
                            className="w-full h-12 bg-white px-4 focus:outline-none focus:ring-none italic text-center" 
                            placeholder="Enter your password"/>
                        </div>

                        <div className="bg-white h-12 flex items-center px-4 gap-4 shadow-sm">
                            <LockIcon className="text-blueDark" size={22} />
                            <input 
                            value={confirmed_password}
                            onChange={(e) => setConfirmed_password(e.target.value)}
                            type="password" 
                            id="confirmed_password" 
                            name="confirmed_password"
                            autoComplete="confirmed_password" 
                            className="w-full h-12 bg-white px-4 focus:outline-none focus:ring-none italic text-center" 
                            placeholder="Enter to Confirm your password"/>
                        </div>

                    
                        <button type="submit" 
                        className="bg-blueDashboard text-white px-6 py-2 rounded-lg flex items-center gap-2 font-medium 
                        hover:bg-blueblue transition-colors shadow-md">
                            <Edit3 size={20} />
                            Guardar cambios
                        </button>
                    </div>
                </form>

                    <div className="mt-auto flex flex-row justify-between items-center w-full">
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