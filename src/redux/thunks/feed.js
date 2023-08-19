import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAvailablePosts } from '../reducers/feed'
import { api } from "../../services/api"

export const fetchPosts = createAsyncThunk("feed/fetchPosts", async (userIdUrl, thunkApi) => {

    const currentPage = thunkApi.getState().feed.pagination.currentPage
    const postsPerPage = thunkApi.getState().feed.pagination.postsPerPage

    const startIndex = currentPage * postsPerPage;
    try {
        let filteredPosts = [];

        const id = thunkApi.getState().user.organizationId;

        if (userIdUrl) {
            const response = await api.get(`/organizations/${id}/users/${userIdUrl}/posts`);
            filteredPosts = response.data;
        }
        else {
            const response = await api.get(`/organizations/${id}/posts`);
            filteredPosts = response.data;
        }

        const sortedPosts = filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        const endIndex = startIndex + Math.min(postsPerPage, sortedPosts.length - startIndex);
        const totalPosts = sortedPosts.length;

        const availablePosts = totalPosts > endIndex;
        thunkApi.dispatch(setAvailablePosts(availablePosts));

        const slicedPosts = sortedPosts.slice(startIndex, endIndex);
               
        
        
        return slicedPosts;

    } catch (error) {
        return thunkApi.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
    }
});

export const createPost = createAsyncThunk("feed/createPost", async (text, thunkApi) => {
    try {

        // fetch of logged-in user data
        const organizationId = thunkApi.getState().user.organizationId

        const { data } = await api.post(`/organizations/${organizationId}/posts`,  {text: text})

        
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

    const id = thunkApi.getState().user.organizationId;

    try {
        
        const response = await api.get(`/organizations/${id}/posts/${postId}/comments`);
        const postComments = response.data;
        
        return {postComments, postId}

    }
    catch (error) {

        return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la récupération des commentaires." });
    }
})


export const addNewComment = createAsyncThunk("feed/addNewComment", async ({text, postId}, thunkApi) => {
    try {
        const id = thunkApi.getState().user.organizationId

        const { data : newComment } = await api.post(`/organizations/${id}/posts/${postId}/comments`,  {text: text})

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
        const id = thunkApi.getState().user.organizationId
        
        const { data : newReaction } = await api.post(`/organizations/${id}/posts/${postId}/reactions`,  {type: reaction})

        return {newReaction, postId}
    }

    catch (error) {
        if (error.response.status === 409){
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }

        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });
    }
})



export const updateReaction = createAsyncThunk("post/updateReaction", async ({postId, reaction}, thunkApi) => {

    try {
        const posts = thunkApi.getState().feed.posts
        const post = posts.find(({id}) => id === postId)

        if (!post) {
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }

        const updatedReaction = {
            tag: `${reaction}`,
            name: `${reaction}`,
        };

        return {updatedReaction, postId, authorId: post.author.id}
    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });
    }
})


export const removeReaction = createAsyncThunk("post/removeReaction", async ({postId, reaction}, thunkApi) => {

    try {
        const userLogged = thunkApi.getState().user
        const posts = thunkApi.getState().feed.posts
        const exist = posts.some(({id}) => id ===postId)

        if (!exist) {
            return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        }

        const  removedReaction = {

            author:{
                id: userLogged.id,
                name: userLogged.name,
                surname: userLogged.surname,
                job: userLogged.job,
                profilePicture: userLogged.profilePicture,
            },
            type:{
                tag: `${reaction}`,
                name: `${reaction}`,
            },
        };

        return {removedReaction, postId}

    }
    catch (error) {
        return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });
    }
});
