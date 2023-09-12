import { createSlice } from "@reduxjs/toolkit";
import { createOrganization, fetchOrganization } from "../thunks/organization";


const initialState = {

    id: null,
    name: "",
    error: null,
}

const slice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        cleanOrganizationState(state){
            state.id = null,
            state.name = "",
            state.error = null
        }
       
    },
    extraReducers: builder => { 
        builder

            .addCase(createOrganization.fulfilled, (state, {payload: newOrganization })=>{
                state.name = newOrganization.name
                state.id = newOrganization.id
                state.error=null
            })

            .addCase(createOrganization.rejected, (state, {payload: error})=>{
                state.id = null
                state.name = ""
                state.error = error
            })

            .addCase(fetchOrganization.fulfilled, (state, {payload:  organization })=>{
                state.id = organization.id
                state.name = organization.name
                state.error = null
            })
            .addCase(fetchOrganization.rejected, (state, {payload: error })=>{
                state.name= "erreur de chargement du nom"
                state.error = error
            })
    },
});


export default slice.reducer
export const {cleanOrganizationState} = slice.actions
export { createOrganization, fetchOrganization }
