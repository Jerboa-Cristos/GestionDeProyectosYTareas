import { useState } from "react"
import { crearSprint } from "../../services/sprintService"
import { useNavigate, useParams } from "react-router-dom"
import { Save, RotateCcw } from "lucide-react"
import MenuTop from '../../Layout/Menu/MenuTop'
import MenuProductOwner from "../../Layout/Com_ProductOwner/MenuProductOwner"
import { toast } from 'react-hot-toast'

function Crear_Sprint () {
    const [nombre, setNombre] = useState('')
    const [meta, setMeta] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const {id_proyecto} = useParams()
    const navigate = useNavigate()

        const botonGuardarSprint = (e) => {
            e.preventDefault()

            const token = localStorage.getItem('token')
            const data = {
                nombre, 
                meta_sprint: meta, 
                fecha_inicio: fechaInicio, 
                fecha_fin: fechaFin
            }
            toast.promise(crearSprint(data, id_proyecto, token), {
                loading: 'Creando sprint...',
                success: 'Sprint creado con éxito.',
                error: 'No se pudo crear el sprint.'
            }).then(() => {
                navigate(`/mostrar_proyecto/${id_proyecto}`)
            })
            .catch(error => {
                console.log('Error al crear sprint', error)
            })
        }
    
        function goBack() {
        navigate(`/mostrar_proyecto/${id_proyecto}`)
        }

    return (
    <div className="min-h-screen bg-blueDark p-2 lg:p-4 flex flex-col font-sans">
        <MenuTop rutaPerfil='/product_owner_profile'/>
        <div className="flex flex-1 gap-4 overflow-hidden h-full pb-20 lg:pb-0">
            <MenuProductOwner/>
            <main className="flex-1 bg-white rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                    <div className="flex-1 bg-blueDashboard rounded-xl shadow-lg p-4 sm:p-8 overflow-auto">
                        <form className="max-w-2xl mx-auto grid grid-cols-1 gap-4" onSubmit={botonGuardarSprint}>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2 lg:mb-6 text-center lg:text-left">Crear Sprint</h1>
                        <div>
                           <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Título</label>
                            <input
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                type="text" 
                                className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"
                                required placeholder="Título del sprint"/>
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Meta del Sprint</label>
                            <textarea
                            value={meta}
                            onChange={(e) => setMeta(e.target.value)} 
                            name="meta_sprint" 
                            placeholder="Finalidad del sprint"
                            className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none">
                            </textarea>
                        </div>

                        <div>
                            <label className="text-xs lg:text-sm font-bold text-white uppercase ml-1">Duración</label>
                            <div className="grid grid-cols-2 gap-4 mt-1">
                                <input
                                required 
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                type="date" 
                                name="fecha_inicio"  
                                className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
                                <input 
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                type="date" 
                                name="fecha_fin"  
                                className="rounded-md w-full mt-2 mb-2 p-1 bg-blueBase focus:ring-2 focus:ring-turquesa focus:outline-none"/>
                            </div>
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
                            <Save size={20}/>
                            Guardar
                            </button>
                        </div>
                    </form>   
                </div>
            </main>
        </div>
    </div> 
    )
}

export default Crear_Sprint

























