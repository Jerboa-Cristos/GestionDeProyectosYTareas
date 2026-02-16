import MenuTop from "../../../Components/MenuTop"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
//import { profile } from "../../services/authService"
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
                
                
                navigate('/administrador_dashboard')
            }
        })
    }

    return (
        <>
          <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>

            <aside className="w-64 bg-white shadow-md p-5">
                <h2 className="text-xl font-bold mb-6">My app</h2>
                <nav className="flex flex-col space-y-3">
                    <Link to="/administrador_dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                    <Link to="/administrador_profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
                </nav>
            </aside>

            <div className="flex-1 flex-col">
                <header className="bg-white shadow px-6 py-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
                </header>

                <main className="flex-1 p-6">

                    <form onSubmit={submit} className="space-y-6 mt-4 max-w-md mx-auto border border-blue-300 rounded-lg p-3"   method="post">
                    <h1 className="font-black text-center text-2x1">Profile</h1>

                    {
                    errors.length > 0 && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                            {errors.map((error, index) => 
                            <li key={index}>{error}</li>
                            )}
                            
                        </ul>
                    </div>
                    }


                    <div className="grid gap-2">
                        <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Name: </label>
                        
                        <input 
                        value={nombre}
                        onChange={(e) => setName(e.target.value)}
                        type="text" 
                        id="nombre" 
                        name="nombre" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                        placeholder="Enter your name"/>


                        <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Email: </label>
                        <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email" 
                        type="email"
                        name="email" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                        placeholder="Enter your email"/>

                        <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Password: </label>
                        <input
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" 
                        id="password" 
                        name="password" 
                        autoComplete="password"
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                        placeholder="Enter your password"/>

                        <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Confirm Password: </label>
                        <input 
                        value={confirmed_password}
                        onChange={(e) => setConfirmed_password(e.target.value)}
                        type="password" 
                        id="confirmed_password" 
                        name="confirmed_password"
                        autoComplete="confirmed_password" 
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-2x2" 
                        placeholder="Enter to Confirm your password"/>


                    </div>
                    <button type="submit" className="bg-green-400 hover:bg-green-700  font-medium py-2 px-4 rounded-lg  mx-auto block">Submit</button>

                    </form>
                </main>
            </div>
          </div>
        </>

        
    )
}


export default AdministradorProfile