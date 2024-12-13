import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../../redux/selectors/user';
import { ErrorCode, setErrorPage } from '../../../redux/reducers/errorPage';
import ConditionalRoute from '../ConditionalRoute';

export default function AuthenticatedRoute({ redirectTo, children }) {
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged);

    return (
        <ConditionalRoute
            condition={isLog}
            redirectTo={redirectTo}
            onError={() => dispatch(setErrorPage(ErrorCode.UNAUTHORIZED))}
        >
            {children}
        </ConditionalRoute>
    )
}

AuthenticatedRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node
}
