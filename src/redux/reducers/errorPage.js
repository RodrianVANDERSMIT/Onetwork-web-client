import { createSlice } from "@reduxjs/toolkit"

const ErrorCode = {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
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
