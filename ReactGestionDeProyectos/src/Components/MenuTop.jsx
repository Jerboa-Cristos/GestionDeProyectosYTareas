import { useNavigate } from "react-router-dom"


import { UserCircle, LogOut } from 'lucide-react';



//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
function MenuTop() {
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()

    const logout = () => {
        /*localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')*/
        navigate('/login')
    }

    const goToProfile = () => {
        navigate('/PerfilUsuario')
    }

    return (
    <header className="bg-white rounded-xl h-14 flex items-center 
            justify-between px-6 mb-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="bg-blueDark rounded-md w-8 h-8 flex 
                items-center justify-center font-bold text-white"> M
                </div>
            </div>
            <div className="flex items-center gap-6 text-slate-600">
                <button onClick={goToProfile} className="hover:text-slate-800 transition-colors"><UserCircle size={24} /></button>
                <button onClick={logout} className="hover:text-slate-800 transition-colors"><LogOut size={24} /></button>
            </div>
    </header>
    )
}

export default MenuTop