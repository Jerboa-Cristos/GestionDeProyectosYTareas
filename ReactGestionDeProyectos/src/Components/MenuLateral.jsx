import Button from "./Button";
//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
const MenuLateral = ({className}) => (
    <div className={`${className} bg-blueBase h-full fixed top-10 left-3 w-32 rounded-md`}>
        <Button className="Lateral w-full rounded-none">Proyectos</Button>
        <Button className="Lateral w-full rounded-none">Tareas</Button>
        <Button className="Lateral w-full rounded-none">Usuarios</Button>
    </div>
)

export default MenuLateral