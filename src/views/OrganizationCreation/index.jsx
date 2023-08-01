import OrganizationForm from "../../components/Forms/OrganizationForm"
import DoublePageLayout from "../../layout/DoublePageLayout"

import './style.scss'

function OrganizationCreation() {

    return (
        <DoublePageLayout>
            <OrganizationForm/>
        </DoublePageLayout>
    )
}

export default OrganizationCreation