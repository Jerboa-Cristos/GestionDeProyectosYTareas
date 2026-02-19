import { Link, useNavigate } from "react-router-dom"
import MenuTop  from '../../Components/MenuTop'

function ProductOwnerDashboard () {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        navigate('/product_owner_login')
    }

    return (
        <>
        
            <MenuTop/>
            <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white shadow-md p-5">
                <h2 className="text-xl font-bold mb-6">My app</h2>
                <nav className="flex flex-col space-y-3">
                    <Link to="/product_owner_dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                    <Link to="/product_owner_profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
                    <Link to="/lista_proyectos">Proyectos</Link>

                    <a onClick={logout} className="text-gray-700 hover:text-blue-600">Logout</a>

                </nav>
            </aside>

            <div className="flex-1 flex-col">
                <header className="bg-white shadow px-6 py-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                </header>

                <main className="flex-1 p-6">Hi {user.nombre}
                    <p className="text-gray-700 text-lg"></p>
                </main>
            </div>
            </div>
        </>

        
    )
}


export default ProductOwnerDashboard