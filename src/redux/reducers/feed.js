import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchComments, createPost, addNewComment, addReaction, updateReaction, removeReaction} from '../thunks/feed'




const initialState = {
    posts: [],
    pagination: {
        currentPage: 1,
        postsPerPage: 10,
        hasMorePosts: true,
    },
    loading: false,
    error: null,
}

const slice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        cleanFeedState(state){
            Object.assign(state, initialState);
        },
        setHasMorePosts(state, action) {
            state.pagination.hasMorePosts = action.payload;
        },
    },

    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, action ) => {
                const posts = state.posts
                posts.push(...action.payload)
                state.pagination.currentPage++
                state.error = null
                state.loading = false;
            })
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload)
            })

            .addCase(createPost.rejected, (state,action) => {
                state.error = action.payload
            })

            .addCase(fetchComments.fulfilled, (state, { payload: { postId, postComments } } ) => {
                state.posts.find(post => post.id === postId).comments = postComments
                state.loading = false;
            })
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.rejected, (state,action) => {
                state.error = action.payload
                state.loading = false;
            })

            .addCase(addReaction.fulfilled, (state, { payload: { postId, newReaction }}) => {
                const post = state.posts.find(post => post.id === postId)
                post.reactions.push(newReaction)
            })

            .addCase(addReaction.rejected, ( state,action) => {
                state.error = action.payload
            })

            .addCase(updateReaction.fulfilled, (state, { payload: { postId, reactionId, updatedReaction}}) => {
                const post = state.posts.find(post => post.id === postId)
                const reactionIndex = post.reactions.findIndex(reaction => reaction.id === reactionId);
                post.reactions[reactionIndex] = updatedReaction;

            })
            .addCase(updateReaction.rejected, (state,action) => {
                state.error = action.payload
            })

            .addCase(removeReaction.fulfilled, (state, { payload: { postId, reactionId}}) => {
                const post = state.posts.find(post => post.id === postId)
                const reactionIndex = post.reactions.findIndex(reaction => reaction.id === reactionId);
                post.reactions.splice(reactionIndex, 1);

            })
            .addCase(removeReaction.rejected, (state,action) => {
                state.error = action.payload
            })

            

            .addCase(addNewComment.fulfilled, (state, { payload: { postId, newComment } } ) => {
                const post = state.posts.find(post => post.id === postId)
                post.comments.push(newComment)
                post.commentsCount++
            })

            .addCase(addNewComment.rejected, (state,action) => {
                state.error = action.payload
            })
    },
});


export const { cleanFeedState, setHasMorePosts } = slice.actions
export default slice.reducer
