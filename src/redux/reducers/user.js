import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/user";
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
    error: null
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state){
            Object.assign(state, initialState);
            localStorage.removeItem('user');
        }
    },
    extraReducers: builder => { 
        builder
            .addCase(login.fulfilled, (state, {payload: user}) => {

                localStorage.setItem('user', JSON.stringify(user))
                return { ...state, ...user, error: null 
                };   
            })
            .addCase(login.rejected, (state, action) => {
                
                state.error = action.payload
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
                // state.isLoading = false
                state.error = error
            })
    },
})

export default slice.reducer
export const {logout} = slice.actions
export {login, addUser, updateUser}