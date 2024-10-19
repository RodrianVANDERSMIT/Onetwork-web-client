import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/thunks/user'
import Router from '../Router'
import LoadingLayout from '../../layout/LoadingLayout'

function App() {
    const dispatch = useDispatch()
    const [isFetchingUser, setIsFetchingUser] = useState(true)

    useEffect(() => {
        (async () => {
            await dispatch(fetchUser())
            setIsFetchingUser(false)
        })()
    }, [dispatch])

    return (
        isFetchingUser ?
            <LoadingLayout/> :
            <Router/>
    )
}

export default App
