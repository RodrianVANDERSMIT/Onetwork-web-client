import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/thunks/user'
import Router from '../Router'
import LoadingLayout from '../../layout/LoadingLayout'
import Error500 from '../../views/Error500'

function App() {
    const dispatch = useDispatch()
    const [isFetchingUser, setIsFetchingUser] = useState(true)
    const [userFetchingError, setUserFetchingError] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchUser()).unwrap()
            }
            catch (error) {
                setUserFetchingError(error)
            }
            finally {
                setIsFetchingUser(false)
            }
        })()
    }, [dispatch])

    return (
        userFetchingError ?
            <Error500 /> :
            isFetchingUser ?
                <LoadingLayout/> :
                <Router/>
    )
}

export default App
