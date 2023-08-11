import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getUser, getUserOrganizationId } from '../../redux/selectors/user'
import { getPosts, getCurrentPage, getAvailablePosts, getIsLoading } from '../../redux/selectors/feed'
import { fetchPosts } from '../../redux/thunks/feed';
import { cleanFeedState, setCurrentPage } from '../../redux/reducers/feed'
import {fetchOrganization } from '../../redux/thunks/organization'
import { getOrganizationName } from '../../redux/selectors/organization'

import { Box,Typography, Avatar, Grid, CircularProgress} from '@mui/material'


import SelectedUserCard from '../Cards/SelectedUserCard';
import PostForm from '../Forms/PostForm';
import Post from '../Post'

import './style.scss'





function Feed({userIdUrl}) {
    // Fetch of logged-in user data
    const dispatch = useDispatch();
    const userLogged = useSelector(getUser);
    
    const organizationName = useSelector(getOrganizationName);
    const organizationId = useSelector(getUserOrganizationId);
    
    // fetch all posts
    const posts = useSelector(getPosts);
    const currentPage = useSelector(getCurrentPage)
    const availablePosts = useSelector(getAvailablePosts)
    const isLoading = useSelector(getIsLoading)
    
    useEffect(() => {
        dispatch(fetchOrganization(organizationId)); 
        return () =>{
            dispatch(cleanFeedState())
        }
    }, []);

    useEffect(() => {
        if (!isLoading && availablePosts === true ) {
            dispatch(fetchPosts(userIdUrl))
        }
    }, [currentPage, availablePosts]);

    useEffect(() => {
        const handleScroll = () => {
        
            if ( !isLoading &&
                availablePosts === true &&
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                dispatch(setCurrentPage(currentPage + 1));      
            }
        };

        if (availablePosts) {
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [availablePosts, currentPage]);




    return (
        <Box className="c-feed"  >
            
            <Box className="c-feed-header" id="back-to-top-anchor">
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
                    <Grid key={post.id} >
                        <Post {...post} />
                    </Grid>
                ))
            )}
            <Box className="c-feed__loader" display="flex" flexDirection="column" alignItems="center" justifyContent="center">

                {isLoading && ( 
                    <CircularProgress/>
                )}
                {!isLoading && !availablePosts && (
                    <Typography variant="body1">Pas de messages plus anciens</Typography>
                )}
                
            </Box>
        
            
        </Box>
    )
}

Feed.propTypes = {
    userIdUrl: PropTypes.number
};

export default Feed