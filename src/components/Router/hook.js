import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import { cleanUserState } from '../../redux/reducers/user'

export default function useInterceptors() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        // The first argument of that use() method is a callback to launch on
        // success (code 2xx). We don't need that here so we only provide the
        // error callback.
        api.interceptors.response.use(null, error => {
            // When a session expires, or the user logged out itself in another
            // tab than the current one, or his/her account has been disabled
            // while using the app... or a lot of possible scenarios, the next
            // request will send back a 401 error. When it happens, we clean the
            // user state and redirect to the home page.
            if (error.response.status === 401) {
                dispatch(cleanUserState())
                navigate('/')
            }

            return Promise.reject(error)
        })
    }, [])
}
