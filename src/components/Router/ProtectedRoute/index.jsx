import PropTypes from 'prop-types'
import { Navigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLogged } from '../../../redux/selectors/user';

export default function ProtectedRoute({ children }) {
    const isLog = useSelector(getIsLogged);
    const { organizationId } = useParams();
    const organizationIdIsValid = Number.isInteger(parseInt(organizationId))


    if (!organizationIdIsValid) {
        return <Navigate to="/error/404" replace />
    }
    if (!isLog) {
        return <Navigate to="/error/401" replace />
    }

    return children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
}
