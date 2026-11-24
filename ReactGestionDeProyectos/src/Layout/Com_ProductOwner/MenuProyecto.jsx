import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Link} from "react-router-dom";

const MenuProyecto = ({proyecto, botonEliminarProyecto}) => {
    const [abrirMenu, setAbrirMenu] = useState(false)
    return (
      <div className="relative bg-blueblue rounded-xl p-5 shadow hover:shadow-md hover:-translate-y-1 transition w-full flex flex-col justify-center">
        <button className="absolute top-3 right-3 p-1 hover:bg-turquesa hover:text-white transition-all rounded"
        onClick={(e) => {
          e.stopPropagation()
          setAbrirMenu(!abrirMenu)
        }}>
          <MoreVertical size={20} className="text-white"/>
        </button>

        {abrirMenu && (
          <div className="absolute top-10 right-3 bg-blueBase text-blueDark shadow-lg rounded-md border w-36 z-20">
            <Link to={`/editar_proyecto/${proyecto.id}`}
            className="rounded block px-4 py-2 hover:bg-GreenLite"
            onClick={() => {
              setAbrirMenu(false)
            }}>
              Editar
            </Link>

            <button className="rounded w-full text-left px-4 py-2 hover:bg-red-400 text-BlueDarkDark"
            onClick={() => {
              setAbrirMenu(false)
              botonEliminarProyecto(proyecto.id)
            }}
            >
              Eliminar
            </button>
          </div>
        )}

        <h2 className="font-bold text-white text-xl mb-2">{proyecto.nombre}</h2>
        <p className="text-white text-sm mb-4 line-clamp-3">{proyecto.descripcion}</p>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link to={`/mostrar_proyecto/${proyecto.id}`}
          className="w-full bg-blueBase text-blueDark font-semibold px-3 py-2 rounded-md shadow hover:bg-turquesa 
        hover:text-white transition-all text-center">
            Ver Proyecto
          </Link>
          
        </div>
      </div>
    )
  }

  export default MenuProyecto