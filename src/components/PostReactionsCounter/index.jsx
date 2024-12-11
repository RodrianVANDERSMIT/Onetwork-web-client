import { useState } from 'react';
import  PropTypes from 'prop-types';
import './style.scss'
import { useSelector } from 'react-redux';
import { getPostReactions } from '../../redux/selectors/feed';
import {getUserOrganizationId } from '../../redux/selectors/user'
import { Box, Button } from '@mui/material';
import { Popover, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Link as MuiLink } from '@mui/material'


const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    background: `${theme.palette.background.paper}`,
    padding: 2,
}));

function PostReactionsCounter({postId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const postReactions = useSelector(getPostReactions(postId));
    const organizationId = useSelector(getUserOrganizationId)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const hasReactionType = (reactions, type) => {
        return reactions.some(reaction => reaction.type.tag === type)
    };
    
    
    return (
        <>
            <Button onClick={handleClick} className ="c-reaction-post">
                {['like', 'love', 'haha', 'wow', 'sad', 'angry'].map(reactionType =>
                    hasReactionType(postReactions, reactionType) && (
                        <img className='c-reaction-post__image' src={`/assets/reactions/emoji-${reactionType}.png`} alt={`Emoji ${reactionType}`} key={reactionType} />
                    )
                )}
                {postReactions.length}
            </Button>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Box className ="c-reaction-post__info" >
                    {postReactions.map((reaction) => (
                        <Box 
                            className ="c-reaction-post__info-emoji" 
                            key={reaction.id} 
                            sx={{ display: 'flex', alignItems: 'center', padding: '0', margin: 1 }}>
                            <Badge
                                className ="c-reaction-post__info-container-picture" 
                                sx={{  marginRight: '0.5em' }}
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <SmallAvatar src={`/assets/reactions/emoji-${reaction.type.tag}.png`} />
                                }
                            >
                                <Avatar 
                                    component={Link} 
                                    to={`/${organizationId}/user/${reaction.author.id}`}
                                    alt={reaction.author.name} 
                                    src={reaction.author.profilePicture} 
                                />
                            </Badge>
                            <Box>
                                <MuiLink 
                                    component={Link}
                                    to={`/${organizationId}/user/${reaction.author.id}`}
                                >
                                    <Typography 
                                        variant="body2" 
                                        className ="c-reaction-post__identity"
                                    >
                                        {`${reaction.author.name} ${reaction.author.surname}`}
                                    </Typography>
                                </MuiLink>
                                <Typography 
                                    variant="body2"
                                    className ="c-reaction-post__job"
                                >
                                    {reaction.author.job}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Popover>
        </>
    )
}

PostReactionsCounter.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostReactionsCounter
