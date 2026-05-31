import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { funcion_administrador_register } from "../../../services/authService"
import { Eye, EyeClosed } from 'lucide-react';
import { toast } from 'react-hot-toast';

function AdministradorRegister () {
    const PantallaAzul = "flex bg-blueDark items-center justify-center min-h-screen";

    const [nombre, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmed_password, setConfirmed_password] = useState('')
    const [showpassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()

        const validationErrors = []

        if(password === '' || email === '' || nombre === '' || confirmed_password === '') {
            validationErrors.push('Rellene todos los campos para iniciar sesión.')
        }

        if(password !== confirmed_password) {
            validationErrors.push('Las contraseñas no coinciden.')
        }

        if(!nombre.toLocaleLowerCase().match(/^[A-Za-z\s'-]+$/)) {
            validationErrors.push('El nombre no puede contener números.')
        }

        if(nombre.toLocaleLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            validationErrors.push('El nombre no puede tener formato de correo electrónico.')
        }

        if(!email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            validationErrors.push('El correo debe tener el siguiente formato: example@domain.com')
        }

        if(validationErrors.length > 0) {
            setErrors(validationErrors)
            return;
        }

        setErrors([])
        const token = localStorage.getItem('token')
        funcion_administrador_register({nombre: nombre, email: email, password: password, confirmed_password: confirmed_password}, token)
            .then(res => {
                    console.log(res.data)
                    localStorage.setItem("user", JSON.stringify(res.data))
                    navigate('/GestionUsuarios')
                    toast.success('¡Administrador registrado exitosamente!')
                }).catch(err => {
                    setErrors(['Surgió un error al registrarse.' + err.message])
                })    
    }

    const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
    }

    const goLogin = () => {
        navigate('/login')
    }

    return (
        <div className={`${PantallaAzul} flex items-center justify-center p-2 min-h-screen`}>
            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl w-full max-w-100 transition-all">

                <div className="flex justify-center mb-4">
                    <div className="bg-blueDark text-white w-12 h-12 flex items-center justify-center 
                    rounded-xl font-extrabold text-xl shadow-lg">
                        M
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-5" method="post" noValidate>
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-blueDark mb-6">Registro de Administrador</h1>

                    {
                    errors.length > 0 && 
                    <div className="mb-6 p-3 md:p-4 bg-red-50 ring-2 border-red-500 text-red-700 rounded-lg shadow-sm w-full max-w-2xl mx-auto animate-fade-in">
                        <ul className="list-disc pl-7 space-y-1 text-xs md:text-sm font-medium">
                            {errors.map((error, index) => 
                            <li key={index}className="leading-tight">{error}</li>
                            )}
                            
                        </ul>
                    </div>
                    }

                    <div className="grid gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Nombre:</label>  
                        <input 
                        value={nombre}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Ponga su nombre"/>
                    </div>


                    <div className="flex flex-col gap-1">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Correo: </label>
                        <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email" 
                        type="email"
                        name="email" 
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Ponga su correo"/>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Contraseña: </label>
                        <div className="relative">
                            <input
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            type={showpassword ? 'text' : 'password'}  
                            id="password" 
                            name="password" 
                            autoComplete="password"
                            className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                            placeholder-blueblue/60 transition-all" 
                            placeholder="Ponga su contraseña"/>
                            <button type="button" onClick={toggleShowPassword} className="absolute right-4 top-3 text-blueDark">
                                {showpassword ? <EyeClosed size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Confirmar Contraseña: </label>
                        <input 
                        value={confirmed_password}
                        onChange={(e) => setConfirmed_password(e.target.value)}
                        type={showpassword ? 'text' : 'password'}  
                        id="confirmed_password" 
                        name="confirmed_password"
                        autoComplete="confirmed_password" 
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Ponga su contraseña de nuevo"/>
                    </div>
                    <button type="submit" className="w-full flex justify-center items-center h-12 mt-4 rounded-lg text-base font-bold text-white bg-blueDark 
                    hover:bg-blueblue active:scale-[0.98] transition-all shadow-md">Crear cuenta</button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <button onClick={goLogin} className="text-gray-400 font-bold text-sm hover:underline">Tengo cuenta</button>
                </div>
            </div>
        </div>

    )
}

export default AdministradorRegister