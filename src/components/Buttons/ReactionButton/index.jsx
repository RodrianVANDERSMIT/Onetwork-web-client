import { useState } from 'react';
import PropTypes from "prop-types";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import { getPostReactions } from '../../../redux/selectors/feed';
import { getUserId } from '../../../redux/selectors/user';
import { addReaction, updateReaction } from '../../../redux/thunks/feed';





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
        console.log(reaction)
        
        loggedUserReaction?(
            dispatch(updateReaction({postId, reaction}))
        ):
            dispatch(addReaction({postId, reaction}))
        
        setAnchorEl(null);
    }


    return (
        <div className="c-reaction-selector">
            {loggedUserReaction ? 
                <Button className='c-reaction-selector__emoji-button' aria-describedby={id} onClick={handleClick}>
                    <img src={`/public/emoji/emoji-${loggedUserReaction.type.tag}.png`} alt={`Emoji ${loggedUserReaction.type.tag}`}/>
                </Button>
                : 
                <Button className='c-btn footer' aria-describedby={id} onClick={handleClick}>
                    J'aime
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
                <Typography sx={{ p: 2 }}>
                    <Button onClick={() => handleReaction('like')}>
                        <img src="/public/emoji/emoji-like.png" alt="Emoji like" />
                    </Button>
                    <Button onClick={() => handleReaction('love')}>
                        <img src="/public/emoji/emoji-love.png" alt="Emoji love" />
                    </Button>
                    <Button onClick={() => handleReaction('haha')}>
                        <img src="/public/emoji/emoji-haha.png" alt="Emoji haha" />
                    </Button>
                    <Button onClick={() => handleReaction('wow')}>
                        <img src="/public/emoji/emoji-wow.png" alt="Emoji chock" />
                    </Button>
                    <Button onClick={() => handleReaction('sad')}>
                        <img src="/public/emoji/emoji-sad.png" alt="Emoji cry" />
                    </Button>
                    <Button onClick={() => handleReaction('angry')}>
                        <img src="/public/emoji/emoji-angry.png" alt="Emoji angry" />
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