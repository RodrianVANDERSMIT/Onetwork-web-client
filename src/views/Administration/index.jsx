import AuthenticatedLayout from "../../layout/AuthenticatedLayout"
import Admin from "../../components/Admin"

import './style.scss'

function Administration() {

    return (
        <AuthenticatedLayout>
            <Admin />
        </AuthenticatedLayout> 
    )
}

export default Administration