import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchComments, addReaction } from '../thunks/feed'



const initialState = {      
    posts: [],
    error: null,
}

const slice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
       
    },
    extraReducers: builder => { 
        builder
            .addCase(fetchPosts.fulfilled, (state, action ) => {
                state.posts = action.payload
                state.posts.forEach(post => post.comments = null)
            })
             
            .addCase(fetchPosts.rejected, (state,action) => {
                state.error = action.payload
            })


            .addCase(fetchComments.fulfilled, (state, { payload: { postId, postComments } } ) => {
                state.posts.find(post => post.id === postId).comments = postComments
            })
             
            .addCase(fetchComments.rejected, (state,action) => {
                state.error = action.payload
            })

            .addCase(addReaction.fulfilled, (state, { payload: { postId, newReaction }}) => {
                const post = state.posts.find(post => post.id === postId)
                post.reactions.push(newReaction)
                
            })

            
    },
})

export default slice.reducer