import { createSlice } from "@reduxjs/toolkit";
import { login, logout, fetchUser } from "../thunks/user";
import { createUser, updateUser } from "../../redux/thunks/user"

export const initialState = {
    id: null,
    name: "",
    surname: "",
    email: "",
    job: "",
    role: null,
    profilePicture: "",
    organization: null,
    disabled: false,
    loading: false
}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cleanUserState(state) {
            Object.assign(state, initialState);
        }
    },
    extraReducers: builder => { 
        builder
            .addCase(login.fulfilled, (state, { payload: user }) => {
                return { ...state, ...user, loading: false,
                };
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            })

            .addCase(logout.fulfilled, (state) => {
                slice.caseReducers.cleanUserState(state)
            })

            .addCase(fetchUser.fulfilled, (state, { payload: user }) => {
                return { ...state, ...user  }
            })
            .addCase(updateUser.fulfilled,(state, { payload: data }) => {
                return {...state, ...data}
            })
    },
})

export default slice.reducer
export const {cleanUserState} = slice.actions
export {login, logout, fetchUser, createUser, updateUser}
