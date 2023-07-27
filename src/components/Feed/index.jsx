import Post from '../Post'
import { useEffect } from 'react';
import { getUser } from '../../redux/selectors/user'
import { useSelector, useDispatch } from 'react-redux'
import { getFeed } from '../../redux/selectors/feed'
import { getList } from '../../redux/selectors/feed'
import { fetchFeeds } from '../../redux/thunks/feed';

import {  Typography,Paper, InputBase } from '@mui/material'
import { Box, Avatar, IconButton, Grid } from '@mui/material'

import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

import './style.scss'
import { useParams } from 'react-router-dom';

function Feed() {
// Recovery of logged-in user data
    const userLogged = useSelector(getUser);
    const {organizationId} = useParams();
    console.log (organizationId)

    const dispatch = useDispatch();
    dispatch(fetchFeeds())
    useEffect(()=>{        
        dispatch(fetchFeeds());
    }, [])
    
    const posts = useSelector(getList);
    console.log(posts)

    return (
        <Box className="c-container-news" >
            <Box className="c-header-news">
                <Typography variant="h5" >
                    {"Nom de l'organisation"}
                </Typography>
                <Box className="c-header-news__textarea" >
                    <Avatar className="c-avatar" alt="Remy Sharp" src={userLogged.profilePicture} />
                    <Paper className="c-header-news__form"
                        component="form"
                        
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Nouveau Post..."
                            inputProps={{ 'aria-label': 'search google maps' }}
                            multiline
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <HistoryEduIcon />
                        </IconButton>
                    </Paper>
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

export default Feed