import { createSlice } from "@reduxjs/toolkit";
import { newOrganization } from "../thunks/organization";


const initialState = {
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

            .addCase(newOrganization.fulfilled, (state, {payload: organizationName}) => {
                state.name = organizationName
                state.error= null
                        
            })
            .addCase(newOrganization.rejected, (state, {payload: error}) => { 
                state.name= ""
                state.error = error
            });

            .addCase(createOrganization.fulfilled, (state, {payload: organizationName})=>{
                state.name = organizationName
            })
            .addCase(createOrganization.rejected, (state, {payload: error})=>{
                state.error = error
            })
    },
});


export default slice.reducer
export { newOrganization } 

