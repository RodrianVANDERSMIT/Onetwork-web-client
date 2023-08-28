import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "../thunks/user";
import { addUser, updateUser } from "../../redux/thunks/user"

export const initialState = {
    id: null,
    name: "",
    surname: "",
    email: "",
    job: "",
    role: null,
    profilePicture: "",
    organizationId: null,
    disabled: false,
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setError(state, {payload: error }){
            state.error = error
        }
    },
    extraReducers: builder => { 
        builder
            .addCase(login.fulfilled, (state, {payload: user}) => {
                localStorage.setItem('user', JSON.stringify(user))
                return { ...state, ...user, error: null, loading: false,
                };
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false;
            })

            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem('user');
                Object.assign(state, initialState);
            })
            .addCase(logout.rejected, (state, { payload: error }) => {
                state.error = error
            })

            .addCase(addUser.fulfilled,state => {
                state.error= null
            })
            .addCase(addUser.rejected, (state, {payload: error}) => {
                state.error = error
            })
            .addCase(updateUser.fulfilled,(state, {payload: data}) => {
                return {...state, ...data, error: null}
            })
            .addCase(updateUser.rejected, (state, {payload: error}) => {
                state.error = error
            })
    },
})

export default slice.reducer
export const {setError} = slice.actions
export {login, logout, addUser, updateUser}
