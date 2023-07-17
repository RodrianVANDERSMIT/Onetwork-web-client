import { createSlice } from "@reduxjs/toolkit";




const initialState = {
    list: [],

}

const slice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: builder => { 

        //thunks

    },
})


export default slice.reducer