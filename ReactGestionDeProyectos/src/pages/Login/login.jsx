import axios from 'axios';
import rutaApi from '../../api/rutaApi';
import React, { useEffect } from 'react';

import Input from '../../Components/Input';
import Label from '../../Components/Label';

function Login() {
   /* useEffect(()=>{
     axios.post(rutaApi()+'/login'), {
        //Aquí ponemos la información que se manda del form

     }
        .then((response) => {
        //PROMESITA MOMENT. TRAS RECIBIR LA INFO AQUÍ REDIRIGIMOS A DONDE ES NECESARIO
            response.data
        })
        .catch(function (err) {
            console.log(err);
        });
    }, []);*/

    return(
        <main>
            <div className={`bg-white `}>
                <div>
                    
                </div>
                <h1>Iniciar Sesión</h1>
                <form onSubmit={useEffect}>
                    <Input className='Login' placeholder='Login'/>
                    <Input className='Password' placeholder='Password'/>
                     <select name='rol'>
                        <option value="admin">Admin</option>
                        <option value="productOwner">Product Owner</option>
                        <option value="desarrollador">Desarrollador</option>
                     </select>
                    <button type='submit'>Iniciar Sesion</button>
                </form>

            </div>
        </main>
    )
}

export default Login;