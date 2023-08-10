import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchComments, addNewPost, addNewComment, addReaction, updateReaction, removeReaction} from '../thunks/feed'




const initialState = {      
    posts: [],
    error: null,
}

const slice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        cleanFeedState(state){
            Object.assign(state, initialState);
        },
       
    },
    extraReducers: builder => { 
        builder
            .addCase(fetchPosts.fulfilled, (state, action ) => {
                state.posts = action.payload
                state.error = null
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
            
            .addCase(addReaction.rejected, ( state,action) => {
                state.error = action.payload
            })
            
            .addCase(updateReaction.fulfilled, (state, { payload: { postId, updatedReaction, authorId }}) => {
                const post = state.posts.find(post => post.id === postId)

                const reactionIndex = post.reactions.findIndex(reaction => reaction.author.id === authorId);
                
                post.reactions[reactionIndex].type = updatedReaction;
                
            })
            .addCase(updateReaction.rejected, (state,action) => {
                state.error = action.payload
            })
            
            .addCase(removeReaction.fulfilled, (state, { payload: { postId, removedReaction }}) => {
                const post = state.posts.find(post => post.id === postId)

                const reactionIndex = post.reactions.findIndex(reaction => reaction.author.id === removedReaction.author.id);
                
                post.reactions.splice(reactionIndex, 1);
                
            })
            .addCase(removeReaction.rejected, (state,action) => {
                state.error = action.payload
            })
            
            .addCase(addNewPost.fulfilled, (state, action) => {
                state.posts.push(action.payload)
            })
             
            .addCase(addNewPost.rejected, (state,action) => {
                state.error = action.payload
            })

            .addCase(addNewComment.fulfilled, (state, { payload: { postId, newComment } } ) => {
                state.posts.find(post => post.id === postId).comments.push(newComment)
            })
             
            .addCase(addNewComment.rejected, (state,action) => {
                state.error = action.payload
            })
    },
})


export const { cleanFeedState } = slice.actions
export default slice.reducer
