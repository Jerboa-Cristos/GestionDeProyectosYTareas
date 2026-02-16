import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  //combierte la app en SAP single page aplication
  <BrowserRouter>
    <App />
  
  </BrowserRouter>

)
