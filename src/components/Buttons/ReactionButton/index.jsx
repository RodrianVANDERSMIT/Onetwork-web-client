import { useState } from 'react';
import PropTypes from "prop-types";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import { getPostReactions } from '../../../redux/selectors/feed';
import { getUserId } from '../../../redux/selectors/user';
import { addReaction, updateReaction, removeReaction } from '../../../redux/thunks/feed';
import './style.scss'




function ReactionButton({postId}) {
	
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const postReactions = useSelector(getPostReactions(postId));
    
    const userId = useSelector(getUserId)
	
    const loggedUserReaction = postReactions.find( reaction => userId === reaction.author.id)
	
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleReaction = (reaction)=>{
        if (loggedUserReaction && loggedUserReaction.type.tag === reaction){
            dispatch(removeReaction({postId, reaction}))
        }
        else if (loggedUserReaction){
            dispatch(updateReaction({postId, reaction}))
        }
        else {
            dispatch(addReaction({postId, reaction}))
        }
        setAnchorEl(null);
    }


    return (
        <div className="c-reaction-selector">
            {loggedUserReaction ? 
                <Button className='c-reaction-selector__emoji-button' aria-describedby={id} onClick={handleClick}>
                    <img className='c-reaction-selector__image-choice' src={`/assets/reactions/emoji-${loggedUserReaction.type.tag}.png`} alt={`Emoji ${loggedUserReaction.type.tag}`}/>
                </Button>
                : 
                <Button variant="outlined" className='c-btn footer' aria-describedby={id} onClick={handleClick}>
                    {"J'aime"}
                </Button>
            }
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 1, }}>
                    <Button sx={{m:"5px", minWidth:"35px" }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction('like')}>
                        <img className='c-reaction-selector__image' src="/assets/reactions/emoji-like.png" alt="Emoji like" />
                    </Button>
                    <Button sx={{m:"5px",  minWidth:"35px" }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction('love')}>
                        <img className='c-reaction-selector__image' src="/assets/reactions/emoji-love.png" alt="Emoji love" />
                    </Button>
                    <Button sx={{m:"5px",  minWidth:"35px" }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction('haha')}>
                        <img className='c-reaction-selector__image' src="/assets/reactions/emoji-haha.png" alt="Emoji haha" />
                    </Button>
                    <Button sx={{m:"5px",  minWidth:"35px" }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction('wow')}>
                        <img  className='c-reaction-selector__image' src="/assets/reactions/emoji-wow.png" alt="Emoji chock" />
                    </Button>
                    <Button sx={{m:"5px",  minWidth:"35px" }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction('sad')}>
                        <img className='c-reaction-selector__image' src="/assets/reactions/emoji-sad.png" alt="Emoji cry" />
                    </Button>
                    <Button sx={{m:"5px",  minWidth:"35px" }} className="c-reaction-selector__emoji-button" onClick={() => handleReaction('angry')}>
                        <img className='c-reaction-selector__image' src="/assets/reactions/emoji-angry.png" alt="Emoji angry" />
                    </Button>
                </Typography>
            </Popover>
        </div>
                
    );
}

ReactionButton.propTypes = {
    postId: PropTypes.number.isRequired,
};


export default ReactionButton
