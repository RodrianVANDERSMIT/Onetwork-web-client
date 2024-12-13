import { Outlet, useParams } from "react-router-dom"
import NotFoundRoute from "./NotFoundRoute"

function OrganizationRouteValidator() {
    const { organizationId } = useParams()
    const isValid = /^\d+$/.test(organizationId)

    return isValid ? <Outlet /> : <NotFoundRoute />
}

export default OrganizationRouteValidator
