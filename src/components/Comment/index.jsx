import { ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import { Avatar, Typography } from '@mui/material';
import './style.scss'

function Comment() {
    
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
                primary="Ali Connors"
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {"— I'll be in your neighborhood in your neighborhood doing errands in your neighborhood doing errands doing errands in your neighborhood doing errands in your neighborhood doing errands this…"}
                    </Typography>
                }
            />
        </ListItem>
    )
}

export default Comment