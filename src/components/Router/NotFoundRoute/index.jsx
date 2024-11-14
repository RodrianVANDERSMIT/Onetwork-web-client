import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { ErrorCode, setErrorPage } from "../../../redux/reducers/errorPage"

function NotFoundRoute() {
    const dispatch = useDispatch()

    // A useEffect is required here to dispatch the action AFTER the rendering
    // of the component, because the ErrorPageHandler component can interrupt
    // the rendering of every other one inside it once an error is set. Such an
    // interruption can lead to strange behaviors and fire an error in console.
    useEffect(() => {
        dispatch(setErrorPage(ErrorCode[404]))
    })

    return null
}

export default NotFoundRoute
