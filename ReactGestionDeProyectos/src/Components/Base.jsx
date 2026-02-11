import Button from "./Button";
//Para responsibe design, hay que añadir md: a las variables, ya que cambia las cosas si la pantalla es menos que la mitad
const Base = ({className1, className2, className3}) => (
    <div>
        <div className="h-">

        <div className={`${className1} fixed bg-blueBase h-full top-15 left-3 w-32 rounded-md`}>
        <h1>Menu lateral</h1>
        </div>
        </div>
        <div className={`${className2} bg-blueBase fixed top-2 h-10 w-full item-left`}>
        <h1>Menu Arriba</h1>
        </div>
        <div className={`${className3} bg-white fixed ml-38 mt-15 rounded-md h-full w-full`}>
            <h1>hola</h1>
        </div>
    </div>
)

export default Base