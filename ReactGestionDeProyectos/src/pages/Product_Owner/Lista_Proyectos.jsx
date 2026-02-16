import { useEffect, useState } from "react";
import MenuTop from "../../Components/MenuTop";
import Menu_Izquierdo from "./Menu_Izquierdo";
import { Link } from "react-router-dom";
import { listado_proyecto } from "../../services/ruta_api_proyecto";

function Lista_Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  useEffect(() => {
    listado_proyecto()
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error("Error cargando proyectos", err));
  }, []);

  return (
      <>
      <MenuTop />

      <div className=" flex border border-BlueDarkDark min-h-screen p-4">
        <Menu_Izquierdo />


        <div className="">
          <h1 className="p-1 font-bold text-4xl text-BlueDarkDark">
            Mis Proyectos
          </h1>
        </div>
        
        <div name="boton" className="">
          <Link
            to="/crear_proyecto"
            className="px-3 py-2 bg-primary text-blue-700 rounded-md border mr-3 inline-block hover:text-green-400"
          >
            + Nuevo Proyecto
          </Link>
        </div>

        <div className="">
          {proyectos.length === 0 ? (<p>No hay proyectos</p>) : 
          (proyectos.map((proyecto) => 
            (
                <div key={proyecto.id}>
                    <h2 className="font-bold">{proyecto.nombre}</h2>
                    <p className="">{proyecto.descripcion}</p>

                </div>

                
                
            ))
           
          )}
        </div>

        
      </div>
    </>
  );
}

export default Lista_Proyectos;
