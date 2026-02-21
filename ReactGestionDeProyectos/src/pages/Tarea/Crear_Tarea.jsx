 import { useEffectEvent, useState } from "react"
import { funcion_crear_tarea } from "../../services/ruta_api_tarea"
import { useNavigate, useParams } from "react-router-dom"


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
            })
            .catch(error => {
                console.log('Error al crear tarea', error.respuesta.data)
            })

        }
    

    return (
    <>    
    <form onSubmit={botonGuardarTarea}>
        <div className="flex flex-col border border-GreenLite m-3 p-3 rounded">
            <h2>Crear Tarea</h2>
            
            <label>Nombre</label>
            <input
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)}
            type="text" 
            className="border border-BlueBaseDark"
            required 
            />

            <label>Descripción</label>
            <textarea
            value={descripcion}
            onChange={(e) => setMeta(e.target.value)} 
            name="descripcion" 
            placeholder="Escribe la descripcion">
            </textarea>

            <label>Nivel de dificultad</label>
            <select name="" id="">
                <option>Normal</option>
                <option>Moderado</option>
                <option>Difícil</option>
            </select>
        
            <label>Asignar a un desarrollador</label>
            <select
            value={idDesarrollador}
            onChange={(e) => setIdDesarrollador(e.target.value)}
            required
            >
                <option value={"Selecciona un desarrollador"}></option>
                {desarrolladores.map(desarrollador => (
                    <option key={desarrollador.id} value={desarrollador.id}>
                        {desarrollador.nombre}
                        
                    </option>
                ))}

            </select>

            <label>Fecha limite</label>
            <input 
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            type="date" 
            name="fecha_fin"  
            className="border border-BlueBaseDark"/>

            <button
            >Guardar</button>
        </div>

    </form>   
    </>

    )
}

export default Crear_Tarea

























