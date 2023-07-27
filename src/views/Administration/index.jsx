import { Typography } from "@mui/material"
import AuthenticatedLayout from "../../layout/AuthenticatedLayout"
import Admin from "../../components/Admin"

import './style.scss'

function Administration() {

    return (
     
        <AuthenticatedLayout>
            <Typography>
                <Admin />
            </Typography>
        </AuthenticatedLayout>  
        
    )
}

export default Administration