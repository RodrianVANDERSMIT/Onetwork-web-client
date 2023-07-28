import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';




function ReactionButton(postId) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    
    return (

        <div>
            <Button className='c-btn footer' aria-describedby={id}  onClick={handleClick}>
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
                    <Button onClick={() => console.log('Button like clicked')}>
                        <img src="../../../../public/emoji/emoji-like.png" alt="Emoji like" />
                    </Button>
                    <Button onClick={() => console.log('Button love clicked')}>
                        <img src="../../../../public/emoji/emoji-love.png" alt="Emoji love" />
                    </Button>
                    <Button onClick={() => console.log('Button haha clicked')}>
                        <img src="../../../../public/emoji/emoji-haha.png" alt="Emoji haha" />
                    </Button>
                    <Button onClick={() => console.log('Button chock clicked')}>
                        <img src="../../../../public/emoji/emoji-cry.png" alt="Emoji cry" />
                    </Button>
                    <Button onClick={() => console.log('Button chock clicked')}>
                        <img src="../../../../public/emoji/emoji-chock.png" alt="Emoji chock" />
                    </Button>
                    <Button onClick={() => console.log('Button angry')}>
                        <img src="../../../../public/emoji/emoji-angry.png" alt="Emoji angry" />
                    </Button>
                </Typography>
            </Popover>
        </div>
    );
}

export default ReactionButton