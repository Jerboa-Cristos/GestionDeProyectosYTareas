import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { funcion_desarrollador_login, funcion_administrador_login, funcion_product_owner_login } from "../../services/authService"

function DesarrolladorLogin () {
    const PantallaAzul = "flex bg-blueDark items-center justify-center min-h-screen";

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const [rol, setRol] = useState('')
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        switch(rol) {
            case 'Desarrollador':
                funcion_desarrollador_login({email: email, password: password}).then(res => {
                    console.log(res.data)
                    const {nombre, email, id, token} = res.data
                    localStorage.setItem("token", token) 
                    localStorage.setItem("user", JSON.stringify({nombre, email, id}))
                    navigate('/DashboardDesarrollador')
                }).catch(err => {
                    setErrors(err)
                    window.alert('No existe tal usuario. Compruebe los datos.')
                })
                break;
            case 'Administrador':
                funcion_administrador_login({email: email, password: password}).then(res => {
                    console.log(res.data)
                    const {nombre, email, id, token} = res.data
                    localStorage.setItem("token", token) 
                    localStorage.setItem("user", JSON.stringify({nombre, email, id}))
                    navigate('/GestionUsuarios')
                }).catch(err => {
                    setErrors(err)
                    window.alert('No existe tal usuario. Compruebe los datos.')
                })
                break;
            case 'ProductOwner':
                funcion_product_owner_login({email: email, password: password}).then(res => {
                    console.log(res.data)
                    const {nombre, email, id, token} = res.data
                    localStorage.setItem("token", token) 
                    localStorage.setItem("user", JSON.stringify({nombre, email, id}))
                    navigate('/product_owner_dashboard')
                }).catch(err => {
                    setErrors(err)
                    window.alert('No existe tal usuario. Compruebe los datos.')
                })
                break;
        }
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
                <h1 className="text-2xl md:text-3xl font-bold text-center text-blueDark mb-8">Login</h1>

                {
                errors.length > 0 && 
                <div className="mb-6 p-3 md:p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg shadow-sm w-full 
                max-w-2xl mx-auto animate-fade-in">
                    <ul className="list-disc pl-7 space-y-1 text-xs md:text-sm font-medium">
                        {errors.map((error, index) => 
                        <li key={index} className="leading-tight">{error}</li>
                        )}
                        
                    </ul>
                </div>
                }

                <div className="grid gap-4">
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
                        <label className="text-blueDark text-xs md:text-sm font-bold ml-1">Rol: </label>
                        <select 
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        className="w-full rounded-lg px-4 h-12 bg-blueBase border-none focus:ring-2 focus:ring-blueDark 
                        text-blueDark appearance-none cursor-pointer">
                            <option value="">Rol...</option>
                            <option value="Desarrollador">Desarrollador</option>
                            <option value="Administrador">Admin</option>
                            <option value="ProductOwner">Product Owner</option>
                        </select>
                    </div>

                </div>
                <button type="submit" 
                className="w-full flex justify-center items-center h-12 mt-4 rounded-lg text-base font-bold text-white bg-blueDark 
                hover:bg-blueblue active:scale-[0.98] transition-all shadow-md">Submit</button>
            </form>
        </div>
    </div>
    )
}

export default DesarrolladorLogin