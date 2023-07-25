import { createAsyncThunk } from '@reduxjs/toolkit'
import feed from "../../data/Post.js"

export const fetchFeeds = createAsyncThunk("listPosts/fetchPosts", async () => {
    try {
        
        const feeds = feed

        
        return feeds;     
        
    }
    catch (error) {
        throw new Error( "Une erreur s'est produite");
    }
})