import './App.css'
import MenuLateral from './Components/MenuLateral';
import MenuTop from './Components/MenuTop';

function rutaApi(){
   return 'http://localhost:8000';
}

function App() {


  return (
    <div className="bg-blueDark h-screen w-screen">
      <MenuTop/>
      <MenuLateral/>
    </div>
  )
}

export default App
