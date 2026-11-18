import ItemMenu from './ItemMenu'

function SideMenu({ items }) {
    return (
    <aside className="fixed bottom-0 left-0 right-0 z-50 bg-blueDark text-white border-t border-blueDark p-1
        lg:relative lg:w-64 lg:bg-blueBase lg:text-blueDark lg:rounded-xl lg:flex lg:flex-col lg:p-2 lg:border-none">
            <nav className="flex flex-row lg:flex-col w-full justify-around lg:justify-start">
                {items.map((item) => (
                    <ItemMenu key={item.index} icono={item.icono} texto={item.texto} ruta={item.ruta}/>
                ))}  
            </nav>
        </aside>
    )}

export default SideMenu