import { createSlice } from "@reduxjs/toolkit"

const ErrorCode = {
    401: 401,
    403: 403,
    404: 404,
    500: 500,
}

const initialState = {
    code: null
}

const slice = createSlice({
    name: 'errorPage',
    initialState,
    reducers: {
        setErrorPage(state, { payload: code }) {
            state.code = code
        }
    }
})

export { ErrorCode }
export const { setErrorPage } = slice.actions
export default slice.reducer
