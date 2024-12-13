import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ConditionalRoute({ condition, onError, redirectTo, children }) {
    const navigate = useNavigate()

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because the ErrorPageHandler component can interrupt
    // the rendering of every other one inside it once an error is set. Such an
    // interruption can lead to strange behaviors and fire an error in console.
    useEffect(() => {
        if (!condition) {
            if (redirectTo) navigate(redirectTo, { replace: true })
            else onError()
        }
    })

    return condition && children
}

ConditionalRoute.propTypes = {
    condition: PropTypes.bool.isRequired,
    onError: PropTypes.func,
    redirectTo: PropTypes.string,
    children: PropTypes.node.isRequired
}

export default ConditionalRoute
