import { Typography } from "@mui/material"
import AuthenticatedLayout from "../../layout/AuthenticatedLayout"

import './style.scss'

function Administration() {

    return (
     
        <AuthenticatedLayout>
            <Typography>
                Administration
            </Typography>
        </AuthenticatedLayout>  
        
    )
}

export default Administration