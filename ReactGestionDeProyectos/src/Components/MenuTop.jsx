import { useNavigate } from "react-router-dom"
import { UserCircle, LogOut } from 'lucide-react';



//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
function MenuTop({rutaPerfil}) {
    
    const user = JSON.parse(localStorage.getItem('user'))
    const nombre_usuario = user?.nombre
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('nombre_usuario')
        navigate('/login');
    }

    const goToProfile = (rutaPerfil) => {
        navigate(rutaPerfil);
    }

    return (
    <header className="bg-white rounded-xl h-14 md:h-20 flex items-center justify-between px-4 md:px-8 mb-4 shadow-sm">
            <div className="flex items-center gap-3">
                <div className="bg-blueDark rounded-lg size-10 md:size-12 flex items-center justify-center font-bold
                 text-white text-xl md:text-2xl shadow-inner"> M </div>

                 <p className="hidden md:block font-semibold text-blueDark pl-5 text-xl md:text-2xl">Bienvenido, {nombre_usuario} </p>
            </div>
            <div className="flex items-center gap-4 md:gap-8 text-blueDark">
                <button onClick={(e) => {goToProfile(rutaPerfil); e.stopPropagation()}} 
                className="flex items-center gap-2 p-2 hover:bg-blueBase rounded-full transition-all active:scale-90" title="Perfil">
                    <UserCircle size={35} md:size={12} /></button>
                <button onClick={(e)=> {logout(); e.stopPropagation()}} 
                className="flex items-center gap-2 p-2 hover:text-warningDark hover:bg-red-50 rounded-full transition-all 
                active:scale-90" title="Salir">
                    <LogOut size={35} md:size={12}/></button>
            </div>
    </header>
    )
}

export default MenuTop