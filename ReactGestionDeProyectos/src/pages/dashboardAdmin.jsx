import axios from 'axios';
import React from 'react';

import Base from './Components/Base';

function rutaApi(){
   return 'http://localhost:8000';
}

function Dashboard() {
axios.get(rutaApi()+'/dashboard')

    return(
        <div>
            <Base/>
        </div>
    )
}

export default Dashboard;