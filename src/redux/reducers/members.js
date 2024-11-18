import { createSlice } from "@reduxjs/toolkit";
import { fetchMembers, updateMemberStatus } from "../../redux/thunks/members"

const initialState = {
    list: [],
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'members',
    initialState,
    reducers: {

        cleanMembersState(state){
            Object.assign(state, initialState);
        },
    },
    extraReducers: builder => { 
        builder
            .addCase(fetchMembers.fulfilled,(state, { payload: data }) => {
                state.list = data,
                state.loading = false,
                state.error = null
            })
            .addCase(fetchMembers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMembers.rejected, (state, { payload: error }) => {
                state.loading = false,
                state.error = error
            })

            .addCase(updateMemberStatus.fulfilled,(state, { payload: data }) => {
                
                state.list.find(member => member.id === data.id).disabled = data.disabled

                state.loading = false
            })
            .addCase(updateMemberStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(updateMemberStatus.rejected, (state, { payload: error }) => {
                state.error = error
                state.loading = false
            })
    },
})

export default slice.reducer
export const { cleanMembersState } = slice.actions
export {fetchMembers, updateMemberStatus}
