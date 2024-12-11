import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../../redux/selectors/user'
import { ErrorCode, setErrorPage } from '../../../redux/reducers/errorPage'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function GuestRoute({ redirectTo, children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLog = useSelector(getIsLogged)

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because the ErrorPageHandler component can interrupt
    // the rendering of every other one inside it once an error is set. Such an
    // interruption can lead to strange behaviors and fire an error in console.
    useEffect(() => {
        if (isLog) {
            if (redirectTo) {
                navigate(redirectTo)
            }
            else {
                dispatch(setErrorPage(ErrorCode.FORBIDDEN))
            }
        }
    })

    return !isLog && children
}

GuestRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node,
}
