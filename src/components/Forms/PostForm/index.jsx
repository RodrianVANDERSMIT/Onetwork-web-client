import { InputBase, Paper } from '@mui/material'
import { IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import './style.scss'




function PostForm() {

    

    
    
    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '1em' }} 
            className="c-feed-header__form"
            component="form"
            
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Nouveau Post...'
                multiline
                
            />
            <IconButton 
                sx={{ p: '10px' }} 
                type="submit" 
            >
                <SendIcon />
            </IconButton>
        </Paper>
    )
}

export default PostForm