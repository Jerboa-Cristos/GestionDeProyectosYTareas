import axios from 'axios';
import rutaApi from '../../api/rutaApi';
import React, { useEffect } from 'react';
import Input from '../../Components/Input';

//Se puede hacer una variable const que contenga un string del Tailwind para poder meterlo en el código de página
const PantallaAzul = "flex bg-blueDark items-center justify-center min-h-screen";


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

    function handleSubmit(e){
        e.preventDefault();
        console.log("Formulario enviado");
    }

    return(
        <div className={PantallaAzul}>

            {/*Parte central del Login*/}
            <div className={`bg-white p-8 rounded-lg shadow-lg w-full max-w-md`}>

                {/*El iconito*/}
                <div className="flex justify-center mb-4">
                    <div className="bg-blueDark text-white w-10 h-10 flex items-center justify-center rounded-lg font-bold">
                        M
                    </div>
                </div>

                {/*Texto y form*/}
                <h2 className={`text-2xl font-bold text-center text-blueDark mb-8`}>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <Input 
                    className='mt-1 block w-full px-4 py-2 bg-blueBase rounded-md
                    focus:border-blueDark sm:text-sm' 
                    type='text' 
                    placeholder='Login' 
                    required/>
                    <Input 
                    className='mt-1 block w-full px-4 py-2 bg-blueBase rounded-md
                    focus:border-blueDark sm:text-sm' 
                    type='password'
                    placeholder='Password' 
                    required/>
                    <select name='rol' className='mt-1 block w-full px-4 py-2 bg-blueBase 
                    rounded-md focus:border-BlueDark sm:text-sm'>
                        <option value="admin">Admin</option>
                        <option value="productOwner">Product Owner</option>
                        <option value="desarrollador">Desarrollador</option>
                    </select>
                {/*Button Submit*/}    
                    <button type='submit' className={`w-full flex justify-center py-2 px-4
                    rounded-md text-sm font-medium text-white bg-blueDark hover:bg-blueblue
                    transition-colors`}>Iniciar Sesion</button>
                </form>
                <div class="mt-6 text-center">
                    <a href="#" className="text-sm text-blueDark hover:text-blueblue font-medium">
                        ¿Has olvidado la Contraseña?</a>
                </div>
            </div>
        </div>
    )
}

export default Login;