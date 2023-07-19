import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/user";


const initialState = {

    id: null,
    name: "",
    surname: "",
    email: "",
    job: "",
    role: "",
    profilPicture: "",
    disabled: false,
    error: null,
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => { 
        builder
        .addCase(login.fulfilled, (state, {payload: user}) => {
            return { ...state, ...user, error: null };
        })
        .addCase(login.rejected, (state, action) => {
            console.log(action)
            state.error = action.payload
        })

        //thunks

    },
})


export default slice.reducer
export {login}