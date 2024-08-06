import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getIsLogged } from '../../../redux/selectors/user'

export default function GuestRoute({ children }) {
    const isLog = useSelector(getIsLogged)

    if (isLog) {
        return <Navigate to="/error/403" replace />
    }

    return children
}

GuestRoute.propTypes = {
    children: PropTypes.node,
}
