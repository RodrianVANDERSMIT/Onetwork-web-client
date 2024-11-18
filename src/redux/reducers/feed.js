import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchComments, createPost, addNewComment, addReaction, updateReaction, removeReaction} from '../thunks/feed'




const initialState = {
    posts: [],
    pagination: {
        currentPage: 0,
        postsPerPage: 10,
        hasMorePosts: null,
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
        }
    },

    extraReducers: builder => {
        builder
            .addCase(fetchPosts.fulfilled, (state, { payload: { posts, meta } } ) => {
                posts.forEach(post => post.isLoadingComments = false)
                state.posts.push(...posts)

                state.pagination.currentPage = meta.current_page
                state.pagination.hasMorePosts = meta.current_page !== meta.last_page

                state.error = null
                state.loading = false;
            })
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.rejected, (state, { payload: error }) => {
                state.error = error
                state.loading = false;
            })
            .addCase(createPost.fulfilled, (state, { payload: post }) => {
                post.isLoadingComments = false
                state.posts.unshift(post)
            })

            .addCase(createPost.rejected, (state, { payload: error }) => {
                state.error = error
            })

            .addCase(fetchComments.fulfilled, (state, { payload: { postId, postComments } }) => {
                const post = state.posts.find(post => post.id === postId)
                post.comments = postComments
                post.isLoadingComments = false;
            })
            .addCase(fetchComments.pending, (state, { meta: { arg: postId } }) => {
                state.posts.find(post => post.id === postId).isLoadingComments = true;
            })
            .addCase(fetchComments.rejected, (state, { meta: { arg: postId }, payload: error }) => {
                state.error = error
                state.posts.find(post => post.id === postId).isLoadingComments = false;
            })

            .addCase(addReaction.fulfilled, (state, { payload: { postId, newReaction } }) => {
                const post = state.posts.find(post => post.id === postId)
                post.reactions.push(newReaction)
            })

            .addCase(addReaction.rejected, (state, { payload: error }) => {
                state.error = error
            })

            .addCase(updateReaction.fulfilled, (state, { payload: { postId, reactionId, updatedReaction } }) => {
                const post = state.posts.find(post => post.id === postId)
                const reactionIndex = post.reactions.findIndex(reaction => reaction.id === reactionId);
                post.reactions[reactionIndex] = updatedReaction;

            })
            .addCase(updateReaction.rejected, (state, { payload: error }) => {
                state.error = error
            })

            .addCase(removeReaction.fulfilled, (state, { payload: { postId, reactionId } }) => {
                const post = state.posts.find(post => post.id === postId)
                const reactionIndex = post.reactions.findIndex(reaction => reaction.id === reactionId);
                post.reactions.splice(reactionIndex, 1);

            })
            .addCase(removeReaction.rejected, (state, { payload: error }) => {
                state.error = error
            })

            

            .addCase(addNewComment.fulfilled, (state, { payload: { postId, newComment } }) => {
                const post = state.posts.find(post => post.id === postId)
                post.comments.push(newComment)
                post.commentsCount++
            })

            .addCase(addNewComment.rejected, (state, { payload: error }) => {
                state.error = error
            })
    },
});


export const { cleanFeedState } = slice.actions
export default slice.reducer
