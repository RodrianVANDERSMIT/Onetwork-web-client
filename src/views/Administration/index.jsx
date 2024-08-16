import AuthenticatedLayout from "../../layout/AuthenticatedLayout"
import AdminMembers from "../../components/Admin/AdminMembers"
import ScrollTopButton from "../../components/Buttons/ScrollTopButton"
import './style.scss'


function Administration() {

    return (
        <AuthenticatedLayout>
            <AdminMembers />
            <ScrollTopButton/>
        </AuthenticatedLayout> 
    )
}

export default Administration
