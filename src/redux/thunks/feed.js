import { createAsyncThunk } from '@reduxjs/toolkit'
import posts from "../../data/Post.js"
import comments from "../../data/Comment.js"
import moment from 'moment'

export const fetchPosts = createAsyncThunk("feed/fetchPosts", async () => {
    try {

        return posts;

    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})

export const fetchComments = createAsyncThunk("feed/fetchComments", async (postId) => {
    try {
        const postComments =
            comments.filter((comment) => comment.post_id === postId);

        return {postComments, postId}

    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})

export const addNewPost = createAsyncThunk("feed/addNewPost", async (text, thunkApi) => {
    try {

        // fetch of logged-in user data
        const userLogged = thunkApi.getState().user

        const posts = thunkApi.getState().feed.posts
        
        const lastIndex = posts.length - 1;
        const lastId = posts[lastIndex].id;
        const newId = lastId + 1
        
        const now = moment() ;

        const date = now.format('YYYY-MM-DD');
        const time = now.format('HH:mm:ss');
        const formattedDate = `${date} ${time}`

        const newPost = {
            id: newId,
            text: text,
            reactionsCount: 0,
            commentsCount: 0,
            author: {
                id: userLogged.id,
                email: userLogged.email,
                name: userLogged.name,
                surname: userLogged.surname,
                job: userLogged.job,
                role: {
                    tag: userLogged.role.tag,
                    name: userLogged.role.name,
                },
                profilePicture: userLogged.profilePicture,
                disabled: userLogged.disabled,
            },
            createdAt: formattedDate
        };
        
        return newPost;

    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})