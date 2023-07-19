import { Typography } from "@mui/material"
import AuthenticatedLayout from "../../layout/AuthenticatedLayout"

import './style.scss'

function UserProfile() {

    return (
     
        <AuthenticatedLayout>
            <Typography>
                UserProfile
            </Typography>
        </AuthenticatedLayout>  
        
    )
}

export default UserProfile