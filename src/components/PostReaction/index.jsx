import { useState } from 'react';
import  PropTypes from 'prop-types';
import './style.scss'
import { useSelector } from 'react-redux';
import { getPostReactions } from '../../redux/selectors/feed';
import { Box, Button } from '@mui/material';
import { Popover, Typography } from '@mui/material';

function PostReaction({postId}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const postReactions = useSelector(getPostReactions(postId));
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const tagExists = (reactions, tagToCheck) => {
        for (const reaction of reactions) {
            if (reaction.type && reaction.type.tag === tagToCheck) {
                return true;
            }
        }
        return false;
    };
    
    
    return (
        <div className="c-reaction-post">
            <Button onClick={handleClick} className ="c-reaction-post__button" sx={{ p: 0  }}>
                {postReactions.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        {postReactions.length} réactions 
                    </Typography>
                ) : (
                    <>
                        {tagExists(postReactions, 'like') && (
                            <img className='c-reaction-post__image' src="/public/emoji/emoji-like.png" alt="Emoji like" />
                        )}
                        {tagExists(postReactions, 'love') && (
                            <img className='c-reaction-post__image' src="/public/emoji/emoji-love.png" alt="Emoji love" />
                        )}
                        {tagExists(postReactions, 'haha') && (
                            <img className='c-reaction-post__image' src="/public/emoji/emoji-haha.png" alt="Emoji haha" />
                        )}
                        {tagExists(postReactions, 'wow') && (
                            <img className='c-reaction-post__image' src="/public/emoji/emoji-wow.png" alt="Emoji wow" />
                        )}
                        {tagExists(postReactions, 'sad') && (
                            <img className='c-reaction-post__image' src="/public/emoji/emoji-sad.png" alt="Emoji sad" />
                        )}
                        {tagExists(postReactions, 'angry') && (
                            <img className='c-reaction-post__image' src="/public/emoji/emoji-angry.png" alt="Emoji angry" />
                        )}
                        {postReactions.length}
                    </>
                )}
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
                <Box className ="c-reaction-post__info" sx={{ p: 2 }}>
                    {postReactions.map((reaction) => (
                        <Box className ="c-reaction-post__info-emoji" key={reaction.id} sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
                            <img src={`/public/emoji/emoji-${reaction.type.tag}.png`}/>
                            <Box className ="c-reaction-post__info-container-picture" sx={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden', marginRight: '8px' }}>
                                <img className ="c-reaction-post__info-picture"
                                    src={reaction.author.profilePicture}
                                    alt={reaction.author.name}
                                    
                                />
                            </Box>
                            <Typography 
                                className ="c-reaction-post__info-user" variant="body2">{`${reaction.author.name} ${reaction.author.surname}`}
                            </Typography>
                            
                            
                        </Box>
                    ))}
                </Box>
            </Popover>
        </div>
    )
}

PostReaction.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostReaction