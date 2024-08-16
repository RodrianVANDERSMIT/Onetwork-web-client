import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { api } from '../../services/api'
import { cleanUserState } from '../../redux/reducers/user'

export default function useInterceptors() {
    const dispatch = useDispatch()

    useEffect(() => {
        // The first argument of that use() method is a callback to launch on
        // success (code 2xx). We don't need that here so we only provide the
        // error callback.
        api.interceptors.response.use(null, error => {
            // When a session expires, or the user logged out itself in another
            // tab than the current one, or his/her account has been disabled
            // while using the app... or a lot of possible scenarios, the next
            // request will send back a 401 error. When it happens, we clean the
            // user state which redirects him/her to the 401 error page.
            if (error.response.status === 401) {
                dispatch(cleanUserState())
            }

            return Promise.reject(error)
        })
    }, [])
}
