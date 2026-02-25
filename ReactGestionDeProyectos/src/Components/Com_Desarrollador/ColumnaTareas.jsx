import { useState } from "react"
import Tarea from '../../Components/Com_Desarrollador/Tarea';

const ColumnaTareas = ({titulo, tipoEstado}) => {
const [open, setOpen] = useState(true)

return (
    <div className='flex flex-col gap-2 w-full'>
        <button onClick={()=> setOpen(!open)} 
            className='w-full bg-blueDashboard rounded-xl p-4 md:p-6 text-white 
            flex items-center justify-between hover:bg-blueblue transition-all shadow-md'>
            <h1 className="flex-1 text-center text-lg md:text-2xl font-semibold uppercase tracking-wide">{titulo}</h1>
            <div className={`transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </button>
        <div>
            <div className={`flex flex-col gap-3 transition-all duration-300 overflow-hidden ${open ? 'max-h-500 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                {
                tipoEstado.map((tarea) => (
                    <Tarea key={tarea.id} id={tarea.id} title={tarea.nombre} description={tarea.descripcion} fecha={tarea.fecha_fin}/>
                )) 
                }
            </div>
        </div>
    </div>
)}

export default ColumnaTareas;