import UserCard from "../../components/UserCard"
import InvitForm from "../../components/Forms/InvitForm"
import Nav from "../../components/Nav"
import SimplePage from "../../layout/SimplePage"

import './style.scss'


function Administration() {

    return (
        <SimplePage>
            <UserCard />
            <Nav />
            <h5> Administration</h5>
            <InvitForm />
            <UserCard>
                <button> BLOQUER</button>
            </UserCard> {/*pour lister les membres de l'organisation*/}
        </SimplePage>
    )
}

export default Administration