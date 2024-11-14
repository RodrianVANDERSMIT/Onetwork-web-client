import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/thunks/user'
import Router from '../Router'
import LoadingLayout from '../../layout/LoadingLayout'
import ErrorPageHandler from '../Router/ErrorPageHandler'
import { ErrorCode, setErrorPage } from '../../redux/reducers/errorPage'

function App() {
    const dispatch = useDispatch()
    const [isFetchingUser, setIsFetchingUser] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchUser()).unwrap()
            }
            catch (error) {
                dispatch(setErrorPage(ErrorCode.INTERNAL_SERVER_ERROR))
            }
            finally {
                setIsFetchingUser(false)
            }
        })()
    }, [dispatch])

    return (
        isFetchingUser ?
            <LoadingLayout/> :
            <ErrorPageHandler>
                <Router/>
            </ErrorPageHandler>
    )
}

export default App
