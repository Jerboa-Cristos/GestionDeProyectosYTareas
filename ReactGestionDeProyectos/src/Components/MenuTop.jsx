import { Bell, UserCircle, Menu } from 'lucide-react';


//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
const MenuTop = () => (
    <header className="bg-white rounded-xl h-14 flex items-center 
            justify-between px-6 mb-4 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="bg-blueDark rounded-md w-8 h-8 flex 
                items-center justify-center font-bold text-white"> M
                </div>
            </div>
            <div className="flex items-center gap-6 text-slate-600">
                <button className="hover:text-slate-800 transition-colors"><UserCircle size={24} /></button>
                <button className="hover:text-slate-800 transition-colors"><Bell size={24} /></button>
                <button className="hover:text-slate-800 transition-colors"><Menu size={24} /></button>
            </div>
    </header>
)

export default MenuTop