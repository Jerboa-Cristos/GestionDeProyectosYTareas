import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save , RotateCcw } from "lucide-react";
import MenuTop from '../../Layout/Menu/MenuTop'
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner";
import { crearProyecto } from "../../services/proyectoService";
import { toast } from 'react-hot-toast'

function Crear_Proyecto() {
    const token = localStorage.getItem('token')
    const [datosForm, setDatosForm] = useState({
        nombre: '',
        descripcion: '', 
        fecha_fin: '',
        
    })
    const navigate = useNavigate()

    const botonGuardarProyecto = (e) => {
        e.preventDefault()
        
        toast.promise(crearProyecto(datosForm, token), {
            loading: 'Creando proyecto...',
            success: 'Proyecto creado con éxito.',
            error: 'No se pudo crear el proyecto.'
        }).then(() => {
            navigate('/lista_proyectos')
        })
        .catch(error => {
            console.error('Error al crear del usuario: ', error)
        })
    }

    function goBack() {
        navigate('/lista_proyectos')
    }

    return ( 
    <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/product_owner_profile'/>
        <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
            <MenuProductOwner/>
            <main className='flex-1 bg-white rounded-xl shadow-lg p-4 lg:p-8 overflow-y-auto flex flex-col gap-6'>
                <div className="flex-1 bg-blueDashboard rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <form className="max-w-2xl mx-auto grid grid-cols-1 gap-4" onSubmit={botonGuardarProyecto}>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-6 text-center lg:text-left">Crear de Proyecto</h1>
                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Nombre del Proyecto</label>
                            <input
                            onChange={e => setDatosForm({
                                ...datosForm, 
                                nombre: e.target.value
                            })} 
                            type="text" 
                            name="nombre" required 
                            className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"
                            placeholder="Nombre del proyecto"
                            /> 
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Descripción del proyecto</label>
                            <textarea
                            onChange={e => setDatosForm({
                                ...datosForm,
                                descripcion: e.target.value
                            })} 
                            name="descripcion" 
                            placeholder="Descripción del proyecto" 
                            className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                            </textarea>
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Fecha final</label>
                            <input
                            onChange = {e => setDatosForm({
                                ...datosForm,
                                fecha_fin: e.target.value
                            })} 
                            type="date" 
                            name="fecha_fin" 
                            className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
                        </div>
                    
                        <div className="flex flex-row justify-between items-center w-full max-w-2xl">
                            <button onClick={goBack}
                            className="text-blueDark hover:scale-110 transition-transform p-2"
                            title="Volver atrás">
                            <RotateCcw size={40} strokeWidth={2.5} />
                            </button>
                            <button type='submit'
                            className="w-full lg:w-auto bg-blueBase text-blueDark font-bold px-4 py-3 rounded-xl hover:bg-turquesa 
                                    hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95">                            
                            <Save size={20} />
                            Guardar proyecto
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    </div>
    )
} 
    
export default Crear_Proyecto;