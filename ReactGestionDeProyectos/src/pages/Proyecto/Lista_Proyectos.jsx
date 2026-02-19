import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuTop from "../../Components/MenuTop";
import { funcion_listado_proyecto } from "../../services/ruta_api_proyecto";
import Menu_Izquierdo from "../Menus/Menu_Izquierdo";

function Lista_Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token existe", token);
    funcion_listado_proyecto(token)
      .then((res) => setProyectos(res.data))
      .catch((err) => console.error("Error cargando proyectos", err));
  }, []);

  console.log(proyectos);

  return (
    <>
      <MenuTop />
      <Menu_Izquierdo />

      <div className="flex flex-col gap-4 border border-BlueDarkDark  ml-57 mr-3 p-6  bg-white">
        <div className="flex flex-1">
          <h1 className="p-1 font-bold text-4xl text-BlueDarkDark">
            Mis Proyectos
          </h1>

          <Link
            to="/crear_proyecto"
            className="mx-200 px-3 py-2 bg-primary text-blueDashboard font-bold rounded-md border mr-3  hover:text-green-400 bg-blueBase"
          >
            + Nuevo Proyecto
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {proyectos.length === 0 ? (
            <p>No hay proyectos</p>
          ) : (
            proyectos.map((proyecto) => (
              <div
                key={proyecto.id}
                className=" bg-blueDashboard w-full rounded-2xl  mr-3 mt-5 mb-5 p-3"
              >
                <h2 className="font-bold text-white text-[1.5em]">
                  {proyecto.nombre}
                </h2>

                <hr className="text-white border-[1.6px] w-full mb-5" />
                
                <p className="text-white text-justify">
                  {proyecto.descripcion}
                </p>

                <Link to={`/mostrar_proyecto/${proyecto.id}`}>
                  <button>Ver Proyecto</button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Lista_Proyectos;
