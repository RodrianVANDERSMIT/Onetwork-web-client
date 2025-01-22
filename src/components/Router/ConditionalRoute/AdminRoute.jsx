import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAdmin } from '../../../redux/selectors/user';
import { ErrorCode, setErrorPage } from '../../../redux/reducers/errorPage';
import ConditionalRoute from '.';

export default function AdminRoute({ redirectTo, children }) {
    const dispatch = useDispatch()
    const isAdmin = useSelector(getIsAdmin);

    return (
        <ConditionalRoute
            condition={isAdmin}
            redirectTo={redirectTo}
            onError={() => dispatch(setErrorPage(ErrorCode.FORBIDDEN))}
        >
            {children}
        </ConditionalRoute>
    )
}

AdminRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node,
}
