 import {useState } from "react"
import { funcion_crear_tarea } from "../../services/ruta_api_tarea"
import { useNavigate, useParams } from "react-router-dom"
import MenuTop from "../../Components/MenuTop"
import Menu_Izquierdo from "../Menus/Menu_Izquierdo"
import { Save } from "lucide-react"

function Crear_Tarea () {
    const [nombre, setNombre] = useState('')
    const [tipo, setTipo] = useState('')
    const [estado, setEstado] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [desarrolladores, SetDesarrollador] = useState([])
    const [idDesarrollador, setIdDesarrollador] = useState('')
    const [fechaFin, setFechaFin] = useState('')

    const {id_sprint} = useParams()

    const navigate = useNavigate()


        const botonGuardarTarea = (e) => {
            e.preventDefault()

            const token = localStorage.getItem('token')
            const data = {
                nombre, 
                tipo,
                estado,
                descripcion: descripcion, 
                fecha_fin: fechaFin,
                id_desarrollador: idDesarrollador
            }
            funcion_crear_tarea(data, id_sprint, token)
            .then(respuesta => {
                console.log('tarea creada', respuesta.data)
                navigate(`/mostrar_tarea/${id_sprint}`)
                console.log('sprint',id_sprint)
                console.log('tipo', typeof id_sprint)
            })
            .catch(error => {
                console.log('Error al crear tarea', error.respuesta.data)
            })

        }
    

    return (
    <>  
    <MenuTop/>  
    <div className="flex">
        <Menu_Izquierdo/>

        <div className="w-full p-6 min-h-screen">
            <div className="bg-white rounded-xl p-8 h-auto">

                <form onSubmit={botonGuardarTarea}>
                    <div className="bg-blueDashboard rounded-lg p-6">
                        <h2 className="font-bold text-white mb-4 text-[1.2em]">Crear Tarea</h2>
                        
                        <label className="font-semibold text-white mt-4 block">Nombre</label>
                        <input
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                        type="text" 
                        className="w-full rounded px-3 py-2 mt-1 bg-blueBase border border-BlueBaseDark"
                        required
                        placeholder="Escribe el nombre de la tarea aquí" 
                        />

                        <label className="font-semibold text-white mt-4 block">Descripción</label>
                        <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)} 
                        name="descripcion" 
                        placeholder="Escribe la descripcion"
                        className=" w-full rounded px-3 py-2 mt-1 h-24 bg-blueBase"
                        >
                        
                        </textarea>

                        <label className="font-semibold text-white mt-4 block">Tipo de tarea</label>
                        <select className="rounded-lg px-4 py-2 bg-blueBase mt-1 text-BlueDarkDark font-semibold">
                            <option>Backend</option>
                            <option>Frontend</option>
                            <option>Diseño</option>
                            <option>Despliegue</option>
                            <option>Testing</option>

                        </select>
                    
                        <label className="font-semibold text-white mt-4 block">Asignar a un desarrollador</label>
                        <select
                        value={idDesarrollador}
                        onChange={(e) => setIdDesarrollador(e.target.value)}
                        required
                        className="rounded-lg px-4 py-2 bg-blueBase mt-1"
                        >
                            <option value={"Selecciona un desarrollador"}></option>
                            {desarrolladores.map(desarrollador => (
                                <option key={desarrollador.id} value={desarrollador.id}>
                                    {desarrollador.nombre}
                                    
                                </option>
                            ))}

                        </select>

                        <label className="font-semibold text-white mt-4 block">Fecha limite</label>
                        <input 
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        type="date" 
                        name="fecha_fin"  
                        className="rounded-lg px-4 py-2 bg-blueBase mt-1 text-blueDark"/>


                        <div className="flex justify-end">
                        <button
                        className="bg-blueBase text-blueDark font-bold px-6 py-2 mt-6 rounded-lg hover:bg-GreenLite transition flex items-center gap-2"
                        >
                        <Save size={23} />
                        Guardar
                        
                        </button>

                        </div>
                    </div>

                </form>   
            </div>
        </div>
    </div>
    </>

    )
}

export default Crear_Tarea

























