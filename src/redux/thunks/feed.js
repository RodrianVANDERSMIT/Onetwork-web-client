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

        const { data } = await api.post('/posts',  {text: text})

        const newPost = {
            ...data,
            reactions: [],
        };
        return newPost

    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du nouveau post." });
    }
})

export const fetchComments = createAsyncThunk("feed/fetchComments", async (postId, thunkApi) => {
    try {
        
        const response = await api.get(`/posts/${postId}/comments`);
        const postComments = response.data;
        
        return {postComments, postId}

    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la récupération des commentaires." });
    }
})


export const addNewComment = createAsyncThunk("feed/addNewComment", async ({text, postId}, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data : newComment } = await api.post(`/posts/${postId}/comments`,  {text: text})

        return {newComment, postId}
    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du commentaire." });
    }
})


export const addReaction = createAsyncThunk("feed/addReaction", async ({postId, reaction}, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data : newReaction } = await api.post(`/posts/${postId}/reactions`,  {type: reaction})

        return {newReaction, postId}
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



export const updateReaction = createAsyncThunk("feed/updateReaction", async ({postId, reaction, reactionId}, thunkApi) => {

    try {
        await fetchCsrfCookie()
        const { data : updatedReaction } = await api.patch(`/reactions/${reactionId}`,  {type: reaction})
    
        return {updatedReaction, postId, reactionId}
    }
    catch (error) { 
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Cette réaction n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la mise à jour de la réaction" });
    }
})


export const removeReaction = createAsyncThunk("feed/removeReaction", async ({postId, reactionId}, thunkApi) => {

    try {
        await fetchCsrfCookie()
        await api.delete(`/reactions/${reactionId}`,)
        
        return { postId, reactionId}
    }
    catch (error) {
        if (error.response.status === 404){
            return thunkApi.rejectWithValue({ status: error.response.status, message: "Cette réaction n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la suppression de la réaction" });
    }
});
