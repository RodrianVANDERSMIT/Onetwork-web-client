import AuthenticatedLayout from "../../layout/AuthenticatedLayout"
import Admin from "../../components/Admin"
import ScrollTopButton from "../../components/Buttons/ScrollTopButton"
import './style.scss'


function Administration() {

    return (
        <AuthenticatedLayout>
            <Admin />
            <ScrollTopButton/>
        </AuthenticatedLayout> 
    )
}

export default Administration