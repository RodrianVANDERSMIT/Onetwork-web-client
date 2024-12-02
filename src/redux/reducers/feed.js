import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchComments, createPost, createComment, createReaction, updateReaction, removeReaction} from '../thunks/feed'




const initialState = {
    posts: [],
    pagination: {
        currentPage: 0,
        hasMorePosts: null,
    },
    loading: false
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

                state.loading = false;
            })
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createPost.fulfilled, (state, { payload: post }) => {
                post.isLoadingComments = false
                state.posts.unshift(post)
            })

            .addCase(fetchComments.fulfilled, (state, { meta: { arg: postId }, payload: comments }) => {
                const post = state.posts.find(post => post.id === postId)
                post.comments = comments
                post.isLoadingComments = false;
            })
            .addCase(fetchComments.pending, (state, { meta: { arg: postId } }) => {
                state.posts.find(post => post.id === postId).isLoadingComments = true;
            })
            .addCase(fetchComments.rejected, (state, { meta: { arg: postId } }) => {
                state.posts.find(post => post.id === postId).isLoadingComments = false;
            })

            .addCase(createReaction.fulfilled, (state, { payload: reaction }) => {
                const post = state.posts.find(post => post.id === reaction.postId)
                post.reactions.push(reaction)
            })

            .addCase(updateReaction.fulfilled, (state, { payload: reaction }) => {
                const post = state.posts.find(post => post.id === reaction.postId)
                const reactionIndex = post.reactions.findIndex(currentReaction => currentReaction.id === reaction.id);
                post.reactions[reactionIndex] = reaction;

            })

            .addCase(removeReaction.fulfilled, (state, { meta: { arg: { postId, reactionId } } }) => {
                const post = state.posts.find(post => post.id === postId)
                const reactionIndex = post.reactions.findIndex(reaction => reaction.id === reactionId);
                post.reactions.splice(reactionIndex, 1);

            })

            

            .addCase(createComment.fulfilled, (state, { payload: comment }) => {
                const post = state.posts.find(post => post.id === comment.postId)
                post.comments.push(comment)
                post.commentsCount++
            })
    },
});


export const { cleanFeedState } = slice.actions
export default slice.reducer
