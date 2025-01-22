import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from "../../services/api"

export const fetchPosts = createAsyncThunk("feed/fetchPosts", async (userIdUrl, thunkApi) => {

    const nextPage = thunkApi.getState().feed.pagination.currentPage + 1
    const id = thunkApi.getState().user.organization?.id;

    try {
        const url = userIdUrl ?
            `/users/${userIdUrl}/posts?page=${nextPage}` :
            `/organizations/${id}/posts?page=${nextPage}`

        const { data: response } = await api.get(url);

        return {
            posts: response.data,
            meta: response.meta
        };

    } catch (error) {
        return thunkApi.rejectWithValue({status: error.response.status, message: "Une erreur s'est produite"});
    }
});

export const createPost = createAsyncThunk("feed/createPost", async (text, thunkApi) => {
    try {
        await fetchCsrfCookie()

        const { data: post } = await api.post('/posts',  {text: text})
        post.reactions = []

        return post
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du nouveau post." });
    }
})

export const fetchComments = createAsyncThunk("feed/fetchComments", async (postId, thunkApi) => {
    try {
        const { data: comments } = await api.get(`/posts/${postId}/comments`);
        return comments
    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la récupération des commentaires." });
    }
})


export const createComment = createAsyncThunk("feed/createComment", async ({text, postId}, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data: comment } = await api.post(`/posts/${postId}/comments`,  {text: text})

        return comment
    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du commentaire." });
    }
})


export const createReaction = createAsyncThunk("feed/createReaction", async ({postId, type}, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data: reaction } = await api.post(`/posts/${postId}/reactions`,  { type })

        return reaction
    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Ce post n'existe pas" });
        }
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Vous avez déjà réagi à ce post" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de l'ajout de la réaction" });
    }
})



export const updateReaction = createAsyncThunk("feed/updateReaction", async ({ type, reactionId }, thunkApi) => {

    try {
        await fetchCsrfCookie()
        const { data: reaction } = await api.patch(`/reactions/${reactionId}`,  { type })
    
        return reaction
    }
    catch (error) { 
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Cette réaction n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la mise à jour de la réaction" });
    }
})


export const removeReaction = createAsyncThunk("feed/removeReaction", async ({ reactionId }, thunkApi) => {

    try {
        await fetchCsrfCookie()
        await api.delete(`/reactions/${reactionId}`,)
    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Cette réaction n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la suppression de la réaction" });
    }
});
