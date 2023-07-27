import { createAsyncThunk } from '@reduxjs/toolkit'
import posts from "../../data/Post.js"
import comments from "../../data/Comment.js"

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