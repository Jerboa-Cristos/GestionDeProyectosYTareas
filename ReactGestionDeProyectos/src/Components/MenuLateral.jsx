import Button from "./Button";
//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
const MenuLateral = ({className}, ...props) => (
    <div className={`${className} fixed bg-blueBase h-5/6 top-15 left-3 w-32 rounded-md`}>
        <div className={`top-`}>
            <Button className="Lateral w-full">Panel</Button>
            <Button className="Lateral w-full">Usuarios</Button>
        </div>
    </div>
)

export default MenuLateral