import { useNavigate } from "react-router-dom"
import { UserCircle, LogOut } from 'lucide-react';



//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
function MenuTop({rutaPerfil, rutaLogin}) {
    const navigate = useNavigate()

    const logout = (rutaLogin) => {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        navigate(rutaLogin);

    }

    const goToProfile = (rutaPerfil) => {
        navigate(rutaPerfil);
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
                <button onClick={(e) => {goToProfile(rutaPerfil); e.stopPropagation()}} className="hover:text-slate-800 transition-colors"><UserCircle size={24} /></button>
                <button onClick={(e)=> {logout(rutaLogin); e.stopPropagation()}} className="hover:text-slate-800 transition-colors"><LogOut size={24} /></button>
            </div>
    </header>
    )
}

export default MenuTop