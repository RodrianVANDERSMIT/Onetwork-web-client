import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserRole } from '../../../redux/selectors/user';

export default function AdminRoute({ children }) {
    const userRole = useSelector(getUserRole);

    if (userRole.tag !== "admin"){
        return <Navigate to="/error/403" replace/>
    }
    return children
}

AdminRoute.propTypes = {
    children: PropTypes.node,
}
