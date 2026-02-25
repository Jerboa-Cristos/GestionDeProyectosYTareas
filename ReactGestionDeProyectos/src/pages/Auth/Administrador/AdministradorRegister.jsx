import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { funcion_administrador_register } from "../../../services/authService"

function AdministradorRegister () {
    const PantallaAzul = "flex bg-blueDark items-center justify-center min-h-screen";

    const [nombre, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmed_password, setConfirmed_password] = useState('')
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')
        funcion_administrador_register({nombre: nombre, email: email, password: password, confirmed_password: confirmed_password}, token)
            .then(res => {
                    console.log(res.data)
                    localStorage.setItem("user", JSON.stringify(res.data))
                    navigate('/GestionUsuarios')
                }).catch(err => {
                    setErrors(err)
                    window.alert('Error al registrarse.')
                })        
    }

    return (
        <div className={`${PantallaAzul} flex items-center justify-center p-4 min-h-screen`}>
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl w-full max-w-100 transition-all">

                <div className="flex justify-center mb-6">
                    <div className="bg-blueDark text-white w-12 h-12 flex items-center justify-center 
                    rounded-xl font-extrabold text-xl shadow-lg">
                        M
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-5" method="post">
                    <h1 className="text-2xl md:text-3xl font-bold text-center text-blueDark mb-8">Register</h1>

                    {
                    errors.length > 0 && 
                    <div className="mb-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg 
                    shadow-sm w-full max-w-2xl mx-auto animate-fade-in">
                        <ul className="list-disc pl-7 space-y-1 text-xs md:text-sm font-medium">
                            {errors.map((error, index) => 
                            <li key={index}className="leading-tight">{error}</li>
                            )}
                            
                        </ul>
                    </div>
                    }

                    <div className="grid gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Name: </label>  
                        <input 
                        value={nombre}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Enter your name"/>
                    </div>


                    <div className="flex flex-col gap-1.5">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Email: </label>
                        <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email" 
                        type="email"
                        name="email" 
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Enter your email"/>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Password: </label>
                        <input
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        id="password" 
                        name="password" 
                        autoComplete="password"
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Enter your password"/>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Confirm Password: </label>
                        <input 
                        value={confirmed_password}
                        onChange={(e) => setConfirmed_password(e.target.value)}
                        type="password" 
                        id="confirmed_password" 
                        name="confirmed_password"
                        autoComplete="confirmed_password" 
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark text-blueDark 
                        placeholder-blueblue/60 transition-all" 
                        placeholder="Enter to Confirm your password"/>
                    </div>
                    <button type="submit" className="w-full flex justify-center items-center h-12 mt-4 rounded-lg text-base font-bold text-white bg-blueDark 
                    hover:bg-blueblue active:scale-[0.98] transition-all shadow-md">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default AdministradorRegister