import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../../redux/selectors/user'
import { ErrorCode, setErrorPage } from '../../../redux/reducers/errorPage'
import { useEffect } from 'react'

export default function GuestRoute({ children }) {
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged)

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because the ErrorPageHandler component can interrupt
    // the rendering of every other one inside it once an error is set. Such an
    // interruption can lead to strange behaviors and fire an error in console.
    useEffect(() => {
        if (isLog) {
            dispatch(setErrorPage(ErrorCode.FORBIDDEN))
        }
    })

    return !isLog && children
}

GuestRoute.propTypes = {
    children: PropTypes.node,
}
