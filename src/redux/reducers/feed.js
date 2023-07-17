import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    posts: [],

}

const slice = createSlice({
    name: 'feed',
    initialState,
    reducers: {},
    extraReducers: builder => { 

        //thunks

    },
})


export default slice.reducer