import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from 'react-router-dom'
import { getErrorPageCode } from "../../../redux/selectors/errorPage"
import Error401 from "../../../views/Error401"
import Error403 from "../../../views/Error403"
import Error404 from "../../../views/Error404"
import Error500 from "../../../views/Error500"
import { setErrorPage } from '../../../redux/reducers/errorPage'

function ErrorPageHandler({ children }) {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const [previousPathname, setPreviousPathname] = useState(pathname)
    const code = useSelector(getErrorPageCode)

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because it can interrupt its own rendering once an
    // error is set. Such an interruption can lead to strange behaviors and fire
    // an error in console.
    useEffect(() => {
        if (pathname !== previousPathname) {
            if (code) dispatch(setErrorPage(null))
            setPreviousPathname(pathname)
        }
    }, [dispatch, pathname, previousPathname, code])

    switch (code) {
        case 401:
            return <Error401 />
        case 403:
            return <Error403 />
        case 404:
            return <Error404 />
        case 500:
            return <Error500 />
        default:
            return children
    }
}

ErrorPageHandler.propTypes = {
    children: PropTypes.node.isRequired
}

export default ErrorPageHandler
