import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../redux/selectors/user'
import { getPosts } from '../../redux/selectors/feed'
import { fetchPosts } from '../../redux/thunks/feed';

import { Box, Avatar, Grid } from '@mui/material'
import {  Typography } from '@mui/material'
import { getOrganizationName } from '../../redux/selectors/organization'
import PostForm from '../Forms/PostForm';
import Post from '../Post'
import './style.scss'

function Feed({userIdUrl}) {

    // Fetch of logged-in user data
    const userLogged = useSelector(getUser);
    
    const organizationName = useSelector(getOrganizationName);
    
    // fetch all posts
    const postList = useSelector(getPosts);
    
    //filter posts if an user is select
    const posts = userIdUrl?
        postList.filter(post => post.author.id === parseInt(userIdUrl, 10))
        : postList;
    
    const dispatch = useDispatch();
    
    useEffect(()=>{        
        dispatch(fetchPosts());
    }, [dispatch])

    return (
        <Box className="c-feed" >
            <Box className="c-feed-header">
                <Typography variant="h5" >
                    {organizationName}
                </Typography>
                <Box className="c-feed-header__textarea" >
                    <Avatar 
                        className="c-avatar" 
                        alt="Remy Sharp" 
                        src={userLogged.profilePicture} 
                    />
                    <PostForm
                        
                    />
                </Box>
            </Box>
            {posts.map(post => (   
                <Grid key={post.id}>
                    <Post {...post}/>
                </Grid>
            ))} 
        </Box>
    )
}

Feed.propTypes = {
    userIdUrl: PropTypes.string
};

export default Feed