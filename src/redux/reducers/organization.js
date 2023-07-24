import { createSlice } from "@reduxjs/toolkit";
import { validateOrganization, createOrganization } from "../thunks/organization";


const initialState = {

    id: null,
    name: "",
    error: null,
}

const slice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
       
    },
    extraReducers: builder => { 
        builder

            .addCase(validateOrganization.fulfilled, (state, {payload: organizationName}) => {
                state.name = organizationName
                state.error= null
                        
            })
            .addCase(validateOrganization.rejected, (state, {payload: error}) => { 
                state.id = ""
                state.name= ""
                state.error = error
            })

            .addCase(createOrganization.fulfilled, (state, {payload: newOrganization })=>{
                state.name = newOrganization.name
                state.id = newOrganization.id
                state.error=null
            })

            .addCase(createOrganization.rejected, (state, {payload: error})=>{
                state.id = ""
                state.name = ""
                state.error = error
            })
    },
});


export default slice.reducer
export { validateOrganization, createOrganization } 

