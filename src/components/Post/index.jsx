import PropTypes from "prop-types"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getPostComments, getPostLoading } from '../../redux/selectors/feed'
import { fetchComments } from '../../redux/thunks/feed';
import { getUser } from '../../redux/selectors/user'

import moment from 'moment'

import CommentForm from '../Forms/CommentForm';
import Comment from '../Comment';
import ReactionButton from '../Buttons/ReactionButton'
import PostReaction from '../PostReaction'

import { Card, CardActions, CardHeader, CardContent, CircularProgress } from '@mui/material';
import { Grid, Typography, Button, Divider } from '@mui/material'
import {Avatar, Collapse, List, Box} from '@mui/material';
import { styled } from '@mui/material/styles';

import './style.scss'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <Button {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function Post({id, author,text,commentsCount,createdAt}) {

    //Date and time reformatting
    const date = moment(createdAt).format('DD/MM/YYYY');
    const time = moment(createdAt).format('HH[h]mm')

    // fetch of logged-in user data
    const userLogged = useSelector(getUser)

    // expanding list of post comments
    const [expanded, setExpanded] = useState(false);

    const dispatch = useDispatch();

    // fetch all comments by post    
    const comments = useSelector(getPostComments(id));
    const commentsLoading = useSelector(getPostLoading)

    const handleExpandClick = () => {
        if (!comments) {
            dispatch(fetchComments(id));
        }

        setExpanded(!expanded);
    };

    return (
        <Card 
            sx = {{ borderRadius: { xs: 0 ,md: 3}}}
            className='c-card-post'
        >
            <CardHeader
                avatar={
                    <Link to={`/${userLogged.organizationId}/user/${author.id}`}>
                        <Avatar className="c-avatar" alt="Remy Sharp" src={author.profilePicture} />
                    </Link>
                }       
                title={
                    <>
                    <Typography
                    component={Link}
                    to={`/${userLogged.organizationId}/user/${author.id}`}
                    className= "c-user-post__identity"
                    variant= "body1"
                    >
                    {`${author.name} ${author.surname}`}
                    </Typography> - {date} à {time}
                    </>
                }
                subheader={author.job}
            />
            <Divider/>
            <CardContent>
                <Typography className="c-card-post__text" variant="body1" >
                    {text}
                </Typography>
            </CardContent>
            <Divider/>
            <CardContent className='c-counter'>
                <Box >
                    <PostReaction postId={id} />
                </Box>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className='c-counter__btn' 
                >
                    {commentsCount}{" commentaires"}
                </ExpandMore>
            </CardContent>
            <Divider/>
            <CardActions className="c-post-card__action"  disableSpacing>
                <ReactionButton
                    postId={id}   
                />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className='c-btn footer' 
                    variant="outlined" 
                >
                Commenter
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{padding: '0 16px'}} className="c-post-card__list">
                    <Box className="c-admin-members__loader">
                        {commentsLoading ? <CircularProgress/> : null}
                    </Box>
                    <List>
                        {comments?.map(comment => (   
                            <Grid key={comment.id}>
                                <Comment {...comment}/>
                            </Grid>
                        ))} 
                    </List>
                    <Box className="c-feed-header">
                        <Box className="c-feed-header__textarea" >
                            <Avatar className="c-avatar" alt="Remy Sharp" src={userLogged.profilePicture} />
                            <CommentForm postId={id}/>
                        </Box>
                    </Box>                                
                </CardContent>
            </Collapse>
        </Card>
    )   
}

Post.propTypes = {
    id: PropTypes.number,
    author: PropTypes.object,
    text: PropTypes.string,   
    createdAt: PropTypes.string,
    commentsCount: PropTypes.number,  
};

export default Post
