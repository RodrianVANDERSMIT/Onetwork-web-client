import { createSlice } from "@reduxjs/toolkit";
import { fetchFeeds } from '../thunks/feed'

const initialState = {
     
    id: null,
    text: "",
    reactionCount: null,
    commentsCount: null,
    author: null,
    error: null,
    list: [],
}

const slice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
       
    },
    extraReducers: builder => { 
        builder
            .addCase(fetchFeeds.fulfilled, (state, action ) => {
                //return action.payload
                state.list = action.payload
            })
             
            .addCase(fetchFeeds.rejected, (state,action) => {
                state.error = action.payload
            })
    },
})

export default slice.reducer
export  { fetchFeeds } 