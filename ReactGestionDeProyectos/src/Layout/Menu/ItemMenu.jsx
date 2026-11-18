import { NavLink } from 'react-router-dom'

function ItemMenu ({icono: Icono, texto, ruta}) {
    return (
        <NavLink to={ruta}
        className="flex-1 lg:w-full flex flex-col lg:flex-row items-center gap-1 lg:gap-4 px-2 py-3 lg:px-6 lg:py-4 
        text-blueDark hover:bg-BlueBaseDark hover:text-BlueDarkDark lg:hover:bg-BlueBaseDark transition-all text-center lg:text-left group rounded-lg">
            <span className='text-white lg:text-blueDark group-hover:text-BlueDarkDark'><Icono size={35} className='lg:size-10'/></span>
            <span className="hidden lg:inline text-[10px] text-white lg:text-blueDark lg:text-base font-medium">{texto}</span>
        </NavLink>
    )
}

export default ItemMenu