import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/user";


export const initialState = {

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
    reducers: {
        logout(state){
            localStorage.removeItem('user')
            return {...state, ...initialState}
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
                console.log(action)
                state.error = action.payload
            })
        

        //deco localStorage.removeItem('user')

        //thunks

    },
})


export default slice.reducer
export const {logout} = slice.actions
export {login}