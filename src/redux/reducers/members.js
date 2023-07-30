import { createSlice } from "@reduxjs/toolkit";
import { fetchMembers, updateMemberStatus } from "../../redux/thunks/members"

const initialState = {
    list: [],
}

const slice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: builder => { 
        builder
            .addCase(fetchMembers.fulfilled,(state, {payload: data}) => {
                state.list = data
                state.error = null
            })
            .addCase(fetchMembers.rejected, (state, {payload: error}) => {
                state.error = error
            })
            .addCase(updateMemberStatus.fulfilled,(state, {payload: data}) => {
                state.list = data
                state.error = null
            })
            .addCase(updateMemberStatus.rejected, (state, {payload: error}) => {
                state.error = error
            })
    },
})

export default slice.reducer
export {fetchMembers, updateMemberStatus}