import axios from "axios"


export const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_ORIGIN}`,
    withCredentials: true
})

/**
 * Fetch the CSRF cookie from the API. Must be called before each form
 * submission.
 */
export const fetchCsrfCookie = async () => {
    await api('/sanctum/csrf-cookie')
}
