import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../../redux/selectors/user';
import { ERROR_CODE, setErrorPage } from '../../../redux/reducers/errorPage';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged);
    const { organizationId } = useParams();
    const organizationIdIsValid = Number.isInteger(parseInt(organizationId))
    const hasError = !organizationIdIsValid || !isLog

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because the ErrorPageHandler component can interrupt
    // the rendering of every other one inside it once an error is set. Such an
    // interruption can lead to strange behaviors and fire an error in console.
    useEffect(() => {
        if (!organizationIdIsValid) {
            dispatch(setErrorPage(ERROR_CODE[404]))
            return
        }

        if (!isLog) {
            dispatch(setErrorPage(ERROR_CODE[401]))
            return
        }
    })

    return !hasError && children
}

ProtectedRoute.propTypes = {
    children: PropTypes.node,
}
