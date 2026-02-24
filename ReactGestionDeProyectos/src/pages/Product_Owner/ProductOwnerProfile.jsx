import MenuTop from "../../Components/MenuTop"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
//import { profile } from "../../services/authService"
import { funcion_product_owner_profile } from "../../services/authService"

function ProductOwnerProfile () {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    const token = localStorage.getItem('token')
    console.log(user)

    const [nombre, setNombre] = useState(user.nombre || '')
    const [email, setEmail] = useState(user.email || '')
    const [errors, setErrors] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/')
        }

        funcion_product_owner_profile(token)
        .then(res => {
                console.log('Autenticado', res.data)
                console.log(res.data)
                setNombre(res.data.nombre || '')
                setEmail(res.data.email || '')

                localStorage.setItem("user", JSON.stringify({
                    nombre: res.data.nombre,
                    email: res.data.email
                }))
                
                
            })
            .catch(error =>{
                console.log('No autenticado', error.response)
                navigate('/')
        })

    }, [])

    
        
    

    return (
        <>
          <div className="min-h-screen bg-blueDark p-4 flex flex-col font-sans">
            <MenuTop/>

            <aside className="w-64 bg-white shadow-md p-5">
                <h2 className="text-xl font-bold mb-6">My app</h2>
                <nav className="flex flex-col space-y-3">
                    <Link to="/product_owner_dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                    <Link to="/product_owner_profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
                </nav>
            </aside>

            <div className="flex-1 flex-col">
                <header className="bg-white shadow px-6 py-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Profile</h1>
                </header>

                <main className="flex-1 p-6">

                    <div  className="space-y-6 mt-4 max-w-md mx-auto border border-blue-300 rounded-lg p-3"   method="post">
                    <h1 className="font-black text-center text-2x1">Profile</h1>
                    </div>

                    <div className="border border-BlueBaseDark mt-3 p-3 rounded-2xl">
                        <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Nombre: </label>
                        <input
                        className="mt-1 block w-full rounded-md border text-black border-gray-300 px-3 py-2 text-2x2"
                        value={nombre} 
                        type="text"
                         readOnly
                        />

                        <label className="text-sm leading-none font-medium select-none peer-disabled:cursor">Email: </label>
                        <input
                        className="mt-1 block w-full rounded-md text-black border border-gray-300 px-3 py-2 text-2x2"
                        value={email} 
                        type="text" 
                        readOnly
                        />
                    </div>

                </main>
            </div>
          </div>
        </>

    )
}


export default ProductOwnerProfile