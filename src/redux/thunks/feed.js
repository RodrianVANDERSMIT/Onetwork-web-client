import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAvailablePosts } from '../reducers/feed'
import { api, fetchCsrfCookie } from "../../services/api"

export const fetchPosts = createAsyncThunk("feed/fetchPosts", async (userIdUrl, thunkApi) => {

    const currentPage = thunkApi.getState().feed.pagination.currentPage
    const id = thunkApi.getState().user.organization?.id;

    try {
        const url = userIdUrl ?
            `/users/${userIdUrl}/posts?page=${currentPage}` :
            `/organizations/${id}/posts?page=${currentPage}`

        const { data: response } = await api.get(url);
        const filteredPosts = response.data;
        const meta = {
            currentPage: response.meta.current_page, 
            lastPage: response.meta.last_page
        };

        if (meta.currentPage === meta.lastPage) {
            thunkApi.dispatch(setAvailablePosts(false));
        }
                     
        return filteredPosts;

    } catch (error) {
        return thunkApi.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
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
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }
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
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la récupération des commentaires." });
    }
})


export const addNewComment = createAsyncThunk("feed/addNewComment", async ({text, postId}, thunkApi) => {
    try {
        const { data : newComment } = await api.post(`/posts/${postId}/comments`,  {text: text})

        return {newComment, postId}
    }
    catch (error) {
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du commentaire." });
    }
})


export const addReaction = createAsyncThunk("post/addReaction", async ({postId, reaction}, thunkApi) => {
    try {
        const { data : newReaction } = await api.post(`/posts/${postId}/reactions`,  {type: reaction})

        return {newReaction, postId}
    }
    catch (error) {
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });
    }
})



export const updateReaction = createAsyncThunk("post/updateReaction", async ({postId, reaction, reactionId}, thunkApi) => {

    try {
        const { data : updatedReaction } = await api.patch(`/reactions/${reactionId}`,  {type: reaction})
    
        return {updatedReaction, postId, reactionId}
    }
    catch (error) { 
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });
    }
})


export const removeReaction = createAsyncThunk("post/removeReaction", async ({postId, reactionId}, thunkApi) => {

    try {
        await api.delete(`/reactions/${reactionId}`,)
        
        return { postId, reactionId}
    }
    catch (error) {
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });
    }
});
