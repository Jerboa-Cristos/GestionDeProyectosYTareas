import axios from 'axios';
import React from 'react';
import {rutaApi} from '../../api/rutaApi';

import Base from './Components/Base';

function Dashboard() {
axios.get(rutaApi()+'/dashboard')

    return(
        <div>
            <Base/>
        </div>
    )
}

export default Dashboard;