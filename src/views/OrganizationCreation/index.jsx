import OrganizationForm from "../../components/Forms/OrganizationForm"
import DoublePage from "../../layout/DoublePage"

import './style.scss'

function OrganizationCreation() {

    return (
        <DoublePage>
            <h5>OrganizationCreation</h5>
            <OrganizationForm/>
        </DoublePage>
    )
}

export default OrganizationCreation