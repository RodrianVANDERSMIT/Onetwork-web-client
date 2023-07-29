import { createSlice } from "@reduxjs/toolkit";
import { updateMemberStatus } from "../../redux/thunks/members"

const initialState = {
    list: [],

}

const slice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: builder => { 
        builder
            .addCase(updateMemberStatus.fulfilled,(state, {payload: data}) => {
                console.log("In tha reducer - update status")
                return {...state, ...data, error: null}
            })
            .addCase(updateMemberStatus.rejected, (state, {payload: error}) => {
                state.error = error
            })
    },
})

export default slice.reducer
export {updateMemberStatus}