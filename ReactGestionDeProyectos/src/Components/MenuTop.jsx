import { useNavigate } from "react-router-dom"
import { UserCircle, LogOut } from 'lucide-react';



//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
function MenuTop({rutaPerfil}) {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        navigate('/');
    }

    const goToProfile = (rutaPerfil) => {
        navigate(rutaPerfil);
    }

    return (
    <header className="bg-white rounded-xl h-14 xs:h-18 flex items-center justify-between px-6 mb-4 shadow-sm
    ">
            <div className="flex items-center gap-2">
                <div className="bg-blueDark rounded-md size-8 xs:size-12 flex 
                items-center justify-center font-bold text-white xs:text-2xl"> M
                </div>
            </div>
            <div className="flex items-center gap-6 text-blueDark">
                <button onClick={(e) => {goToProfile(rutaPerfil); e.stopPropagation()}} className="hover:text-BlueDarkDark transition-colors"><UserCircle size={24} /></button>
                <button onClick={(e)=> {logout(); e.stopPropagation()}} className="hover:text-BlueDarkDark transition-colors"><LogOut size={24} /></button>
            </div>
    </header>
    )
}

export default MenuTop