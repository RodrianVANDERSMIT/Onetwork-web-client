import  PropTypes from 'prop-types';
import './style.scss'
import { useSelector } from 'react-redux';
import { getPostReactions } from '../../redux/selectors/feed';
import { Box, Button } from '@mui/material';

function PostReaction({postId}) {
    
    const postReactions = useSelector(getPostReactions(postId));

    const tagExists = (reactions, tagToCheck) => {
        for (const reaction of reactions) {
            if (reaction.type && reaction.type.tag === tagToCheck) {
                return true;
            }
        }
        return false;
    };
    

    
    return (
        <Button  className ="c-reaction-post__button" sx={{ p: 0  }}>
            {postReactions.length === 0 ? (
                <Box>
                    {postReactions.length} réactions 
                </Box>
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
    )
}

PostReaction.propTypes = {
    postId: PropTypes.number.isRequired,
};

export default PostReaction