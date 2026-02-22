import { useState } from "react"
import { funcion_crear_sprint } from "../../services/ruta_api_sprint"
import { useNavigate, useParams } from "react-router-dom"
import Menu_Izquierdo from '../Menus/Menu_Izquierdo'
import MenuTop from '../../Components/MenuTop'
import { Save } from "lucide-react"

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
            funcion_crear_sprint(data, id_proyecto, token)
            .then(respuesta => {
                console.log('sprint creado', respuesta.data)
                console.log('datos enviados')
                navigate(`/mostrar_proyecto/${id_proyecto}`)
            })
            .catch(error => {
                console.log('Error al crear sprint', error.respuesta.data)
            })

        }
    

    return (
    <>    
        <MenuTop/>
    
        <div className="flex">
            <Menu_Izquierdo/>
            <div className="w-full p-6 min-h-screen">

                <div className="bg-white rounded-2xl pb-16 ">
                    <h1 className="p-3 font-bold text-2xl text-blueDark ">Product Backlog</h1>



                    <div className="bg-white  rounded-xl p-8 ">
                        <form onSubmit={botonGuardarSprint}
                        className="bg-blueDashboard rounded-lg p-6"
                        >
                            <h2 className="font-bold text-white">Crear Sprint</h2>

                                <label className="font-semibold text-white">Título</label>
                                <input
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)}
                                type="text" 
                                className="border border-BlueBaseDark w-full rounded px-3 py-2 mt-1 bg-blueBase"
                                required 
                                />

                            <div>
                                <label className="font-semibold text-white">Meta del Sprint</label>
                                <textarea
                                value={meta}
                                onChange={(e) => setMeta(e.target.value)} 
                                name="meta_sprint" 
                                placeholder="Escribe la meta del sprint"
                                className="border border-BlueBaseDark w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase"
                                >
                                
                                </textarea>

                            </div>



                            <div>
                                <label className="font-semibold text-white">Duración</label>

                                <div className="grid grid-cols-2 gap-4 mt-1">
                                <input
                                required 
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                type="date" 
                                name="fecha_inicio"  
                                className="rounded-lg px-4 py-2 bg-blueBase focus:ring-2 focus:ring-blue-300 focus:outline-none"/>
                                <input 
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                type="date" 
                                name="fecha_fin"  
                                className="rounded-lg px-4 py-2 bg-blueBase focus:ring-2 focus:ring-blue-300 focus:outline-none "/>
                                </div>

                            </div>

                            <div className="flex justify-end">
                            <button
                            className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-4 rounded-lg hover:bg-GreenLite transition flex items-center gap-2"
                            >
                            <Save size={23} />
                            Guardar

                            </button>

                            </div>

                            
                            </form>   
                            </div>

                        </div>
                </div>
            </div> 
        

    </>

    )
}

export default Crear_Sprint

























