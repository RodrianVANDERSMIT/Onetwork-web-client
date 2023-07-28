import PropTypes from "prop-types"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getPostComments } from '../../redux/selectors/feed'
import { fetchComments } from '../../redux/thunks/feed';
import { getUser } from '../../redux/selectors/user'

import { Card, CardActions, CardHeader, CardContent } from '@mui/material';
import { Grid, Typography, Button, Divider } from '@mui/material'
import {Avatar, Collapse, List, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import FormComment from '../Forms/CommentForm';
import BasicButton from '../Buttons/BasicButton';
import Comment from '../Comment';

import moment from 'moment'
import './style.scss'

import ReactionButton from '../Buttons/ReactionButton'


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

function Post({id, author,text,reactionsCount,commentsCount,createdAt}) {

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

    const handleExpandClick = () => {
        if (!comments) {
            dispatch(fetchComments(id));
        }

        setExpanded(!expanded);
    };

    return (
        <Card 
            sx = {{ borderRadius: { sm: 0 ,md: 3}}}
            className='c-card-post'
        >
            <CardHeader
                avatar={
                    <Avatar className="c-avatar" alt="Remy Sharp" src={author.profilePicture} />
                }       
                title={`${author.name}  ${author.surname} - ${date} à ${time}`}
                subheader={author.job}
            />
            <Divider/>
            <CardContent>
                <Typography variant="body1" >
                    {text}
                </Typography>
            </CardContent>
            <Divider/>
            <CardContent className='c-counter'>
                <Typography variant="body2" color="text.secondary">
                    {reactionsCount}{" réactions"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {commentsCount}{" commentaires"}
                </Typography>
            </CardContent>
            <Divider/>
            <CardActions className="c-post-card-action"  disableSpacing>
                <ReactionButton/>
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
                <CardContent className="c-post-card-content">
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
                            <FormComment/>
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
    reactionsCount: PropTypes.number,
    commentsCount: PropTypes.number,
    createdAt: PropTypes.string,   
};

export default Post