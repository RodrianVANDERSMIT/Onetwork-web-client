import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../redux/thunks/user'
import Router from '../Router'

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
            "" :
            <Router/>
    )
}

export default App
