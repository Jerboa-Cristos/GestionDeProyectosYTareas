import axios from 'axios';
import rutaApi from '../../api/rutaApi';
import React, { useEffect } from 'react';

import Input from '../../Components/Input';
import Label from '../../Components/Label';

//Se puede hacer una variable const que contenga un string del Tailwind para poder meterlo en el código de página
const PantallaAzul = "static bg-blueDark h-screen w-screen";


function Login() {
    /*useEffect(()=>{
     axios.post(rutaApi()+'/login'), {
        //Aquí ponemos la información que se manda del form
        login: form.login,
        password: form.password

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
        <div className={PantallaAzul}>
            <div className={`flex bg-white box-content m-5 w-350 h-195 rounded-md`}>
                <div className={`grid m-80 items-baseline`}>
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={useEffect}>
                    <Input 
                    className='Login' 
                    type='text' 
                    placeholder='Login' 
                    requiered/>
                    <Input 
                    className='Password' 
                    type='password'
                    placeholder='Password' 
                    requiered/>
                    <select name='rol'>
                        <option value="admin">Admin</option>
                        <option value="productOwner">Product Owner</option>
                        <option value="desarrollador">Desarrollador</option>
                    </select>
                    <button type='submit' className={`uppercase`}>Iniciar Sesion</button>

                </form>
                </div>
            </div>
        </div>
    )
}

export default Login;