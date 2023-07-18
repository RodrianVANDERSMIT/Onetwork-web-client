import { createSlice } from "@reduxjs/toolkit";





const initialState = {
    name: [],

}



const slice = createSlice({
    name: 'organization',
    initialState,
    reducers: {
        newOrganization(state, {payload: organizationName}){
            state.name= organizationName
        }
    },
    extraReducers: builder => { 
        builder
           
            

        //thunks

    },
})


export default slice.reducer
export const { newOrganization } = slice.actions

