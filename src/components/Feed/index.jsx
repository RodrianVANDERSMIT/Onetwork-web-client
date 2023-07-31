import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUser, getUserOrganizationId } from '../../redux/selectors/user'
import { getPosts } from '../../redux/selectors/feed'
import { fetchPosts } from '../../redux/thunks/feed';

import { Box, Avatar, Grid } from '@mui/material'
import {  Typography } from '@mui/material'
import { getOrganizationName } from '../../redux/selectors/organization'
import PostForm from '../Forms/PostForm';
import Post from '../Post'
import './style.scss'
import SelectedUserCard from '../Cards/SelectedUserCard';

function Feed({userIdUrl}) {

    // Fetch of logged-in user data
    const dispatch = useDispatch();
    const userLogged = useSelector(getUser);
    
    const organizationName = useSelector(getOrganizationName);
    const organizationId = useSelector(getUserOrganizationId)
    // fetch all posts
    const posts = useSelector(getPosts);
    
    
    useEffect(() => {
              
        if (userIdUrl) {  
            dispatch(fetchPosts( userIdUrl ));
        } else {
            dispatch(fetchPosts());
        }
    }, [userIdUrl, organizationId, dispatch]);

    return (
        <Box className="c-feed" >
            <Box className="c-feed-header">
                {userIdUrl ?(
                    <SelectedUserCard/>
                ):(
                    <>  <Typography variant="h5" >
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
                    </>
                )}
            </Box>

            {posts.length === 0 ? (
                <Typography variant="body1">{"Cet utilisateur n'a pas encore rédigé de post"}</Typography>
            ) : (
                posts.map((post) => (
                    <Grid key={post.id}>
                        <Post {...post} />
                    </Grid>
                ))
            )}
        </Box>
    )
}

Feed.propTypes = {
    userIdUrl: PropTypes.number
};

export default Feed