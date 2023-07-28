import { useState } from 'react';
import PropTypes from "prop-types";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import { getPostReactions } from '../../../redux/selectors/feed';
import { getUserId } from '../../../redux/selectors/user';





function ReactionButton({postId}) {
	
    const [anchorEl, setAnchorEl] = useState(null);
    // const dispatch = useDispatch();
    const postReactions = useSelector(getPostReactions(postId));
    const userId = useSelector(getUserId)

    console.log(postReactions)
    console.log(postReactions.reaction)
	
    const loggedUserReaction = postReactions.find( reaction => userId === reaction.author.id)

    console.log(loggedUserReaction)
	



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleReaction = ()=>{
        // dispatch(addReaction(postId, reaction))
        console.log()
    }

    return (
        <>
            {loggedUserReaction && (
                <div>
                    <Button className='c-button__emoji' aria-describedby={id} onClick={handleClick}>
                        <img src={`/public/emoji/emoji-${loggedUserReaction.type.tag}.png`} alt={`Emoji ${loggedUserReaction.type.tag}`}/>
                    </Button>
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
                                <img src="/public/emoji/emoji-chock.png" alt="Emoji chock" />
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
                
            )}

            {!loggedUserReaction && (
                <div>
                    <Button className='c-btn footer' aria-describedby={id} onClick={handleClick}>
                        J'aime
                    </Button>
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
                                <img src="/public/emoji/emoji-chock.png" alt="Emoji chock" />
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
            )}
        </>
);

}
ReactionButton.propTypes = {
    postId: PropTypes.number.isRequired,
};


export default ReactionButton