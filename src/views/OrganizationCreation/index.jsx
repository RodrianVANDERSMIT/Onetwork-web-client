import OrganizationForm from "../../components/Forms/OrganizationForm"
import DoublePageLayout from "../../layout/DoublePageLayout"

import './style.scss'

function OrganizationCreation() {

    return (
        <DoublePageLayout>
            <h5>OrganizationCreation</h5>
            <OrganizationForm/>
        </DoublePageLayout>
    )
}

export default OrganizationCreation